"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { API } from "@/lib/api";

import "swiper/css";

interface Brand {
  id: number;
  name: string;
  image: string | null;
  image_url?: string;
}

export default function BrandLogo() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API.brandsLogo)
      .then((res) => res.json())
      .then((res) => {
        if (res.status) setBrands(res.data);
      })
      .catch((err) => console.error("Failed to fetch brands:", err))
      .finally(() => setLoading(false));
      console.log("brands",brands);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-[#fff7ec]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-flex px-4 py-2 rounded-full bg-orange-100 text-[#f07020] text-sm font-semibold uppercase tracking-wider">
            Trusted Brands
          </span>

          <h2 className="mt-5 text-2xl md:text-5xl font-bold text-[#1a1a1a]">
            We Deal With Leading
            <br />
            Generator Brands
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-gray-500 text-lg">
            We buy and sell diesel generators from India's most trusted
            manufacturers with transparent pricing and professional evaluation.
          </p>
        </div>

        {/* Skeleton */}
        {loading && (
          <div className="flex gap-6 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 h-20 md:h-24 w-36 bg-white border border-orange-100 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Swiper */}
        {!loading && brands.length > 0 && (
          <Swiper
            modules={[Autoplay]}
            loop={true}
            speed={3000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={25}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
          >
            {brands.map((brand) => (
              <SwiperSlide key={brand.id}>
                <div className="group h-20 md:h-24 mt-3 mb-3 bg-white border border-orange-100 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg p-4">
                  {brand.image ? (
                    <img
                      src={brand.image_url ?? brand.image}
                      alt={brand.name}
                      className="max-h-10 md:max-h-15 w-auto object-contain  transition-all duration-300  group-hover:opacity-100 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                  ) : null}
                  {/* Fallback: brand name text if no image */}
                  <span
                    className={`text-sm font-semibold text-gray-500 group-hover:text-[#f07020] transition-colors text-center ${brand.image ? "hidden" : ""}`}
                  >
                    {brand.name}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Empty */}
        {!loading && brands.length === 0 && (
          <p className="text-center text-gray-400">No brands found.</p>
        )}
      </div>

      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
    </section>
  );
}