import React from "react";

export function SaleStrip() {
  const text =
    "MIN. 15G PROTEIN PER 100G • HIGH FIBER • NO PALM OIL • NO REFINED SUGAR • NO FILLERS • PURE KERNEL FOCUS • BARRY CALLEBAUT INFUSED*";

  return (
    <div className="relative border-b border-black/10 bg-[#1F3D2B] overflow-hidden">
      {/* Deep Forest Green */}

      {/* LEFT FADE */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-[#1F3D2B] to-transparent z-10"></div>

      {/* RIGHT FADE */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#1F3D2B] to-transparent z-10"></div>

      <div className="mx-auto py-2.5">
        <div className="flex animate-marquee whitespace-nowrap font-montserrat text-xs sm:text-sm font-semibold tracking-wider text-white">
          
          {/* Duplicate content for seamless loop */}
          <span className="mx-8">{text}</span>
          <span className="mx-8">{text}</span>
          <span className="mx-8">{text}</span>
          <span className="mx-8">{text}</span>

        </div>
      </div>
    </div>
  );
}