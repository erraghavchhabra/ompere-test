"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Ompere?",
    answer:
      "Ompere is India’s trusted marketplace for buying and selling used diesel gensets and industrial machinery with transparent pricing and professional evaluations.",
  },
  {
    question: "How does the selling process work?",
    answer:
      "You can submit your machinery details through our platform. Our team evaluates the equipment based on condition, performance, demand, and market value before providing a fair quotation.",
  },
  {
    question: "Do you provide on-site inspections?",
    answer:
      "Yes, Ompere offers free professional on-site inspections to assess the condition and value of your equipment accurately.",
  },
  {
    question: "How is the machinery valuation calculated?",
    answer:
      "Valuation is based on factors such as equipment condition, operational efficiency, age, demand, and current market trends — not just scrap value.",
  },
  {
    question: "How long does it take to receive payment?",
    answer:
      "Payments are processed quickly after successful verification, inspection, and completion of the required documentation.",
  },
  {
    question: "Do I need ownership documents?",
    answer:
      "Yes, valid ownership and machinery-related documents are required to ensure secure and transparent transactions.",
  },
  {
    question: "Can I buy used gensets through Ompere?",
    answer:
      "Yes, Ompere also helps buyers connect with quality verified used diesel gensets and industrial equipment.",
  },
  {
    question: "Is registration required to use Ompere?",
    answer:
      "Basic inquiries can be made without registration, but certain services may require your contact and business details.",
  },
];

export default function FAQPage() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50/40 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#f07020]/10 text-[#f07020] text-sm font-semibold mb-5">
            FAQs
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
            Frequently Asked Questions
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Find answers to common questions about selling and buying used
            diesel gensets and industrial machinery through Ompere.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = active === index;

            return (
              <div
                key={index}
                className="bg-white border border-orange-100 rounded-3xl shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActive(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left p-4 md:p-4"
                >
                  <h3 className="text-lg md:text-lg font-semibold text-[#1a1a1a] pr-5">
                    {faq.question}
                  </h3>

                  <div
                    className={`w-10 h-10 rounded-full bg-[#f07020]/10 flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="w-5 h-5 text-[#f07020]" />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 md:px-7 pb-7 text-gray-600 leading-8">
                      {faq.answer}
                    </div>
                  </div>
                </div>
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