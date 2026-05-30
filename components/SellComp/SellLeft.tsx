"use client";

import {
  CheckCircle2,
  Clock3,
  TrendingUp,
  Shield,
  Info,
} from "lucide-react";

export default function SellLeft() {
  const steps = [
    "Our team reviews your submission",
    "We contact you within 4 hours",
    "Schedule free inspection",
    "Receive final offer",
    "Get paid within 48 hours",
  ];

  return (
    <div className="space-y-6">

      {/* What Happens Next */}
      <div className="bg-white rounded-3xl border border-orange-100 shadow-sm p-8">
        <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8">
          What Happens Next?
        </h2>

        <div className="space-y-5">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="rounded-full  flex items-center justify-center mt-1">
                <CheckCircle2 className="w-4.5 h-4.5 text-green-500" />
              </div>

              <div className="flex gap-2 text-gray-700 leading-relaxed">
                <span className="font-semibold">{index + 1}.</span>
                <span>{step}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-gradient-to-b from-white to-orange-50/40 rounded-3xl border border-orange-100 shadow-sm p-8">
        <div className="space-y-5">

          <div className="flex items-center gap-4">
            <Clock3 className="w-6 h-6 text-[#f07020]" />
            <span className="text-lg font-semibold text-gray-800">
              Response within 4 hours
            </span>
          </div>

          <div className="flex items-center gap-4">
            <TrendingUp className="w-6 h-6 text-[#f07020]" />
            <span className="text-lg font-semibold text-gray-800">
              Best market price
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Shield className="w-6 h-6 text-[#f07020]" />
            <span className="text-lg font-semibold text-gray-800">
              Free inspection
            </span>
          </div>

        </div>
      </div>

      {/* Help Box */}
      <div className="bg-gradient-to-b from-blue-50 to-white rounded-3xl border border-blue-100 shadow-sm p-8">

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Info className="w-5 h-5 text-blue-600" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">
              Need Help?
            </h3>

            <p className="text-gray-600 text-lg">
              Call us at{" "}
              <span className="text-[#f07020] font-semibold">
                +91 98765 43210
              </span>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}