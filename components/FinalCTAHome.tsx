"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTAHome() {
  return (
    <section className="pt-0 pb-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#f07020] via-[#e85f10] to-[#c84d08] px-8 md:px-16 py-10 md:py-14 text-center shadow-2xl">
          
          {/* Decorative Glow */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
              Ready to Sell Your Diesel Genset?
            </h2>

            <p className="text-white/90 text-lg md:text-xl mb-10 leading-relaxed">
              Get an instant price estimate now and turn your used genset into
              cash within days
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/price-calculator"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#f07020] hover:bg-orange-50 px-8 py-4 rounded-full font-semibold transition shadow-lg"
              >
                Calculate Price Now
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/sell"
                className="inline-flex items-center justify-center border border-white/60 text-white hover:bg-white hover:text-[#f07020] px-8 py-4 rounded-full font-semibold transition"
              >
                Submit Your Genset
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}