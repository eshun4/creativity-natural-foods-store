import { STORE_SETTINGS } from '../config/storeSettings';
import { WhatsAppIcon } from '../components/icons';

export function ContactPage({ setPage }) {
  return (
    <main className="content-page wrap">
      <button className="back-link" type="button" onClick={() => setPage('shop')}>Back to shop</button>

      <section className="content-card">
        <p className="eyebrow">Get in touch</p>
        <h1>Contact us</h1>
        <p>
          Reach out for orders, product questions, or wholesale enquiries. We are based in Teshie-Nungua, Accra, Ghana.
        </p>

        <div className="content-grid">
          <div>
            <strong>Phone / WhatsApp</strong>
            <span>{STORE_SETTINGS.brand.phoneText}</span>
          </div>
          <div>
            <strong>Address</strong>
            <span>{STORE_SETTINGS.brand.addressLines.join(', ')}</span>
          </div>
          <div>
            <strong>Produced by</strong>
            <span>{STORE_SETTINGS.brand.producedBy}</span>
          </div>
        </div>

        <div className="content-form-section">
          <p className="eyebrow">Send a message</p>
          <form className="account-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              Your name
              <input type="text" placeholder="Full name" />
            </label>
            <label>
              Phone / WhatsApp number
              <input type="tel" placeholder="0244 000 000" />
            </label>
            <label>
              Message
              <textarea placeholder="Your question or order enquiry" rows={4}></textarea>
            </label>
            <button className="btn account-btn btn-pill" type="button"><WhatsAppIcon /> Send message</button>
          </form>
        </div>
      </section>
    </main>
  );
}
