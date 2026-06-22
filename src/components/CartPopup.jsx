import { STORE_SETTINGS, formatCurrency } from "../config/storeSettings";
import { getCartQuantity, getCartTotal } from "../utils/cart";
import { EmptyState } from "./EmptyState";
import { CartIcon } from "./icons";

export function CartPopup({
  cartItems,
  onCheckout,
  onRemove,
  onChangeQuantity,
}) {
  const total = getCartTotal(cartItems);
  const count = getCartQuantity(cartItems);

  function handleDecrease(item) {
    onChangeQuantity(item.id, (currentQuantity) => currentQuantity - 1);
  }

  function handleIncrease(item) {
    onChangeQuantity(item.id, (currentQuantity) => currentQuantity + 1);
  }

  return (
    <div className="cart-popup">
      <div className="cart-popup-head">
        <strong>{STORE_SETTINGS.labels.cartPreview}</strong>
        <span>
          {count} item{count === 1 ? "" : "s"}
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <EmptyState
            icon={<CartIcon />}
            eyebrow="Empty cart"
            title="Nothing added yet"
            message="Add a product to preview it here before checkout."
            compact
          />
        </div>
      ) : (
        <>
          <div className="cart-popup-list">
            {cartItems.map((item) => (
              <div className="cart-popup-item" key={item.id}>
                <img src={item.image} alt="" loading="lazy" decoding="async" />

                <div className="cart-popup-info">
                  <strong>{item.name}</strong>
                  <span>{item.size}</span>
                  <span>{formatCurrency(item.finalPrice)} each</span>

                  <div className="cart-qty-row">
                    <button type="button" onClick={() => handleDecrease(item)}>
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button type="button" onClick={() => handleIncrease(item)}>
                      +
                    </button>

                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() => onRemove(item.id)}
                    >
                      {STORE_SETTINGS.labels.remove}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-popup-foot">
            <div className="cart-total-line">
              <span>{STORE_SETTINGS.labels.total}</span>
              <strong>{formatCurrency(total)}</strong>
            </div>

            <button
              type="button"
              className="checkout-mini-btn"
              onClick={onCheckout}
            >
              {STORE_SETTINGS.labels.checkout}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
