"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/lib/api";

// ── Google Places types ───────────────────────────────────────────────────────
declare global {
  interface Window {
    google: any;
    initGooglePlaces?: () => void;
  }
}

const heroSlides = [
  {
    image: "/assets/img/hero-banner1.png",
    badge: "India's Trusted Industrial Marketplace",
    title: "Sell Your Used DG Sets & Industrial Machinery at the Best Market Price",
    desc: "Get instant price estimates, verified offers, and GST-compliant payouts through India's most trusted machinery resale platform.",
    points: ["Best Market Rates", "Zero Brokerage", "Scientific Inspection", "Fast Pickup & Payout"],
  },
  {
    image: "/assets/img/hero-banner2.jpg",
    badge: "Verified Machinery Buyers Across India",
    title: "Upgrade or Sell Heavy Equipment Quickly With Transparent Valuation",
    desc: "Connect with serious industrial buyers, get accurate inspections, and secure the best possible resale value without delays.",
    points: ["Verified Buyers", "Pan India Reach", "Quick Inspection", "Instant Offers"],
  },
  {
    image: "/assets/img/hero-banner3.png",
    badge: "Fast, Secure & Reliable",
    title: "Turn Idle Machinery Into Instant Capital With Hassle-Free Selling",
    desc: "From generators to industrial machines, unlock working capital with seamless pickup, secure payment, and end-to-end support.",
    points: ["Secure Transactions", "Easy Documentation", "Quick Pickup", "Trusted Platform"],
  },
];

// ── Types ────────────────────────────────────────────────────────────────────
interface PriceRow {
  brand_id: number;
  brand_name: string;
  capacity_kva: string;
}

interface Option { id: string; name: string }

const years = Array.from(
  { length: new Date().getFullYear() - 1999 },
  (_, i) => `${2000 + i}`
).reverse();

export default function Hero() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  // ── Raw data ─────────────────────────────────────────────────────────────
  const [allRows, setAllRows] = useState<PriceRow[]>([]);
  const [loading, setLoading] = useState(false);

  // ── Derived dropdown options ──────────────────────────────────────────────
  const [brands, setBrands]               = useState<Option[]>([]);
  const [capacityOptions, setCapacityOptions] = useState<string[]>([]);

  // ── Selections ────────────────────────────────────────────────────────────
  const [selectedBrand, setSelectedBrand]       = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState("");
  const [selectedYear, setSelectedYear]         = useState("");

  // ── Modal fields ──────────────────────────────────────────────────────────
  const [name, setName]         = useState("");
  const [phone, setPhone]       = useState("");
  const [location, setLocation] = useState("");
  const locationInputRef        = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);

  // ── Load Google Places script once ───────────────────────────────────────
  useEffect(() => {
    if (document.getElementById("google-places-script")) return;
    const script = document.createElement("script");
    script.id  = "google-places-script";
    // Replace YOUR_API_KEY with your actual Google Maps API key
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBXSowlX1oH3LU_LthrkKFG791QjmjzEFo&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  // ── Init autocomplete when modal opens ────────────────────────────────────
  useEffect(() => {
    if (!showModal) return;

    const initAutocomplete = () => {
      if (!locationInputRef.current || !window.google?.maps?.places) return;
      if (autocompleteRef.current) return; // already initialised

      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        locationInputRef.current,
        {
          types: ["(cities)"],
          componentRestrictions: { country: "in" }, // restrict to India
          fields: ["formatted_address", "name"],
        }
      );

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current!.getPlace();
        setLocation(place.formatted_address ?? place.name ?? "");
      });
    };

    // Google may already be loaded
    if (window.google?.maps?.places) {
      initAutocomplete();
    } else {
      // Wait for script to finish loading
      const script = document.getElementById("google-places-script") as HTMLScriptElement | null;
      if (script) script.addEventListener("load", initAutocomplete);
    }

    return () => {
      // Clean up listener on unmount / close — autocomplete stays attached to input
    };
  }, [showModal]);
  useEffect(() => {
    setLoading(true);
    fetch(API.priceNewAll)
      .then((r) => r.json())
      .then((rows: PriceRow[]) => {
        setAllRows(rows);

        // Unique brands
        const seen = new Set<string>();
        const uniqueBrands: Option[] = [];
        for (const row of rows) {
          const key = String(row.brand_id);
          if (!seen.has(key)) {
            seen.add(key);
            uniqueBrands.push({ id: key, name: row.brand_name });
          }
        }
        setBrands(uniqueBrands);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // ── Brand selected → derive unique capacities ─────────────────────────────
  const handleBrandChange = (brandId: string) => {
    setSelectedBrand(brandId);
    setSelectedCapacity("");

    if (!brandId) {
      setCapacityOptions([]);
      return;
    }

    const filtered = allRows.filter((r) => String(r.brand_id) === brandId);
    const seen = new Set<string>();
    const unique: string[] = [];
    for (const row of filtered) {
      const key = String(row.capacity_kva);
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(key);
      }
    }
    unique.sort((a, b) => Number(a) - Number(b));
    setCapacityOptions(unique);
  };

  const handleCalculateClick = () => setShowModal(true);

  const handleProceed = () => {
    const params = new URLSearchParams();
    params.set("machine_type_id", "1");
    if (selectedBrand)    params.set("brand_id",     selectedBrand);
    if (selectedCapacity) params.set("capacity_kva", selectedCapacity);
    if (selectedYear)     params.set("year",          selectedYear);
    if (name)             params.set("name",           name);
    if (phone)            params.set("phone",          phone);
    if (location)         params.set("location",       location);
    router.push(`/machinery-valuation?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div key={index} className="slide">
              <Image
                src={slide.image}
                alt={`Industrial Machinery ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-black/60 z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* CALCULATOR CARD */}
          <div className="lg:w-[30%] w-full flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-2xl p-6 border border-white/20 backdrop-blur-sm">

              <h3 className="font-heading text-2xl font-bold text-[#1a1a1a] mb-2">
                Price Calculator
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Get an instant estimated market value for your machinery.
              </p>

              <div className="space-y-4">

                {/* BRAND */}
                <select
                  value={selectedBrand}
                  onChange={(e) => handleBrandChange(e.target.value)}
                  disabled={loading}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#f07020] outline-none bg-white disabled:opacity-50"
                >
                  <option value="">
                    {loading ? "Loading…" : "Select Brand"}
                  </option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>

                {/* CAPACITY */}
                <select
                  value={selectedCapacity}
                  onChange={(e) => setSelectedCapacity(e.target.value)}
                  disabled={!selectedBrand}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#f07020] outline-none bg-white disabled:opacity-50"
                >
                  <option value="">Select Capacity (KVA)</option>
                  {capacityOptions.map((kva) => (
                    <option key={kva} value={kva}>{kva} KVA</option>
                  ))}
                </select>

                {/* YEAR */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  disabled={!selectedCapacity}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#f07020] outline-none bg-white disabled:opacity-50"
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

                {/* BUTTON */}
                <button
                  onClick={handleCalculateClick}
                  disabled={!selectedBrand || !selectedCapacity || !selectedYear}
                  className="w-full bg-[#f07020] text-white py-3 rounded-xl font-medium hover:bg-[#d85f14] transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Calculate Price
                </button>

              </div>

              <Link
                href="/how-it-works"
                className="block mt-4 text-center text-sm text-[#f07020] font-medium hover:underline"
              >
                Learn How It Works →
              </Link>

            </div>
          </div>

          {/* HERO CONTENT */}
          <div className="lg:w-[70%] w-full relative min-h-[420px]">
            <div className="content-slider">
              {heroSlides.map((slide, index) => (
                <div key={index} className="content-slide">

                  <span className="inline-block bg-[#f07020] text-white text-sm px-4 py-2 rounded-full mb-5">
                    {slide.badge}
                  </span>

                  <h1 className="font-heading text-4xl md:text-5xl text-white font-bold leading-tight max-w-3xl mb-6">
                    {slide.title}
                  </h1>

                  <p className="text-lg text-gray-200 max-w-2xl leading-relaxed mb-8">
                    {slide.desc}
                  </p>

                  <div className="grid sm:grid-cols-2 text-white gap-4 mb-8 text-sm max-w-2xl">
                    {slide.points.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#f07020]" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/sell"
                      className="bg-[#f07020] hover:bg-[#d85f14] text-white px-5 py-3 rounded-full font-medium transition"
                    >
                      Get Instant Quote
                    </Link>
                    <Link
                      href="/how-it-works"
                      className="border text-white border-white hover:bg-white hover:text-black px-5 py-3 rounded-full font-medium transition"
                    >
                      Learn More
                    </Link>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 relative shadow-2xl">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>

            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">
              Complete Your Request
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Enter your details to proceed with your instant price estimate.
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#f07020] outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 10) setPhone(value);
                }}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#f07020] outline-none"
              />
              <div className="relative">
                <input
                  ref={locationInputRef}
                  type="text"
                  placeholder="Your Location (City / State)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#f07020] outline-none"
                  autoComplete="off"
                />
              </div>
              <button
                onClick={handleProceed}
                className="w-full bg-[#f07020] text-white py-3 rounded-xl font-medium hover:bg-[#d85f14] transition"
              >
                Proceed
              </button>
            </div>

          </div>
        </div>
      )}

      <style jsx>{`
        .hero-slider, .content-slider { position: relative; width: 100%; height: 100%; }
        .slide, .content-slide { position: absolute; inset: 0; opacity: 0; animation: fadeSlider 12s infinite; }
        .slide:nth-child(1), .content-slide:nth-child(1) { animation-delay: 0s; }
        .slide:nth-child(2), .content-slide:nth-child(2) { animation-delay: 4s; }
        .slide:nth-child(3), .content-slide:nth-child(3) { animation-delay: 8s; }
        @keyframes fadeSlider {
          0%   { opacity: 0; transform: translateY(20px); }
          8%   { opacity: 1; transform: translateY(0); }
          30%  { opacity: 1; transform: translateY(0); }
          38%  { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        /* Google Places dropdown styling */
        .pac-container {
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          font-family: inherit;
          font-size: 14px;
          margin-top: 4px;
          overflow: hidden;
        }
        .pac-item {
          padding: 10px 14px;
          cursor: pointer;
          border-top: 1px solid #f3f4f6;
        }
        .pac-item:hover, .pac-item-selected {
          background: #fff5ef;
        }
        .pac-item-query { color: #1a1a1a; font-weight: 500; }
        .pac-matched { color: #f07020; }
        .pac-icon { display: none; }
      `}</style>
    </section>
  );
}