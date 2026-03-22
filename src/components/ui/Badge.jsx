// src/components/ui/Badge.jsx
import React from "react";

export function Badge({ children, className = "" }) {
  return (
    <span
      className={
        "inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800 " +
        className
      }
    >
      {children}
    </span>
  );
}
