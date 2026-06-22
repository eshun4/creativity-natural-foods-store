import { EmptyState } from '../components/EmptyState';
import { PriceDisplay } from '../components/PriceDisplay';
import { BookmarkIcon } from '../components/icons';

export function WishlistPage({ setPage, wishlistProducts = [], onAddToCart, onViewProduct, onToggleWishlist }) {
  return (
    <main className="account-page wrap">
      <button className="back-link" type="button" onClick={() => setPage('account')}>Back to account</button>

      <section className="account-card">
        <p className="eyebrow">Saved products</p>
        <h1>Your wish list</h1>
        <p className="account-muted">Products you save for later are stored on this device with LocalStorage.</p>

        {wishlistProducts.length > 0 ? (
          <div className="saved-products-grid">
            {wishlistProducts.map((product) => (
              <article className="saved-product-card" key={product.id}>
                <button className="saved-product-image" type="button" onClick={() => onViewProduct?.(product)}>
                  <img src={product.image} alt={product.alt} loading="lazy" decoding="async" />
                </button>
                <div className="saved-product-info">
                  <p className="eyebrow">{product.categoryName}</p>
                  <h3 className="saved-product-name">{product.name}</h3>
                  <span className="size">{product.size}</span>
                  <div className="saved-product-price">
                    <PriceDisplay product={product} />
                  </div>
                  <div className="saved-product-actions">
                    <button className="btn" type="button" onClick={() => onAddToCart?.(product)}>Add to cart</button>
                    <button className="btn btn-outline" type="button" onClick={() => onViewProduct?.(product)}>Details</button>
                    <button className="details-btn" type="button" onClick={() => onToggleWishlist?.(product.id)}>Remove</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<BookmarkIcon />}
            eyebrow="No saved products"
            title="Your wish list is empty"
            message="Tap the save icon on a product card or product detail page to save honey, porridge, and pantry staples for later. Saved products remain here after refresh."
            tips={["Save favorites", "Compare sizes", "Return before checkout"]}
          >
            <button className="btn" type="button" onClick={() => setPage('shop')}>Browse products</button>
            <button className="btn btn-outline" type="button" onClick={() => setPage('account')}>Back to account</button>
          </EmptyState>
        )}
      </section>
    </main>
  );
}
