"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";

const steps = [
  "Get an instant, data-backed price estimate",
  "Schedule a professional inspection",
  "Receive a transparent final offer",
  "Complete documentation smoothly",
  "Get paid securely and quickly",
];

export default function ValueSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT IMAGE */}
          <div className="relative">
            <div className="absolute -inset-4 bg-[#f07020]/10 blur-3xl rounded-full" />

            <div className="relative overflow-hidden">
              <Image
                src="/assets/img/dg-3.png"
                alt="Used Genset Valuation"
                width={700}
                height={700}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <span className="inline-block bg-[#f07020]/10 text-[#f07020] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Why Our Process Works
            </span>

            <h2 className="text-4xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
              Your Genset Deserves More Than Scrap Value
            </h2>

            <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
              <p>
                Selling used industrial equipment shouldn’t be complicated,
                uncertain, or undervalued. Yet in most cases, machinery is
                priced by weight instead of performance, negotiations lack
                clarity, and payments are delayed. We built this platform to
                change that.
              </p>

              <p>
                A genset isn’t just metal — it’s an asset that powered your
                business, supported your projects, and created value. It
                deserves professional valuation based on condition, demand, and
                real market data.
              </p>

              <p className="font-semibold text-gray-900">
                Our structured process keeps things simple:
              </p>
            </div>

            {/* Simple Checklist */}
            <div className="mt-6 space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#f07020] mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-base md:text-lg">{step}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-gray-600 text-lg leading-relaxed">
              Whether you’re upgrading, downsizing, or liquidating assets, we
              ensure your equipment finds the right value through a process
              built on transparency, compliance, and trust. Selling your used
              genset has never been this clear, structured, and rewarding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}