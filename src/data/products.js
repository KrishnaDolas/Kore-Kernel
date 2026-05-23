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

import picture2 from "../assets/Picture2.png"; // Crunchy Peanut Butter
import picture3 from "../assets/Picture3.png"; // Hazelnut Dark Chocolate
import picture4 from "../assets/Picture4.png"; // Hazelnut Milk Chocolate
import picture5 from "../assets/Picture5.png"; // Creamy Peanut Butter
import picture6 from "../assets/Picture6.png"; // Almond Butter
import picture7 from "../assets/Picture7.png"; // Peanut Chocolate

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
        image: picture5,
        inStock: true,
      },
      {
        sku: "PB-700",
        weight: "700 g",
        price: "8€",
        image: picture5,
        inStock: true,
      },
      {
        sku: "PB-1KG",
        weight: "1 Kg",
        price: "10.50€",
        image: picture5,
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
        image: picture2,
        inStock: true,
      },
      {
        sku: "PBC-700",
        weight: "700 g",
        price: "8€",
        image: picture2,
        inStock: true,
      },
      {
        sku: "PBC-1KG",
        weight: "1 Kg",
        price: "10.50€",
        image: picture2,
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
        image: picture4,
        inStock: true,
      },
      {
        sku: "HB-MC-700",
        weight: "700 g",
        price: "19.25€",
        image: picture4,
        inStock: true,
      },
      {
        sku: "HB-MC-1KG",
        weight: "1 Kg",
        price: "26.50€",
        image: picture4,
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
      "80% premium kernels micro-milled with malty Barry Callebaut dark chocolate for ultimate creaminess",
    variants: [
      {
        sku: "HB-DC-375",
        weight: "375 g",
        price: "10.50€",
        image: picture3,
        inStock: true,
      },
      {
        sku: "HB-DC-700",
        weight: "700 g",
        price: "19.25€",
        image: picture3,
        inStock: true,
      },
      {
        sku: "HB-DC-1KG",
        weight: "1 Kg",
        price: "26.50€",
        image: picture3,
        inStock: true,
      },
    ],
  },

  {
    id: "almond-butter",
    name: "Almond Butter (100%)",
    brand: "Kore & Kernel ",
    category: "Nut Butter",
    description:
      "A smooth, single-ingredient masterpiece crafted from slow-roasted almonds and milled to perfection",
    variants: [
      {
        sku: "AB-375",
        weight: "375 g",
        price: "7.75€",
        image: picture6,
        inStock: true,
      },
      {
        sku: "AB-700",
        weight: "700 g",
        price: "19.25€",
        image: picture6,
        inStock: true,
      },
      {
        sku: "AB1KG",
        weight: "1 Kg",
        price: "26.50€",
        image: picture6,
        inStock: true,
      },
    ],
  },

  {
    id: "peanut-chocolate",
    name: "Peanut Butter (Chocolate)",
    brand: "Kore & Kernel ",
    category: "Nut Butter",
    description:
      "Rich peanut butter blended with chocolate for a bold and indulgent taste",
    variants: [
      {
        sku: "PB-CH-375",
        weight: "375 g",
        price: "6€",
        image: picture7,
        inStock: true,
      },
      {
        sku: "PB-CH-700",
        weight: "700 g",
        price: "10.50€",
        image: picture7,
        inStock: true,
      },
      {
        sku: "PB-CH-1KG",
        weight: "1 Kg",
        price: "13.75€",
        image: picture7,
        inStock: true,
      },
    ],
  },

  {
    id: "cashew-spread",
    name: "100% Cashew",
    brand: "Kore & Kernel ",
    category: "Nut Butter",
    description: "Pure cashew spread",
    variants: [
      {
        sku: "CS-375",
        weight: "375 g",
        price: "6.50€",
        inStock: true,
      },
      {
        sku: "CS-700",
        weight: "700 g",
        price: "11.75€",
        inStock: true,
      },
      {
        sku: "CS-1KG",
        weight: "1 Kg",
        price: "15.50€",
        inStock: true,
      },
    ],
  },

  {
    id: "almond-dark-chocolate",
    name: "Almond Dark Chocolate",
    brand: "Kore & Kernel ",
    category: "Nut Butter",
    description:
      "Almond mixed with premium Belgian dark chocolate",
    variants: [
      {
        sku: "ADC-375",
        weight: "375 g",
        price: "8.50€",
        inStock: true,
      },
      {
        sku: "ADC-700",
        weight: "700 g",
        price: "15.50€",
        inStock: true,
      },
      {
        sku: "ADC-1KG",
        weight: "1 Kg",
        price: "21.00€",
        inStock: true,
      },
    ],
  },

  {
    id: "almond-milk-chocolate",
    name: "Almond Milk Chocolate",
    brand: "Kore & Kernel ",
    category: "Nut Butter",
    description:
      "Almond mixed with premium milk chocolate",
    variants: [
      {
        sku: "AMC-375",
        weight: "375 g",
        price: "8.50€",
        inStock: true,
      },
      {
        sku: "AMC-700",
        weight: "700 g",
        price: "15.50€",
        inStock: true,
      },
      {
        sku: "AMC-1KG",
        weight: "1 Kg",
        price: "21.00€",
        inStock: true,
      },
    ],
  },

  {
    id: "nut-mix",
    name: "Nut Mix",
    brand: "Kore & Kernel ",
    category: "Nut Butter",
    description:
      "A spread made with a mix of almonds, cashews, and peanuts",
    note: "Please WhatsApp or DM for pricing.",
    variants: [],
  },

  {
    id: "bespoke-service",
    name: "Bespoke Service",
    brand: "Kore & Kernel ",
    category: "Custom",
    description:
      "A special service where customers can share their preferred combination, and we create a custom spread for them",
    note: "Please WhatsApp or DM for pricing.",
    variants: [],
  },
];