// app/sell/page.tsx

"use client";

import SellLeft from "@/components/SellComp/SellLeft";
import SellRight from "@/components/SellComp/SellRight";

export default function SellPage() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50/40 min-h-screen relative overflow-hidden">

      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#f07020]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="grid lg:grid-cols-[380px_1fr] gap-8">

          {/* LEFT SIDE */}
          <div className="lg:sticky lg:top-24">
            <SellLeft />
          </div>

          {/* RIGHT SIDE */}
          <SellRight />

        </div>
      </div>
    </section>
  );
}