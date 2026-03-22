// src/components/WhatsAppChatWidget.jsx
import React, { useState } from "react";
import {
  WhatsApp,
  Close,
  ShoppingCart,
  Send,
  Add,
  Remove,
} from "@mui/icons-material";
import { useStore } from "../context/StoreContext";

export function WhatsAppChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("welcome"); // welcome, browse, cart, details
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const {
    state: { products },
  } = useStore();

  // Track selected variant for each product
  const [selectedVariants, setSelectedVariants] = useState({});

 const addProduct = (product, variantIndex = 0) => {
  let productToAdd;

  if (product.variants && product.variants.length > 0) {
    const variant = product.variants[variantIndex];
    productToAdd = {
      id: `${product.id}-${variant.sku}`,
      name: `${product.name} (${variant.weight})`,
      price: variant.price,
      image: variant.image,
      sku: variant.sku,
      weight: variant.weight,
      inStock: variant.inStock,
    };
  } else {
    productToAdd = product;
  }

  setSelectedProducts((prev) => {
    const existing = prev.find((p) => p.id === productToAdd.id);

    if (existing) {
      return prev.map((p) =>
        p.id === productToAdd.id ? { ...p, qty: p.qty + 1 } : p
      );
    }

    return [...prev, { ...productToAdd, qty: 1 }];
  });
};

  const updateQuantity = (productId, change) => {
  setSelectedProducts((prev) =>
    prev
      .map((p) => {
        if (p.id === productId) {
          const newQty = p.qty + change;
          return newQty > 0 ? { ...p, qty: newQty } : null;
        }
        return p;
      })
      .filter(Boolean)
  );
};

const removeItem = (productId) => {
  setSelectedProducts((prev) =>
    prev.filter((p) => p.id !== productId)
  );
};

const clearCart = () => {
  setSelectedProducts([]);
};

  const total = selectedProducts.reduce((sum, p) => {
    const price =
      typeof p.price === "string"
        ? parseFloat(p.price.replace(/[€,]/g, "")) || 0
        : p.price;
    return sum + price * p.qty;
  }, 0);

 const sendToWhatsApp = () => {
  // 🚫 Prevent empty cart
  if (selectedProducts.length === 0) {
    alert("Your cart is empty. Please add items before placing an order.");
    return;
  }

  const phoneNumber = "918421501905";
  let message = "🛒 *New Order from Kore & Kernel Website*\n\n";
  message += "📦 *Order Items:*\n";

  selectedProducts.forEach((item, index) => {
    const price =
      typeof item.price === "string"
        ? parseFloat(item.price.replace(/[€,]/g, "")) || 0
        : item.price;

    message += `${index + 1}. ${item.name}\n`;
    message += `   Qty: ${item.qty} × €${price.toFixed(2)} = €${(
      price * item.qty
    ).toFixed(2)}\n\n`;
  });

  message += `💰 *Total: €${total.toFixed(2)}*\n\n`;
  message += `👤 *Customer Details:*\n`;
  message += `Name: ${customerInfo.name}\n`;
  message += `Phone: ${customerInfo.phone}\n`;
  message += `Address: ${customerInfo.address}\n`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappUrl, "_blank");

  // Reset
  setSelectedProducts([]);
  setCustomerInfo({ name: "", phone: "", address: "" });
  setStep("welcome");
  setIsOpen(false);
};

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/50 transition-all duration-300 hover:scale-110 hover:shadow-xl"
      >
        <WhatsApp className="text-3xl" />
        <span className="absolute -inset-1 animate-ping rounded-full bg-green-400 opacity-20"></span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[380px] flex-col rounded-2xl bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <WhatsApp className="text-2xl" />
          <div>
            <h3 className="text-sm font-bold">Order via WhatsApp</h3>
            <p className="text-xs opacity-90">Kore & Kernel  Products</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-white/20 rounded-full p-1"
        >
          <Close />
        </button>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
        {/* Welcome Message */}
        <div className="mb-3 flex justify-start">
          <div className="max-w-[80%] rounded-lg rounded-tl-none bg-white p-3 shadow-sm">
            <p className="text-sm text-slate-800">
              👋 Hi! Welcome to Kore & Kernel . Browse our products below and add to
              your order!
            </p>
          </div>
        </div>

        {/* Product List */}
        {step === "welcome" && (
          <div className="space-y-2">
            {products.map((product) => {
              const hasVariants =
                product.variants && product.variants.length > 0;
              const selectedIndex = selectedVariants[product.id] || 0;

              // Get current variant or product details
              const currentVariant = hasVariants
                ? product.variants[selectedIndex]
                : null;
              const displayImage = currentVariant?.image || product.image;
              const priceString =
                currentVariant?.price || product.price || "0€";
              const price =
                typeof priceString === "string"
                  ? parseFloat(priceString.replace(/[€,]/g, "")) || 0
                  : priceString;

              return (
                <div
                  key={product.id}
                  className="rounded-lg bg-white p-3 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={displayImage}
                      alt={product.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {product.name}
                      </p>
                      {hasVariants ? (
                        <select
                          value={selectedIndex}
                          onChange={(e) =>
                            setSelectedVariants({
                              ...selectedVariants,
                              [product.id]: parseInt(e.target.value),
                            })
                          }
                          className="mt-1 w-full text-xs border border-slate-300 rounded px-1 py-0.5 focus:border-green-500 focus:outline-none"
                        >
                          {product.variants.map((variant, idx) => {
                            const varPrice =
                              typeof variant.price === "string"
                                ? parseFloat(
                                    variant.price.replace(/[€,]/g, ""),
                                  ) || 0
                                : variant.price;
                            return (
                              <option key={idx} value={idx}>
                                {variant.weight} - €{varPrice.toFixed(2)}
                              </option>
                            );
                          })}
                        </select>
                      ) : (
                        <p className="text-xs text-green-600 font-semibold mt-1">
                          €{price.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => addProduct(product, selectedIndex)}
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600"
                    >
                      <Add fontSize="small" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Cart View */}
        {selectedProducts.length > 0 && step === "welcome" && (
          <div className="mt-3">
  <div className="mb-2 flex justify-start">
    <div className="max-w-[80%] rounded-lg rounded-tl-none bg-white p-3 shadow-sm">
      <p className="text-sm font-bold text-slate-800">
        🛒 Your Order:
      </p>
    </div>
  </div>

  {/* ITEMS */}
  {selectedProducts.map((product) => {
    const price =
      typeof product.price === "string"
        ? parseFloat(product.price.replace(/[€,]/g, "")) || 0
        : product.price;

    return (
      <div
        key={product.id}
        className="mb-2 rounded-lg bg-white p-3 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-xs font-semibold text-slate-900">
              {product.name}
            </p>
            <p className="text-xs text-slate-500">
              €{price.toFixed(2)} each
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Decrease */}
            <button
              onClick={() => updateQuantity(product.id, -1)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300"
            >
              <Remove fontSize="small" />
            </button>

            <span className="w-8 text-center text-sm font-bold">
              {product.qty}
            </span>

            {/* Increase */}
            <button
              onClick={() => updateQuantity(product.id, 1)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600"
            >
              <Add fontSize="small" />
            </button>

            {/* Remove item */}
            <button
              onClick={() => removeItem(product.id)}
              className="ml-2 text-xs text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  })}

  {/* ✅ CLEAR CART (ONLY ONCE HERE) */}
  <button
    onClick={clearCart}
    className="mt-3 w-full rounded-full bg-red-500 py-2 text-sm font-bold text-white hover:bg-red-600"
  >
    Clear Cart
  </button>
</div>
        )}

        {/* Customer Details Form */}
        {step === "details" && (
          <div className="mt-3">
            <div className="mb-3 flex justify-start">
              <div className="max-w-[80%] rounded-lg rounded-tl-none bg-white p-3 shadow-sm">
                <p className="text-sm font-bold text-slate-800">
                  📝 Please provide your details:
                </p>
              </div>
            </div>

            <div className="space-y-3 rounded-lg bg-white p-4 shadow-sm">
              <input
                type="text"
                placeholder="Your Name *"
                value={customerInfo.name}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, name: e.target.value })
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                value={customerInfo.phone}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, phone: e.target.value })
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />
              <textarea
                placeholder="Delivery Address *"
                value={customerInfo.address}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, address: e.target.value })
                }
                rows={3}
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => setStep("welcome")}
                  className="flex-1 rounded-full border-2 border-slate-300 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  onClick={sendToWhatsApp}
                  disabled={
                    !customerInfo.name ||
                    !customerInfo.phone ||
                    !customerInfo.address
                  }
                  className="flex flex-1 items-center justify-center gap-1 rounded-full bg-gradient-to-r from-green-500 to-green-600 py-2 text-sm font-bold text-white hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send fontSize="small" />
                  Send Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer with Total and Actions */}
      {selectedProducts.length > 0 && step === "welcome" && (
        <div className="border-t border-slate-200 bg-white p-4 rounded-b-2xl">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700">Total:</span>
            <span className="text-lg font-bold text-green-600">
              €{total.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => setStep("details")}
            className="w-full rounded-full bg-gradient-to-r from-green-500 to-green-600 py-2.5 text-sm font-bold text-white hover:from-green-600 hover:to-green-700"
          >
            Continue to Checkout
          </button>
        </div>
      )}

      {/* Order Summary in Details Step */}
      {step === "details" && (
        <div className="border-t border-slate-200 bg-white p-4 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700">
              Order Total:
            </span>
            <span className="text-lg font-bold text-green-600">
              €{total.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
