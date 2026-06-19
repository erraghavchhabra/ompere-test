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
      console.log("data",data);
      setSettings(data);
  
    };
  
    fetchSettings();
  
  }, []);
  return (
    <>
      <div className="relative overflow-hidden text-center  bg-gradient-to-br from-[#f07020] via-[#f47c2c] to-[#ff9f5a] mb-2">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

        

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-14 md:px-12 md:py-20">
          <div className="max-w-full">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
              ⚡ Fast • Transparent • Trusted
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight mb-6">
              Sell Smarter.
              <br />
              Get Paid Faster.
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl ml-auto mr-auto mb-8">
              From valuation to payment, Ompere makes selling used diesel
              generators simple, transparent, and hassle-free with expert
              support at every step.
            </p>
          </div>
        </div>
      </div>
      <section className="py-20 bg-gradient-to-b from-white to-orange-50/40 min-h-screen relative overflow-hidden">
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
