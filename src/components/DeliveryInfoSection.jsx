import { GlobeIcon, MessageCircleIcon, PackageIcon, TrackingIcon, TruckIcon, WhatsAppIcon } from './icons';

const deliveryCards = [
  {
    icon: <TruckIcon />,
    iconTone: 'blue',
    title: 'Delivery inside Ghana',
    text: 'Accra, Tema, Teshie, Nungua, and nearby areas can be confirmed quickly through WhatsApp before payment.',
    meta: 'Best for local buyers',
  },
  {
    icon: <GlobeIcon />,
    iconTone: 'gold',
    title: 'International orders',
    text: 'Customers in the USA and other countries can request a shipping quote before the order is packed.',
    meta: 'Quote before shipping',
  },
  {
    icon: <PackageIcon />,
    iconTone: 'leaf',
    title: 'Courier options',
    text: 'UPS, FedEx, DHL, or another available courier can be selected once the business confirms cost and destination rules.',
    meta: 'Carrier depends on route',
  },
];

const trackingSteps = [
  {
    icon: <MessageCircleIcon />,
    label: 'Order confirmed',
    detail: 'Customer sends WhatsApp order',
    meta: 'Step 01',
  },
  {
    icon: <PackageIcon />,
    label: 'Packed in Ghana',
    detail: 'Items prepared for dispatch',
    meta: 'Step 02',
  },
  {
    icon: <TruckIcon />,
    label: 'Shipped with courier',
    detail: 'Tracking number added',
    meta: 'Step 03',
  },
  {
    icon: <TrackingIcon />,
    label: 'Out for delivery',
    detail: 'Customer follows delivery updates',
    meta: 'Step 04',
  },
];

export function DeliveryInfoSection({ setPage, variant = 'home' }) {
  const isFullPage = variant === 'page';

  return (
    <section className={`delivery-info-section ${isFullPage ? 'delivery-info-page' : ''}`}>
      <div className="delivery-info-inner wrap">
        <div className="delivery-info-copy">
          <p className="eyebrow delivery-eyebrow"><span className="delivery-whatsapp-icon icon-tone-whatsapp"><WhatsAppIcon /></span>Delivery information</p>
          <h2>Local pickup,{'\u00a0'}<br />Ghana delivery &amp;<br />International shipping</h2>
          <p>
            Customers can order through WhatsApp first. For international buyers, the store can confirm shipping cost,
            carrier choice, and customs notes before the final payment step.
          </p>
          <div className="delivery-actions">
            <button className="btn whatsapp-order-btn" type="button" onClick={() => setPage?.('checkout')}><WhatsAppIcon />Start WhatsApp order</button>
            <button className="btn btn-outline" type="button" onClick={() => setPage?.('delivery-details')}>View delivery details</button>
          </div>
        </div>

        <div className="delivery-card-grid">
          {deliveryCards.map((card) => (
            <article className="delivery-card" key={card.title}>
              <span className={`delivery-card-icon ${card.iconTone ? `icon-tone-${card.iconTone}` : ""}`}>{card.icon}</span>
              <div>
                <strong>{card.title}</strong>
                <p>{card.text}</p>
                <small>{card.meta}</small>
              </div>
            </article>
          ))}
        </div>

        <div className="tracking-preview-card">
          <div className="tracking-preview-head">
            <span className="delivery-card-icon tracking-icon"><TrackingIcon /></span>
            <div>
              <p className="eyebrow">Future tracking</p>
              <h3>Package tracking preview</h3>
              <p>Clear delivery updates for customers after a courier is selected and a tracking number is added.</p>
            </div>
          </div>

          <div className="tracking-demo-meta tracking-courier-strip">
            <span><TruckIcon /> DHL</span>
            <span><PackageIcon /> UPS</span>
            <span><GlobeIcon /> FedEx</span>
            <span><TrackingIcon /> Other courier</span>
          </div>

          <div className="tracking-route-card" aria-label="Package tracking journey preview">
            <div className="tracking-route-line" aria-hidden="true"></div>
            <ol className="tracking-timeline">
              {trackingSteps.map((step, index) => (
                <li className={index < 2 ? 'is-complete' : ''} key={step.label}>
                  <span className="tracking-point">{step.icon}</span>
                  <div>
                    <small>{step.meta}</small>
                    <strong>{step.label}</strong>
                    <p>{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
