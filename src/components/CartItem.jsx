// src/components/CartItem.jsx
import React from "react";
import { useStore } from "../context/StoreContext";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

export function CartItem({ item }) {
  const { dispatch } = useStore();

  const handleQtyChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    dispatch({
      type: "UPDATE_CART_QTY",
      payload: { id: item.id, qty: value },
    });
  };

  const incrementQuantity = () => {
    dispatch({
      type: "UPDATE_CART_QTY",
      payload: { id: item.id, qty: item.qty + 1 },
    });
  };

  const decrementQuantity = () => {
    if (item.qty > 1) {
      dispatch({
        type: "UPDATE_CART_QTY",
        payload: { id: item.id, qty: item.qty - 1 },
      });
    }
  };

  const handleRemove = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id: item.id },
    });
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#BA5C1E]/20 bg-white px-4 py-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Product Info */}
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-sm font-bold text-slate-900">{item.name}</p>
        <p className="text-[11px] text-slate-500">
          Unit price: €{item.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={decrementQuantity}
            disabled={item.qty <= 1}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#BA5C1E]/30 bg-white text-[#BA5C1E] hover:bg-[#BA5C1E] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <span className="text-base font-bold">−</span>
          </button>
          <input
            type="number"
            min={1}
            max={99}
            value={item.qty}
            onChange={handleQtyChange}
            className="w-14 text-center text-sm font-bold text-slate-900 border border-slate-200 rounded-lg py-1.5 focus:outline-none focus:ring-2 focus:ring-[#BA5C1E]/30 focus:border-[#BA5C1E]"
          />
          <button
            type="button"
            onClick={incrementQuantity}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#BA5C1E]/30 bg-white text-[#BA5C1E] hover:bg-[#BA5C1E] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <span className="text-base font-bold">+</span>
          </button>
        </div>

        {/* Subtotal */}
        <p className="w-24 text-right text-base font-bold text-[#BA5C1E]">
          €{(item.price * item.qty).toFixed(2)}
        </p>

        {/* Remove Button */}
        <IconButton
          size="small"
          onClick={handleRemove}
          aria-label="Remove item"
          className="hover:bg-red-50"
          sx={{
            color: "#ef4444",
            "&:hover": {
              backgroundColor: "#fee2e2",
            },
          }}
        >
          <Delete fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}
