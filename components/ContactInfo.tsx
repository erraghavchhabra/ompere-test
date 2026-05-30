"use client";

import { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import { getSettings } from "@/lib/getSettings";

export default function ContactInfo() {
  const [settings, setSettings] = useState<any>({});
   useEffect(() => {
  
    const fetchSettings = async () => {
  
      const data = await getSettings();
      console.log("data",data);
      setSettings(data);
  
    };
  
    fetchSettings();
  
  }, []);
  const items = [
  {
    icon: Phone,
    title: "Phone",
    value: settings.phone || "",
    link: `tel:${settings.phone || ""}`,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: Mail,
    title: "Email",
    value: settings.email || "",
    link: `mailto:${settings.email || ""}`,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: MapPin,
    title: "Address",
    value: settings.address || "",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: settings.business_hours || "",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
];

  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {items.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition duration-300"
              >

                {/* ICON */}
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-lg border ${item.bg} ${item.border}`}
                  >
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="text-md font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>

                {/* VALUE */}
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-sm text-gray-600 hover:text-[#f07020] transition break-words"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-gray-600 break-words leading-relaxed">
                    {item.value}
                  </p>
                )}

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}