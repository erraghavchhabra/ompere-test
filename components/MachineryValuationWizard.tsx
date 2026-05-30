"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ChevronDown, Upload, X, Loader2 } from "lucide-react";
import { API } from "@/lib/api";

interface Brand    { id: number | string; name: string }
interface Capacity { kva: number | string }

interface PriceResult {
  status: boolean;
  price_new?: number | string | null;
  day2_price?: number | string | null;
  year?: number | string | null;
  year_factor?: number | null;
  hours_factor?: number | null;
  engine_factor?: number | null;
  estimated_price?: number | string | null;
  hours_band_index?: number | null;  // null=not selected, -1=don't know, 0-7=band
  message?: string;
}

// ─── Inner component ──────────────────────────────────────────────────────────
function MachineryValuationWizardInner() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [uploadedImages, setUploadedImages]     = useState<File[]>([]);
  const [uploadedPreviews, setUploadedPreviews] = useState<string[]>([]);

  // ── machine_type always = 1, never shown ─────────────────────────────────
  const MACHINE_TYPE_ID = "1";

  const nameFromUrl  = searchParams.get("name")  ?? "";
  const phoneFromUrl = searchParams.get("phone") ?? "";

  // Step 1 — pre-filled from URL (canopy removed)
  const [selectedBrand,    setSelectedBrand]    = useState(searchParams.get("brand_id")     ?? "");
  const [selectedCapacity, setSelectedCapacity] = useState(searchParams.get("capacity_kva") ?? "");
  const [selectedYear,     setSelectedYear]     = useState(searchParams.get("year")         ?? "");

  // Step 2
  const [selectedHours,           setSelectedHours]           = useState("");
  const [selectedEngineCondition, setSelectedEngineCondition] = useState("");

  // ── Dropdown data ─────────────────────────────────────────────────────────
  const [brands,          setBrands]          = useState<Brand[]>([]);
  const [capacityOptions, setCapacityOptions] = useState<Capacity[]>([]);

  // ── Loading flags ─────────────────────────────────────────────────────────
  const [loadingBrands,   setLoadingBrands]   = useState(true);
  const [loadingCapacity, setLoadingCapacity] = useState(false);

  // ── Calculate / submit state ──────────────────────────────────────────────
  const [calculating,   setCalculating]   = useState(false);
  const [priceResult,   setPriceResult]   = useState<PriceResult | null>(null);
  const [calcError,     setCalcError]     = useState<string | null>(null);
  const [submitting,    setSubmitting]    = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError,   setSubmitError]   = useState<string | null>(null);

  const years = Array.from(
    { length: new Date().getFullYear() - 1999 },
    (_, i) => `${2000 + i}`
  ).reverse();

  // ── 1. Fetch brands once ──────────────────────────────────────────────────
  useEffect(() => {
    setLoadingBrands(true);
    fetch(API.brands)
      .then((r) => r.json())
      .then(setBrands)
      .catch(console.error)
      .finally(() => setLoadingBrands(false));
  }, []);

  // ── 2. When brand pre-filled from URL, load its capacities directly ───────
  useEffect(() => {
    const brandId = searchParams.get("brand_id");
    if (!brandId || loadingBrands) return;
    fetchCapacities(brandId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingBrands]);

  // ── 3. Auto-calculate when brand + capacity come from URL ─────────────────
  useEffect(() => {
    const brandId     = searchParams.get("brand_id");
    const capacityKva = searchParams.get("capacity_kva");
    const year        = searchParams.get("year");
    if (!loadingBrands && brandId && capacityKva) {
      autoCalculate(brandId, capacityKva, year ?? undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingBrands]);

  // ── Fetch helpers ─────────────────────────────────────────────────────────
  const fetchCapacities = async (brandId: string) => {
    setLoadingCapacity(true);
    setCapacityOptions([]);
    try {
      const res  = await fetch(`${API.priceMappingCapacities}?brand_id=${brandId}`);
      const data = await res.json();
      setCapacityOptions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCapacity(false);
    }
  };

  // ── Dropdown handlers ─────────────────────────────────────────────────────
  const handleBrandChange = (brandId: string) => {
    setSelectedBrand(brandId);
    setSelectedCapacity("");
    setCapacityOptions([]);
    if (brandId) fetchCapacities(brandId);
  };

  // ── Auto-calculate (from URL params) ─────────────────────────────────────
  const autoCalculate = async (brand_id: string, capacity_kva: string, make_year?: string) => {
    setCalculating(true);
    try {
      const body: Record<string, string> = { brand_id, capacity_kva };
      if (make_year) body.make_year = make_year;
      const res  = await fetch(API.calculate, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      });
      const data: PriceResult = await res.json();
      setPriceResult(data);
    } catch (err) {
      console.error("Auto-calculate error:", err);
    } finally {
      setCalculating(false);
    }
  };

  // ── Format currency ───────────────────────────────────────────────────────
  const formatCurrency = (value: number | string | null | undefined) => {
    if (value === null || value === undefined) return "₹0";
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "₹0";
    return `₹${num.toLocaleString("en-IN")}`;
  };

  // ── Step 1 → Next ─────────────────────────────────────────────────────────
  const handleStep1Next = async () => {
    if (!selectedBrand || !selectedCapacity) {
      setCalcError("Please select Brand and Capacity.");
      return;
    }
    setCalcError(null);
    setCalculating(true);
    try {
      const body: Record<string, string> = {
        brand_id:     selectedBrand,
        capacity_kva: selectedCapacity,
      };
      if (selectedYear) body.make_year = selectedYear;

      const res  = await fetch(API.calculate, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      });
      const data: PriceResult = await res.json();
      setPriceResult(data);
      if (!data.status) setCalcError(data.message || "Price not found for selected options.");
    } catch (err) {
      console.error(err);
      setCalcError("Failed to fetch price. Please try again.");
    } finally {
      setCalculating(false);
    }
    setStep(2);
  };

  // ── Step 2 → Next ─────────────────────────────────────────────────────────
  const handleStep2Next = async () => {
    setCalcError(null);
    setCalculating(true);
    try {
      const body: Record<string, string> = {
        brand_id:     selectedBrand,
        capacity_kva: selectedCapacity,
      };
      if (selectedYear)            body.make_year        = selectedYear;
      if (selectedHours)           body.running_hours    = selectedHours;
      if (selectedEngineCondition) body.engine_condition = selectedEngineCondition;

      const res  = await fetch(API.calculate, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      });
      const data: PriceResult = await res.json();
      setPriceResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setCalculating(false);
    }
    setStep(3);
  };

  // ── Live price update on step 1 field changes ─────────────────────────────
useEffect(() => {
  if (step !== 1) return;
  if (!selectedBrand || !selectedCapacity) return;

  const autoUpdatePrice = async () => {
    setCalculating(true);
    try {
      const body: Record<string, string> = {
        brand_id:     selectedBrand,
        capacity_kva: selectedCapacity,
      };
      if (selectedYear) body.make_year = selectedYear;

      const res  = await fetch(API.calculate, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      });
      const data: PriceResult = await res.json();
      setPriceResult(data);
    } catch (err) {
      console.error("Live calculation error (step 1):", err);
    } finally {
      setCalculating(false);
    }
  };

  autoUpdatePrice();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedBrand, selectedCapacity, selectedYear]);

  // ── Live price update on step 2 condition changes ─────────────────────────
  useEffect(() => {
    if (step !== 2) return;
    if (!selectedBrand || !selectedCapacity) return;

    const autoUpdatePrice = async () => {
      setCalculating(true);
      try {
        const body: Record<string, string> = {
          brand_id:     selectedBrand,
          capacity_kva: selectedCapacity,
        };
        if (selectedYear)            body.make_year        = selectedYear;
        if (selectedHours)           body.running_hours    = selectedHours;
        if (selectedEngineCondition) body.engine_condition = selectedEngineCondition;

        const res  = await fetch(API.calculate, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(body),
        });
        const data: PriceResult = await res.json();
        setPriceResult(data);
      } catch (err) {
        console.error("Live calculation error:", err);
      } finally {
        setCalculating(false);
      }
    };

    autoUpdatePrice();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHours, selectedEngineCondition]);

  const prevStep = () => step > 1 && setStep(step - 1);

  // ── Image handling ────────────────────────────────────────────────────────
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const remaining = 3 - uploadedImages.length;
    const newFiles  = Array.from(files).slice(0, remaining);
    setUploadedImages((prev)   => [...prev, ...newFiles]);
    setUploadedPreviews((prev) => [...prev, ...newFiles.map((f) => URL.createObjectURL(f))]);
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev)   => prev.filter((_, i) => i !== index));
    setUploadedPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("name",            nameFromUrl);
      fd.append("phone",           phoneFromUrl);
      fd.append("machine_type_id", MACHINE_TYPE_ID);
      fd.append("brand_id",        selectedBrand);
      fd.append("capacity_kva",    selectedCapacity);
      if (selectedYear)            fd.append("make_year",        selectedYear);
      if (selectedHours)           fd.append("running_hours",    selectedHours);
      if (selectedEngineCondition) fd.append("engine_condition", selectedEngineCondition);
      if (priceResult?.price_new       != null) fd.append("price_new",       String(priceResult.price_new));
      if (priceResult?.day2_price      != null) fd.append("day2_price",      String(priceResult.day2_price));
      if (priceResult?.estimated_price != null) fd.append("estimated_price", String(priceResult.estimated_price));
      if (priceResult?.year_factor     != null) fd.append("year_factor",     String(priceResult.year_factor));
      if (priceResult?.hours_factor    != null) fd.append("hours_factor",    String(priceResult.hours_factor));
      if (priceResult?.engine_factor   != null) fd.append("engine_factor",   String(priceResult.engine_factor));
      uploadedImages.forEach((f) => fd.append("images[]", f));

      const res  = await fetch(API.valuationSubmit, { method: "POST", body: fd });
      const data = await res.json();
      if (data.status) setSubmitSuccess(true);
      else setSubmitError(data.message || "Submission failed. Please try again.");
    } catch (err) {
      console.error(err);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Helper: compute high/low from priceResult + current selections ────────
  //
  // Exact Excel formula (verified against Sample & Sample(2) sheets):
  //
  //   G (Average) = ROUNDDOWN(day2_price × year_factor × hours_band_factor, -3)
  //   MAX         = ROUNDDOWN(G × 1.05, -3)   [Excellent condition]
  //   MIN         = ROUNDDOWN(G × 0.95, -3)   [Poor condition]
  //
  //   year_factor      → returned directly by API from depreciation_year table
  //   hours_band_factor → computed here using 0.97 per band (NOT the API's 0.98-based factor)
  //                       <1000=1.0, 1k-2k=0.97, 2k-3k=0.97², 3k-4k=0.97³ …
  //
  // Notes:
  //   • No 0.85 platform margin in the output range — it's already baked into day2_price
  //   • Engine condition shifts the G value: Excellent=G×1.05, Average=G, Poor=G×0.95
  //   • When hours not selected → MAX uses best band (<1000), MIN uses worst band (10000+)
  //   • When engine not selected → full spread: Excellent MAX, Poor MIN
  //   • Only brand+capacity → widest range: day2_price to day2_price×0.20
  // ─────────────────────────────────────────────────────────────────────────
  const computePriceRange = (): { high: number; low: number } | null => {
    if (!priceResult?.estimated_price) return null;

    const baseDay2Price =
      typeof priceResult.day2_price === "string"
        ? parseFloat(priceResult.day2_price)
        : Number(priceResult.day2_price);

    if (isNaN(baseDay2Price) || baseDay2Price <= 0) return null;

    // year_factor from API (depreciation_year table) — already correct
    const yearFactor = typeof priceResult.year_factor === "number" ? priceResult.year_factor : 1;
    const hourFactor = typeof priceResult.hours_factor === "number" ? priceResult.hours_factor : 1;

    const yearSelected   = !!selectedYear;
    const hoursSelected  = !!selectedHours;
    const engineSelected = !!selectedEngineCondition;

    // ROUNDDOWN to nearest 1000 — matches Excel ROUNDDOWN(..., -3)
    const rd = (v: number) => Math.floor(v / 1000) * 1000;

    // 0.97^n hours band factor (verified from Excel Sample sheets)
    const hoursFactorForBand = (idx: number) => Math.pow(0.97, idx);

    // Average of all 8 hour bands (used for "Don't know")
    const AVG_HOURS_FACTOR = Array.from({ length: 8 }, (_, i) => Math.pow(0.97, i))
      .reduce((a, b) => a + b, 0) / 8;

    // hours_band_index from API: null=not selected, -1=don't know, 0-7=specific band
    const bandIndex: number | null =
      priceResult.hours_band_index != null ? priceResult.hours_band_index : null;

    // ── Resolve each factor for MAX and MIN independently ───────────────────
    //
    // When a field IS selected  → same factor used for both MAX and MIN
    // When a field NOT selected → MAX gets best-case, MIN gets default penalty:
    //   year   not selected → MAX ×1.0,  MIN ×0.58 (−42%)
    //   hours  not selected → MAX ×1.0,  MIN ×0.87 (−13%)
    //   engine not selected → MAX ×1.05, MIN ×0.95 (−5%)
    // ─────────────────────────────────────────────────────────────────────────

    // ── YEAR ─────────────────────────────────────────────────────────────────
    // MAX: 1.0 when not selected (no depreciation on best case)
    // MIN: 0.58 (−42%) when not selected, replaced by yearFactor when selected
    const yearFactorMax = yearSelected ? yearFactor : 1.0;
    const yearFactorMin = yearSelected ? yearFactor : 0.58;

    const hoursFactorMax = hoursSelected ? hourFactor : 1.0;
    const hoursFactorMin = hoursSelected ? hourFactor : 0.87;

    // ── HOURS ─────────────────────────────────────────────────────────────────
    // MAX: 1.0 (best band <1000) when not selected
    // MIN: 0.87 (−13%) when not selected, replaced by 0.97^band when selected
   /* let hoursFactorMax: number;
    let hoursFactorMin: number;
    if (bandIndex === null) {
      hoursFactorMax = 1.0;
      hoursFactorMin = 0.87;
    } else if (bandIndex === -1) {
      hoursFactorMax = AVG_HOURS_FACTOR;
      hoursFactorMin = AVG_HOURS_FACTOR;
    } else {
      hoursFactorMax = hoursFactorForBand(bandIndex);
      hoursFactorMin = hoursFactorForBand(bandIndex);
    }*/

    // ── ENGINE ────────────────────────────────────────────────────────────────
    // MAX: 1.05 (Excellent) when not selected
    // MIN: 0.95 (−5%) when not selected, replaced by engineFactor when selected
    const engineFactorMax = engineSelected ? parseFloat(selectedEngineCondition) : 1;
    const engineFactorMin = engineSelected ? parseFloat(selectedEngineCondition) : 0.95;

  


    // ── Final MAX / MIN ───────────────────────────────────────────────────────
    // MAX base: day2_price × 0.85 (−15% margin) then apply selected factors
    // MIN base: day2_price × 0.80 (−20% margin) then apply selected/default factors

  console.log("high",baseDay2Price,yearFactorMax,engineFactorMax,hoursFactorMax);
   console.log("low",baseDay2Price,yearFactorMin,engineFactorMin,hoursFactorMin);
    const high = rd(baseDay2Price * 0.85 * yearFactorMax * hoursFactorMax*engineFactorMax);
    const low  = rd(baseDay2Price * 0.80 * yearFactorMin * hoursFactorMin*engineFactorMin);

  //  const high = rd(gHigh * engineFactorMax);
    //const low  = rd(gLow  * engineFactorMin);



    return { high, low };
  };

  const SelectSkeleton = () => (
    <div className="w-full h-12 rounded-xl bg-gray-100 animate-pulse" />
  );

  // ── Success screen ────────────────────────────────────────────────────────
  if (submitSuccess) {
    return (
      <section className="min-h-screen py-14 bg-gradient-to-b from-white to-orange-50/40 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-12 border border-orange-100 shadow-sm text-center max-w-md w-full mx-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Request Submitted!</h2>
          <p className="text-gray-500 text-sm mb-6">
            Thank you, {nameFromUrl || "there"}! Our team will reach out to you at{" "}
            {phoneFromUrl || "your number"} shortly with your valuation report.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 bg-[#f07020] text-white rounded-xl font-semibold hover:bg-[#d85f14] transition"
          >
            Back to Home
          </a>
        </div>
      </section>
    );
  }

  const priceRange = computePriceRange();

  return (
    <section className="min-h-screen py-14 bg-gradient-to-b from-white to-orange-50/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

          {/* LEFT FORM */}
          <div className="flex flex-col">
            {/* Stepper */}
            <div className="flex items-center flex-wrap gap-4 mb-6">
              {["Machine Details", "Condition", "Images"].map((label, index) => {
                const current = index + 1;
                return (
                  <div key={label} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition ${
                      step === current
                        ? "bg-[#f07020] text-white shadow-lg"
                        : "bg-white border border-orange-100 text-gray-600"
                    }`}>
                      {current}
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-700">{label}</span>
                    {current < 3 && <div className="w-10 h-[2px] bg-orange-200 mx-4" />}
                  </div>
                );
              })}
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-3xl p-8 border border-orange-100 shadow-sm flex-1">

              {/* ── STEP 1 ── */}
              {step === 1 && (
                <>
                  <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Price Calculator</h2>
                  <div className="space-y-5">

                    {/* BRAND */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Brand <span className="text-red-500">*</span>
                      </label>
                      {loadingBrands ? <SelectSkeleton /> : (
                        <div className="relative">
                          <select
                            value={selectedBrand}
                            onChange={(e) => handleBrandChange(e.target.value)}
                            className={`w-full h-12 px-4 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white ${
                              calcError && !selectedBrand ? "border-red-400" : "border-gray-200"
                            }`}
                          >
                            <option value="">Select Brand</option>
                            {brands.map((b) => (
                              <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                      )}
                    </div>

                    {/* CAPACITY */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Capacity <span className="text-red-500">*</span>
                      </label>
                      {loadingCapacity ? <SelectSkeleton /> : (
                        <div className="relative">
                          <select
                            value={selectedCapacity}
                            onChange={(e) => setSelectedCapacity(e.target.value)}
                            disabled={!selectedBrand}
                            className={`w-full h-12 px-4 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white disabled:opacity-50 ${
                              calcError && !selectedCapacity ? "border-red-400" : "border-gray-200"
                            }`}
                          >
                            <option value="">Select Capacity</option>
                            {capacityOptions.map((cap) => (
                              <option key={cap.kva} value={cap.kva}>{cap.kva} KVA</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                      )}
                    </div>

                    {/* YEAR OF PURCHASE */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Year of Purchase
                      </label>
                      <div className="relative">
                        <select
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                          disabled={!selectedCapacity}
                          className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white disabled:opacity-50"
                        >
                          <option value="">Select Year</option>
                          {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>

                    {calcError && <p className="text-sm text-red-500 -mt-1">{calcError}</p>}

                    <button
                      onClick={handleStep1Next}
                      disabled={calculating}
                      className="w-full h-12 bg-[#f07020] text-white rounded-xl font-semibold hover:bg-[#d85f14] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {calculating ? <><Loader2 className="w-4 h-4 animate-spin" />Calculating...</> : "Next"}
                    </button>
                  </div>
                </>
              )}

              {/* ── STEP 2 ── */}
              {step === 2 && (
                <>
                  <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">What is the machinery condition?</h2>
                  <div className="space-y-5">

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Running Hours</label>
                      <div className="relative">
                        <select
                          value={selectedHours}
                          onChange={(e) => setSelectedHours(e.target.value)}
                          className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white"
                        >
                          <option value="">Select Running Hours</option>
                          <option value="500">Less than 1,000 hrs</option>
                          <option value="1500">1,000 – 2,000 hrs</option>
                          <option value="2500">2,000 – 3,000 hrs</option>
                          <option value="3500">3,000 – 4,000 hrs</option>
                          <option value="5000">4,000 – 6,000 hrs</option>
                          <option value="7000">6,000 – 8,000 hrs</option>
                          <option value="9000">8,000 – 10,000 hrs</option>
                          <option value="10000">10,000+ hrs</option>
                          <option value="-1">Don&apos;t know</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Engine Condition</label>
                      <div className="relative">
                        <select
                          value={selectedEngineCondition}
                          onChange={(e) => setSelectedEngineCondition(e.target.value)}
                          className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white"
                        >
                          <option value="">Select Engine Condition</option>
                          <option value="1.05">Excellent</option>
                          <option value="1">Moderate</option>
                          <option value="0.95">Poor</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={prevStep}
                        className="w-full h-12 border border-orange-200 text-gray-700 rounded-xl font-medium hover:bg-orange-50 transition"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleStep2Next}
                        disabled={calculating}
                        className="w-full h-12 bg-[#f07020] text-white rounded-xl font-semibold hover:bg-[#d85f14] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {calculating ? <><Loader2 className="w-4 h-4 animate-spin" />Calculating...</> : "Next"}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* ── STEP 3 ── */}
              {step === 3 && (
                <>
                  <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Upload Machinery Images</h2>
                  <div className="border-2 border-dashed border-orange-200 rounded-3xl p-8 text-center bg-orange-50/30">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="machinery-upload"
                    />
                    <label htmlFor="machinery-upload" className="cursor-pointer block">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f07020] to-[#ff9b5e] flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Upload className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-gray-700 font-medium mb-2">Upload up to 3 machinery images</p>
                      <p className="text-sm text-gray-500 mb-4">Clear images improve valuation accuracy</p>
                      <span className="inline-flex h-11 px-6 items-center justify-center bg-[#f07020] text-white rounded-xl font-medium hover:bg-[#d85f14] transition">
                        Choose Images
                      </span>
                    </label>
                  </div>

                  {uploadedPreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                      {uploadedPreviews.map((preview, index) => (
                        <div key={index} className="relative rounded-2xl overflow-hidden border border-orange-100">
                          <img src={preview} alt={`Upload ${index + 1}`} className="w-full h-28 object-cover" />
                          <button onClick={() => removeImage(index)} className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow">
                            <X className="w-4 h-4 text-gray-700" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {submitError && <p className="text-sm text-red-500 mt-4">{submitError}</p>}

                  <div className="flex gap-3 pt-6">
                    <button
                      onClick={prevStep}
                      disabled={submitting}
                      className="w-full h-12 border border-orange-200 text-gray-700 rounded-xl font-medium hover:bg-orange-50 transition disabled:opacity-60"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="w-full h-12 bg-[#f07020] text-white rounded-xl font-semibold hover:bg-[#d85f14] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submitting ? <><Loader2 className="w-4 h-4 animate-spin" />Submitting...</> : "Get Price Estimate"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white rounded-3xl p-8 border border-orange-100 shadow-sm h-full flex flex-col">

            {/* PRICE RANGE CARD */}
            <div className="order-1 lg:order-2 mt-0 lg:mt-auto bg-gradient-to-b from-white to-orange-50/40 rounded-3xl p-8 border border-orange-100 mb-8 lg:mb-0">

              <h3 className="text-3xl font-bold text-[#1a1a1a] mb-8">
                Evaluation Range
              </h3>

              {calculating && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin text-[#f07020]" />
                  Fetching price estimate...
                </div>
              )}

              {!calculating && priceRange && (
                <div className="relative px-2">
                  <div className="flex justify-between items-end mb-5">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#1a1a1a]">{formatCurrency(priceRange.low)}</p>
                      <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-[#444] mx-auto mt-2" />
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#1a1a1a]">{formatCurrency(priceRange.high)}</p>
                      <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-[#444] mx-auto mt-2" />
                    </div>
                  </div>
                  <div className="h-1 rounded-full bg-gradient-to-r from-lime-400 via-yellow-400 to-red-600" />
                </div>
              )}

              {!calculating && !priceRange && (
                <div className="relative px-2">
                  <div className="flex justify-between items-end mb-5">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-300">₹—</p>
                      <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-gray-300 mx-auto mt-2" />
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-300">₹—</p>
                      <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-gray-300 mx-auto mt-2" />
                    </div>
                  </div>
                  <div className="h-1 rounded-full bg-gray-200" />
                </div>
              )}
            </div>

            {/* WHY CHOOSE US */}
            <div className="order-2 lg:order-1 mb-8 lg:mb-0">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Why Choose Us?</h2>
              <div className="space-y-5">
                {[
                  "Hassle-Free Machinery Selling Experience",
                  "No Commission, No Brokerage",
                  "Free On-Site Inspection",
                  "Real-Time Market Linked Pricing",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#f07020] mt-0.5" />
                    <span className="text-gray-700 text-base leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      <div className="absolute top-0 right-0 w-72 h-72 bg-[#f07020]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}

function WizardFallback() {
  return (
    <section className="min-h-screen py-14 bg-gradient-to-b from-white to-orange-50/40 flex items-center justify-center">
      <div className="flex items-center gap-3 text-gray-400">
        <Loader2 className="w-5 h-5 animate-spin text-[#f07020]" />
        <span className="text-sm">Loading valuation wizard...</span>
      </div>
    </section>
  );
}

export default function MachineryValuationWizard() {
  return (
    <Suspense fallback={<WizardFallback />}>
      <MachineryValuationWizardInner />
    </Suspense>
  );
}