import { CreditCardIcon, WhatsAppIcon, ShieldIcon } from "./icons";

export function PaymentMethodSection({ compact = false }) {
  return (
    <section
      className={`payment-method-card ${compact ? "payment-method-card--compact" : ""}`}
      aria-label="Payment method"
    >
      <div className="payment-method-head">
        <div>
          <p className="eyebrow">Payment method</p>
          {/* <h3>Choose how this order starts</h3> */}
        </div>
        {/* <span className="payment-method-chip">Frontend placeholder</span> */}
      </div>

      <div className="payment-options-grid">
        <div className="payment-option is-active" aria-current="true">
          <span className="payment-option-icon">
            <WhatsAppIcon />
          </span>
          <div>
            <strong>Order through WhatsApp</strong>
            <p>
              Active now. Customer sends the order first, then the business
              confirms availability, delivery cost, and payment instructions.
            </p>
          </div>
          <span className="payment-status is-live">Available</span>
        </div>

        <div className="payment-option is-disabled" aria-disabled="true">
          <span className="payment-option-icon">
            <CreditCardIcon />
          </span>
          <div>
            <strong>Pay Online</strong>
            <p>
              Coming soon. This design is ready for future card, mobile money,
              and bank payment checkout after backend setup.
            </p>
          </div>
          <span className="payment-status">Coming soon</span>
        </div>
      </div>

      <div className="payment-readiness-note"></div>
    </section>
  );
}
