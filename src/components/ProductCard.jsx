import { STORE_SETTINGS } from "../config/storeSettings";
import { PriceDisplay } from "./PriceDisplay";
import { BookmarkIcon } from "./icons";

function CartPlusIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

export function ProductCard({
  product,
  t,
  onAddToCart,
  onViewProduct,
  isWishlisted = false,
  onToggleWishlist,
  cartQuantity = 0,
}) {
  return (
    <article className="card" data-category={product.category}>
      <div className="thumb">
        <button
          className="product-thumb-button"
          type="button"
          onClick={() => onViewProduct?.(product)}
          aria-label={`View ${product.name} details`}
        >
          <img
            src={product.image}
            alt={product.alt}
            loading="lazy"
            decoding="async"
          />
        </button>

        <span className="tag" aria-hidden="true">
          {product.categoryName}
        </span>

        <button
          className={`wishlist-chip ${isWishlisted ? "is-saved" : ""}`}
          type="button"
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wish list`
              : `Save ${product.name} to wish list`
          }
          onClick={(event) => {
            event.stopPropagation();
            onToggleWishlist?.(product.id);
          }}
        >
          <BookmarkIcon />
        </button>

        {product.hasDiscount ? (
          <span className="sale-badge" aria-label="On sale">
            {STORE_SETTINGS.labels.discountBadge}
          </span>
        ) : null}
      </div>

      <div className="card-body">
        <h3 className="product-name">{product.name}</h3>
        <span className="size">{product.size}</span>
        <p className="desc">{product.description}</p>

        <div className="card-foot">
          <PriceDisplay product={product} />

          <div className="card-actions">
            <button
              className="details-btn"
              type="button"
              onClick={() => onViewProduct?.(product)}
              aria-label={`Details for ${product.name}`}
            >
              Details
            </button>

            <button
              className="add"
              type="button"
              onClick={() => onAddToCart(product)}
              aria-label={`Add ${product.name} to cart`}
            >
              <CartPlusIcon />
              {cartQuantity > 0 ? `${cartQuantity} in cart` : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
