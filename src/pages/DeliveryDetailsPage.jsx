import { useEffect, useState } from 'react';
import { DeliveryInfoSection } from '../components/DeliveryInfoSection';
import { STORAGE_KEYS, readStorage, writeStorage } from '../utils/storage';

const INITIAL_DELIVERY_DETAILS = {
  name: '',
  phone: '',
  destination: 'ghana',
  location: '',
  courier: 'quote',
  notes: '',
};

export function DeliveryDetailsPage({ setPage }) {
  const [details, setDetails] = useState(() => ({ ...INITIAL_DELIVERY_DETAILS, ...readStorage(STORAGE_KEYS.deliveryDetails, INITIAL_DELIVERY_DETAILS) }));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.deliveryDetails, details);
  }, [details]);

  function updateDetail(field, value) {
    setDetails((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  function saveDetails() {
    writeStorage(STORAGE_KEYS.deliveryDetails, details);
    setSaved(true);
  }

  return (
    <main className="account-page wrap">
      <button className="back-link" type="button" onClick={() => setPage('account')}>Back to account</button>

      <section className="account-card delivery-details-card">
        <p className="eyebrow">Delivery details</p>
        <h1>Delivery & tracking</h1>
        <p className="account-muted">
          Save local or international delivery information and show customers how Ghana delivery, pickup, and future carrier tracking will work.
        </p>
        <p className="local-save-note">These details persist in LocalStorage on this device.</p>

        <div className="delivery-details-layout">
          <form className="account-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              Full name
              <input type="text" placeholder="Customer name" value={details.name} onChange={(event) => updateDetail('name', event.target.value)} />
            </label>
            <label>
              Phone number
              <input type="tel" placeholder="0244 000 000" value={details.phone} onChange={(event) => updateDetail('phone', event.target.value)} />
            </label>
            <label>
              Delivery destination
              <select value={details.destination} onChange={(event) => updateDetail('destination', event.target.value)}>
                <option value="ghana">Ghana delivery</option>
                <option value="pickup">Local pickup</option>
                <option value="usa">USA / international shipping</option>
              </select>
            </label>
            <label>
              Delivery location
              <input type="text" placeholder="City, area, address, or country" value={details.location} onChange={(event) => updateDetail('location', event.target.value)} />
            </label>
            <label>
              Preferred courier
              <select value={details.courier} onChange={(event) => updateDetail('courier', event.target.value)}>
                <option value="quote">Recommend best option after quote</option>
                <option value="dhl">DHL</option>
                <option value="ups">UPS</option>
                <option value="fedex">FedEx</option>
                <option value="other">Other courier</option>
              </select>
            </label>
            <label>
              Delivery notes
              <textarea placeholder="Landmark, delivery preference, customs note, or preferred delivery window" value={details.notes} onChange={(event) => updateDetail('notes', event.target.value)} />
            </label>
            <button className="btn account-btn" type="button" onClick={saveDetails}>Save details</button>
            {saved ? <p className="saved-confirmation" role="status">Delivery details saved locally.</p> : null}
          </form>

          <aside className="delivery-policy-card">
            <strong>Delivery promise shown to customers</strong>
            <ul>
              <li>Ghana delivery cost is confirmed on WhatsApp.</li>
              <li>International buyers receive a shipping quote before payment.</li>
              <li>Courier tracking can be shown once a tracking number is added.</li>
              <li>Customs, duties, and import rules may depend on the destination country.</li>
            </ul>
          </aside>
        </div>
      </section>

      <DeliveryInfoSection setPage={setPage} variant="page" />
    </main>
  );
}
