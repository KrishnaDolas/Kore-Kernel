// src/Pages/Home.jsx (or src/routes/Home.jsx)
import React, { useState, useEffect } from "react";
import { FoodHero } from "../components/FoodHero";
import { Accordion } from "../components/ui/Accordion";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { ProductCard } from "../components/ProductCard";

// ✅ Gift Images
import gift1 from "../assets/gift1.webp";
import gift2 from "../assets/gift2.webp";
import gift3 from "../assets/gift3.webp";

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
        "That is the golden 'Kore' of the nut! Since we use no palm oil or stabilizers, the natural, heart-healthy oils from the peanuts and hazelnuts will occasionally rise to the top.",
    },
    {
      title: "Is Kore & Kernel Keto-friendly?",
      content:
        "Absolutely. Because we have 0% added sugar and 0% added oil, our Pure Range is perfectly suited for Keto lifestyles.",
    },
    {
      title: "Do I need to refrigerate the jars?",
      content:
        "Refrigeration is optional—room temp for silky texture or refrigerate for dense indulgence.",
    },
    {
      title: "Are your products Vegan?",
      content:
        "Most variants are 100% plant-based except milk chocolate variants.",
    },
    {
      title: "Will the nut butter harden at the bottom?",
      content:
        "Our precision-milling ensures smooth consistency throughout.",
    },
  ];

  const testimonials = [
    "Great quality, beautiful packaging, and delicious taste. My friend loved the gift, and I loved the peanut butter! Highly recommended. The peanut/almond butter on bread has become my everyday snack with tea.",
    "After trying Kore & Kernel Peanut butter n Hazelnut pasta with dark chocolate spread, my kids and me loved it.",
    "You have really maintained the quality, kudos to you 💖",
    "The almond butter is really yum. Great texture.",
    "We absolutely love the peanut butter.",
    "This peanut butter is smooth, creamy, and full of flavor.",
    "It's absolutely lovely and perfect.",
    "My daughter loved the hazelnut chocolate spread ❤️",
    "My kids did a happy dance 😊",
    "Milk chocolate hazelnut spread is creamy and nutty.",
    "Chocolate peanut butter is amazing ❤️",
    "Keeps me full and guilt-free 😊",
    "Each bite brought me joy 😆",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

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
            View all products →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <div key={product.id}>
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

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border p-5 shadow">
                <h3 className="font-bold">100% Nut Promise</h3>
              </div>
              <div className="rounded-xl border p-5 shadow">
                <h3 className="font-bold">Global Sourcing</h3>
              </div>
              <div className="rounded-xl border p-5 shadow">
                <h3 className="font-bold">Precision Milling</h3>
              </div>
              <div className="rounded-xl border p-5 shadow">
                <h3 className="font-bold">Silky Texture</h3>
              </div>
            </div>
          </div>

          <div>
            <Accordion items={accordionItems} />
          </div>
        </div>
      </section>

      {/* 🎁 GIFT PACK SECTION (NEW) */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#BA5C1E]">
            Gift Packs
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Perfect Gifts for Every Occasion 🎁
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Premium handcrafted nut butter gift boxes curated for festive gifting,
            corporate hampers, and special occasions.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {/* Gift 1 */}
          <div className="group rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition">
            <img src={gift1} className="h-72 w-full object-cover group-hover:scale-105 transition" />
            <div className="p-5">
              <h3 className="font-bold text-lg">Premium Duo Gift Box</h3>
              <a
                href="https://wa.me/+31633006871?text=Hi%20I%20am%20interested%20in%20Premium%20Duo%20Gift%20Box"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-center bg-[#25D366] text-white py-2 rounded-lg"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </div>

          {/* Gift 2 */}
          <div className="group rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition">
            <img src={gift2} className="h-72 w-full object-cover group-hover:scale-105 transition" />
            <div className="p-5">
              <h3 className="font-bold text-lg">Festive Mini Pack</h3>
              <a
                href="https://wa.me/+31633006871?text=Hi%20I%20am%20interested%20in%20Festive%20Mini%20Pack"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-center bg-[#25D366] text-white py-2 rounded-lg"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </div>

          {/* Gift 3 */}
          <div className="group rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition">
            <img src={gift3} className="h-72 w-full object-cover group-hover:scale-105 transition" />
            <div className="p-5">
              <h3 className="font-bold text-lg">Luxury Gift Hamper</h3>
              <a
                href="https://wa.me/+31633006871?text=Hi%20I%20am%20interested%20in%20Luxury%20Gift%20Hamper"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-center bg-[#25D366] text-white py-2 rounded-lg"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 🔥 TESTIMONIALS */}
      <section className="relative py-20 bg-gradient-to-br from-[#FFF4EC] via-[#FFF9F5] to-[#FFF4EC]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold">Loved by Customers 💛</h2>
          <p className="mt-6 italic text-lg">{testimonials[current]}</p>
        </div>
      </section>
    </>
  );
}