// app/sell/page.tsx

"use client";

import SellLeft from "@/components/SellComp/SellLeft";
import SellRight from "@/components/SellComp/SellRight";
import { getSettings } from "@/lib/getSettings";
import { useEffect, useState } from "react";

export default function SellPage() {
  const [settings, setSettings] = useState<any>({});
  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSettings();
      console.log("data", data);
      setSettings(data);
    };

    fetchSettings();
  }, []);
  return (
    <>
      <div className="relative overflow-hidden mb-2">
  {/* Background */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/assets/img/buy.avif')",
    }}
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#f07020]/80 via-[#4b2d16]/80 to-[#f07020]/80" />

  {/* Decorative */}
  <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
  <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#f07020]/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_45%)]" />

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">

    <div className="grid lg:grid-cols-2 gap-14 items-center">

      {/* LEFT */}
      <div className="text-center lg:text-left">

        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 text-white text-sm font-medium">
          ⚡ Fast • Transparent • Trusted
        </span>

        <h1 className="mt-6 text-3xl md:text-4xl xl:text-5xl font-bold leading-tight text-white">
          Sell Smarter.
          <br />
          Get Paid Faster.
        </h1>

        <p className="mt-6 text-lg text-white/90 max-w-xl mx-auto lg:mx-0 leading-relaxed">
          From valuation to payment, Ompere makes selling used diesel
          generators simple, transparent and hassle-free with expert support
          throughout the entire selling process.
        </p>

        <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">

          <a
            href="#genset-form"
            className="rounded-full bg-white px-8 py-3 font-semibold text-[#f07020] shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#f07020] hover:text-white"
          >
            Get Started
          </a>

        </div>

      </div>

     {/* RIGHT CARD */}
<div className="relative flex justify-center">

  {/* Ambient Glow */}
  <div className="absolute -inset-10 rounded-full bg-[#f07020]/20 blur-[80px]" />

  {/* Card */}
  <div className="group relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl p-8 shadow-[0_30px_80px_rgba(0,0,0,.35)] animate-[float_5s_ease-in-out_infinite]">

    {/* Shimmer */}
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      <div className="absolute -left-1/2 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
    </div>

    {/* Badge */}
    <div className="flex justify-center">

      <span className="rounded-full bg-[#f07020] px-4 py-2 text-sm font-medium text-white">
        ⚡ Instant Estimate
      </span>

    </div>

    {/* Heading */}
    <h3 className="mt-6 text-center text-3xl font-bold text-white">
      Price Calculator
    </h3>

    {/* Description */}
    <p className="mt-3 text-center leading-relaxed text-white/80">
      Know your generator's estimated market value in
      <span className="font-semibold text-white"> under 30 seconds.</span>
    </p>

    {/* CTA */}
    <a
      href="/price-calculator"
      className="group/button relative mt-8 flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white py-4 font-semibold text-[#f07020] transition-all duration-300 hover:scale-105 hover:bg-[#f07020] hover:text-white"
    >

      {/* Button Shine */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover/button:translate-x-full transition-transform duration-700" />

      <span className="relative">
        Calculate My Price
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-5 w-5 transition-transform duration-300 group-hover/button:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5l7 7-7 7"
        />
      </svg>

    </a>

    <p className="mt-5 text-center text-sm text-white/70">
      Free • Instant • No Hidden Charges
    </p>

  </div>

</div>

    </div>

  </div>
</div>
      <section id="genset-form" className="py-20 bg-gradient-to-b from-white to-orange-50/40 min-h-screen relative overflow-hidden">
        {/* Decorative Blur */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#f07020]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-[380px_1fr] gap-8">
            {/* LEFT SIDE */}
            <div className="lg:sticky lg:top-24">
              <SellLeft settings={settings} />
            </div>

            {/* RIGHT SIDE */}
            <SellRight />
          </div>
        </div>
      </section>
    </>
  );
}
