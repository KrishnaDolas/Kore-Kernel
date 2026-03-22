// src/context/StoreContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { PRODUCTS } from "../data/products";

const StoreContext = createContext(null);

const initialState = {
  products: PRODUCTS,
  cart: [],
  orders: []
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.find(
        item => item.id === action.payload.id
      );
      let updatedCart;
      if (existing) {
        updatedCart = state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty + action.payload.qty }
            : item
        );
      } else {
        updatedCart = [...state.cart, action.payload];
      }
      return { ...state, cart: updatedCart };
    }
    case "UPDATE_CART_QTY": {
      const updatedCart = state.cart
        .map(item =>
          item.id === action.payload.id
            ? { ...item, qty: action.payload.qty }
            : item
        )
        .filter(item => item.qty > 0);
      return { ...state, cart: updatedCart };
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id)
      };
    }
    case "CLEAR_CART": {
      return { ...state, cart: [] };
    }
    case "PLACE_ORDER": {
      const newOrder = {
        id: `ORD-${Date.now()}`,
        items: state.cart,
        customer: action.payload.customer,
        createdAt: new Date().toISOString(),
        status: "PENDING"
      };
      return {
        ...state,
        orders: [...state.orders, newOrder],
        cart: []
      };
    }
    case "HYDRATE": {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
}

const STORAGE_KEY = "mechanical-store-state";

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // hydrate from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        dispatch({ type: "HYDRATE", payload: parsed });
      }
    } catch (err) {
      console.error("Failed to hydrate store", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist to localStorage
  useEffect(() => {
    const toStore = {
      cart: state.cart,
      orders: state.orders
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  }, [state.cart, state.orders]);

  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return ctx;
}
