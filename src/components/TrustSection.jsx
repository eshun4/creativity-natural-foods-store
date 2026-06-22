import { BadgeCheckIcon, GhanaFlagIcon, GlobeIcon, LeafIcon, MessageCircleIcon, ShieldIcon, WhatsAppIcon } from './icons';

const trustBadges = [
  {
    icon: <GhanaFlagIcon />,
    iconTone: 'ghana',
    title: 'Made in Ghana',
    text: 'Produced by Debee Farms in Teshie-Nungua with a local Ghanaian food identity.',
  },
  {
    icon: <LeafIcon />,
    iconTone: 'leaf',
    title: 'Natural pantry staples',
    text: 'Honey, porridge mixes, sorghum powder, and groundnut paste selected for everyday family use.',
  },
  {
    icon: <ShieldIcon />,
    iconTone: 'gold',
    title: 'Order confirmed first',
    text: 'Every order can be reviewed through WhatsApp before packing, delivery, or shipping is finalized.',
  },
  {
    icon: <WhatsAppIcon />,
    iconTone: 'whatsapp',
    title: 'WhatsApp support',
    text: 'Customers can ask questions, confirm stock, and send delivery notes before completing the order.',
  },
];

const trustHighlights = [
  {
    icon: <GhanaFlagIcon />,
    iconTone: 'ghana',
    value: 'Ghana',
    label: 'local production',
    text: 'Produced with a clear Ghana-rooted brand identity and local food focus.',
  },
  {
    icon: <WhatsAppIcon />,
    iconTone: 'whatsapp',
    value: 'WhatsApp',
    label: 'human order support',
    text: 'Customers speak to a real person for stock, delivery, and order confirmation.',
  },
  {
    icon: <GlobeIcon />,
    iconTone: 'blue',
    value: 'Local + abroad',
    label: 'delivery-ready design',
    text: 'Structured for Ghana delivery first, with room for international shipping later.',
  },
];

export function TrustSection() {
  return (
    <section className="trust-section" aria-label="Why customers can trust us">
      <div className="trust-inner wrap">
        <div className="trust-copy-card">
          <p className="eyebrow trust-eyebrow"><span className="trust-eyebrow-icon"><ShieldIcon /></span>Why customers can trust us</p>
          <h2>Real food, clear ordering, and human support before checkout</h2>
          <p className="trust-copy-lead">This store is designed to make buyers feel safe before they pay. Customers can see what they are ordering, confirm availability, ask delivery questions, and send the final order directly through WhatsApp.</p>

          <div className="trust-rating-card" aria-label="Customer trust highlights">
            <span className="trust-rating-icon"><ShieldIcon /></span>
            <div>
              <strong>Built for first-time buyers</strong>
              <p>Simple product cards, visible delivery notes, and WhatsApp confirmation reduce confusion before purchase.</p>
            </div>
          </div>
        </div>

        <div className="trust-badge-grid">
          {trustBadges.map((badge) => (
            <article className="trust-badge-card" key={badge.title}>
              <span className={`trust-badge-icon ${badge.iconTone ? `icon-tone-${badge.iconTone}` : ""}`}>{badge.icon}</span>
              <div>
                <strong>{badge.title}</strong>
                <p>{badge.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="trust-highlight-strip" aria-label="Trust summary highlights">
          {trustHighlights.map((highlight) => (
            <article className="trust-highlight-card" key={highlight.label}>
              <span className={`trust-highlight-icon ${highlight.iconTone ? `icon-tone-${highlight.iconTone}` : ""}`}>{highlight.icon}</span>
              <div className="trust-highlight-copy">
                <strong>{highlight.value}</strong>
                <span>{highlight.label}</span>
                <p>{highlight.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
