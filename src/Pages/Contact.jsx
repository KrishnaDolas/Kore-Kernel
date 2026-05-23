import React, { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState(null);

  // ✅ FORM DATA
  const [formData, setFormData] = useState({
    fullname: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });

  // ✅ ERRORS
  const [errors, setErrors] = useState({});

  // ✅ VALIDATION
  const validate = () => {
    const newErrors = {};

    // =========================
    // FULL NAME
    // =========================
    const trimmedName = formData.fullname.trim();

    if (!trimmedName) {
      newErrors.fullname = "Full name is required";
    } else if (trimmedName.length < 2) {
      newErrors.fullname = "Name too short";
    } else if (trimmedName.length > 50) {
      newErrors.fullname = "Name too long";
    } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      newErrors.fullname = "Only letters allowed";
    }

    // =========================
    // EMAIL
    // =========================
    const trimmedEmail = formData.email.trim();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = "Enter valid email";
    }

    // =========================
    // PHONE
    // =========================
    const cleanedPhone =
      formData.phone.replace(/\s+/g, "");

    if (!cleanedPhone) {
      newErrors.phone = "Phone number required";
    } else if (!/^\+?\d+$/.test(cleanedPhone)) {
      newErrors.phone = "Only numbers allowed";
    } else if (cleanedPhone.length < 6) {
      newErrors.phone = "Phone number too short";
    } else if (cleanedPhone.length > 15) {
      newErrors.phone = "Phone number too long";
    }

    // =========================
    // MESSAGE
    // =========================
    const trimmedMessage =
      formData.message.trim();

    if (!trimmedMessage) {
      newErrors.message = "Message is required";
    } else if (trimmedMessage.length < 10) {
      newErrors.message =
        "Message should be at least 10 characters";
    } else if (trimmedMessage.length > 1000) {
      newErrors.message = "Message too long";
    }

    // =========================
    // CONSENT
    // =========================
    if (!formData.consent) {
      newErrors.consent =
        "Please accept the consent checkbox";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ✅ HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // ✅ Name validation while typing
    if (name === "fullname") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        return;
      }
    }

    // ✅ Phone validation while typing
    if (name === "phone") {
      if (!/^\+?\d*$/.test(value)) {
        return;
      }

      if (value.length > 15) {
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : value,
    }));

    // ✅ Clear field error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ✅ SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    setSubmitStatus(null);

    const form = e.target;

    fetch("https://formsubmit.co/info@korekernel.nl", {
      method: "POST",
      body: new FormData(form),
    })
      .then(() => {
        setSubmitStatus("success");

        setFormData({
          fullname: "",
          company: "",
          email: "",
          phone: "",
          message: "",
          consent: false,
        });

        form.reset();

        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      })
      .catch(() => {
        setSubmitStatus("error");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 pb-20 sm:px-6 lg:px-8">

        {/* Intro */}
        <section className="max-w-3xl pt-2 md:pt-4">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Let&apos;s Talk!
          </h1>

          <p className="text-sm text-slate-600 sm:text-base">
            Share a few details about yourself and what you&apos;re looking for.
            We&apos;ll help you with product recommendations, pricing and
            availability for nut butters.
          </p>
        </section>

        {/* Layout */}
        <section className="mt-8 grid items-start gap-8 lg:grid-cols-[1.3fr_1fr]">

          {/* Form */}
          <div className="rounded-3xl border border-[#BA5C1E]/20 bg-white p-6 shadow-xl sm:p-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-sm"
            >
              <input
                type="hidden"
                name="_captcha"
                value="false"
              />

              {/* Full Name + Company */}
              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <input
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="input w-full"
                  />

                  {errors.fullname && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.fullname}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company (optional)"
                    className="input w-full"
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="input w-full"
                  />

                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone / WhatsApp"
                    className="input w-full"
                  />

                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us your requirement..."
                  className="w-full rounded-xl border p-3"
                />

                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Consent */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                />

                <label className="text-sm text-slate-600">
                  I agree to be contacted by Kore & Kernel.
                  My details will be used only for this enquiry
                  and not shared with third parties.
                </label>
              </div>

              {errors.consent && (
                <p className="text-xs text-red-500">
                  {errors.consent}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-xl py-3 text-white transition-all duration-300
                ${
                  isSubmitting
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-[#BA5C1E] hover:scale-[1.01]"
                }`}
              >
                {isSubmitting
                  ? "Submitting..."
                  : "Submit Request"}
              </button>

              {/* Success */}
              {submitStatus === "success" && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  Your request has been submitted successfully.
                </div>
              )}

              {/* Error */}
              {submitStatus === "error" && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>

          {/* Contact Details */}
          <div className="rounded-3xl border border-[#BA5C1E]/20 bg-white p-6 shadow-xl">

            <h3 className="mb-4 text-sm font-bold uppercase text-[#BA5C1E]">
              Get in Touch
            </h3>

            <div className="space-y-4 text-sm">

              <p>
                📱{" "}
                <a
                  href="tel:+31633006871"
                  className="text-[#BA5C1E]"
                >
                  +31 63 300 6871
                </a>
              </p>

              <p>
                💬{" "}
                <a
                  href="https://wa.me/31633006871"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600"
                >
                  Chat on WhatsApp
                </a>
              </p>

              <p className="text-slate-400">
                📧 info@korekernel.nl
              </p>
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-3 pt-4">

              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#BA5C1E]/10 to-[#D97236]/10 text-[#BA5C1E]">
                📸
              </span>

              <a
                href="https://www.instagram.com/kore_kernel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#BA5C1E]"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}