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
      <div className="relative overflow-hidden text-center mb-2 min-h-[340px] flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/img/buy.avif')",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f07020]/75 via-[#4b2d16]/75 to-[#f07020]/75" />

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

        <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#f07020]/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

        {/* Light Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_45%)]" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:px-10 md:py-10">
          <div className="max-w-5xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-5">
              ⚡ Fast • Transparent • Trusted
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight mb-5">
              Sell Smarter.
              <br />
              Get Paid Faster.
            </h1>

            <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto">
              From valuation to payment, Ompere makes selling used diesel
              generators simple, transparent, and hassle-free with expert
              support at every step.
            </p>

            {/* CTA Button */}
            <div className="mt-8 flex justify-center">
              <a
                href="#genset-form"
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#f07020] px-8 py-3 font-semibold shadow-xl transition-all duration-300 hover:bg-[#f07020] hover:text-white hover:scale-105"
              >
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
