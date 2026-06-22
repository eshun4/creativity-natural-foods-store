import { STORE_SETTINGS, formatCurrency } from '../config/storeSettings';
import { getCartQuantity, getCartTotal } from '../utils/cart';
import { CartIcon } from './icons';

export function StickyCartButton({ cartItems, onOpen }) {
  const count = getCartQuantity(cartItems);
  const subtotal = getCartTotal(cartItems);

  if (count === 0) return null;

  return (
    <button className="sticky-cart-button" type="button" onClick={onOpen} aria-label={`Open cart, ${count} items`}>
      <span className="sticky-cart-icon">
        <CartIcon />
        <span>{count}</span>
      </span>
      <span className="sticky-cart-copy">
        <strong>{STORE_SETTINGS.labels.cart}</strong>
        <small>{formatCurrency(subtotal)}</small>
      </span>
    </button>
  );
}
