"use client";

import { Clock3, Sparkles } from "lucide-react";

export default function WantToBuyPage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#fffaf7] flex items-center py-20">

      {/* Massive Background Glow */}
      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-[#f07020]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Blurs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#f07020]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">

        {/* Main Card */}
        <div className="relative overflow-hidden rounded-[3rem] border border-orange-100 bg-white shadow-[0_25px_100px_rgba(240,112,32,0.18)]">

          {/* Grid Texture */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#f07020_1px,transparent_1px),linear-gradient(to_bottom,#f07020_1px,transparent_1px)] bg-[size:55px_55px]" />

          {/* Top Glow */}
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-[#f07020]/10 rounded-full blur-3xl" />

          {/* Animated Shine */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-[-120%] h-full w-[40%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] animate-[shine_6s_linear_infinite]" />
          </div>

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-16 text-center">

            {/* Floating Coming Soon Pill */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#f07020] to-[#ff985c] text-white text-sm font-semibold shadow-[0_10px_30px_rgba(240,112,32,0.35)] mb-10">
              <Sparkles className="w-4 h-4" />
              Marketplace Launching Soon
            </div>

            {/* Center Icon */}
            <div className="relative w-24 h-24 mx-auto mb-12">

              {/* Pulse Ring */}
              <div className="absolute inset-0 rounded-full bg-[#f07020]/20 animate-ping" />

              <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-[#f07020] to-[#ff9b5e] flex items-center justify-center shadow-[0_25px_60px_rgba(240,112,32,0.4)]">
                <Clock3 className="w-16 h-16 text-white" />
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl xl:text-5xl font-bold  text-[#1a1a1a]">

              Want To Buy Used Generators?

              <span className="block mt-6 bg-gradient-to-r from-[#f07020] to-[#ff985c] bg-clip-text text-transparent">
                Coming Soon
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl mx-auto mt-10 text-lg md:text-2xl text-gray-600 leading-relaxed">
              A premium destination to discover verified industrial machinery,
              generators, and equipment across India.
            </p>

            {/* Bottom Mini Badge */}
            <div className="mt-12 inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-orange-100 bg-orange-50/70 backdrop-blur-sm shadow-sm">

              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

              <span className="text-[#1a1a1a] font-medium">
                Under Development
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe */}
      <style jsx>{`
        @keyframes shine {
          100% {
            left: 140%;
          }
        }
      `}</style>
    </section>
  );
}