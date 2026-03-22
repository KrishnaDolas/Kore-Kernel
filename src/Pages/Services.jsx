// src/routes/Services.jsx
import React from "react";
import { Accordion } from "../components/ui/Accordion";

export default function Services() {
  const items = [
    {
      title: "Menu & category planning support",
      content:
        "Share your cuisines, outlets and expected covers, and we’ll help you plan ingredient categories, pack sizes and reorder frequencies that fit your kitchen workflow."
    },
    {
      title: "Demand & stock optimisation",
      content:
        "We work with your team to understand peak days, seasonal demand and storage capacity, then suggest ordering patterns that reduce wastage while avoiding stock-outs."
    },
    {
      title: "Alternatives & substitutions",
      content:
        "If a specific brand or item is unavailable, we recommend practical alternatives and substitutions that keep your recipes consistent with minimal changes."
    }
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
        Solutions
      </p>
      <h1 className="mt-1 text-lg font-semibold text-slate-900 sm:text-xl">
        Support for busy kitchens and food businesses.
      </h1>

      <div className="mt-3 grid gap-8 lg:grid-cols-[1.4fr,1fr]">
        <div className="space-y-4 text-sm text-slate-700">
          <p>
            FreshFoods Hub goes beyond simply supplying ingredients. We work like an
            extended part of your purchasing and operations team, helping you plan
            categories, manage stock and adjust to changing demand.
          </p>
          <p>
            Whether you&apos;re running a single outlet or multiple locations, we focus
            on making your sourcing more predictable — so your chefs spend less time
            chasing ingredients and more time serving guests.
          </p>
        </div>
        <div>
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
