"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  "Get Instant Estimate",
  "Schedule Inspection",
  "Accept & Get Paid",
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-[#f07020] font-semibold text-sm tracking-widest uppercase mb-3">
            How It Works
          </span>

          <h2 className="text-4xl md:text-4xl font-bold text-[#1a1a1a]">
           Selling Your Machinery is Now
Simple, Transparent & Hassle-Free
          </h2>
        </div>

       

        {/* CTA Button */}
        <div className="text-center mt-14">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 border border-[#f07020] text-[#f07020] hover:bg-[#f07020] hover:text-white px-8 py-4 rounded-full font-medium transition-all duration-300"
          >
            See our full 6-step verification process
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#f07020]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}