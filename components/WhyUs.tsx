"use client";

import {
  BadgeDollarSign,
  ShieldCheck,
  Wallet,
  Zap,
  LineChart,
  Gauge,
  SearchCheck,
} from "lucide-react";

const features = [
  {
    icon: BadgeDollarSign,
    title: "50% Better Price",
    desc: "Get significantly higher value compared to traditional offline market dealers.",
  },
  {
    icon: ShieldCheck,
    title: "100% Transparent Valuation",
    desc: "Scientific and data-driven machinery valuation with complete transparency.",
  },
  {
    icon: Wallet,
    title: "Secure Transactions",
    desc: "End-to-end secure and hassle-free selling process for peace of mind.",
  },
  {
    icon: Zap,
    title: "Fast Payment Assurance",
    desc: "Receive quick and reliable payouts without unnecessary delays.",
  },
  {
    icon: LineChart,
    title: "Market Linked Pricing",
    desc: "Pricing aligned with live market trends for maximum profitability.",
  },
  {
    icon: Gauge,
    title: "Real-Time Price Estimate",
    desc: "Instant valuation estimates powered by market intelligence.",
  },
  {
    icon: SearchCheck,
    title: "Free On-Site Inspection",
    desc: "Professional machinery inspection at your location at zero cost.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
        

          <h2 className="text-4xl md:text-4xl font-bold text-[#1a1a1a]  mb-5">
            Why Choose Us?
          </h2>

         
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group bg-white rounded-3xl p-6 border border-orange-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f07020] to-[#ff9b5e] flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#f07020]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}