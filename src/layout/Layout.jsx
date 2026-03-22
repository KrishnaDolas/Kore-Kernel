import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SaleStrip } from "../components/SaleStrip";
import { WhatsAppChatWidget } from "../components/WhatsAppChatWidget";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Header />
      <SaleStrip />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppChatWidget />
    </div>
  );
}
