"use client";

export default function HowHeader() {
  return (
    <div className="relative overflow-hidden text-center min-h-[340px] flex items-center justify-center">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/assets/img/buy.avif')",
    }}
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#f07020]/80 via-[#4b2d16]/80 to-[#f07020]/80" />

  {/* Decorative Blobs */}
  <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f07020]/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

  {/* Light Glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_45%)]" />

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:px-10">
    <div className="max-w-5xl mx-auto">

      {/* Badge */}
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
        How it Works
      </span>

      {/* Heading */}
      <h2 className="text-2xl md:text-5xl lg:text-5xl font-bold text-white leading-tight mb-6">
        Selling Your Machinery is Now
        <br />
        Simple, Transparent &amp; Hassle-Free
      </h2>

      {/* Divider */}
      <div className="w-20 h-1 rounded-full bg-white/80 mx-auto mb-6" />

      {/* Description */}
      <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto">
       From instant price estimate to final payment ,we manage everything professionally.
      </p>

     
    </div>
  </div>
</div>
  );
}
