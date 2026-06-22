export function AccountPage({
  setPage,
  cartCount = 0,
  wishlistCount = 0,
  orderCount = 0,
}) {
  return (
    <main className="account-page wrap">
      <button
        className="back-link"
        type="button"
        onClick={() => setPage("shop")}
      >
        Back to shop
      </button>

      <section className="account-card">
        <p className="eyebrow">Account centre</p>
        <h1>Your account</h1>
        <p className="account-muted">
          Account sign-in and create-account forms are paused for version one.
          Customers can still browse, save products on this device, and checkout
          as guests through WhatsApp.
        </p>

        <div
          className="local-storage-strip"
          aria-label="Saved locally on this device"
        >
          <div className="local-storage-stat">
            <strong className="local-storage-stat__value">{cartCount}</strong>
            <span className="local-storage-stat__label">cart items</span>
          </div>
          <div className="local-storage-stat">
            <strong className="local-storage-stat__value">
              {wishlistCount}
            </strong>
            <span className="local-storage-stat__label">saved products</span>
          </div>
          <div className="local-storage-stat">
            <strong className="local-storage-stat__value">{orderCount}</strong>
            <span className="local-storage-stat__label">saved orders</span>
          </div>
        </div>

        <div className="account-grid">
          <button
            className="account-tile is-disabled"
            type="button"
            disabled
            aria-disabled="true"
          >
            <strong>Profile details</strong>
            <span>
              Coming later when sign in and saved customer profiles are
              connected.
            </span>
          </button>

          <button
            className="account-tile"
            type="button"
            onClick={() => setPage("orders")}
          >
            <strong>Your orders</strong>
            <span>
              View saved WhatsApp checkout history.
              {orderCount ? ` ${orderCount} saved.` : ""}
            </span>
          </button>

          <button
            className="account-tile"
            type="button"
            onClick={() => setPage("wishlist")}
          >
            <strong>Wish list</strong>
            <span>
              Products you've saved for later.
              {wishlistCount ? ` ${wishlistCount} saved.` : ""}
            </span>
          </button>

          <button
            className="account-tile"
            type="button"
            onClick={() => setPage("delivery-details")}
          >
            <strong>Delivery details</strong>
            <span>Save your Ghana or international delivery address.</span>
          </button>

          <button
            className="account-tile"
            type="button"
            onClick={() => setPage("checkout-preferences")}
          >
            <strong>Checkout preferences</strong>
            <span>Preferred payment and WhatsApp ordering settings.</span>
          </button>
        </div>

        <div className="account-actions">
          <button
            className="btn btn-outline is-disabled"
            type="button"
            disabled
            aria-disabled="true"
          >
            Sign out paused
          </button>
        </div>
      </section>
    </main>
  );
}
