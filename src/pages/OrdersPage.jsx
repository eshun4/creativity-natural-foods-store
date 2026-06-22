import { formatCurrency } from '../config/storeSettings';
import { EmptyState } from '../components/EmptyState';
import { PackageIcon } from '../components/icons';
import { getCartTotal } from '../utils/cart';

function formatOrderDate(value) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(value));
  } catch {
    return 'Saved order';
  }
}

export function OrdersPage({ setPage, orderHistory = [] }) {
  return (
    <main className="account-page wrap">
      <button className="back-link" type="button" onClick={() => setPage('account')}>Back to account</button>

      <section className="account-card">
        <p className="eyebrow">Order history</p>
        <h1>Your orders</h1>
        <p className="account-muted">WhatsApp checkout orders are saved on this device so customers can come back and review them.</p>

        {orderHistory.length > 0 ? (
          <div className="order-history-list">
            {orderHistory.map((order) => {
              const total = getCartTotal(order.items || []);
              const customer = order.details?.customer;
              return (
                <article className="order-history-card" key={order.id}>
                  <div className="order-history-head">
                    <div>
                      <strong>{order.id}</strong>
                      <span>{formatOrderDate(order.createdAt)}</span>
                    </div>
                    <strong>{formatCurrency(total)}</strong>
                  </div>
                  {customer ? (
                    <p className="order-history-customer">
                      {customer.name} · {customer.deliveryMethod === 'pickup' ? 'Pickup' : 'Delivery'} · {customer.location}
                    </p>
                  ) : null}
                  <div className="order-history-items">
                    {(order.items || []).map((item) => (
                      <span key={`${order.id}-${item.id}`}>{item.name} × {item.quantity}</span>
                    ))}
                  </div>
                  {order.details?.whatsappUrl ? (
                    <button
                      className="btn btn-outline"
                      type="button"
                      onClick={() => window.open(order.details.whatsappUrl, '_blank', 'noopener,noreferrer')}
                    >
                      Open WhatsApp message
                    </button>
                  ) : null}
                </article>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={<PackageIcon />}
            eyebrow="No orders yet"
            title="Your order history is empty"
            message="After a customer completes WhatsApp checkout, this page will show past orders from LocalStorage, including order items, total, and saved WhatsApp message link."
            tips={["Start with a cart", "Checkout on WhatsApp", "Track later"]}
          >
            <button className="btn" type="button" onClick={() => setPage('shop')}>Browse products</button>
            <button className="btn btn-outline" type="button" onClick={() => setPage('delivery-details')}>View delivery info</button>
          </EmptyState>
        )}
      </section>
    </main>
  );
}
