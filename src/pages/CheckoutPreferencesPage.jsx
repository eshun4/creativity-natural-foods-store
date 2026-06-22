import { useEffect, useState } from 'react';
import { STORAGE_KEYS, readStorage, writeStorage } from '../utils/storage';
import { PaymentMethodSection } from '../components/PaymentMethodSection';

const INITIAL_PREFERENCES = {
  contactMethod: '',
  payment: 'whatsapp',
  deliveryArea: '',
};

export function CheckoutPreferencesPage({ setPage }) {
  const [preferences, setPreferences] = useState(() => ({
    ...INITIAL_PREFERENCES,
    ...readStorage(STORAGE_KEYS.checkoutPreferences, INITIAL_PREFERENCES),
  }));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.checkoutPreferences, preferences);
  }, [preferences]);

  function updatePreference(field, value) {
    setPreferences((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  function savePreferences() {
    writeStorage(STORAGE_KEYS.checkoutPreferences, preferences);
    setSaved(true);
  }

  return (
    <main className="account-page wrap">
      <button className="back-link" type="button" onClick={() => setPage('account')}>Back to account</button>

      <section className="account-card account-form-card">
        <p className="eyebrow">Checkout preferences</p>
        <h1>Ordering preferences</h1>
        <p className="account-muted">Set up preferred contact, delivery, and payment expectations for future checkout.</p>
        <p className="local-save-note">Preferences are saved in LocalStorage on this device.</p>

        <form className="account-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Preferred contact method
            <input
              type="text"
              placeholder="WhatsApp, phone call, or email"
              value={preferences.contactMethod}
              onChange={(event) => updatePreference('contactMethod', event.target.value)}
            />
          </label>

          <label>
            Preferred delivery area
            <input
              type="text"
              placeholder="Accra, Tema, international, etc."
              value={preferences.deliveryArea}
              onChange={(event) => updatePreference('deliveryArea', event.target.value)}
            />
          </label>

          <button className="btn account-btn" type="button" onClick={savePreferences}>Save preferences</button>
          {saved ? <p className="saved-confirmation" role="status">Checkout preferences saved locally.</p> : null}
        </form>

        {/* Payment section sits outside the form to avoid nesting issues */}
        <div className="prefs-payment-section">
          <PaymentMethodSection compact />
          <div className="preference-payment-note">
            <strong>Saved payment preference: WhatsApp order confirmation</strong>
            <span>Paystack online payment is displayed as coming soon until backend/payment integration starts.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
