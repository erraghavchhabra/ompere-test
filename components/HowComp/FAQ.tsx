"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs?: FaqItem[];
}

export default function FAQ({ faqs = [] }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">FAQ</h2>
          <div className="mt-4 mx-auto w-32 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
          <p className="text-gray-500 mt-6 text-lg md:text-xl">
            Frequently Asked Questions
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden"
              >
                {/* QUESTION */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full cursor-pointer flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-gray-900 font-medium text-[15px] md:text-base">
                    {item.question}
                  </span>
                  <div className="shrink-0 text-orange-600">
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>

                {/* ANSWER */}
                {isOpen && (
                  <div className="px-5 pb-5 text-gray-700 text-[15px] md:text-base leading-relaxed whitespace-pre-line">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}