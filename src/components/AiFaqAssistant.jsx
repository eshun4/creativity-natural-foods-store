import { CartIcon, WhatsAppIcon, ShieldIcon, SparklesIcon } from "./icons";

const supportCards = [
  {
    icon: <WhatsAppIcon />,
    title: "WhatsApp-first",
    text: "Guides customers toward the active order flow, so they know the final order is confirmed by a real person before payment.",
  },
  {
    icon: <ShieldIcon />,
    title: "Policy-aware",
    text: "Keeps the message aligned with store FAQ guidance for delivery, payment timing, product care, and international shipping questions.",
  },
  {
    icon: <CartIcon />,
    title: "Shopping help",
    text: "Helps customers understand quantities, checkout steps, storage notes, and ordering expectations before they open WhatsApp.",
  },
];

export function AiFaqAssistant() {
  return (
    <section className="ai-faq-section" aria-label="Smart help overview">
      <div className="ai-faq-overview-card">
        <div className="ai-faq-overview-copy">
          <span className="ai-faq-main-icon">
            <SparklesIcon />
          </span>
          <p className="eyebrow">Smart help</p>
          <h2>AI FAQ assistant</h2>
          <p>
            A frontend assistant concept that matches customer questions to
            store answers before they leave the page. It is designed for quick
            help, WhatsApp ordering, Ghana and international delivery questions,
            payment guidance, and product storage support.
          </p>
        </div>

        <div className="ai-faq-metric-grid" aria-label="Assistant benefits">
          {supportCards.map((card) => (
            <article key={card.title} className="ai-faq-metric-card">
              <span>{card.icon}</span>
              <strong>{card.title}</strong>
              <small>{card.text}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
