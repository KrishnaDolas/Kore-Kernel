// src/components/ui/Input.jsx
import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={
        "block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 " +
        className
      }
    />
  );
}
