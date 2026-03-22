// src/components/ui/Accordion.jsx
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full divide-y divide-emerald-50 rounded-2xl border border-emerald-100 bg-white/95 shadow-sm">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors ${
                open
                  ? "bg-emerald-50 text-emerald-900"
                  : "text-slate-800 hover:bg-emerald-50/70"
              }`}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={`h-4 w-4 text-emerald-600 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            {open && (
              <div className="px-4 pb-4 text-[13px] leading-relaxed text-slate-600">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
