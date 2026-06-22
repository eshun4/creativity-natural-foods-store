export function CreateAccountPage({ setPage }) {
  return (
    <main className="account-page wrap">
      <button
        className="back-link"
        type="button"
        onClick={() => setPage("shop")}
      >
        Back to shop
      </button>

      <section className="account-card account-form-card">
        <p className="eyebrow">Account paused</p>
        <h1>Create account disabled</h1>
        <p className="account-muted">
          Account creation is paused for now. The store is guest-checkout first,
          so customers only need their cart and WhatsApp order details.
        </p>
        <button className="btn" type="button" onClick={() => setPage("shop")}>
          Continue shopping
        </button>
      </section>
    </main>
  );
}
