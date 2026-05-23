import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { CartItem } from "../components/CartItem";
import { Input } from "../components/ui/Input";
import { WhatsAppOrderModal } from "../components/WhatsAppOrderModal";
import emailjs from "@emailjs/browser";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

// =========================
// EMAILJS
// =========================
const EMAILJS_SERVICE_ID = "service_nyx4ons";
const TEMPLATE_CUSTOMER_ID = "template_lrlw5uo";
const TEMPLATE_ADMIN_ID = "template_npmwdac";
const EMAILJS_PUBLIC_KEY = "LCOhbuOkeobyNb5Uo";

const SHEET_WEBHOOK_URL =
  "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

// =========================
// ALL COUNTRY CODES
// =========================
const countryCodes = [
  { country: "Afghanistan", code: "+93" },
  { country: "Albania", code: "+355" },
  { country: "Algeria", code: "+213" },
  { country: "Argentina", code: "+54" },
  { country: "Australia", code: "+61" },
  { country: "Austria", code: "+43" },
  { country: "Bangladesh", code: "+880" },
  { country: "Belgium", code: "+32" },
  { country: "Brazil", code: "+55" },
  { country: "Canada", code: "+1" },
  { country: "China", code: "+86" },
  { country: "Denmark", code: "+45" },
  { country: "Egypt", code: "+20" },
  { country: "Finland", code: "+358" },
  { country: "France", code: "+33" },
  { country: "Germany", code: "+49" },
  { country: "Greece", code: "+30" },
  { country: "Hong Kong", code: "+852" },
  { country: "India", code: "+91" },
  { country: "Indonesia", code: "+62" },
  { country: "Ireland", code: "+353" },
  { country: "Italy", code: "+39" },
  { country: "Japan", code: "+81" },
  { country: "Kenya", code: "+254" },
  { country: "Malaysia", code: "+60" },
  { country: "Mexico", code: "+52" },
  { country: "Nepal", code: "+977" },
  { country: "Netherlands", code: "+31" },
  { country: "New Zealand", code: "+64" },
  { country: "Nigeria", code: "+234" },
  { country: "Norway", code: "+47" },
  { country: "Pakistan", code: "+92" },
  { country: "Philippines", code: "+63" },
  { country: "Poland", code: "+48" },
  { country: "Portugal", code: "+351" },
  { country: "Qatar", code: "+974" },
  { country: "Russia", code: "+7" },
  { country: "Saudi Arabia", code: "+966" },
  { country: "Singapore", code: "+65" },
  { country: "South Africa", code: "+27" },
  { country: "South Korea", code: "+82" },
  { country: "Spain", code: "+34" },
  { country: "Sri Lanka", code: "+94" },
  { country: "Sweden", code: "+46" },
  { country: "Switzerland", code: "+41" },
  { country: "Thailand", code: "+66" },
  { country: "Turkey", code: "+90" },
  { country: "UAE", code: "+971" },
  { country: "United Kingdom", code: "+44" },
  { country: "United States", code: "+1" },
  { country: "Vietnam", code: "+84" },
];

export default function Cart() {
  const {
    state: { cart },
    dispatch,
  } = useStore();

  // =========================
  // STATES
  // =========================
  const [customer, setCustomer] = useState({
    name: "",
    company: "",
    email: "",

    countryCode: "+31",
    phone: "",

    street: "",
    houseNo: "",
    zipCode: "",
    city: "",
    country: "",

    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [orderPlacedId, setOrderPlacedId] = useState(null);
  const [status, setStatus] = useState("idle");

  const [whatsappModalOpen, setWhatsappModalOpen] =
    useState(false);

  const [resultModalOpen, setResultModalOpen] =
    useState(false);

  const [resultType, setResultType] =
    useState("success");

  // =========================
  // TOTAL
  // =========================
  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

  // =========================
  // VALIDATION
  // =========================
  const validate = () => {
    const newErrors = {};

    const trimmedName =
      customer.name.trim();

    if (!trimmedName) {
      newErrors.name =
        "Name is required";
    } else if (
      trimmedName.length < 2
    ) {
      newErrors.name =
        "Name too short";
    } else if (
      !/^[a-zA-Z\s]+$/.test(
        trimmedName
      )
    ) {
      newErrors.name =
        "Only letters allowed";
    }

    const trimmedEmail =
      customer.email.trim();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      newErrors.email =
        "Email is required";
    } else if (
      !emailRegex.test(
        trimmedEmail
      )
    ) {
      newErrors.email =
        "Enter valid email";
    }

    const cleanedPhone =
      customer.phone.replace(
        /\s+/g,
        ""
      );

    if (!cleanedPhone) {
      newErrors.phone =
        "Phone required";
    } else if (
      !/^\d+$/.test(
        cleanedPhone
      )
    ) {
      newErrors.phone =
        "Only numbers allowed";
    } else if (
      cleanedPhone.length < 6 ||
      cleanedPhone.length > 15
    ) {
      newErrors.phone =
        "Phone must be 6-15 digits";
    }

    if (
      !customer.street.trim()
    ) {
      newErrors.street =
        "Street required";
    }

    if (
      !customer.houseNo.trim()
    ) {
      newErrors.houseNo =
        "House number required";
    }

    if (
      !customer.zipCode.trim()
    ) {
      newErrors.zipCode =
        "Zip code required";
    }

    if (
      !customer.city.trim()
    ) {
      newErrors.city =
        "City required";
    }

    if (
      !customer.country.trim()
    ) {
      newErrors.country =
        "Country required";
    }

    if (!cart.length) {
      newErrors.cart =
        "Your basket is empty";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    if (
      name === "name"
    ) {
      if (
        !/^[a-zA-Z\s]*$/.test(
          value
        )
      ) {
        return;
      }
    }

    if (
      name === "phone"
    ) {
      if (
        !/^\d*$/.test(
          value
        )
      ) {
        return;
      }

      if (
        value.length > 15
      ) {
        return;
      }
    }

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // =========================
  // PLACE ORDER
  // =========================
  const handlePlaceOrder =
    async (e) => {
      e.preventDefault();

      if (!validate()) return;

      setStatus("sending");

      // =========================
      // ORDER NUMBER
      // =========================
      const now =
        new Date();

      const year =
        now.getFullYear();

      const month =
        String(
          now.getMonth() + 1
        ).padStart(2, "0");

      const date =
        String(
          now.getDate()
        ).padStart(2, "0");

      const datePrefix = `${year}${month}${date}`;

      const storageKey = `orderCounter_${datePrefix}`;

      let currentCounter =
        parseInt(
          localStorage.getItem(
            storageKey
          )
        ) || 0;

      currentCounter += 1;

      localStorage.setItem(
        storageKey,
        currentCounter
      );

      const orderId = `${datePrefix}${currentCounter}`;

      // =========================
      // PRODUCT TABLE
      // =========================
      const itemsTableRows =
        cart
          .map(
            (
              item,
              index
            ) => `
        <tr style="border-bottom:1px solid #f0f0f0;">

          <td style="padding:16px 12px; width:90px;">
            <img
              src="${item.image}"
              alt="${item.name}"
              width="70"
              height="70"
              style="
                width:70px;
                height:70px;
                object-fit:cover;
                border-radius:12px;
                border:1px solid #eee;
              "
            />
          </td>

          <td style="padding:16px 12px;">
            <div
              style="
                font-weight:700;
                color:#222;
                margin-bottom:6px;
                font-size:15px;
              "
            >
              ${item.name}
            </div>

            ${
              item.variant
                ? `
              <div style="font-size:13px;color:#777;margin-bottom:4px;">
                Variant: ${item.variant}
              </div>
            `
                : ""
            }

            ${
              item.weight
                ? `
              <div style="font-size:13px;color:#777;margin-bottom:4px;">
                Weight: ${item.weight}
              </div>
            `
                : ""
            }
          </td>

          <td
            style="
              padding:16px 12px;
              text-align:center;
              font-weight:600;
            "
          >
            ${item.qty}
          </td>

          <td
            style="
              padding:16px 12px;
              text-align:center;
              font-weight:600;
            "
          >
            €${item.price.toFixed(
              2
            )}
          </td>

          <td
            style="
              padding:16px 12px;
              text-align:right;
              font-weight:700;
              color:#BA5C1E;
            "
          >
            €${(
              item.price *
              item.qty
            ).toFixed(2)}
          </td>
        </tr>
      `
          )
          .join("");

      const fullPhone = `${customer.countryCode}${customer.phone}`;

      const fullAddress = `
${customer.street} ${customer.houseNo},
${customer.zipCode},
${customer.city},
${customer.country}
`;

      const baseParams = {
        email:
          customer.email.trim(),

        customer_name:
          customer.name.trim(),

        customer_email:
          customer.email.trim(),

        customer_phone:
          fullPhone,

        customer_company:
          customer.company ||
          "Not provided",

        customer_address:
          fullAddress,

        customer_street:
          customer.street,

        customer_house_no:
          customer.houseNo,

        customer_zip_code:
          customer.zipCode,

        customer_city:
          customer.city,

        customer_country:
          customer.country,

        notes:
          customer.notes ||
          "No notes",

        order_id: orderId,

        order_date:
          now.toLocaleString(),

        total:
          total.toFixed(2),

        year:
          now.getFullYear(),

        items_table:
          itemsTableRows,
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
          {
            ...baseParams,
            email:
              "info@korekernel.nl",
          },
          EMAILJS_PUBLIC_KEY
        );

        try {
          await fetch(
            SHEET_WEBHOOK_URL,
            {
              method:
                "POST",

              mode: "no-cors",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify(
                baseParams
              ),
            }
          );
        } catch (err) {
          console.error(err);
        }

        dispatch({
          type:
            "PLACE_ORDER",

          payload: {
            customer,
            orderId,
          },
        });

        setOrderPlacedId(
          orderId
        );

        setCustomer({
          name: "",
          company: "",
          email: "",

          countryCode:
            "+31",

          phone: "",

          street: "",
          houseNo: "",
          zipCode: "",
          city: "",
          country: "",

          notes: "",
        });

        setErrors({});

        setStatus(
          "success"
        );

        setResultType(
          "success"
        );

        setResultModalOpen(
          true
        );
      } catch (error) {
        console.error(
          error
        );

        setStatus(
          "error"
        );

        setResultType(
          "error"
        );

        setResultModalOpen(
          true
        );
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
            <p className="mt-3 text-sm text-slate-600">
              Your basket is empty.
            </p>
          ) : (
            <div className="mt-3 space-y-3">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={handlePlaceOrder}
          className="rounded-2xl border border-emerald-100 bg-white/95 p-4 shadow-sm"
        >
          <div className="mt-3 space-y-3">

            {/* Name */}
            <Input
              name="name"
              value={customer.name}
              onChange={handleChange}
              placeholder="Your name"
            />

            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}

            {/* Company */}
            <Input
              name="company"
              value={customer.company}
              onChange={handleChange}
              placeholder="Company (optional)"
            />

            {/* Email */}
            <Input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              placeholder="Email"
            />

            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}

            {/* Mobile */}
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={customer.countryCode}
                onChange={handleChange}
                className="rounded-lg border border-emerald-100 px-3 py-2 text-sm"
              >
                {countryCodes.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.country} ({item.code})
                  </option>
                ))}
              </select>

              <Input
                name="phone"
                value={customer.phone}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </div>

            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone}</p>
            )}

            {/* Street */}
            <Input
              name="street"
              value={customer.street}
              onChange={handleChange}
              placeholder="Street"
            />

            {errors.street && (
              <p className="text-xs text-red-500">{errors.street}</p>
            )}

            {/* House No */}
            <Input
              name="houseNo"
              value={customer.houseNo}
              onChange={handleChange}
              placeholder="House No"
            />

            {errors.houseNo && (
              <p className="text-xs text-red-500">{errors.houseNo}</p>
            )}

            {/* Zip */}
            <Input
              name="zipCode"
              value={customer.zipCode}
              onChange={handleChange}
              placeholder="Zip Code"
            />

            {errors.zipCode && (
              <p className="text-xs text-red-500">{errors.zipCode}</p>
            )}

            {/* City */}
            <Input
              name="city"
              value={customer.city}
              onChange={handleChange}
              placeholder="City"
            />

            {errors.city && (
              <p className="text-xs text-red-500">{errors.city}</p>
            )}

            {/* Country */}
            <Input
              name="country"
              value={customer.country}
              onChange={handleChange}
              placeholder="Country"
            />

            {errors.country && (
              <p className="text-xs text-red-500">{errors.country}</p>
            )}

            {/* Notes */}
            <textarea
              name="notes"
              value={customer.notes}
              onChange={handleChange}
              rows={3}
              className="block w-full rounded-lg border border-emerald-100 px-3 py-2 text-sm"
              placeholder="Delivery notes"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-[#BA5C1E] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
          >
            {status === "sending"
              ? "Placing Order..."
              : "Place order request"}
          </button>

          {errors.cart && (
            <p className="mt-2 text-xs text-red-500">
              {errors.cart}
            </p>
          )}
        </form>
      </div>

      {/* WhatsApp Modal */}
      <WhatsAppOrderModal
        open={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
        cart={cart}
        total={total}
      />

      {/* ✅ RESULT MODAL */}
      {resultModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-[fadeIn_.3s_ease]">

            {/* Top Glow */}
            <div
              className={`h-2 w-full ${
                resultType === "success"
                  ? "bg-gradient-to-r from-green-400 to-emerald-600"
                  : "bg-gradient-to-r from-red-400 to-red-600"
              }`}
            />

            <div className="px-6 py-8 text-center">

              {/* Logo */}
              {/* <div className="mb-4 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f7f4ef] shadow-inner">
                  <img
                    src={logo}
                    alt="Kore & Kernel"
                    className="h-18 w-18 object-contain"
                  />
                </div>
              </div> */}

              {/* Icon */}
              <div className="mb-5 flex justify-center">
                {resultType === "success" ? (
                  <div className="animate-bounce">
                    <CheckCircleRoundedIcon
                      style={{
                        fontSize: 90,
                        color: "#16a34a",
                      }}
                    />
                  </div>
                ) : (
                  <div className="animate-pulse">
                    <ErrorOutlineRoundedIcon
                      style={{
                        fontSize: 90,
                        color: "#dc2626",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Heading */}
              <h2
                className={`text-2xl font-bold ${
                  resultType === "success"
                    ? "text-green-700"
                    : "text-red-600"
                }`}
              >
                {resultType === "success"
                  ? "Order Confirmed!"
                  : "Order Failed"}
              </h2>

              {/* Message */}
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {resultType === "success" ? (
                  <>
                    Thank you for becoming a new family member of{" "}
                    <span className="font-semibold text-[#BA5C1E]">
                      Kore & Kernel
                    </span>
                    . 🌰
                    <br />
                    Please check your email for order confirmation.
                  </>
                ) : (
                  <>
                    Your order was not confirmed.
                    <br />
                    Please try again later 😔
                  </>
                )}
              </p>

              {/* Order ID */}
              {resultType === "success" && orderPlacedId && (
                <div className="mt-5 rounded-2xl bg-[#f7f4ef] px-4 py-3 text-sm font-semibold text-[#BA5C1E]">
                  Order ID: {orderPlacedId}
                </div>
              )}

              {/* Button */}
              <button
                onClick={() => setResultModalOpen(false)}
                className={`mt-7 w-full rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] ${
                  resultType === "success"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {resultType === "success"
                  ? "Continue Shopping"
                  : "Try Again"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}