import { useEffect, useMemo, useState } from "react";
import { STORE_SETTINGS, formatCurrency } from "../config/storeSettings";
import { PriceDisplay } from "../components/PriceDisplay";
import { EmptyState } from "../components/EmptyState";
import { CartIcon, WhatsAppIcon } from "../components/icons";
import { PaymentMethodSection } from "../components/PaymentMethodSection";
import { getCartSavings, getCartTotal } from "../utils/cart";
import { STORAGE_KEYS, readStorage, writeStorage } from "../utils/storage";

const INITIAL_CUSTOMER = {
  name: "",
  phoneRegion: STORE_SETTINGS.checkout.defaultRegion,
  phone: "",
  deliveryMethod: "delivery",
  location: "",
  notes: "",
};

function getCheckoutRegion(regionId) {
  return (
    STORE_SETTINGS.checkout.regions[regionId] ||
    STORE_SETTINGS.checkout.regions[STORE_SETTINGS.checkout.defaultRegion]
  );
}

function buildWhatsAppMessage({
  cartItems,
  total,
  savings,
  customer,
  checkoutRegion,
}) {
  const lines = [
    `Hello ${STORE_SETTINGS.brand.name}, I would like to place an order.`,
    "",
    "ORDER ITEMS:",
    ...cartItems.map(
      (item, index) =>
        `${index + 1}. ${item.name} (${item.size}) x ${item.quantity} - ${formatCurrency(item.finalPrice * item.quantity)}`,
    ),
    "",
    `Subtotal: ${formatCurrency(total)}`,
    `Savings: ${formatCurrency(savings)}`,
    `Total: ${formatCurrency(total)}`,
    "",
    "CUSTOMER DETAILS:",
    `Name: ${customer.name}`,
    `Country/phone region: ${checkoutRegion.label} (${checkoutRegion.countryCode})`,
    `Phone: ${checkoutRegion.countryCode} ${customer.phone}`,
    `Order type: ${customer.deliveryMethod === "pickup" ? "Pickup" : "Delivery"}`,
    `Location: ${customer.location}`,
    "",
    "PAYMENT METHOD:",
    "Current option: Order through WhatsApp",
    "Pay Online: Coming soon",
  ];

  if (customer.notes.trim()) {
    lines.push(`Notes: ${customer.notes.trim()}`);
  }

  lines.push(
    "",
    "Please confirm availability, delivery/shipping cost, and payment instructions.",
  );

  return lines.join("\n");
}

export function CheckoutPage({
  cartItems,
  setPage,
  changeCartQuantity,
  removeFromCart,
  onPlaceOrder,
}) {
  const [customer, setCustomer] = useState(() => ({
    ...INITIAL_CUSTOMER,
    ...readStorage(STORAGE_KEYS.checkoutCustomer, INITIAL_CUSTOMER),
  }));

  const [showPreview, setShowPreview] = useState(false);
  const [touched, setTouched] = useState(false);

  const total = getCartTotal(cartItems);
  const savings = getCartSavings(cartItems);
  const checkoutRegion = getCheckoutRegion(customer.phoneRegion);
  const checkoutRegions = Object.values(STORE_SETTINGS.checkout.regions);

  const requiredFields = {
    name: customer.name.trim(),
    phone: customer.phone.trim(),
    location: customer.location.trim(),
  };

  const hasMissingFields =
    !requiredFields.name || !requiredFields.phone || !requiredFields.location;

  const whatsappMessage = useMemo(
    () =>
      buildWhatsAppMessage({
        cartItems,
        total,
        savings,
        customer,
        checkoutRegion,
      }),
    [cartItems, checkoutRegion, customer, savings, total],
  );

  const whatsappUrl = `${STORE_SETTINGS.checkout.whatsappBaseUrl}/${checkoutRegion.businessWhatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    writeStorage(STORAGE_KEYS.checkoutCustomer, customer);
  }, [customer]);

  function updateCustomer(field, value) {
    setCustomer((current) => ({ ...current, [field]: value }));
    setShowPreview(false);
  }

  function preparePreview() {
    setTouched(true);

    if (hasMissingFields) {
      return;
    }

    setShowPreview(true);
  }

  function sendToWhatsApp() {
    if (hasMissingFields) {
      setTouched(true);
      return;
    }

    onPlaceOrder({
      customer: {
        ...customer,
        countryCode: checkoutRegion.countryCode,
        regionLabel: checkoutRegion.label,
      },
      whatsappMessage,
      whatsappUrl,
      checkoutRegion,
    });

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="checkout-page wrap">
      <button
        type="button"
        className="back-link"
        onClick={() => setPage("shop")}
      >
        {STORE_SETTINGS.labels.backToShop}
      </button>

      <h1 className="checkout-title">{STORE_SETTINGS.labels.checkout}</h1>

      <p className="checkout-subtitle">
        Review your cart, add delivery details, choose the active payment flow,
        preview the message, then send the order through the correct WhatsApp
        number.
      </p>

      {cartItems.length === 0 ? (
        <div className="empty-checkout-card">
          <EmptyState
            icon={<CartIcon />}
            eyebrow="Cart needed first"
            title="Your checkout is empty"
            message="Add products to your cart before preparing the WhatsApp order message. You can still browse products or ask questions before ordering."
            tips={["Choose products", "Review cart", "Send on WhatsApp"]}
          >
            <button
              className="btn"
              type="button"
              onClick={() => setPage("shop")}
            >
              {STORE_SETTINGS.labels.continueShopping}
            </button>

            <button
              className="btn btn-outline"
              type="button"
              onClick={() => setPage("contact")}
            >
              <WhatsAppIcon /> Ask a question
            </button>
          </EmptyState>
        </div>
      ) : (
        <>
          <div className="checkout-steps" aria-label="Checkout steps">
            <div className="checkout-step is-complete">
              <span>1</span>Cart review
            </div>

            <div
              className={`checkout-step ${showPreview ? "is-complete" : "is-active"}`}
            >
              <span>2</span>Customer details
            </div>

            <div
              className={`checkout-step ${showPreview ? "is-complete" : "is-active"}`}
            >
              <span>3</span>Payment method
            </div>

            <div className={`checkout-step ${showPreview ? "is-active" : ""}`}>
              <span>4</span>WhatsApp preview
            </div>
          </div>

          <div className="checkout-layout">
            <section className="checkout-items-card">
              <h2>{STORE_SETTINGS.labels.orderSummary}</h2>

              <div className="checkout-items">
                {cartItems.map((item) => (
                  <div className="checkout-item" key={item.id}>
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />

                    <div className="checkout-info">
                      <h3>{item.name}</h3>
                      <p>{item.size}</p>

                      <div className="checkout-price-line">
                        <PriceDisplay product={item} />

                        <span className="line-total">
                          {formatCurrency(item.finalPrice * item.quantity)}
                        </span>
                      </div>

                      <div className="cart-qty-row checkout-qty-row">
                        <button
                          type="button"
                          onClick={() =>
                            changeCartQuantity(
                              item.id,
                              (currentQuantity) => currentQuantity - 1,
                            )
                          }
                        >
                          -
                        </button>

                        <span>
                          {STORE_SETTINGS.labels.quantity}: {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            changeCartQuantity(
                              item.id,
                              (currentQuantity) => currentQuantity + 1,
                            )
                          }
                        >
                          +
                        </button>

                        <button
                          type="button"
                          className="cart-remove"
                          onClick={() => removeFromCart(item.id)}
                        >
                          {STORE_SETTINGS.labels.remove}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="checkout-summary-card">
              <h2>{STORE_SETTINGS.labels.total}</h2>

              <div className="summary-line">
                <span>{STORE_SETTINGS.labels.subtotal}</span>
                <strong>{formatCurrency(total)}</strong>
              </div>

              <div className="summary-line">
                <span>{STORE_SETTINGS.labels.savings}</span>
                <strong>{formatCurrency(savings)}</strong>
              </div>

              <div className="summary-total">
                <span>{STORE_SETTINGS.labels.total}</span>
                <strong>{formatCurrency(total)}</strong>
              </div>

              <PaymentMethodSection compact />

              <div className="customer-box">
                <p className="local-save-note">
                  Saved on this device, so refresh will not erase typed checkout
                  details.
                </p>

                <div>
                  <h3>{STORE_SETTINGS.labels.customerDetails}</h3>
                  <p className="customer-helper">
                    Choose Ghana or USA first. That decides which business
                    WhatsApp number receives the order.
                  </p>
                </div>

                <div
                  className="country-code-selector"
                  aria-label="Customer country code"
                >
                  {checkoutRegions.map((region) => (
                    <button
                      key={region.id}
                      type="button"
                      className={
                        customer.phoneRegion === region.id ? "is-selected" : ""
                      }
                      onClick={() => updateCustomer("phoneRegion", region.id)}
                    >
                      <strong>{region.label}</strong>
                      <span>{region.countryCode}</span>
                    </button>
                  ))}
                </div>

                <p className="customer-helper route-helper">
                  {checkoutRegion.helper} Destination:{" "}
                  {checkoutRegion.businessWhatsappDisplay}
                </p>

                <label>
                  Full name *
                  <input
                    type="text"
                    value={customer.name}
                    onChange={(event) =>
                      updateCustomer("name", event.target.value)
                    }
                    placeholder="Customer name"
                    aria-invalid={touched && !requiredFields.name}
                  />
                </label>

                <label>
                  Phone number *
                  <div className="phone-input-row">
                    <span>{checkoutRegion.countryCode}</span>
                    <input
                      type="tel"
                      value={customer.phone}
                      onChange={(event) =>
                        updateCustomer("phone", event.target.value)
                      }
                      placeholder={checkoutRegion.phonePlaceholder}
                      aria-invalid={touched && !requiredFields.phone}
                    />
                  </div>
                </label>

                <div
                  className="checkout-choice-group"
                  aria-label="Delivery method"
                >
                  <button
                    type="button"
                    className={
                      customer.deliveryMethod === "delivery"
                        ? "is-selected"
                        : ""
                    }
                    onClick={() => updateCustomer("deliveryMethod", "delivery")}
                  >
                    Delivery
                  </button>

                  <button
                    type="button"
                    className={
                      customer.deliveryMethod === "pickup" ? "is-selected" : ""
                    }
                    onClick={() => updateCustomer("deliveryMethod", "pickup")}
                  >
                    Pickup
                  </button>
                </div>

                <label>
                  Delivery location or pickup note *
                  <input
                    type="text"
                    value={customer.location}
                    onChange={(event) =>
                      updateCustomer("location", event.target.value)
                    }
                    placeholder={
                      customer.phoneRegion === "usa"
                        ? "City, State, ZIP code"
                        : "Teshie, East Legon, Accra, etc."
                    }
                    aria-invalid={touched && !requiredFields.location}
                  />
                </label>

                <label>
                  Extra notes
                  <textarea
                    value={customer.notes}
                    onChange={(event) =>
                      updateCustomer("notes", event.target.value)
                    }
                    placeholder="Delivery preference, bulk order note, or international order question"
                  ></textarea>
                </label>
              </div>

              {touched && hasMissingFields ? (
                <p className="checkout-error">
                  Please add your name, phone number, and delivery location
                  before previewing the WhatsApp order.
                </p>
              ) : null}

              <button
                className="btn checkout-btn"
                type="button"
                onClick={preparePreview}
              >
                <WhatsAppIcon /> Preview WhatsApp message
              </button>

              <p className="checkout-note">
                The selected country/phone region controls which business
                WhatsApp number receives the message.
              </p>
            </aside>
          </div>

          {showPreview ? (
            <section className="whatsapp-preview-card" aria-live="polite">
              <div className="whatsapp-preview-head">
                <div>
                  <p className="eyebrow">WhatsApp checkout</p>
                  <h2>Message preview</h2>

                  <p className="preview-payment-copy">
                    Payment selected: WhatsApp order confirmation. Paystack
                    online payment is shown as coming soon.
                  </p>
                </div>

                <span>Sending to {checkoutRegion.businessWhatsappDisplay}</span>
              </div>

              <pre>{whatsappMessage}</pre>

              <div className="whatsapp-actions">
                <button className="btn" type="button" onClick={sendToWhatsApp}>
                  <WhatsAppIcon /> Send order on WhatsApp
                </button>

                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={() => setShowPreview(false)}
                >
                  ← Edit details
                </button>
              </div>

              <p className="checkout-note">
                WhatsApp will open in a new tab or app with this message already
                filled in. The customer can review it before sending.
              </p>
            </section>
          ) : null}
        </>
      )}
    </main>
  );
}
