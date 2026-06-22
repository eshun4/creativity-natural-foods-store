function safeQuantity(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(0, Math.floor(numeric));
}

function safePrice(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

export function getCartQuantity(cartItems) {
  return cartItems.reduce(
    (total, item) => total + safeQuantity(item.quantity),
    0,
  );
}

export function getCartTotal(cartItems) {
  return cartItems.reduce(
    (total, item) =>
      total + safePrice(item.finalPrice) * safeQuantity(item.quantity),
    0,
  );
}

export function getCartSavings(cartItems) {
  return cartItems.reduce(
    (sum, item) => sum + safePrice(item.savings) * safeQuantity(item.quantity),
    0,
  );
}
