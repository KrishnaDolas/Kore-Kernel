// src/routes/About.jsx
import React from "react";
import peanut1kg from "../assets/Peanutbuttercrunchy700g.webp";
import peanut375 from "../assets/PeanutButter375g.webp";
import hazelDark375 from "../assets/HazelnutButterDarkChocolate375g.webp";

export default function About() {
  return (
    <div className="bg-gradient-to-b from-white via-amber-50/30 to-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <p className="inline-block rounded-full bg-gradient-to-r from-[#BA5C1E] to-[#D97236] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
                Our Story
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                The Search{" "}
                <span className="bg-gradient-to-r from-[#BA5C1E] to-[#D97236] bg-clip-text text-transparent">
                  for Integrity
                </span>
              </h1>
            </div>

            {/* Story Content */}
            <div className="space-y-4 text-base leading-relaxed text-slate-600">
              
              <p className="text-lg">
                Every great harvest begins with a single,{" "}
                <span className="font-semibold text-slate-900">
                  honest intention.
                </span>
              </p>

              <p>
                For our founder—a mother and finance professional—the journey didn’t start in the groves, but in the grocery aisles. She was searching for something deceptively simple: food with integrity. She wanted nourishment that was transparent enough for her family’s table, yet sophisticated enough for a gourmet palate.
              </p>

              <p>
                Frustrated by "healthy" spreads filled with palm oils, hidden sugars, and vague origins, she applied her professional rigor to a new mission: researching a better way.
              </p>

              {/* ✅ NEW SECTION */}
              <h2 className="text-xl font-semibold text-slate-900 pt-4">
                Expertly Curated, Meticulously Sourced
              </h2>

              <p>
                Using the same analytical precision she applied to her finance career, our founder spent years scouring the globe—digitally and through exhaustive supplier vetting—to find the "Kore" of every ingredient. She didn’t settle for what was available; she sought out the world's most reputable producers who met her uncompromising standards for purity.
              </p>

              {/* Bullet Points */}
              <div className="space-y-3 pt-2">
                
                <div className="flex items-start gap-3">
                  <span className="text-[#BA5C1E]">•</span>
                  <p>
                    <strong>Global Supplier Research:</strong> From identifying the most aromatic hazelnut exporters in Georgia and Turkey to vetting the high-protein peanut farms of Argentina, Brazil, and the USA.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#BA5C1E]">•</span>
                  <p>
                    <strong>The 80/20 Philosophy:</strong> A data-backed refusal to hide behind fillers. We committed to a dense, 80% nut base infused with 20% world-class Barry Callebaut Belgian chocolate.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#BA5C1E]">•</span>
                  <p>
                    <strong>Precision Engineering:</strong> Investing in specialized technology to achieve a silk-smooth "liquid gold" texture without additives.
                  </p>
                </div>

              </div>

            </div>

            {/* Key Values */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#BA5C1E]">100%</div>
                <div className="mt-1 text-xs text-slate-600">Natural</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#BA5C1E]">0</div>
                <div className="mt-1 text-xs text-slate-600">Preservatives</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#BA5C1E]">Premium</div>
                <div className="mt-1 text-xs text-slate-600">Quality</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#BA5C1E]/20 to-[#D97236]/20 blur-2xl"></div>
            <div className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-2xl">
              <img
                src={peanut1kg}
                alt="Kore & Kernel Premium Peanut Butter"
                className="w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}