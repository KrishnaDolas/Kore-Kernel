// src/components/WhatsAppOrderModal.jsx
import React, { useState } from "react";
import { WhatsApp, Close } from "@mui/icons-material";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";

export function WhatsAppOrderModal({ open, onClose, cart, total }) {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendToWhatsApp = () => {
    const phoneNumber = "918421501905"; // Your WhatsApp number

    // Create order message
    let message = "🛒 *New Order from Kore & Kernel  Website*\n\n";
    message += "📦 *Order Items:*\n";
    message += "━━━━━━━━━━━━━━━━━━━━\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   • Quantity: ${item.qty}\n`;
      message += `   • Price: €${item.price.toFixed(2)} each\n`;
      message += `   • Subtotal: €${(item.price * item.qty).toFixed(2)}\n`;
      message += "━━━━━━━━━━━━━━━━━━━━\n";
    });

    message += `\n💰 *Total Amount: €${total.toFixed(2)}*\n\n`;

    message += "👤 *Customer Details:*\n";
    message += "━━━━━━━━━━━━━━━━━━━━\n";
    if (customerInfo.name) message += `Name: ${customerInfo.name}\n`;
    if (customerInfo.phone) message += `Phone: ${customerInfo.phone}\n`;
    if (customerInfo.address) message += `Address: ${customerInfo.address}\n`;

    message += "\n✅ Please confirm this order. Thank you!";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    onClose();
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
            <h2 className="text-lg font-bold text-slate-900">Order via WhatsApp</h2>
            <p className="text-xs text-slate-500">Review and send your order</p>
          </div>
        </div>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent className="mt-4">
        {/* Cart Items Preview */}
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-bold text-slate-700">📦 Your Order</h3>
          <div className="max-h-60 space-y-2 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-3">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-white p-2 shadow-sm"
              >
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-900">{item.name}</p>
                  <p className="text-[10px] text-slate-500">
                    €{item.price.toFixed(2)} × {item.qty}
                  </p>
                </div>
                <p className="text-sm font-bold text-[#BA5C1E]">
                  €{(item.price * item.qty).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between rounded-lg bg-green-50 px-3 py-2">
            <span className="text-sm font-bold text-green-900">Total Amount:</span>
            <span className="text-lg font-bold text-green-700">€{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Customer Information Form */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-700">👤 Your Details</h3>
          <input
            type="text"
            name="name"
            value={customerInfo.name}
            onChange={handleChange}
            placeholder="Your Name *"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
          />
          <input
            type="tel"
            name="phone"
            value={customerInfo.phone}
            onChange={handleChange}
            placeholder="Your Phone Number *"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
          />
          <textarea
            name="address"
            value={customerInfo.address}
            onChange={handleChange}
            placeholder="Delivery Address *"
            required
            rows={3}
            className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendToWhatsApp}
          disabled={!customerInfo.name || !customerInfo.phone || !customerInfo.address}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:shadow-green-500/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:from-slate-300 disabled:to-slate-300"
        >
          <WhatsApp />
          Send Order to WhatsApp
        </button>
        <p className="mt-2 text-center text-[10px] text-slate-500">
          You'll be redirected to WhatsApp to confirm and send your order
        </p>
      </DialogContent>
    </Dialog>
  );
}

