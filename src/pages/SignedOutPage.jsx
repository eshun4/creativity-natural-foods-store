export function SignedOutPage({ setPage }) {
  return (
    <main className="account-page wrap">
      <section className="account-card account-form-card">
        <p className="eyebrow">Account paused</p>
        <h1>Sign out disabled</h1>
        <p className="account-muted">
          Sign out is not active because sign in is not connected yet. Customers
          can continue shopping as guests.
        </p>
        <button className="btn" type="button" onClick={() => setPage("shop")}>
          Back to shop
        </button>
      </section>
    </main>
  );
}
