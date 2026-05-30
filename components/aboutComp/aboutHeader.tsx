"use client";

export default function AboutHeader() {
  return (
    <section className=" py-16 bg-gradient-to-t from-orange-100/30 to-white relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Small Label */}
          <p className="text-sm font-semibold tracking-widest text-[#f07020] uppercase mb-4">
            About Us
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
            India’s Trusted Diesel Genset
            <br className="hidden sm:block" />
            Marketplace
          </h1>

          {/* Divider */}
          <div className="w-16 h-[3px] bg-[#f07020] mx-auto mb-6" />

          {/* Description */}
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            We're revolutionizing the used diesel generator market by making it
            simple, transparent, and profitable for sellers to get the best
            value for their equipment.
          </p>
        </div>
      </div>
    </section>
  );
}
