"use client";

const sections = [
  {
    title: "Trust & Confidence",
    items: [
      "Trusted by Equipment Owners Across India",
      "Built on Transparency. Backed by Trust.",
      "Sell with Confidence",
      "Where Trust Meets Fair Value",
      "India’s Trusted Platform for Used Gensets",
      "Confidence. Clarity. Commitment.",
    ],
  },
  {
    title: "Better Pricing",
    items: [
      "Get the Price You Deserve",
      "Fair Market Value. No Scrap Rates.",
      "Better Than Scrap Value",
      "Real Market Price. Real Results.",
      "Maximizing Value for Every Seller",
      "Smart Sellers Choose Better Pricing",
    ],
  },
  {
    title: "Fast Payments",
    items: [
      "Fast Offers. Faster Payments.",
      "From Estimate to Payment — Simplified",
      "Quick Closure. Secure Payment.",
      "Get Paid Without Delays",
      "48-Hour Payment Promise",
      "Speed You Can Count On",
    ],
  },
  {
    title: "Marketplace Strength",
    items: [
      "Real Sellers. Real Deals. Real Payments.",
      "Sold Faster. Paid Better.",
      "Verified Sellers. Verified Results.",
      "Transparent Deals. Guaranteed Satisfaction.",
      "Not Just Sold — Successfully Closed.",
    ],
  },
  {
    title: "Professional Standards",
    items: [
      "Structured Process. Proven Results.",
      "Professional Valuation. Secure Transactions.",
      "Delivering Value with Integrity",
      "Transparent Valuation. Trusted Outcomes.",
    ],
  },
];

export default function BrandMessagingSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-orange-50/30 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
            Why Sellers Choose Ompere
          </h2>

          <p className="text-gray-600 text-lg">
            Built around trust, transparency, better pricing, and faster payouts.
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-orange-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-[#f07020] mb-6">
                {section.title}
              </h3>

              <div className="space-y-4">
                {section.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#f07020] mt-2 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Background Blurs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#f07020]/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}