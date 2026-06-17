"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ChevronDown, Upload, X, Loader2 } from "lucide-react";
import { API } from "@/lib/api";
import { getSettings } from "@/lib/getSettings";

interface Brand         { id: number | string; name: string }
interface Capacity      { kva: number | string }
interface HourOption    { id: number | string; name: string; factor: number }
interface YearOption    { id: number | string; name: string; factor: number }
interface EngineOption  { id: number | string; name: string; factor: number }

interface PriceResult {
  status: boolean;
  price_new?: number | string | null;
  day2_price?: number | string | null;
  year?: number | string | null;
  year_factor?: number | string | null;
  hours_factor?: number | string | null;
  engine_factor?: number | string | null;
  estimated_price?: number | string | null;
  hours_band_index?: number | null;
  message?: string;
}

interface FactorRow {
  label: string;
  maxVal: number;
  minVal: number;
  selected: boolean;
  color: string;
}

// ─── Generic fetch hook ───────────────────────────────────────────────────────
function useFetchOptions<T>(url: string) {
  const [data, setData]       = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(url)
      .then((r) => r.json())
      .then((d: T[]) => { if (!cancelled) setData(d); })
      .catch(console.error)
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading };
}

// ─── Safe number coercion ─────────────────────────────────────────────────────
function toNum(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  const n = typeof value === "string" ? parseFloat(value) : Number(value);
  return isNaN(n) ? null : n;
}

// ─── Inner component ──────────────────────────────────────────────────────────
function MachineryValuationWizardInner() {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSettings();
      console.log("data", data);
      setSettings(data);
    };
    fetchSettings();
  }, []);

  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [uploadedImages,   setUploadedImages]   = useState<File[]>([]);
  const [uploadedPreviews, setUploadedPreviews] = useState<string[]>([]);

  const MACHINE_TYPE_ID = "1";

  const valuationId = searchParams.get("id") ?? "";

  const nameFromUrl  = searchParams.get("name")  ?? "";
  const phoneFromUrl = searchParams.get("phone") ?? "";
  const locationFromUrl = searchParams.get("location") ?? "";

  const [selectedBrand,          setSelectedBrand]          = useState(searchParams.get("brand_id")     ?? "");
  const [selectedCapacity,       setSelectedCapacity]       = useState(searchParams.get("capacity_kva") ?? "");
  const [selectedYear,           setSelectedYear]           = useState(searchParams.get("year")         ?? "");
  const [selectedHours,          setSelectedHours]          = useState("");
  const [selectedEngineCondition,setSelectedEngineCondition]= useState("");

  const [brands,          setBrands]          = useState<Brand[]>([]);
  const [capacityOptions, setCapacityOptions] = useState<Capacity[]>([]);
  const [loadingBrands,   setLoadingBrands]   = useState(true);
  const [loadingCapacity, setLoadingCapacity] = useState(false);

  // Dynamic option lists
  const { data: hourOptions,   loading: loadingHours   } = useFetchOptions<HourOption>(API.hours);
  const { data: yearOptions,   loading: loadingYears   } = useFetchOptions<YearOption>(API.years);
  const { data: engineOptions, loading: loadingEngines } = useFetchOptions<EngineOption>(API.engineConditions);

  const [calculating,   setCalculating]   = useState(false);
  const [priceResult,   setPriceResult]   = useState<PriceResult | null>(null);
  const [calcError,     setCalcError]     = useState<string | null>(null);
  const [submitting,    setSubmitting]    = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError,   setSubmitError]   = useState<string | null>(null);

  // ── Margin helpers (fall back to hardcoded defaults if settings not loaded) ─
  const getMarginHigh = (): number => toNum(settings.margin_high) ?? 0.85;
  const getMarginLow  = (): number => toNum(settings.margin_low)  ?? 0.80;

  // ── Helpers to look up factor from selected value ─────────────────────────
  const getHourFactor = (): number | null => {
    if (!selectedHours) return null;
    const found = hourOptions.find((h) => String(h.id) === String(selectedHours));
    return found != null ? toNum(found.factor) : null;
  };

  const getYearFactor = (): number | null => {
    if (!selectedYear) return null;
    const found = yearOptions.find((y) => String(y.name) === String(selectedYear));
    return found != null ? toNum(found.factor) : null;
  };

  const getEngineFactor = (): number | null => {
    if (!selectedEngineCondition) return null;
    const found = engineOptions.find((e) => String(e.id) === String(selectedEngineCondition));
    return found != null ? toNum(found.factor) : null;
  };

  const getHoursLabel  = (val: string) =>
    hourOptions.find((h) => String(h.id) === val)?.name ?? val;

  const getEngineLabel = (val: string) =>
    engineOptions.find((e) => String(e.id) === val)?.name ?? val;

  // ── Fetch brands ──────────────────────────────────────────────────────────
  useEffect(() => {
    setLoadingBrands(true);
    fetch(API.brands)
      .then((r) => r.json())
      .then(setBrands)
      .catch(console.error)
      .finally(() => setLoadingBrands(false));
  }, []);

  useEffect(() => {
    const brandId = searchParams.get("brand_id");
    if (!brandId || loadingBrands) return;
    fetchCapacities(brandId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingBrands]);

  useEffect(() => {
    const brandId     = searchParams.get("brand_id");
    const capacityKva = searchParams.get("capacity_kva");
    const year        = searchParams.get("year");
    if (!loadingBrands && brandId && capacityKva) {
      autoCalculate(brandId, capacityKva, year ?? undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingBrands]);

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

  const handleBrandChange = (brandId: string) => {
    setSelectedBrand(brandId);
    setSelectedCapacity("");
    setCapacityOptions([]);
    if (brandId) fetchCapacities(brandId);
  };

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

  const formatCurrency = (value: number | string | null | undefined) => {
    const num = toNum(value);
    if (num === null) return "₹0";
    return `₹${num.toLocaleString("en-IN")}`;
  };

  const formatFactor = (value: number | string | null | undefined) => {
    const num = toNum(value);
    if (num === null) return "—";
    return `×${num.toFixed(2)}`;
  };

  // ── Step 1 Next ───────────────────────────────────────────────────────────
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
      if (!data.status) setCalcError(data.message || "Price not found for selected options.");
    } catch (err) {
      console.error(err);
      setCalcError("Failed to fetch price. Please try again.");
    } finally {
      setCalculating(false);
    }
    setStep(2);
  };

  // ── Live price update on selector change ──────────────────────────────────
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
  }, [selectedBrand, selectedCapacity, selectedYear, selectedHours, selectedEngineCondition]);

  const prevStep = () => step > 1 && setStep(step - 1);

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

 const handleSubmit = async () => {
  setSubmitError(null);
  setSubmitting(true);
  try {
    const fd = new FormData();
    // No name/phone/location — already saved in Hero step
    if (selectedYear)            fd.append("make_year",        selectedYear);

    
 if (selectedHours) {
      const hoursLabel = hourOptions.find((h) => String(h.id) === String(selectedHours))?.name ?? selectedHours;
      fd.append("running_hours",    hoursLabel);        // "2000 to 3000" — for display
      fd.append("running_hours_id", selectedHours);     // "3" — for DB factor lookup
    }
    if (selectedEngineCondition) {
      const engineLabel = engineOptions.find((e) => String(e.id) === String(selectedEngineCondition))?.name ?? selectedEngineCondition;
      fd.append("engine_condition",    engineLabel);         // "Good" — for display
      fd.append("engine_condition_id", selectedEngineCondition); // "2" — for DB factor lookup
    }
    if (priceResult?.price_new)       fd.append("price_new",       String(priceResult.price_new));
    if (priceResult?.day2_price)      fd.append("day2_price",      String(priceResult.day2_price));
    if (priceResult?.estimated_price) fd.append("estimated_price", String(priceResult.estimated_price));
    if (priceResult?.year_factor)     fd.append("year_factor",     String(priceResult.year_factor));
    if (priceResult?.hours_factor)    fd.append("hours_factor",    String(priceResult.hours_factor));
    if (priceResult?.engine_factor)   fd.append("engine_factor",   String(priceResult.engine_factor));
    fd.append("margin_high", String(getMarginHigh()));
    fd.append("margin_low",  String(getMarginLow()));
    uploadedImages.forEach((f) => fd.append("images[]", f));

    // ← UPDATE not create
   const res = await fetch(`${API.valuationUpdate}/${valuationId}/update`, {
  method: "POST",
  body: fd,
});
    const data = await res.json();
    if (data.status) setSubmitSuccess(true);
    else setSubmitError(data.message || "Update failed. Please try again.");
  } catch (err) {
    console.error(err);
    setSubmitError("Something went wrong. Please try again.");
  } finally {
    setSubmitting(false);
  }
};

  // ── Compute price range using dynamic factors + settings margins ──────────
  const computePriceRange = (): { high: number; low: number } | null => {
    if (!priceResult?.estimated_price) return null;
    const baseDay2Price = toNum(priceResult.day2_price);
    if (baseDay2Price === null || baseDay2Price <= 0) return null;

    const marginHigh = getMarginHigh();
    const marginLow  = getMarginLow();

    const yearFactor   = getYearFactor()   ?? toNum(priceResult.year_factor);
    const hourFactor   = getHourFactor()   ?? toNum(priceResult.hours_factor);
    const engineFactor = getEngineFactor() ?? null;

    const yearSelected   = !!selectedYear;
    const hoursSelected  = !!selectedHours;
    const engineSelected = !!selectedEngineCondition;

    const rd = (v: number) => Math.floor(v / 1000) * 1000;

    const yearFactorMax   = yearSelected   && yearFactor   != null ? yearFactor   : 1.0;
    const yearFactorMin   = yearSelected   && yearFactor   != null ? yearFactor   : 0.58;
    const hoursFactorMax  = hoursSelected  && hourFactor   != null ? hourFactor   : 1.0;
    const hoursFactorMin  = hoursSelected  && hourFactor   != null ? hourFactor   : 0.87;
    const engineFactors   = engineOptions.map((e) => toNum(e.factor)).filter((f): f is number => f !== null);
    const engineFactorMax = engineSelected && engineFactor != null ? engineFactor : (engineFactors.length ? Math.max(...engineFactors) : 1.0);
   const engineFactorMin =
    engineSelected && engineFactor != null
        ? engineFactor
        : 0.95;

    const high = rd(baseDay2Price * marginHigh * yearFactorMax * hoursFactorMax * engineFactorMax);
    const low  = rd(baseDay2Price * marginLow  * yearFactorMin * hoursFactorMin * engineFactorMin);

    return { high, low };
  };

  // ── Build factor rows using dynamic factors + settings margins ────────────
  const buildFactorRows = (): FactorRow[] => {
    if (!priceResult?.estimated_price) return [];

    const day2Price = toNum(priceResult.day2_price);

    const yearFactor   = getYearFactor()   ?? toNum(priceResult.year_factor)  ?? 1;
    const hourFactor   = getHourFactor()   ?? toNum(priceResult.hours_factor) ?? 1;
    const engineFactor = getEngineFactor() ?? 1;

    const yearSelected   = !!selectedYear;
    const hoursSelected  = !!selectedHours;
    const engineSelected = !!selectedEngineCondition;

    const rows: FactorRow[] = [];

    if (day2Price !== null && !isNaN(day2Price)) {
      rows.push({
        label:    "Day-2 Base Price",
        maxVal:   day2Price,
        minVal:   day2Price,
        selected: true,
        color:    "text-gray-800",
      });
    }

    rows.push(
      {
        label:    "Platform margin (HIGH / LOW)",
        maxVal:   getMarginHigh(),
        minVal:   getMarginLow(),
        selected: true,
        color:    "text-red-600",
      },
      {
        label:    yearSelected
          ? `Year factor (${selectedYear})`
          : "Year factor (not selected)",
        maxVal:   yearSelected ? yearFactor : 1.0,
        minVal:   yearSelected ? yearFactor : 0.58,
        selected: yearSelected,
        color:    "text-teal-700",
      },
      {
        label:    hoursSelected
          ? `Hours factor (${getHoursLabel(selectedHours)})`
          : "Hours factor (not selected)",
        maxVal:   hoursSelected ? hourFactor : 1.0,
        minVal:   hoursSelected ? hourFactor : 0.87,
        selected: hoursSelected,
        color:    "text-purple-700",
      },
      {
        label:    engineSelected
          ? `Engine factor (${getEngineLabel(selectedEngineCondition)})`
          : "Engine factor (not selected)",
        maxVal:   engineSelected ? engineFactor : (engineOptions.length ? Math.max(...engineOptions.map((e) => toNum(e.factor) ?? 0)) : 1.05),
        minVal: engineSelected
    ? engineFactor
    : 0.95,
        selected: engineSelected,
        color:    "text-blue-700",
      }
    );

    return rows;
  };
  const isOptionalEmpty = (val: string) => !val && !!selectedCapacity;


  const SelectSkeleton = () => (
    <div className="w-full h-12 rounded-xl bg-gray-100 animate-pulse" />
  );

  const isDay2Row = (row: FactorRow) => row.label === "Day-2 Base Price";

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

  const priceRange   = computePriceRange();
  const factorRows   = buildFactorRows();
  const hasAnyFactor = factorRows.length > 0;

  return (
    <section className="min-h-screen py-14 bg-gradient-to-b from-white to-orange-50/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

          {/* LEFT FORM */}
          <div className="flex flex-col">
            {/* Stepper */}
            <div className="flex items-center flex-wrap gap-4 mb-6">
              {["Machine Details", "Images"].map((label, index) => {
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
                    {current < 2 && <div className="w-10 h-[2px] bg-orange-200 mx-4" />}
                  </div>
                );
              })}
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-3xl p-8 border border-orange-100 shadow-sm flex-1">

              {/* ── STEP 1 ── */}
              {step === 1 && (
                <>
                  <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Machine Details & Condition</h2>
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

                    {/* YEAR — dynamic */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Year of Purchase
                      </label>
                      {loadingYears ? <SelectSkeleton /> : (
                        <div className="relative">
                          <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            disabled={!selectedCapacity}
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white disabled:opacity-50"
                          >
                            <option value="">Select Year</option>
                            {yearOptions.map((y) => (
                              <option key={y.id} value={y.name}>{y.name}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                      )}
                    </div>

                    {/* RUNNING HOURS — dynamic */}
                 <div>
  <label className="block text-sm font-semibold text-gray-800 mb-2">
    Running Hours
    {isOptionalEmpty(selectedHours) && (
      <span className="ml-2 text-[10px] font-semibold text-[#f07020] bg-orange-50 px-2 py-0.5 rounded-full animate-pulse">
        Fills in better estimate
      </span>
    )}
  </label>
  {loadingHours ? <SelectSkeleton /> : (
    <div className="relative">
      {isOptionalEmpty(selectedHours) && (
        <ChevronDown
          className="bounce-arrow absolute -top-5 right-6 w-4 h-4 text-[#f07020]"
        />
      )}
      <select
        value={selectedHours}
        onChange={(e) => setSelectedHours(e.target.value)}
        disabled={!selectedCapacity}
        className={`w-full h-12 px-4 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white disabled:opacity-50 transition-all duration-300 ${
          isOptionalEmpty(selectedHours) ? "optional-glow" : "border-gray-200"
        }`}
      >
        <option value="">Select Running Hours</option>
        {hourOptions.map((h) => (
          <option key={h.id} value={h.id}>{h.name}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  )}
</div>

                   {/* ENGINE CONDITION — dynamic */}
<div>
  <label className="block text-sm font-semibold text-gray-800 mb-2">
    Engine Condition
    {isOptionalEmpty(selectedEngineCondition) && (
      <span className="ml-2 text-[10px] font-semibold text-[#f07020] bg-orange-50 px-2 py-0.5 rounded-full animate-pulse">
        Fills in better estimate
      </span>
    )}
  </label>
  {loadingEngines ? <SelectSkeleton /> : (
    <div className="relative">
      {isOptionalEmpty(selectedEngineCondition) && (
        <ChevronDown
          className="bounce-arrow absolute -top-5 right-6 w-4 h-4 text-[#f07020]"
        />
      )}
      <select
        value={selectedEngineCondition}
        onChange={(e) => setSelectedEngineCondition(e.target.value)}
        disabled={!selectedCapacity}
        className={`w-full h-12 px-4 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white disabled:opacity-50 transition-all duration-300 ${
          isOptionalEmpty(selectedEngineCondition) ? "optional-glow" : "border-gray-200"
        }`}
      >
        <option value="">Select Engine Condition</option>
        {engineOptions.map((e) => (
          <option key={e.id} value={e.id}>{e.name}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  )}
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

              {/* ── STEP 2: Images ── */}
              {step === 2 && (
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
          <div className="bg-white rounded-3xl p-8 border border-orange-100 shadow-sm h-full flex flex-col gap-6">

            {/* PRICE RANGE CARD */}
            <div className="bg-gradient-to-b from-white to-orange-50/40 rounded-3xl p-8 border border-orange-100">
              <h3 className="text-3xl font-bold text-[#1a1a1a] mb-8">Evaluation Range</h3>

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
                 <div className="h-1 rounded-full bg-gradient-to-l from-green-600 via-yellow-400 to-red-600" />
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

            {/* FACTOR BREAKDOWN */}
            {hasAnyFactor && (
              <div className="rounded-2xl border border-orange-100 overflow-hidden">
                <div className="bg-orange-50/60 px-5 py-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-800">Price Factor Breakdown</span>
                  {calculating && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#f07020]" />}
                </div>

                <div className="grid grid-cols-[1fr_80px_80px] text-xs font-semibold text-gray-400 uppercase tracking-wide px-5 py-2 bg-white border-b border-orange-50">
                  <span>Factor</span>
                  <span className="text-right text-green-700">HIGH</span>
                  <span className="text-right text-red-600">LOW</span>
                </div>

                <div className="divide-y divide-orange-50 bg-white">
                  {factorRows.map((row) =>
                    isDay2Row(row) ? (
                      <div key={row.label} className="flex items-center justify-between px-5 py-3 bg-orange-50/40">
                        <span className="text-sm text-gray-700">{row.label}</span>
                        <span className="text-sm font-semibold tabular-nums text-gray-800">
                          {formatCurrency(row.maxVal)}
                        </span>
                      </div>
                    ) : (
                      <div key={row.label} className="grid grid-cols-[1fr_80px_80px] items-center px-5 py-3 gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-sm text-gray-700 truncate">{row.label}</span>
                          <span className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                            row.selected ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                          }`}>
                            {row.selected ? "Selected" : "Estimated"}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm font-semibold tabular-nums ${row.maxVal >= 1 ? "text-green-700" : "text-red-500"}`}>
                            {formatFactor(row.maxVal)}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm font-semibold tabular-nums ${row.minVal >= 1 ? "text-green-700" : "text-red-500"}`}>
                            {formatFactor(row.minVal)}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* WHY CHOOSE US */}
            <div>
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

    
      <style jsx>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(240, 112, 32, 0.4); }
          50%       { box-shadow: 0 0 0 6px rgba(240, 112, 32, 0.0); }
        }
        @keyframes bounceArrow {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(4px); }
        }
        .optional-glow {
          animation: pulseGlow 2s ease-in-out infinite;
          border-color: #f07020 !important;
        }
        .bounce-arrow {
          animation: bounceArrow 0.8s ease-in-out infinite;
        }
      `}</style>

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