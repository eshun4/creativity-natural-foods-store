import { useMemo, useState } from "react";
import { STORE_SETTINGS } from "../config/storeSettings";
import {
  GhanaFlagIcon,
  MessageCircleIcon,
  ShieldIcon,
  TrackingIcon,
  WhatsAppIcon,
} from "../components/icons";

const GHANA_BUSINESS_ADDRESS =
  "P.O Box 1277 TN, Teshie Nungua, Accra, Ghana +233";

const GHANA_MAP_QUERY = "Teshie Nungua, Accra, Ghana";

const GOOGLE_MAPS_QUERY = encodeURIComponent(GHANA_MAP_QUERY);
const GOOGLE_MAPS_DISPLAY_QUERY = encodeURIComponent(GHANA_BUSINESS_ADDRESS);

const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${GOOGLE_MAPS_DISPLAY_QUERY}`;
const GOOGLE_MAPS_EMBED_URL = `https://www.google.com/maps?q=${GOOGLE_MAPS_QUERY}&z=16&output=embed`;

function StoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10h16" />
      <path d="M5 10l1.2-5h11.6L19 10" />
      <path d="M6 10v9h12v-9" />
      <path d="M9 19v-5h6v5" />
      <path d="M6 10c0 1.1.9 2 2 2s2-.9 2-2" />
      <path d="M10 10c0 1.1.9 2 2 2s2-.9 2-2" />
      <path d="M14 10c0 1.1.9 2 2 2s2-.9 2-2" />
    </svg>
  );
}

export function ContactPage({ setPage }) {
  const ghanaWhatsapp = STORE_SETTINGS.checkout.regions.ghana;
  const usaWhatsapp = STORE_SETTINGS.checkout.regions.usa;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    storeRegion: "ghana",
    message: "",
  });

  const selectedStore =
    form.storeRegion === "usa"
      ? {
          label: "USA store",
          flag: "🇺🇸",
          whatsappNumber: usaWhatsapp.businessWhatsappNumber,
        }
      : {
          label: "Ghana store",
          flag: "🇬🇭",
          whatsappNumber: ghanaWhatsapp.businessWhatsappNumber,
        };

  const contactCards = useMemo(
    () => [
      {
        icon: <MessageCircleIcon />,
        label: "Order support",
        value: "Ask before you order",
        helper:
          "Confirm product availability, product sizes, delivery options, and bulk order details before checkout.",
      },
      {
        icon: <WhatsAppIcon />,
        label: "WhatsApp checkout",
        value: "Fast message confirmation",
        helper:
          "Your message goes directly to the store you choose, so the right team can respond to your order enquiry.",
      },
      {
        icon: <TrackingIcon />,
        label: "Business location",
        value: "Teshie Nungua, Accra",
        helper: GHANA_BUSINESS_ADDRESS,
      },
    ],
    [],
  );

  function updateField(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function sendToWhatsApp(event) {
    event.preventDefault();

    const cleanName = form.name.trim();
    const cleanPhone = form.phone.trim();
    const cleanEmail = form.email.trim();
    const cleanMessage = form.message.trim();

    const whatsappText = [
      `Hello ${STORE_SETTINGS.brand.name},`,
      "",
      "I have a question from the contact page.",
      "",
      `Selected store: ${selectedStore.label}`,
      `Name: ${cleanName || "Not provided"}`,
      `Phone / WhatsApp: ${cleanPhone || "Not provided"}`,
      `Email: ${cleanEmail || "Not provided"}`,
      "",
      `Message: ${cleanMessage || "Not provided"}`,
    ].join("\n");

    const url = `${STORE_SETTINGS.checkout.whatsappBaseUrl}/${selectedStore.whatsappNumber}?text=${encodeURIComponent(
      whatsappText,
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="contact-page">
      <section
        className="contact-section-bg"
        aria-label="Contact Creativity Natural Foods"
      >
        <div className="contact-overlay">
          <div className="contact-page-inner wrap">
            <button
              className="back-link contact-back-link"
              type="button"
              onClick={() => setPage("shop")}
            >
              Back to shop
            </button>

            <div className="contact-layout">
              <div className="contact-info-panel">
                <p className="eyebrow contact-eyebrow">
                  <span>
                    <ShieldIcon />
                  </span>
                  Human support
                </p>

                <h1 className="contact-title">Have Any Questions?</h1>

                <p className="contact-intro">
                  Reach out before placing an order. We can help you confirm
                  product availability, delivery options, shipping questions,
                  bulk requests, and WhatsApp checkout details.
                </p>

                <div className="contact-trust-row">
                  <span>
                    <GhanaFlagIcon />
                  </span>
                  <strong>Produced in Ghana by Debee Farms</strong>
                </div>

                <ul
                  className="contact-info-list"
                  aria-label="Contact information"
                >
                  {contactCards.map((item) => (
                    <li key={item.label}>
                      <div className="contact-info-icon">{item.icon}</div>

                      <div className="contact-info-text">
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                        <p>{item.helper}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="contact-form-panel">
                <div className="contact-form-card">
                  <div className="contact-form-heading">
                    <p className="eyebrow">Send a message</p>
                    <h2>Message us directly</h2>
                    <p>
                      Choose the store you want to contact, then send your
                      message through WhatsApp.
                    </p>
                  </div>

                  <form className="contact-form" onSubmit={sendToWhatsApp}>
                    <label htmlFor="contact-store">
                      Choose store
                      <div className="contact-select-wrap">
                        <span
                          className="contact-selected-flag"
                          aria-hidden="true"
                        >
                          {selectedStore.flag}
                        </span>

                        <select
                          id="contact-store"
                          name="storeRegion"
                          value={form.storeRegion}
                          onChange={updateField}
                          required
                        >
                          <option value="ghana">🇬🇭 Ghana store</option>
                          <option value="usa">🇺🇸 USA store</option>
                        </select>
                      </div>
                    </label>

                    <label htmlFor="contact-name">
                      Your name
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={updateField}
                        placeholder="Enter your name"
                        required
                      />
                    </label>

                    <label htmlFor="contact-phone">
                      Phone / WhatsApp number
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={updateField}
                        placeholder="Enter your phone number"
                        required
                      />
                    </label>

                    <label htmlFor="contact-email">
                      Email address
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={updateField}
                        placeholder="Enter your email address"
                      />
                    </label>

                    <label htmlFor="contact-message">
                      Message
                      <textarea
                        id="contact-message"
                        name="message"
                        value={form.message}
                        onChange={updateField}
                        rows={5}
                        placeholder="Enter your question or order enquiry"
                        required
                      />
                    </label>

                    <button className="contact-submit-btn" type="submit">
                      Send to {selectedStore.label}
                      <span>
                        <StoreIcon />
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="contact-map-section-full"
        aria-label="Business location map"
      >
        <div className="contact-map-topbar">
          <div>
            <p className="eyebrow">Ghana location</p>
            <h2>Find us in Accra</h2>
          </div>

          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
            Open in Google Maps
          </a>
        </div>

        <div className="contact-full-map-wrap">
          <iframe
            title="Creativity Natural Foods Ghana location map"
            src={GOOGLE_MAPS_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          <a
            className="contact-full-map-pin"
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Open business address in Google Maps"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 21s7-4.8 7-11a7 7 0 1 0-14 0c0 6.2 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
          </a>

          <address>{GHANA_BUSINESS_ADDRESS}</address>
        </div>
      </section>
    </main>
  );
}
