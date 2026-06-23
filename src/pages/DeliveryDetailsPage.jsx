import { useEffect, useState } from "react";
import { DeliveryInfoSection } from "../components/DeliveryInfoSection";
import { STORAGE_KEYS, readStorage, writeStorage } from "../utils/storage";
import {
  MessageCircleIcon,
  ShieldIcon,
  TrackingIcon,
  TruckIcon,
} from "../components/icons";

const INITIAL_DELIVERY_DETAILS = {
  name: "",
  phone: "",
  destination: "ghana",
  location: "",
  courier: "quote",
  notes: "",
};

function isFilled(value) {
  return String(value || "").trim().length > 0;
}

export function DeliveryDetailsPage({ setPage }) {
  const [details, setDetails] = useState(() => ({
    ...INITIAL_DELIVERY_DETAILS,
    ...readStorage(STORAGE_KEYS.deliveryDetails, INITIAL_DELIVERY_DETAILS),
  }));

  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("delivery");

  useEffect(() => {
    writeStorage(STORAGE_KEYS.deliveryDetails, details);
  }, [details]);

  function updateDetail(field, value) {
    setDetails((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  function saveDetails(event) {
    event.preventDefault();
    writeStorage(STORAGE_KEYS.deliveryDetails, details);
    setSaved(true);
  }

  return (
    <main className="delivery-page-modern">
      <section className="delivery-page-hero">
        <div className="wrap">
          <button
            className="back-link delivery-back-link"
            type="button"
            onClick={() => setPage("account")}
          >
            Back to account
          </button>

          <div className="delivery-hero-grid">
            <div className="delivery-hero-copy">
              <p className="eyebrow delivery-page-eyebrow">
                <span>
                  <TruckIcon />
                </span>
                Delivery details
              </p>

              <h1>Delivery & tracking</h1>

              <p>
                Save local or international delivery information and show
                customers how Ghana delivery, pickup, and future carrier
                tracking will work.
              </p>

              <div className="delivery-hero-note">
                <span>
                  <ShieldIcon />
                </span>
                These details persist in LocalStorage on this device.
              </div>
            </div>

            <div className="delivery-form-shell">
              <div
                className="delivery-tab-group"
                role="tablist"
                aria-label="Delivery form tabs"
              >
                <button
                  className={`delivery-tab ${activeTab === "delivery" ? "active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "delivery"}
                  onClick={() => setActiveTab("delivery")}
                >
                  Delivery
                </button>

                <button
                  className={`delivery-tab ${activeTab === "tracking" ? "active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "tracking"}
                  onClick={() => setActiveTab("tracking")}
                >
                  Tracking
                </button>
              </div>

              <div className="delivery-tab-content">
                {activeTab === "delivery" ? (
                  <form className="delivery-styled-form" onSubmit={saveDetails}>
                    <h2>Customer delivery info</h2>

                    <div className="delivery-top-row">
                      <div className="delivery-field-wrap">
                        <label
                          className={
                            isFilled(details.name) ? "active highlight" : ""
                          }
                        >
                          Full name<span className="req">*</span>
                        </label>
                        <input
                          type="text"
                          value={details.name}
                          onChange={(event) =>
                            updateDetail("name", event.target.value)
                          }
                          required
                          autoComplete="name"
                        />
                      </div>

                      <div className="delivery-field-wrap">
                        <label
                          className={
                            isFilled(details.phone) ? "active highlight" : ""
                          }
                        >
                          Phone number<span className="req">*</span>
                        </label>
                        <input
                          type="tel"
                          value={details.phone}
                          onChange={(event) =>
                            updateDetail("phone", event.target.value)
                          }
                          required
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    <div className="delivery-field-wrap delivery-select-field">
                      {/* <label className="active highlight">
                        Delivery destination<span className="req">*</span>
                      </label> */}
                      <select
                        value={details.destination}
                        onChange={(event) =>
                          updateDetail("destination", event.target.value)
                        }
                        required
                      >
                        <option value="ghana">Ghana delivery</option>
                        <option value="pickup">Local pickup</option>
                        <option value="usa">
                          USA / international shipping
                        </option>
                      </select>
                    </div>

                    <div className="delivery-field-wrap">
                      <label
                        className={
                          isFilled(details.location) ? "active highlight" : ""
                        }
                      >
                        Delivery location<span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        value={details.location}
                        onChange={(event) =>
                          updateDetail("location", event.target.value)
                        }
                        required
                        autoComplete="street-address"
                      />
                    </div>

                    <button className="delivery-form-button" type="submit">
                      Save delivery details
                    </button>

                    {saved ? (
                      <p className="delivery-saved-confirmation" role="status">
                        Delivery details saved locally.
                      </p>
                    ) : null}
                  </form>
                ) : (
                  <form className="delivery-styled-form" onSubmit={saveDetails}>
                    <h2>Tracking preferences</h2>

                    <div className="delivery-field-wrap delivery-select-field">
                      <label className="active highlight">
                        Preferred courier<span className="req">*</span>
                      </label>
                      <select
                        value={details.courier}
                        onChange={(event) =>
                          updateDetail("courier", event.target.value)
                        }
                        required
                      >
                        <option value="quote">
                          Recommend best option after quote
                        </option>
                        <option value="dhl">DHL</option>
                        <option value="ups">UPS</option>
                        <option value="fedex">FedEx</option>
                        <option value="other">Other courier</option>
                      </select>
                    </div>

                    <div className="delivery-field-wrap delivery-textarea-field">
                      <label
                        className={
                          isFilled(details.notes) ? "active highlight" : ""
                        }
                      >
                        Delivery notes
                      </label>
                      <textarea
                        value={details.notes}
                        onChange={(event) =>
                          updateDetail("notes", event.target.value)
                        }
                        rows={5}
                      />
                    </div>

                    <button className="delivery-form-button" type="submit">
                      Save tracking details
                    </button>

                    {saved ? (
                      <p className="delivery-saved-confirmation" role="status">
                        Tracking details saved locally.
                      </p>
                    ) : null}
                  </form>
                )}
              </div>
            </div>
          </div>

          <aside className="delivery-policy-strip">
            <div>
              <span>
                <MessageCircleIcon />
              </span>
              <strong>Ghana delivery cost is confirmed on WhatsApp.</strong>
            </div>

            <div>
              <span>
                <TruckIcon />
              </span>
              <strong>
                International buyers receive a shipping quote before payment.
              </strong>
            </div>

            <div>
              <span>
                <TrackingIcon />
              </span>
              <strong>
                Courier tracking can be shown once a tracking number is added.
              </strong>
            </div>
          </aside>
        </div>
      </section>

      <DeliveryInfoSection setPage={setPage} variant="page" />
    </main>
  );
}
