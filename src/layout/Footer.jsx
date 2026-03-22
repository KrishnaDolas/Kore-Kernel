import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.webp";

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <footer className="relative mt-20 overflow-hidden bg-gradient-to-b from-white to-amber-50/30">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#BA5C1E] to-transparent"></div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src={logo}
                alt="Kore & Kernel Logo"
                className="h-16 w-16 rounded-xl object-contain shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#BA5C1E] to-[#D97236]">
                  Kore & Kernel
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#BA5C1E]/70">
                  Luxury in a Jar
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-md text-base leading-relaxed text-slate-600">
              Crafting premium nut butters from the world’s finest ingredients from the groves of Georgia and Turkey to the fields of the USA. Every jar is an expression of purity, precision milling, and exceptional taste
            </p>
             <p className="mt-6 max-w-md text-base leading-relaxed text-slate-600">
              Our Chocolate Infusions contain only the sugars and salts inherent to the Barry Callebaut Belgian Chocolate; no additional refined sugars or salts are added by Kore & Kernel.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#BA5C1E] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" onClick={scrollToTop} className="group inline-flex items-center text-slate-600 hover:text-[#BA5C1E]">
                  <span className="mr-2 opacity-0 group-hover:opacity-100">→</span>
                  <span className="text-sm font-medium">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/products" onClick={scrollToTop} className="group inline-flex items-center text-slate-600 hover:text-[#BA5C1E]">
                  <span className="mr-2 opacity-0 group-hover:opacity-100">→</span>
                  <span className="text-sm font-medium">Products</span>
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={scrollToTop} className="group inline-flex items-center text-slate-600 hover:text-[#BA5C1E]">
                  <span className="mr-2 opacity-0 group-hover:opacity-100">→</span>
                  <span className="text-sm font-medium">About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop} className="group inline-flex items-center text-slate-600 hover:text-[#BA5C1E]">
                  <span className="mr-2 opacity-0 group-hover:opacity-100">→</span>
                  <span className="text-sm font-medium">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#BA5C1E] mb-4">
              Get in Touch
            </h3>

            <ul className="space-y-4">

              {/* Mobile */}
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#BA5C1E]/10 text-[#BA5C1E]">
                  📱
                </span>
                <a
                  href="tel:+31633006871"
                  className="text-sm text-slate-600 hover:text-[#BA5C1E]"
                >
                  +31 63 300 6871
                </a>
              </li>

              {/* WhatsApp */}
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  💬
                </span>
                <a
                  href="https://wa.me/31633006871"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 hover:text-green-600"
                >
                  Chat on WhatsApp
                </a>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#BA5C1E]/10 text-[#BA5C1E]">
                  📧
                </span>
                <span className="text-sm text-slate-400">
                  Email ID (Coming Soon)
                </span>
              </li>

              {/* ✅ Instagram (Properly aligned) */}
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#BA5C1E]/10 to-[#D97236]/10 text-[#BA5C1E]">
                  📸
                </span>

                <a
                  href="https://www.instagram.com/kore_kernel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#BA5C1E] transition-colors font-medium"
                >
                  Follow on Instagram

                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm hover:bg-gradient-to-br hover:from-[#BA5C1E] hover:to-[#D97236] hover:text-white transition-all">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 1.5h8.5A4.25 4.25 0 0120.5 7.75v8.5A4.25 4.25 0 0116.25 20.5h-8.5A4.25 4.25 0 013.5 16.25v-8.5A4.25 4.25 0 017.75 3.5zm4.25 2.25a5.5 5.5 0 100 11 5.5 5.5 0 000-11zm0 1.5a4 4 0 110 8 4 4 0 010-8zm5.25-.88a1.12 1.12 0 100 2.24 1.12 1.12 0 000-2.24z" />
                    </svg>
                  </span>
                </a>
              </li>

            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#BA5C1E]/20">
        <div className="mx-auto max-w-7xl px-4 py-6 flex justify-between">
          <p className="text-sm text-slate-600">
            © {year} Kore & Kernel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}