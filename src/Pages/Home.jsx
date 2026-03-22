// src/Pages/Home.jsx (or src/routes/Home.jsx)
import React from "react";
import { FoodHero } from "../components/FoodHero";
import { Accordion } from "../components/ui/Accordion";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export default function Home() {
  const accordionItems = [
    {
      title: "How long does the 80/20 blend last?",
      content:
        "Our nut butters have a shelf life of 9–12 months from the production date when stored in a cool, dry place. Because we use Barry Callebaut chocolate—which is a stable, professional-grade cacao—and 80% roasted nuts, the product is naturally self-preserving. For the best experience, we recommend consuming within 3 months of opening (though we suspect it won't last that long!).",
    },
    {
      title: "Why is there oil on top of my jar?",
      content:
        "That is the golden 'Kore' of the nut! Since we use no palm oil or stabilizers, the natural, heart-healthy oils from the peanuts and hazelnuts will occasionally rise to the top. This is the ultimate proof of a pure product. Simply follow our Stir Ritual to re-integrate the oils and awaken the velvet texture.",
    },
    {
      title: "Is Kore & Kernel Keto-friendly?",
      content:
        "Absolutely. Because we have 0% added sugar and 0% added oil, our Pure Range (Almond and Peanuts) is perfectly suited for Keto and low-carb lifestyles. For our 80/20 Chocolate Infusions, the high nut density ensures a much lower glycemic impact than traditional spreads, making them a sophisticated choice for those mindful of sugar intake.",
    },
    {
      title: "Do I need to refrigerate the jars?",
      content:
        "Refrigeration is not required, but the choice is yours: stay room-temp for a silky drizzle, or refrigerate for a dense, fudge-like indulgence.",
    },
    {
      title: "Are your products Vegan?",
      content:
        "Our 100% Peanuts, Almond, Hazelnut and Dark Cacao variants are 100% plant-based and Vegan. Our Milk Cacao Hazelnut contains Barry Callebaut S21 milk chocolate, which includes dairy. We take great care to prevent cross-contamination during our precision-milling process.",
    },
    {
      title: "Will the nut butter harden at the bottom?",
      content:
        "Unlike mass-produced butters that 'seize' and harden at the base of the jar, our precision-milling process ensures the nut particles are so fine they remain suspended. A gentle stir is all it takes to return your butter to its original, silky-smooth state—from the first scoop to the very last.",
    },
  ];

  return (
    <>
      <FoodHero />

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between animate-slide-up">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#BA5C1E]">
              Featured Products
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Our Picks
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#BA5C1E] hover:text-[#D97236] transition-colors group"
          >
            View all products
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        {/* 4 products per row */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product, index) => (
            <div
              key={product.id}
              className={`animate-slide-up stagger-${Math.min(index + 1, 4)}`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us + FAQs */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr,1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#BA5C1E]">
              Why to choose Kore & Kernel
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Radical Transparency. Global Integrity.
            </h2>
            <p className="mt-3 text-base text-slate-700 leading-relaxed">
              We don't just make nut butter; we curate the harvest. At Kore & Kernel, our "Pure" philosophy means you never have to wonder what is inside the jar or how it got there.
            </p>

            {/* Premium 4 Boxes */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="group rounded-xl border border-[#BA5C1E]/20 bg-white p-5 shadow-elegant hover:shadow-elegant-lg transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#BA5C1E]">
                  The 100% Nut Promise
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Zero added oils, sugars, or salts. We refuse to dilute nature’s perfection with fillers or stabilizers.
                </p>
              </div>

              <div className="group rounded-xl border border-[#BA5C1E]/20 bg-white p-5 shadow-elegant hover:shadow-elegant-lg transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#BA5C1E]">
                  Global Sourcing of the "Kore"
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  From the historic groves of Turkey to prime Argentinian fields, we source only where flavor density is highest.
                </p>
              </div>

              <div className="group rounded-xl border border-[#BA5C1E]/20 bg-white p-5 shadow-elegant hover:shadow-elegant-lg transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#BA5C1E]">
                  Precision in Every Particle
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Our specialized milling preserves nutrient integrity while creating a micro-fine, velvet texture.
                </p>
              </div>

              <div className="group rounded-xl border border-[#BA5C1E]/20 bg-white p-5 shadow-elegant hover:shadow-elegant-lg transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#BA5C1E]">
                  The Culinary Fluidity
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  No stabilizers means a natural, silky pour—perfect for a clean drizzle or a seamless culinary blend.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#BA5C1E]">
              Frequently Asked Questions
            </p>
            <Accordion items={accordionItems} />
          </div>
        </div>
      </section>
    </>
  );
}