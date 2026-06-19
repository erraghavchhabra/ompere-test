"use client";

import { useEffect, useState } from "react";
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
  { icon: FileText,      title: "Submit Generator Details" },
  { icon: Search,        title: "Expert Review" },
  { icon: Phone,         title: "Contact Within 4 Hours" },
  { icon: Factory,       title: "Free Inspection (if required)" },
  { icon: BadgeDollarSign, title: "Receive Final Offer" },
  { icon: Zap,           title: "Get Paid Within 48 Hours" },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface ContactSettings {
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
}

const DEFAULTS: ContactSettings = {
  phone: "+91 91111 60460",
  whatsapp: "+91 91111 60460",
  whatsappMessage: "Hi, I'd like to sell my generator. Can you help?",
};

// ─── Hook: fetch contact settings dynamically ────────────────────────────────
// Replace the fetch URL with your actual API endpoint / CMS call.
// The hook returns `null` while loading so the UI can show a skeleton.

function useContactSettings(): ContactSettings | null {
  const [settings, setSettings] = useState<ContactSettings | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        // 🔁 Swap this URL for your real settings endpoint, e.g.:
        //    /api/settings  →  { phone, whatsapp, whatsappMessage }
        const res = await fetch("/api/settings");
        if (!res.ok) throw new Error("Failed to fetch settings");
        const data: Partial<ContactSettings> = await res.json();

        if (!cancelled) {
          setSettings({
            phone: data.phone ?? DEFAULTS.phone,
            whatsapp: data.whatsapp ?? data.phone ?? DEFAULTS.whatsapp,
            whatsappMessage: data.whatsappMessage ?? DEFAULTS.whatsappMessage,
          });
        }
      } catch {
        // On any error fall back to hard-coded defaults
        if (!cancelled) setSettings(DEFAULTS);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return settings;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SellLeft() {
  const contact = useContactSettings();

  // Derived link values (safe when contact is null — links are hidden)
  const phoneHref = contact
    ? `tel:${contact.phone.replace(/[^\d+]/g, "")}`
    : "#";
  const whatsappHref = contact
    ? `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(contact.whatsappMessage)}`
    : "#";

  return (
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
            <span className="text-lg font-semibold text-gray-800">Response within 4 hours</span>
          </div>
          <div className="flex items-center gap-4">
            <TrendingUp className="w-6 h-6 text-[#f07020]" />
            <span className="text-lg font-semibold text-gray-800">Best market price</span>
          </div>
          <div className="flex items-center gap-4">
            <Shield className="w-6 h-6 text-[#f07020]" />
            <span className="text-lg font-semibold text-gray-800">Free inspection</span>
          </div>
        </div>
      </div>

      {/* Help Box */}
      <div className="bg-gradient-to-b from-blue-50 to-white rounded-3xl border border-blue-100 shadow-sm p-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-blue-600" />
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">Need Help?</h3>

            {/* Phone */}
            <p className="text-gray-600 text-lg mb-4">
              Call us at{" "}
              {contact ? (
                <a
                  href={phoneHref}
                  className="text-[#f07020] font-semibold hover:underline"
                >
                  {contact.phone}
                </a>
              ) : (
                // Skeleton while loading
                <span className="inline-block w-36 h-5 bg-gray-200 rounded animate-pulse align-middle" />
              )}
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm text-gray-400 font-medium">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* WhatsApp button */}
            {contact ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full px-5 py-3 rounded-2xl bg-[#25D366] hover:bg-[#1ebe5d] active:bg-[#17a84f] text-white font-semibold text-base transition-colors duration-150 shadow-sm"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            ) : (
              <div className="w-full h-12 rounded-2xl bg-gray-200 animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}