import { STORE_SETTINGS, formatCurrency } from '../config/storeSettings';
import { getCartTotal } from '../utils/cart';
import { EmptyState } from '../components/EmptyState';
import { WhatsAppIcon, PackageIcon } from '../components/icons';
import { PaymentMethodSection } from '../components/PaymentMethodSection';

export function OrderSuccessPage({ orderItems, orderDetails, setPage }) {
  const total = getCartTotal(orderItems || []);

  function reopenWhatsApp() {
    if (orderDetails?.whatsappUrl) {
      window.open(orderDetails.whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <main className="content-page wrap">
      <section className="content-card order-success-card">
        <p className="eyebrow">WhatsApp order prepared</p>
        <h1>Order message is ready</h1>
        <p>
          The WhatsApp checkout message has been prepared with the customer details and order summary.
          The customer can review the message in WhatsApp before sending it to {STORE_SETTINGS.brand.name}.
        </p>

        {orderDetails?.customer ? (
          <div className="order-customer-card">
            <strong>{orderDetails.customer.name}</strong>
            <span>{orderDetails.customer.countryCode ? `${orderDetails.customer.countryCode} ` : ''}{orderDetails.customer.phone}</span>
            <span>{orderDetails.customer.regionLabel ? `${orderDetails.customer.regionLabel} · ` : ''}{orderDetails.customer.deliveryMethod === 'pickup' ? 'Pickup' : 'Delivery'} · {orderDetails.customer.location}</span>
            {orderDetails.checkoutRegion?.businessWhatsappDisplay ? <span>Sent to: {orderDetails.checkoutRegion.businessWhatsappDisplay}</span> : null}
          </div>
        ) : null}

        {orderItems?.length ? (
          <div className="mini-order-list">
            {orderItems.map((item) => (
              <div className="mini-order-item" key={item.id}>
                <span>{item.name} · {item.size} × {item.quantity}</span>
                <strong>{formatCurrency(item.finalPrice * item.quantity)}</strong>
              </div>
            ))}
            <div className="mini-order-total">
              <span>{STORE_SETTINGS.labels.total}</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
          </div>
        ) : (
          <EmptyState
            icon={<PackageIcon />}
            eyebrow="No saved order"
            title="No order details available"
            message="This confirmation page appears after WhatsApp checkout. Start from the shop, add products to cart, and prepare a new WhatsApp order."
            tips={["Add products", "Preview message", "Send on WhatsApp"]}
          >
            <button className="btn" type="button" onClick={() => setPage('shop')}>Start shopping</button>
            <button className="btn btn-outline" type="button" onClick={() => setPage('checkout')}><WhatsAppIcon /> Go to checkout</button>
          </EmptyState>
        )}

        {orderItems?.length ? <PaymentMethodSection compact /> : null}

        {orderDetails?.whatsappMessage ? (
          <details className="saved-whatsapp-message">
            <summary>View WhatsApp message</summary>
            <pre>{orderDetails.whatsappMessage}</pre>
          </details>
        ) : null}

        <div className="account-actions" style={{ marginTop: 20 }}>
          {orderDetails?.whatsappUrl ? (
            <button className="btn" type="button" onClick={reopenWhatsApp}>Open WhatsApp again</button>
          ) : null}
          <button className="btn btn-outline" type="button" onClick={() => setPage('shop')}>Continue shopping</button>
        </div>
      </section>
    </main>
  );
}
