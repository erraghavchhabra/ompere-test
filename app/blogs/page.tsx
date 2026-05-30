import BlogCards from "@/components/BlogCards";

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-white">
        <section className=" py-16 bg-gradient-to-t from-orange-100/30 to-white relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Small Label */}
            <p className="text-sm font-semibold tracking-widest text-[#f07020] uppercase mb-4">
              Latest Insights
            </p>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
              Our Latest Blogs
            </h1>

            {/* Divider */}
            <div className="w-16 h-[3px] bg-[#f07020] mx-auto mb-6" />

            {/* Description */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
             Insights, strategies, and expert guidance to help you make smarter machinery selling decisions.
            </p>
          </div>
        </div>
      </section>
      <BlogCards />
    </main>
  );
}