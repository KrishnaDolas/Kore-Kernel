import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { useStore } from "../context/StoreContext";
import { Rating } from "@mui/material";

export function ProductCard({ product }) {
  const { dispatch } = useStore();
  const navigate = useNavigate();

  const hasVariants =
    Array.isArray(product.variants) && product.variants.length > 0;

  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants ? product.variants[0] : null,
  );

  const [quantity, setQuantity] = useState(1);

  // Parse price from string format "4.50€" to number
  const priceString = selectedVariant?.price ?? product.price ?? "0€";
  const price = parseFloat(priceString.replace(/[€,]/g, "")) || 0;

  const image = selectedVariant?.image ?? product.image;

  const inStock =
    typeof selectedVariant?.inStock === "boolean"
      ? selectedVariant.inStock
      : (product.inStock ?? true);

  const ratingValue = typeof product.rating === "number" ? product.rating : 0;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (hasVariants && !selectedVariant) return;

    const id = hasVariants
      ? `${product.id}-${selectedVariant.sku}`
      : product.id;

    const name =
      hasVariants && selectedVariant?.weight
        ? `${product.name} (${selectedVariant.weight})`
        : product.name;

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id,
        name,
        price,
        currency: "EUR",
        qty: quantity,
        image,
        sku: selectedVariant?.sku,
        weight: selectedVariant?.weight,
      },
    });
  };

  const handleBuyNow = () => {
    if (hasVariants && !selectedVariant) return;

    const id = hasVariants
      ? `${product.id}-${selectedVariant.sku}`
      : product.id;

    const name =
      hasVariants && selectedVariant?.weight
        ? `${product.name} (${selectedVariant.weight})`
        : product.name;

    // Add to cart first
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id,
        name,
        price,
        currency: "EUR",
        qty: quantity,
        image,
        sku: selectedVariant?.sku,
        weight: selectedVariant?.weight,
      },
    });

    // Navigate to cart page using React Router
    navigate("/cart");
  };

  return (
    <Card className="group flex h-full flex-col overflow-hidden border border-[#BA5C1E]/20 bg-white shadow-elegant hover:shadow-elegant-lg hover:border-[#BA5C1E]/50 transition-all duration-300 hover-lift">
      {/* Image */}
      <div className="relative aspect-[1/1] w-full overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100/50">
        {image && (
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
          />
        )}

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {inStock ? (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-[#BA5C1E] to-[#D97236] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white shadow-lg backdrop-blur-sm">
            In stock
          </span>
        ) : (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-amber-950 shadow-lg">
            Pre-order
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#BA5C1E]/80">
              {product.category}
            </p>
            <h3 className="mt-1 text-[14px] font-bold text-slate-900 leading-snug group-hover:text-[#BA5C1E] transition-colors">
              {product.name}
            </h3>
          </div>

          <div className="text-right">
            {product.brand && (
              <p className="text-[10px] text-slate-400 font-medium">
                {product.brand}
              </p>
            )}
            <p className="text-base font-bold text-[#BA5C1E] mt-0.5">
              €{price.toFixed(2)}
            </p>
          </div>
        </div>

        <p className="line-clamp-2 text-[11px] text-slate-600 leading-relaxed">
          {product.description || product.shortDescription}
        </p>

        {/* Variant selector */}
        {hasVariants && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {product.variants.map((variant) => (
              <button
                key={variant.sku}
                type="button"
                onClick={() => setSelectedVariant(variant)}
                className={`rounded-full border px-3 py-1 text-[10px] font-semibold transition-all duration-200 ${
                  selectedVariant?.sku === variant.sku
                    ? "border-[#BA5C1E] bg-gradient-to-r from-[#BA5C1E] to-[#D97236] text-white shadow-md scale-105"
                    : "border-slate-300 bg-white text-slate-700 hover:border-[#BA5C1E]/60 hover:bg-amber-50 hover:scale-105"
                }`}
              >
                {variant.weight}
              </button>
            ))}
          </div>
        )}

        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Rating
              name={`rating-${product.id}`}
              size="small"
              value={ratingValue}
              precision={0.5}
              readOnly
            />
            <span className="text-[10px] text-slate-500">
              {ratingValue.toFixed(1)}
            </span>
          </div>

          {!inStock && (
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[9px] text-amber-800 border border-amber-100">
              Check availability
            </span>
          )}
        </div>

        {/* Quantity Selector */}
        {inStock && (
          <div className="mt-3 border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between mb-3">
              <label className="text-[11px] font-semibold text-slate-700">
                Quantity:
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[#BA5C1E]/30 bg-white text-[#BA5C1E] hover:bg-[#BA5C1E] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <span className="text-sm font-bold">−</span>
                </button>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value) || 1)
                  }
                  className="w-12 text-center text-sm font-bold text-slate-900 border border-slate-200 rounded-lg py-1 focus:outline-none focus:ring-2 focus:ring-[#BA5C1E]/30 focus:border-[#BA5C1E]"
                />
                <button
                  type="button"
                  onClick={incrementQuantity}
                  disabled={quantity >= 99}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[#BA5C1E]/30 bg-white text-[#BA5C1E] hover:bg-[#BA5C1E] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <span className="text-sm font-bold">+</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <Button
                fullWidth
                disabled={!inStock || (hasVariants && !selectedVariant)}
                onClick={handleAddToCart}
                className="w-full text-[11px] font-bold bg-gradient-to-r from-[#BA5C1E] to-[#D97236] hover:from-[#D97236] hover:to-[#BA5C1E] !text-white disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:from-slate-200 disabled:to-slate-200 shadow-md hover:shadow-lg hover:shadow-[#BA5C1E]/50 transition-all duration-300 transform hover:scale-[1.02]"
                style={{ color: "white" }}
              >
                🛒 Add to Basket
              </Button>
              <button
                type="button"
                disabled={!inStock || (hasVariants && !selectedVariant)}
                onClick={handleBuyNow}
                className="w-full rounded-lg border-2 border-[#BA5C1E] bg-white px-4 py-2 text-[11px] font-bold text-[#BA5C1E] hover:bg-[#BA5C1E] hover:text-white disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400 disabled:bg-slate-50 shadow-md hover:shadow-lg hover:shadow-[#BA5C1E]/30 transition-all duration-300 transform hover:scale-[1.02]"
              >
                ⚡ Buy Now
              </button>
            </div>
          </div>
        )}

        {/* Out of Stock Button */}
        {!inStock && (
          <div className="mt-3">
            <Button
              fullWidth
              disabled
              className="w-full text-[11px] font-bold bg-slate-200 text-slate-400 cursor-not-allowed shadow-md"
            >
              Out of stock
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
