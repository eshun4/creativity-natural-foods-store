export function SignInPage({ setPage }) {
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
        <h1>Sign in disabled</h1>
        <p className="account-muted">
          Sign in is not active in this first version. Customers can browse, add
          products to cart, and checkout as guests through WhatsApp.
        </p>
        <button className="btn" type="button" onClick={() => setPage("shop")}>
          Continue shopping
        </button>
      </section>
    </main>
  );
}
