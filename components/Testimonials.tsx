"use client";

import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { API } from "@/lib/api";

interface Testimonial {
  id: number;
  name: string;
  company: string;
  designation: string;
  testimonial_text: string;
  rating: number;
  image_url: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API.testimoinals)
      .then((res) => res.json())
      .then((res) => {
        if (res.status) setTestimonials(res.data);
      })
      .catch((err) => console.error("Failed to fetch testimonials:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-orange-100/30 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 text-lg">
            Join hundreds of satisfied sellers who got the best value for their gensets
          </p>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white border border-orange-100 rounded-3xl p-8 animate-pulse">
                <div className="h-10 w-10 bg-gray-200 rounded mb-4" />
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="h-4 w-4 bg-gray-200 rounded" />
                  ))}
                </div>
                <div className="space-y-2 mb-8">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="h-4 bg-gray-200 rounded w-4/6" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
            ))}
          </div>
        )}

        {/* Carousel */}
        {!loading && testimonials.length > 0 && (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              0:    { slidesPerView: 1 },
              768:  { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white border mb-3 border-orange-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition h-full">
                  {/* Quote */}
                  <Quote className="w-10 h-10 text-[#f07020]/40 mb-4" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "fill-[#f07020] text-[#f07020]"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Testimonial */}
                  <p className="text-gray-600 italic leading-relaxed mb-8">
                    "{testimonial.testimonial_text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    {testimonial.image_url && (
                     <img
  src={testimonial.image_url}
  alt={testimonial.name}
  className="w-10 h-10 rounded-full object-cover border border-orange-100"
  onError={(e) => {
    (e.target as HTMLImageElement).src =
      `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=f07020&color=fff&rounded=true&size=100`;
  }}
/>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.designation
                          ? `${testimonial.designation}, ${testimonial.company}`
                          : testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Empty state */}
        {!loading && testimonials.length === 0 && (
          <p className="text-center text-gray-400">No testimonials found.</p>
        )}
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#f07020]/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}