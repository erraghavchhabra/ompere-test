"use client";

import { Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";



const testimonials = [
  {
    text: `"Sold my 250 KVA Cummins genset within 3 days. The process was smooth and price was fair."`,
    name: "Rajesh Kumar",
    company: "Kumar Industries",
  },
  {
    text: `"Professional service and transparent dealings. Got better price than local dealers offered."`,
    name: "Amit Sharma",
    company: "Sharma Manufacturing",
  },
  {
    text: `"Quick inspection and faster payment. Highly recommended for selling used gensets."`,
    name: "Priya Patel",
    company: "Patel Textiles",
  },
  {
    text: `"Excellent experience from valuation to pickup. Everything was handled professionally."`,
    name: "Rohit Mehta",
    company: "Mehta Infra",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-orange-100/30 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
            What Our Clients Say
          </h2>

          <p className="text-gray-600 text-lg">
            Join hundreds of satisfied sellers who got the best value for their
            gensets
          </p>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white border mb-3 border-orange-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition h-full">
                {/* Quote */}
                <Quote className="w-10 h-10 text-[#f07020]/40 mb-4" />

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#f07020] text-[#f07020]"
                    />
                  ))}
                </div>

                {/* Testimonial */}
                <p className="text-gray-600 italic leading-relaxed mb-8">
                  {testimonial.text}
                </p>

                {/* Author */}
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#f07020]/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}