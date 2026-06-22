import { CartIcon, WhatsAppIcon, PackageIcon, ShieldIcon, TruckIcon } from './icons';

const faqGroups = [
  {
    title: 'Ordering',
    icon: <CartIcon />,
    items: [
      {
        question: 'How do I place an order?',
        answer: 'Add products to your cart, review your order, enter your delivery details, then send the prepared order message through WhatsApp. A real person confirms availability, delivery cost, and final total before payment.',
      },
      {
        question: 'Can I order without creating an account?',
        answer: 'Yes. The first version is designed for fast WhatsApp checkout, so customers can order as guests and confirm details through WhatsApp.',
      },
      {
        question: 'Can I order in bulk?',
        answer: 'Yes. Bulk and family-size orders can be requested through WhatsApp. The seller can confirm stock, packaging, delivery cost, and any discount manually.',
      },
    ],
  },
  {
    title: 'Payment',
    icon: <ShieldIcon />,
    items: [
      {
        question: 'How do I pay right now?',
        answer: 'For the first version, payment is confirmed manually after the WhatsApp order is reviewed. Online Paystack payment can be added later when the backend and payment flow are ready.',
      },
      {
        question: 'Why is Paystack marked as coming soon?',
        answer: 'The store is currently focused on frontend design and WhatsApp checkout. Paystack should be added later after order storage, payment references, and confirmation logic are ready.',
      },
    ],
  },
  {
    title: 'Delivery',
    icon: <TruckIcon />,
    items: [
      {
        question: 'Do you deliver inside Ghana?',
        answer: 'Yes. Ghana delivery can be arranged after the order is confirmed on WhatsApp. The exact delivery fee depends on the customer location and order size.',
      },
      {
        question: 'Do you ship to the USA or other countries?',
        answer: 'International shipping can be handled case by case. The customer shares their destination, then the seller confirms courier options, shipping quote, customs notes, and estimated timeline.',
      },
      {
        question: 'Can customers track UPS, FedEx, DHL, or other courier packages?',
        answer: 'The frontend now has a tracking-ready design. Real carrier updates can be connected later through backend APIs, carrier tracking numbers, and services like DHL, UPS, FedEx, or a multi-carrier provider.',
      },
    ],
  },
  {
    title: 'Products',
    icon: <PackageIcon />,
    items: [
      {
        question: 'How should I store the products?',
        answer: 'Keep dry powders sealed in a cool, dry place. Keep honey and paste covered tightly after use. Product-specific storage notes are shown on each product detail page.',
      },
      {
        question: 'Are the products natural?',
        answer: 'The store is positioned around natural Ghanaian pantry staples. Product detail pages explain ingredients, size, storage, and suggested use so customers know what they are buying.',
      },
      {
        question: 'What if an item is out of stock?',
        answer: 'Availability is confirmed on WhatsApp before payment. If an item is unavailable, the seller can suggest a replacement size, wait time, or similar product.',
      },
    ],
  },
];

function FaqItem({ question, answer, open = false }) {
  return (
    <details className="faq-item" open={open}>
      <summary>{question}</summary>
      <p>{answer}</p>
    </details>
  );
}

export function FaqSection({ setPage, variant = 'home' }) {
  const isPage = variant === 'page';
  const visibleGroups = isPage ? faqGroups : faqGroups.slice(0, 3);

  return (
    <section className={`faq-section ${isPage ? 'faq-section-page' : ''}`}>
      <div className="wrap faq-inner">
        <div className="faq-copy-card">
          <p className="eyebrow">Customer questions</p>
          <h2>{isPage ? 'Frequently asked questions' : 'Questions before you order?'}</h2>
          <p>
            Give shoppers quick answers about ordering, payment, delivery, international shipping, storage, and WhatsApp support before they leave the site.
          </p>

          <div className="faq-support-card">
            <span className="faq-support-icon"><WhatsAppIcon /></span>
            <div>
              <strong>Still need help?</strong>
              <p>Send a WhatsApp message and confirm product availability, delivery cost, or bulk order details directly.</p>
            </div>
          </div>

          <div className="faq-actions">
            <button className="btn" type="button" onClick={() => setPage?.('checkout')}>Start WhatsApp order</button>
            {!isPage && (
              <>
                <button className="btn btn-outline" type="button" onClick={() => setPage?.('faq')}>Ask AI FAQ assistant</button>
                <button className="btn btn-outline" type="button" onClick={() => setPage?.('faq')}>View all FAQs</button>
              </>
            )}
          </div>
        </div>

        <div className="faq-group-grid">
          {visibleGroups.map((group, groupIndex) => (
            <article className="faq-group-card" key={group.title}>
              <div className="faq-group-head">
                <span className="faq-group-icon">{group.icon}</span>
                <h3>{group.title}</h3>
              </div>

              <div className="faq-list">
                {(isPage ? group.items : group.items.slice(0, 2)).map((item, itemIndex) => (
                  <FaqItem
                    key={item.question}
                    question={item.question}
                    answer={item.answer}
                    open={groupIndex === 0 && itemIndex === 0}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
