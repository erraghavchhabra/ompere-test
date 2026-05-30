"use client";

import { Zap, TrendingUp, ShieldCheck, Headphones } from "lucide-react";

export default function WhyProcess() {
  const values = [
    {
      title: "Save Time/Faster Closure",
      icon: Zap,
      desc: `Our structured approach helps you move from price estimate to payment in days — not weeks.
Clear steps. Fast inspection scheduling. Streamlined documentation.
No endless follow-ups or unnecessary delays.`,
    },
    {
      title: "Better Price Discovery/ Market-Aligned Pricing",
      icon: TrendingUp,
      desc: `We don’t rely on guesswork or scrap rates.
Our valuation considers market demand, condition, performance, and real utility — helping you unlock fair and competitive offers backed by technical evaluation.`,
    },
    {
      title: "Safe & Secure/ Secure & Compliant Transactions",
      icon: ShieldCheck,
      desc: `Every transaction is professionally documented and compliance.
Secure payment methods.
Clear paperwork.
No hidden deductions.`,
    },
    {
      title: "Dedicated Support",
      icon: Headphones,
      desc: `From first enquiry to final payment, our team supports you with clear communication and proactive coordination ensuring a smooth experience.`,
    },
  ];

  return (
    <section className="w-full  bg-gradient-to-t from-orange-100/30 to-orange-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Our Process Works Better
          </h2>

          <div className="mt-4 mx-auto w-32 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>

          <p className="text-gray-500 mt-6 text-lg md:text-xl">
           Designed for clarity, speed, and fair value .
          </p>
        </div>
        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6">
          {values.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition space-y-4"
              >
                {/* ICON + TITLE */}
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-orange-50 border border-orange-100">
                    <Icon className="w-5 h-5 text-orange-600" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
