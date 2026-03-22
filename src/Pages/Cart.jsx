import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { CartItem } from "../components/CartItem";
import { Input } from "../components/ui/Input";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { WhatsApp } from "@mui/icons-material";
import { WhatsAppOrderModal } from "../components/WhatsAppOrderModal";
import emailjs from "@emailjs/browser";

// EmailJS constants
const EMAILJS_SERVICE_ID = "service_nyx4ons";
const TEMPLATE_CUSTOMER_ID = "template_lrlw5uo";
const TEMPLATE_ADMIN_ID = "template_npmwdac";
const EMAILJS_PUBLIC_KEY = "LCOhbuOkeobyNb5Uo";

const SHEET_WEBHOOK_URL =
  "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

export default function Cart() {
  const {
    state: { cart },
    dispatch,
  } = useStore();

  const [customer, setCustomer] = useState({
    name: "",
    company: "",
    email: "",
    phone: "+31", // ✅ default
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [orderPlacedId, setOrderPlacedId] = useState(null);
  const [status, setStatus] = useState("idle");
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // ✅ VALIDATION FUNCTION
  const validate = () => {
    const newErrors = {};

    // Name
    // Name validation
if (!customer.name.trim()) {
  newErrors.name = "Name is required";
} else if (!/^[a-zA-Z\s]+$/.test(customer.name.trim())) {
  newErrors.name = "Only letters allowed (no numbers)";
} else if (customer.name.trim().length < 2) {
  newErrors.name = "Name too short";
}

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customer.email.trim())) {
      newErrors.email = "Enter a valid email";
    }

    // Phone validation
    const phone = customer.phone.replace(/\s+/g, "");

    if (!phone.startsWith("+")) {
      newErrors.phone = "Include country code (e.g. +31)";
    } else {
      const digits = phone.replace(/^\+\d{1,3}/, "");

      if (digits.length < 9 || digits.length > 10) {
        newErrors.phone = "Must be 9–10 digits";
      }

      if (!/^\+?\d+$/.test(phone)) {
        newErrors.phone = "Only numbers allowed";
      }
    }

    // Cart
    if (!cart.length) {
      newErrors.cart = "Your basket is empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
  const { name, value } = e.target;

  // ✅ NAME: allow only letters & spaces
  if (name === "name") {
    if (!/^[a-zA-Z\s]*$/.test(value)) return;
  }

  // ✅ PHONE: prevent removing "+"
  if (name === "phone") {
    if (!value.startsWith("+")) return;
  }

  setCustomer((prev) => ({ ...prev, [name]: value }));
};

  const handleWhatsAppOrder = () => {
    if (!cart.length) {
      alert("Your cart is empty!");
      return;
    }
    setWhatsappModalOpen(true);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("sending");

    const itemsTableRows = cart
      .map(
        (item, index) => `
        <tr style="border-bottom: 1px solid #f0f0f0;">
          <td style="padding: 16px 12px;"><strong>${index + 1}. ${item.name}</strong></td>
          <td style="padding: 16px 12px; text-align: center;">${item.qty}</td>
          <td style="padding: 16px 12px; text-align: center;">€${item.price.toFixed(2)}</td>
          <td style="padding: 16px 12px; text-align: right;">€${(item.price * item.qty).toFixed(2)}</td>
        </tr>
      `
      )
      .join("");

    const orderId = `ORD-${Date.now()}`;
    const now = new Date();

    const baseParams = {
      email: customer.email.trim(),
      customer_name: customer.name.trim(),
      customer_email: customer.email.trim(),
      customer_phone: customer.phone.trim(),
      customer_company: customer.company || "Not provided",
      notes: customer.notes || "No notes",
      order_id: orderId,
      order_date: now.toLocaleString(),
      total: total.toFixed(2),
      year: now.getFullYear(),
      items_table: itemsTableRows,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        TEMPLATE_CUSTOMER_ID,
        baseParams,
        EMAILJS_PUBLIC_KEY
      );

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        TEMPLATE_ADMIN_ID,
        { ...baseParams, email: "info@korekernel.nl" },
        EMAILJS_PUBLIC_KEY
      );

      try {
        await fetch(SHEET_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(baseParams),
        });
      } catch (err) {
        console.error(err);
      }

      dispatch({
        type: "PLACE_ORDER",
        payload: { customer, orderId },
      });

      setOrderPlacedId(orderId);
      setCustomer({
        name: "",
        company: "",
        email: "",
        phone: "+31",
        notes: "",
      });

      setErrors({});
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
        Your basket
      </p>

      <h1 className="mt-1 text-lg font-semibold text-slate-900 sm:text-xl">
        Review items & share delivery details.
      </h1>

      <p className="mt-1 text-xs text-slate-600">
        Check your selected food products and tell us where to deliver.
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.6fr,1fr]">
        {/* Cart */}
        <div className="rounded-2xl border border-emerald-100 bg-white/95 p-4 shadow-sm">
          {cart.length === 0 ? (
            <p className="mt-3 text-sm text-slate-600">Your basket is empty.</p>
          ) : (
            <div className="mt-3 space-y-3">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handlePlaceOrder} className="rounded-2xl border border-emerald-100 bg-white/95 p-4 shadow-sm">
          <div className="mt-3 space-y-3">
            <Input name="name" value={customer.name} onChange={handleChange} placeholder="Your name" />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}

            <Input name="company" value={customer.company} onChange={handleChange} placeholder="Company (optional)" />

            <Input type="email" name="email" value={customer.email} onChange={handleChange} placeholder="Email" />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}

            <Input name="phone" value={customer.phone} onChange={handleChange} placeholder="Mobile / WhatsApp" />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}

            <textarea
              name="notes"
              value={customer.notes}
              onChange={handleChange}
              rows={3}
              className="block w-full rounded-lg border border-emerald-100 px-3 py-2 text-sm"
              placeholder="Delivery address / notes"
            />
          </div>

          <button type="submit" className="mt-4 w-full rounded-full bg-[#BA5C1E] px-6 py-3 text-sm font-semibold text-white">
            Place order request
          </button>

          {errors.cart && <p className="text-xs text-red-500 mt-2">{errors.cart}</p>}
        </form>
      </div>

      <WhatsAppOrderModal open={whatsappModalOpen} onClose={() => setWhatsappModalOpen(false)} cart={cart} total={total} />
    </section>
  );
}