"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-orange-50/40 flex items-center justify-center px-6 relative overflow-hidden">
      <div className="max-w-xl mx-auto text-center relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/assets/img/logo.svg"
            alt="Ompere Logo"
            width={180}
            height={50}
            priority
            className="h-auto"
          />
        </div>

        {/* 404 */}
        <h1 className="text-7xl md:text-8xl font-bold text-[#f07020] mb-4">
          404
        </h1>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          Sorry, the page you are looking for doesn’t exist or may have been
          moved.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-[#111111] text-white px-8 py-4 rounded-full font-medium hover:bg-[#f07020] transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#f07020]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}