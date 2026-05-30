"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { getSettings } from "@/lib/getSettings";

/* SAME LINKS AS HEADER */

const navLinks = [
 
  { name: "About Us", href: "/about" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "I Want to Sell", href: "/sell" },
  { name: "I Want to Buy", href: "/buy" },
  { name: "Price Calculator", href: "/price-calculator" },
  { name: "Blog", href: "/blogs" },
  { name: "Contact Us", href: "/contact" },
];
 

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
  { name: "Cookie Policy", href: "/cookie-policy" },
  { name: "FAQs", href: "/faqs" },
  { name: "Contact Us", href: "/contact" },
];



export default function Footer() {

  const [settings, setSettings] = useState<any>({});
   useEffect(() => {
  
    const fetchSettings = async () => {
  
      const data = await getSettings();
      console.log("data",data);
      setSettings(data);
  
    };
  
    fetchSettings();
  
  }, []);
  return (
    <footer className="relative bg-[#111111] text-white ">
      {/* TOP GRADIENT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(240,112,32,0.12),transparent_30%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-8">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-14 pb-14 border-b border-white/10">
          {/* BRAND */}
          <div>
            <Link href="/" className="inline-flex mb-6">
              <Image
                src="/assets/img/logo-ft.svg"
                alt="Ompere Logo"
                width={180}
                height={50}
                priority
                className="h-auto"
              />
            </Link>

            <p className="text-white/65 leading-8 text-[15px] max-w-sm mb-7">
              India’s trusted marketplace for buying and selling used diesel
              generators with transparent pricing and reliable support.
            </p>

            {/* SOCIAL 
            <div className="flex items-center gap-3">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-11 h-11 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-[#f07020] hover:border-[#f07020] flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              )}
            </div>*/}
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>

            <div className="space-y-4">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-white/65 hover:text-[#f07020] transition duration-300 text-[15px]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Legal & Support</h4>

            <div className="space-y-4">
              {legalLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-white/65 hover:text-[#f07020] transition duration-300 text-[15px]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Contact Us</h4>

            <div className="space-y-5 text-white/65 text-[15px]">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#f07020]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#f07020]" />
                </div>

                <p className="leading-7">
                {settings.address || ""}
                </p>
              </div>

              <a
                 href={`tel:${settings.phone || ""}`}
                className="flex items-center gap-4 hover:text-[#f07020] transition"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#f07020]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#f07020]" />
                </div>

                <span> {settings.phone || ""}</span>
              </a>

              <a
                href={`mailto:${settings.email || ""}`}
                className="flex items-center gap-4 hover:text-[#f07020] transition"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#f07020]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#f07020]" />
                </div>

                <span> {settings.email || ""}</span>
              </a>

              <div className="pt-2">
                <p className="text-white/40 text-sm leading-7">
                  Business Hours
                  <br />
                  {settings.business_hours || ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40 text-center md:text-left">
            © {new Date().getFullYear()} Ompere. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link
              href="/privacy-policy"
              className="hover:text-[#f07020] transition"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-and-conditions"
              className="hover:text-[#f07020] transition"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
      
<a
  href="https://wa.me/919876543210"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.35)] hover:scale-110 transition-all duration-300"
>
  <FaWhatsapp className="w-7 h-7 text-white" />
</a>
    </footer>
    
  );
  
}
