// src/data/products.js
import peanut375 from "../assets/PeanutButter375g.webp";
import peanut700 from "../assets/PeanutButter700g.webp";
import peanut1kg from "../assets/PeanutButter1Kg.webp";

import peanutCrunchy375 from "../assets/Peanutbuttercrunch375g.webp";
import peanutCrunchy700 from "../assets/PeanutButterCrunchy700g.webp";
import peanutCrunchy1kg from "../assets/PeanutButterCrunchy700g.webp";

import hazelMilk375 from "../assets/HazelnutButterMilkChocolate375g.webp";

import hazelDark375 from "../assets/Hazelnutdarkchocolate700g.webp";
import hazelDark700 from "../assets/Hazelnutdarkchocolate700g.webp";
import hazelDark1kg from "../assets/Hazelnutdarkchocolate700g.webp";

import almond375 from "../assets/AlmondButter375g.webp";

export const PRODUCTS = [
  {
    id: "peanut-butter",
    name: "Peanut Butter",
    brand: "Kore & Kernel ",
    category: "Nut Butter",
    description:
      "100% roasted high-oleic peanuts, precision-milled for a silky, 27g-protein power surge",
    variants: [
      {
        sku: "PB-375",
        weight: "375 g",
        price: "4.50€",
        image: peanut375,
        inStock: true,
      },
      {
        sku: "PB-700",
        weight: "700 g",
        price: "8€",
        image: peanut700,
        inStock: true,
      },
      {
        sku: "PB-1KG",
        weight: "1 Kg",
        price: "10.50€",
        image: peanut1kg,
        inStock: true,
      },
    ],
  },

  {
    id: "peanut-butter-crunchy",
    name: "Peanut Butter (Crunchy)",
    brand: "Kore & Kernel ",
    category: "Nut Butter",
    description:
      "The classic reinvented: 100% roasted peanuts with a bold, precision-milled crunch and 27g of pure protein.",
    variants: [
      {
        sku: "PBC-375",
        weight: "375 g",
        price: "4.50€",
        image: peanutCrunchy375,
        inStock: true,
      },
      {
        sku: "PBC-700",
        weight: "700 g",
        price: "8€",
        image: peanutCrunchy700,
        inStock: true,
      },
      {
        sku: "PBC-1KG",
        weight: "1 Kg",
        price: "10.50€",
        image: peanutCrunchy1kg,
        inStock: true,
      },
    ],
  },

  {
    id: "hazelnut-butter-milk-chocolate",
    name: "Hazelnut Butter (Milk Chocolate)",
    brand: "Kore & Kernel ",
    category: "Nut Butter",
    description:
      "80% premium kernels micro-milled with malty Barry Callebaut milk chocolate for ultimate creaminess",
    variants: [
      {
        sku: "HB-MC-375",
        weight: "375 g",
        price: "10.50€",
        image: hazelMilk375,
        inStock: true,
      },

      {
        sku: "HB-MC-700",
        weight: "700 g",
        price: "19.25€",
        image: hazelMilk375,
        inStock: true,
      },
      {
        sku: "HB-MC-1KG",
        weight: "1 Kg",
        price: "26.50€",
        image: hazelMilk375,
        inStock: true,
      },
    ],
  },

  {
    id: "hazelnut-butter-dark-chocolate",
    name: "Hazelnut Butter (Dark Chocolate)",
    brand: "Kore & Kernel ",
    category: "Nut Butter",
    description:
      "Roasted hazelnuts milled into a glossy ganache and infused with 52% dark Belgian chocolate",
    variants: [
      {
        sku: "HB-DC-375",
        weight: "375 g",
        price: "10.50€",
        image: hazelDark375,
        inStock: true,
      },
      {
        sku: "HB-DC-700",
        weight: "700 g",
        price: "19.25€",
        image: hazelDark700,
        inStock: true,
      },
      {
        sku: "HB-DC-1KG",
        weight: "1 Kg",
        price: "26.50€",
        image: hazelDark1kg,
        inStock: true,
      },
    ],
  },

  {
    id: "almond-butter",
    name: "Almond Butter (100%)",
    brand: "Kore & Kernel ",
    category: "Nut Butter",
    description: "A smooth, single-ingredient masterpiece crafted from slow-roasted almonds and milled to perfection",
    variants: [
      {
        sku: "AB-375",
        weight: "375 g",
        price: "7.75€",
        image: almond375,
        inStock: true,
      },
      {
        sku: "AB-700",
        weight: "700 g",
        price: "19.25€",
        image: almond375,
        inStock: true,
      },
      {
        sku: "AB1KG",
        weight: "1 Kg",
        price: "26.50€",
        image: almond375,
        inStock: true,
      },
    ],
  },
];
