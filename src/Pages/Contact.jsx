import React, { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus(null);

    const form = e.target;

    fetch("https://formsubmit.co/info@theKore & Kernel .nl", {
      method: "POST",
      body: new FormData(form),
    })
      .then(() => {
        setSubmitStatus("success");
        form.reset();
        setTimeout(() => setSubmitStatus(null), 5000);
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
          <div className="rounded-3xl border border-[#BA5C1E]/20 bg-white shadow-xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="fullname"
                  required
                  placeholder="Full Name"
                  className="input"
                />
                <input
                  name="company"
                  placeholder="Company (optional)"
                  className="input"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className="input"
                />
                <input
                  name="phone"
                  required
                  placeholder="Phone / WhatsApp"
                  className="input"
                />
              </div>

              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell us your requirement..."
                className="w-full rounded-xl border p-3"
              />

              <div className="flex items-start gap-3">
                <input type="checkbox" required />
                <label className="text-sm text-slate-600">
                  I agree to be contacted by Kore & Kernel. My details will be
                  used only for this enquiry and not shared with third parties.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#BA5C1E] text-white py-3 rounded-xl"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="rounded-3xl border border-[#BA5C1E]/20 bg-white shadow-xl p-6">
            <h3 className="text-sm font-bold uppercase text-[#BA5C1E] mb-4">
              Get in Touch
            </h3>

            <div className="space-y-4 text-sm">
              <p>
                📱{" "}
                <a href="tel:+31633006871" className="text-[#BA5C1E]">
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

              <p className="text-slate-400">📧 Email ID (Coming Soon)</p>
            </div>

            {/* ✅ Instagram Added */}
            {/* Instagram */}
            <div className="flex items-center gap-3 pt-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#BA5C1E]/10 to-[#D97236]/10 text-[#BA5C1E]">
                📸
              </span>

              <a
                href="https://www.instagram.com/kore_kernel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#BA5C1E] transition-colors font-medium"
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
