import {
  CartIcon,
  PackageIcon,
  ShieldIcon,
  TruckIcon,
  WhatsAppIcon,
} from "../components/icons";

const faqItems = [
  {
    icon: <CartIcon />,
    question: "How do I place an order?",
    answer:
      "Add products to your cart, review your order, enter your delivery details, then send the prepared order message through WhatsApp. A real person confirms availability, delivery cost, and final total before payment.",
  },
  {
    icon: <ShieldIcon />,
    question: "Can I order without creating an account?",
    answer:
      "Yes. The first version is designed for fast WhatsApp checkout, so customers can order as guests and confirm details through WhatsApp.",
  },
  {
    icon: <PackageIcon />,
    question: "Can I order in bulk?",
    answer:
      "Yes. Bulk and family-size orders can be requested through WhatsApp. The seller can confirm stock, packaging, delivery cost, and any discount manually.",
  },
  {
    icon: <ShieldIcon />,
    question: "How do I pay right now?",
    answer:
      "For the first version, payment is confirmed manually after the WhatsApp order is reviewed. Online Paystack payment can be added later when the backend and payment flow are ready.",
  },
  {
    icon: <TruckIcon />,
    question: "Do you deliver inside Ghana?",
    answer:
      "Yes. Ghana delivery can be arranged after the order is confirmed on WhatsApp. The exact delivery fee depends on the customer location and order size.",
  },
  {
    icon: <TruckIcon />,
    question: "Do you ship to the USA or other countries?",
    answer:
      "International shipping can be handled case by case. The customer shares their destination, then the seller confirms courier options, shipping quote, customs notes, and estimated timeline.",
  },
  {
    icon: <PackageIcon />,
    question: "How should I store the products?",
    answer:
      "Keep dry powders sealed in a cool, dry place. Keep honey and paste covered tightly after use. Product-specific storage notes are shown on each product detail page.",
  },
  {
    icon: <WhatsAppIcon />,
    question: "What if an item is out of stock?",
    answer:
      "Availability is confirmed on WhatsApp before payment. If an item is unavailable, the seller can suggest a replacement size, wait time, or similar product.",
  },
];

function FaqIllustration() {
  return (
    <div className="faq-visual" aria-hidden="true">
      <svg
        className="faq-hero-art"
        viewBox="0 0 620 520"
        role="img"
        focusable="false"
      >
        <defs>
          <linearGradient id="faqBaseGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.92" />
          </linearGradient>

          <linearGradient id="faqScreenGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--card)" />
            <stop offset="100%" stopColor="var(--surface)" />
          </linearGradient>

          <linearGradient id="faqPanelGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--on-primary)" />
          </linearGradient>

          <filter
            id="faqSoftShadow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="18"
              stdDeviation="18"
              floodColor="#000000"
              floodOpacity="0.22"
            />
          </filter>
        </defs>

        <path
          className="faq-art-bg-shape faq-art-bg-shape-one"
          d="M95 390 C80 265 140 110 285 64 C422 20 536 112 552 244 C568 378 448 474 298 474 C195 474 112 442 95 390Z"
        />

        <path
          className="faq-art-bg-shape faq-art-bg-shape-two"
          d="M62 405 C122 330 208 318 296 358 C386 399 474 390 560 326 L560 520 L62 520Z"
        />

        <g filter="url(#faqSoftShadow)">
          <path
            className="faq-art-floor"
            d="M118 364 L332 250 L518 356 L302 478 Z"
          />

          <path
            className="faq-art-floor-edge"
            d="M118 364 L302 478 L518 356 L518 392 L302 514 L118 398 Z"
          />
        </g>

        <g className="faq-art-screen-group" filter="url(#faqSoftShadow)">
          <path
            className="faq-art-screen-frame"
            d="M220 92 L492 188 L492 342 L220 242 Z"
          />

          <path
            className="faq-art-screen-inner"
            d="M245 128 L468 206 L468 306 L245 226 Z"
          />

          <path
            className="faq-art-top-bar"
            d="M245 128 L468 206 L468 234 L245 156 Z"
          />

          <circle className="faq-art-dot" cx="270" cy="154" r="6" />
          <circle className="faq-art-dot" cx="290" cy="161" r="6" />
          <circle className="faq-art-dot" cx="310" cy="168" r="6" />

          <path
            className="faq-art-card faq-art-card-one"
            d="M274 184 L395 228 L395 254 L274 211 Z"
          />
          <path
            className="faq-art-card faq-art-card-two"
            d="M292 220 L430 269 L430 294 L292 245 Z"
          />
          <path
            className="faq-art-card faq-art-card-three"
            d="M268 236 L375 274 L375 296 L268 258 Z"
          />

          <path
            className="faq-art-stand"
            d="M334 302 L387 322 L387 376 L334 356 Z"
          />
          <path
            className="faq-art-stand-base"
            d="M294 376 L424 418 L386 442 L256 398 Z"
          />

          <text className="faq-art-at faq-art-at-left" x="260" y="116">
            @
          </text>
          <text className="faq-art-at faq-art-at-right" x="452" y="282">
            @
          </text>
        </g>

        <g className="faq-art-person" filter="url(#faqSoftShadow)">
          <path
            className="faq-art-hair"
            d="M183 204 C159 222 162 272 177 294 C196 317 230 301 232 266 C234 226 209 190 183 204Z"
          />
          <circle className="faq-art-face" cx="203" cy="218" r="25" />
          <path
            className="faq-art-body"
            d="M176 250 C198 238 230 245 242 270 L268 400 C238 418 187 416 154 398 Z"
          />
          <path
            className="faq-art-arm-left"
            d="M178 268 C151 286 135 311 128 344"
          />
          <path
            className="faq-art-arm-right"
            d="M232 268 C260 273 278 290 296 314"
          />
          <path
            className="faq-art-hand-left"
            d="M125 343 C120 356 127 362 138 354"
          />
          <path
            className="faq-art-hand-right"
            d="M293 314 C304 319 313 314 309 302"
          />
          <path className="faq-art-leg-left" d="M179 397 L165 456" />
          <path className="faq-art-leg-right" d="M232 397 L244 456" />
          <path className="faq-art-foot-left" d="M162 456 L137 456" />
          <path className="faq-art-foot-right" d="M244 456 L270 456" />
        </g>

        <g className="faq-art-box" filter="url(#faqSoftShadow)">
          <path
            className="faq-art-box-top"
            d="M70 312 L138 276 L198 312 L130 350 Z"
          />
          <path
            className="faq-art-box-left"
            d="M70 312 L130 350 L130 426 L70 388 Z"
          />
          <path
            className="faq-art-box-right"
            d="M130 350 L198 312 L198 388 L130 426 Z"
          />
          <text className="faq-art-box-symbol" x="104" y="362">
            ?
          </text>
        </g>

        <g className="faq-art-bubbles">
          <circle className="faq-art-bubble" cx="88" cy="182" r="12" />
          <circle className="faq-art-bubble" cx="522" cy="118" r="9" />
          <circle className="faq-art-bubble" cx="538" cy="438" r="13" />
          <path
            className="faq-art-spark"
            d="M112 138 L122 158 L143 164 L123 174 L116 195 L106 176 L84 170 L104 158Z"
          />
        </g>
      </svg>
    </div>
  );
}

export function FaqPage({ setPage }) {
  return (
    <main className="faq-page-modern">
      <div className="faq-page-bg" />

      <section
        className="faq-page-shell wrap"
        aria-label="Frequently asked questions"
      >
        <button
          className="back-link faq-back-link"
          type="button"
          onClick={() => setPage("shop")}
        >
          Back to shop
        </button>

        <div className="faq-accordion-panel">
          <div className="faq-logo-holder">
            <FaqIllustration />
          </div>

          <div className="faq-holder">
            <p className="eyebrow faq-page-eyebrow">Help center</p>
            <h1 className="faq-heading">FAQ</h1>

            <p className="faq-page-intro">
              Quick answers for customers ordering Ghanaian natural foods
              locally or internationally.
            </p>

            <div className="faq-details-list">
              {faqItems.map((item, index) => (
                <details
                  className="faq-detail"
                  key={item.question}
                  open={index === 0}
                >
                  <summary className="faq-summary">
                    <span className="faq-question-icon">{item.icon}</span>
                    <span className="faq-question">{item.question}</span>
                  </summary>

                  <p className="faq-text">{item.answer}</p>
                </details>
              ))}
            </div>

            <div className="faq-bottom-help">
              <div>
                <strong>Still need help?</strong>
                <p>
                  Send a WhatsApp message and confirm product availability,
                  delivery cost, or bulk order details directly.
                </p>
              </div>

              <button
                className="btn"
                type="button"
                onClick={() => setPage("contact")}
              >
                Contact us
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
