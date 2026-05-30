"use client";

const comparisonData = [
  {
    feature: "Pricing Logic",
    scrap: "Based on Weight (Scrap Rate)",
    digital: "Based on Utility & Market Demand",
  },
  {
    feature: "Payment",
    scrap: "Mostly cash, no record",
    digital: "Bank Transfer / GST Compliant",
  },
  {
    feature: "Logistics",
    scrap: "Seller arranges",
    digital: "We handle everything",
  },
  {
    feature: "Transparency",
    scrap: "Hidden deductions",
    digital: "Detailed inspection report",
  },
  {
    feature: "Legal Safety",
    scrap: "No agreement",
    digital: "Sale contract & indemnity",
  },
  {
    feature: "Value",
    scrap: "Heavily underpriced",
    digital: "Fairly priced",
  },
  {
    feature: "Direct deal",
    scrap: "Many Intermediaries",
    digital: "Direct Buy and sale",
  },
];

export default function ComparisonSection() {
  return (
    <section className="py-20 bg-gradient-to-t from-orange-100/30 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-4xl font-bold text-[#1a1a1a] leading-tight">
            Why Sell to a Digital Platform Instead of a Scrap Dealer?
          </h2>
        </div>

        {/* Table Card */}
        <div className="overflow-x-auto rounded-3xl border border-orange-100 shadow-2xl bg-white">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-[#f07020] to-[#ff9b5e] text-white">
                <th className="text-left px-4 py-4 text-lg font-semibold">
                  Feature
                </th>
                <th className="text-left px-4 py-4 text-lg font-semibold">
                  Local Scrap Dealer
                </th>
                <th className="text-left px-4 py-4 text-lg font-semibold">
                  Our Digital Platform
                </th>
              </tr>
            </thead>

            <tbody>
              {comparisonData.map((row, index) => (
                <tr
                  key={index}
                  className="border-t border-orange-100 hover:bg-orange-50/50 transition"
                >
                  <td className="px-4 py-4 font-semibold text-gray-900">
                    {row.feature}
                  </td>

                  <td className="px-4 py-4 text-gray-600">
                    {row.scrap}
                  </td>

                  <td className="px-4 py-4 text-[#f07020] font-medium">
                    {row.digital}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-10 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#f07020]/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}