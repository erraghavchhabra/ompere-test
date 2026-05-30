"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      q: "1. Do you charge any listing or enquiry fees?",
      a: `No. Submitting an enquiry and receiving a price estimate is completely free. There are no listing charges or upfront fees.`,
    },
    {
      q: "2. Do I have to sell after submitting an enquiry?",
      a: `No. The enquiry and price estimation process is completely obligation-free. You are free to proceed only if the final offer meets your expectations.`,
    },
    {
      q: "3. How do you determine the price?",
      a: `Our pricing is based on multiple factors, including:
•	Current market demand
•	Brand, model, and specifications
•	Age and working condition
•	Performance and utility value
•	Location and logistics considerations
We provide realistic, market-aligned price ranges — not inflated promises.`,
    },
    {
      q: "4. Is the instant price estimate final?",
      a: `No. The online estimate is indicative.
The final offer is confirmed only after physical inspection and condition verification.`,
    },
    {
      q: "5. Do you buy machinery in non-working or scrap condition?",
      a: `Yes. We evaluate equipment in working, partially working, and non-working (scrap) conditions.
Valuation varies depending on condition, age, and market demand.`,
    },
    {
      q: "6. Do you charge for inspection?",
      a: `No upfront fee is charged for standard inspections within our service cities.
If any special inspection requirements arise, they are discussed transparently in advance.`,
    },
    {
      q: "7. Which cities do you currently operate in?",
      a: `We currently operate in Indore and Bengaluru and are expanding to other cities in phases.`,
    },
    {
      q: "8. What documents are required?",
      a: `For a smooth and compliant transaction, you may need to provide:
•	Ownership proof (purchase invoice, if available)
•	Valid ID proof of owner or authorized signatory
•	GST details (if applicable)
•	Any other documents required for lawful transfer
Don’t Worry, Our team guides you through the process.`,
    },
    {
      q: "9. Is GST applicable on transactions?",
      a: `Yes. All transactions are conducted in compliance with applicable GST and tax regulations, along with proper documentation.`,
    },
    {
      q: "10. How quickly will I receive payment?",
      a: `Payments are typically processed on the same day or the next business day after:
•	Final offer acceptance
•	Document verification
•	Completion of agreed formalities
Exact timelines are communicated clearly before deal confirmation.`,
    },
    {
      q: "11. What payment methods do you use?",
      a: `Payments are made through legally compliant channels such as:
•	Bank Transfer (NEFT / RTGS / IMPS)
•	Cash payments, where applicable and strictly as per legal norms`,
    },
    {
      q: "12. Do you handle dismantling and transportation?",
      a: `Yes. Dismantling, loading, crane services, and transportation are arranged as part of the transaction.
These logistics are transparently factored into the final offer.`,
    },
    {
      q: "13. Can I reject the final offer?",
      a: `Yes. You are completely free to accept or decline the final offer. There is no pressure or obligation.`,
    },
    {
      q: "14. Why should I trust your platform?",
      a: `We are built on:
•	25+ years of industry experience
•	Structured, inspection based pricing
•	Transparent communication
•	GST-compliant and professional processes
•	No hidden charges or misleading offers
Our focus is on long-term trust — not one-time transactions.`,
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* HEADER (your provided design) */}
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
                    {item.q}
                  </span>

                  <div className="shrink-0 text-orange-600">
                    {isOpen ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* ANSWER */}
                <div
                  className={`px-5 pb-5 text-gray-700 text-[15px] md:text-base leading-relaxed whitespace-pre-line transition-all duration-300 ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
