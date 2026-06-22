import { STORE_SETTINGS, formatCurrency } from "../config/storeSettings";
import { getCartQuantity, getCartSavings, getCartTotal } from "../utils/cart";
import { EmptyState } from "./EmptyState";
import { CartIcon, CloseIcon, WhatsAppIcon } from "./icons";

export function CartDrawer({
  isOpen,
  cartItems,
  onClose,
  onCheckout,
  onContinueShopping,
  onRemove,
  onChangeQuantity,
}) {
  const count = getCartQuantity(cartItems);
  const subtotal = getCartTotal(cartItems);
  const savings = getCartSavings(cartItems);

  function handleDecrease(item) {
    onChangeQuantity(item.id, (currentQuantity) => currentQuantity - 1);
  }

  function handleIncrease(item) {
    onChangeQuantity(item.id, (currentQuantity) => currentQuantity + 1);
  }

  return (
    <>
      {isOpen ? (
        <div
          className="cart-drawer-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      ) : null}

      <aside
        className={`cart-drawer ${isOpen ? "open" : ""}`}
        aria-label="Shopping cart drawer"
        aria-hidden={!isOpen}
      >
        <div className="cart-drawer-head">
          <div>
            <p className="eyebrow">Shopping cart</p>
            <h2>{STORE_SETTINGS.labels.cartPreview}</h2>
          </div>

          <button
            className="cart-drawer-close"
            type="button"
            onClick={onClose}
            aria-label="Close cart drawer"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="cart-drawer-count">
          <CartIcon />
          <span>
            {count} item{count === 1 ? "" : "s"} in your cart
          </span>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-drawer-empty">
            <EmptyState
              icon={<CartIcon />}
              eyebrow="Cart is empty"
              title="No products added yet"
              message="Add honey, porridge mixes, or local pantry staples before starting WhatsApp checkout."
              tips={[
                "Browse products",
                "Pick quantities",
                "Checkout on WhatsApp",
              ]}
              compact
            >
              <button
                className="btn"
                type="button"
                onClick={onContinueShopping}
              >
                {STORE_SETTINGS.labels.continueShopping}
              </button>
            </EmptyState>
          </div>
        ) : (
          <>
            <div className="cart-drawer-list">
              {cartItems.map((item) => (
                <div className="cart-drawer-item" key={item.id}>
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="cart-drawer-info">
                    <div className="cart-drawer-item-top">
                      <div>
                        <h3>{item.name}</h3>
                        <p>{item.size}</p>
                      </div>

                      <strong>
                        {formatCurrency(item.finalPrice * item.quantity)}
                      </strong>
                    </div>

                    <span className="cart-drawer-each">
                      {formatCurrency(item.finalPrice)} each
                    </span>

                    <div className="cart-qty-row cart-drawer-qty-row">
                      <button
                        type="button"
                        onClick={() => handleDecrease(item)}
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        -
                      </button>

                      <span>
                        {STORE_SETTINGS.labels.quantity}: {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleIncrease(item)}
                        aria-label={`Increase ${item.name} quantity`}
                      >
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

            <div className="cart-drawer-summary">
              <div className="cart-drawer-line">
                <span>{STORE_SETTINGS.labels.subtotal}</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>

              {savings > 0 ? (
                <div className="cart-drawer-line is-savings">
                  <span>{STORE_SETTINGS.labels.savings}</span>
                  <strong>{formatCurrency(savings)}</strong>
                </div>
              ) : null}

              <div className="cart-drawer-total">
                <span>{STORE_SETTINGS.labels.total}</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>

              <button
                className="btn cart-drawer-checkout"
                type="button"
                onClick={onCheckout}
              >
                <WhatsAppIcon />
                Start WhatsApp checkout
              </button>

              <button
                className="btn btn-outline cart-drawer-continue"
                type="button"
                onClick={onContinueShopping}
              >
                {STORE_SETTINGS.labels.continueShopping}
              </button>

              <p className="cart-drawer-note">
                Final delivery cost and availability will be confirmed in
                WhatsApp before payment.
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
