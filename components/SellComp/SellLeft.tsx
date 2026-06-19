"use client";

import {
  Clock3,
  TrendingUp,
  Shield,
  Info,
  FileText,
  Search,
  Phone,
  Factory,
  BadgeDollarSign,
  Zap,
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Submit Generator Details",
  },
  {
    icon: Search,
    title: "Expert Review",
  },
  {
    icon: Phone,
    title: "Contact Within 4 Hours",
  },
  {
    icon: Factory,
    title: "Free Inspection (if required)",
  },
  {
    icon: BadgeDollarSign,
    title: "Receive Final Offer",
  },
  {
    icon: Zap,
    title: "Get Paid Within 48 Hours",
  },
];

interface SellLeftProps {
  settings?: {
    phone?: string;
  };
}

export default function SellLeft({ settings }: SellLeftProps) {
  const phone = settings?.phone || "+91 91111 60460";
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  return (
    <>
     
      <div className="space-y-6">
        {/* What Happens Next */}
        <div className="bg-white rounded-3xl border border-orange-100 shadow-sm p-8">
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8">
            What Happens Next?
          </h2>

          <div className="space-y-5">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#f07020]" />
                  </div>

                  <div>
                    <span className="text-sm text-gray-400 font-medium">
                      Step {index + 1}
                    </span>
                    <p className="text-gray-800 font-medium">{step.title}</p>
                  </div>
                </div>
              );
            })}
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
                <a
                
                  href={phoneHref}
                  className="text-[#f07020] font-semibold hover:underline"
                >
                  {phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}