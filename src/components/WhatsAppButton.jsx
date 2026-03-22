// src/components/WhatsAppButton.jsx
import React, { useState } from "react";
import { WhatsApp } from "@mui/icons-material";
import { WhatsAppContactModal } from "./WhatsAppContactModal";

export function WhatsAppButton() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/50 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-green-500/60 sm:h-16 sm:w-16"
        aria-label="Chat on WhatsApp"
      >
        <WhatsApp className="text-2xl sm:text-3xl" />

        {/* Pulse animation ring */}
        <span className="absolute -inset-1 animate-ping rounded-full bg-green-400 opacity-20"></span>
      </button>

      <WhatsAppContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
