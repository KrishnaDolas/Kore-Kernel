// src/components/WhatsAppContactModal.jsx
import React, { useState } from "react";
import { WhatsApp, Close } from "@mui/icons-material";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";

export function WhatsAppContactModal({ open, onClose }) {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleSendToWhatsApp = () => {
    const phoneNumber = "918421501905"; // Your WhatsApp number

    let whatsappMessage = `👋 Hi! I'm ${name || "a customer"}\n\n`;
    whatsappMessage += message || "I'm interested in ordering Kore & Kernel  products. Can you help me?";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");
    onClose();
    setMessage("");
    setName("");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: "20px",
          padding: "8px",
        },
      }}
    >
      <DialogTitle className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <WhatsApp className="text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Chat on WhatsApp</h2>
            <p className="text-xs text-slate-500">Send us a message</p>
          </div>
        </div>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent className="mt-4">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Your Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="I'm interested in ordering Kore & Kernel  products. Can you help me?"
              rows={4}
              className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>

          <div className="rounded-lg bg-green-50 p-3">
            <p className="text-xs text-green-800">
              <strong>📱 WhatsApp:</strong> +91-8421-50-1905
            </p>
            <p className="mt-1 text-[10px] text-green-700">
              We typically respond within a few minutes during business hours
            </p>
          </div>

          <button
            onClick={handleSendToWhatsApp}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:shadow-green-500/40"
          >
            <WhatsApp />
            Open WhatsApp Chat
          </button>
          <p className="text-center text-[10px] text-slate-500">
            You'll be redirected to WhatsApp to continue the conversation
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

