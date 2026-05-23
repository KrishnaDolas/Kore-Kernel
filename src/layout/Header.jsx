import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import logo from "../assets/Logo.webp";

export function Header() {
  const {
    state: { cart },
  } = useStore();

  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const navClass = ({ isActive }) =>
    [
      "text-xs sm:text-sm font-semibold transition-all duration-300 px-4 py-2 rounded-full",
      isActive
        ? "bg-gradient-to-r from-[#BA5C1E] to-[#D97236] text-white shadow-md scale-105"
        : "text-slate-700 hover:text-[#BA5C1E] hover:bg-amber-50 hover:scale-105",
    ].join(" ");

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#BA5C1E]/20 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMobile}>
          <img
            src={logo}
            alt="Kore & Kernel  Logo"
            className="h-13 w-12 rounded-lg object-contain"
          />
          <div className="flex flex-col items-center leading-tight">
            <span className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#BA5C1E] to-[#D97236]">
              Kore & Kernel 
            </span>
            <span className="mt-0.5 text-[10px] font-bold tracking-[0.18em] text-[#BA5C1E]/80">
              Luxury in a Jar
            </span>
          </div>
        </Link>

        {/* Desktop nav - Centered */}
        <nav className="hidden items-center gap-2 md:flex absolute left-1/2 transform -translate-x-1/2">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navClass}>
            Products
          </NavLink>
          {/* <NavLink to="/services" className={navClass}>Solutions</NavLink> */}
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <NavLink
            to="/cart"
            onClick={closeMobile}
            className="relative inline-flex items-center gap-1.5 rounded-full border border-[#BA5C1E]/30 bg-gradient-to-r from-amber-50 to-amber-100/50 px-4 py-2 text-xs font-bold text-[#BA5C1E] shadow-md hover:shadow-lg hover:from-amber-100 hover:to-amber-200/50 transition-all duration-300 hover:scale-105"
          >
            <ShoppingCartIcon fontSize="small" className="text-[#BA5C1E]" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="ml-1 inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-gradient-to-r from-[#BA5C1E] to-[#D97236] px-1.5 text-[10px] font-bold text-white shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[#BA5C1E]/20 bg-white p-1.5 text-[#BA5C1E] shadow-sm hover:bg-[#BA5C1E]/10 md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <CloseIcon fontSize="small" />
            ) : (
              <MenuIcon fontSize="small" />
            )}
          </button>

          {/* Instagram - Far Right */}
          <a
            href="https://www.instagram.com/kore_kernel"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#BA5C1E]/20 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-[#BA5C1E] hover:to-[#D97236] hover:text-white text-[#BA5C1E]"
            aria-label="Instagram"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-[#BA5C1E]/20 bg-white/95 md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 text-sm">
            <NavLink
              to="/"
              onClick={closeMobile}
              className="rounded-lg px-3 py-2 text-slate-700 hover:bg-[#BA5C1E]/10"
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              onClick={closeMobile}
              className="rounded-lg px-3 py-2 text-slate-700 hover:bg-[#BA5C1E]/10"
            >
              Products
            </NavLink>
            <NavLink
              to="/about"
              onClick={closeMobile}
              className="rounded-lg px-3 py-2 text-slate-700 hover:bg-[#BA5C1E]/10"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={closeMobile}
              className="rounded-lg px-3 py-2 text-slate-700 hover:bg-[#BA5C1E]/10"
            >
              Contact
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
