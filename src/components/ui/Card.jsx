// src/components/ui/Card.jsx
import React from "react";

export function Card({ className = "", children }) {
  return (
    <div
      className={
        "rounded-2xl border border-emerald-100 bg-white/95 shadow-sm shadow-emerald-50 " +
        className
      }
    >
      {children}
    </div>
  );
}
