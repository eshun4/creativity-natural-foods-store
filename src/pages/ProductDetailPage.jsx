import { useMemo, useState } from "react";
import { STORE_SETTINGS, formatCurrency } from "../config/storeSettings";
import { PriceDisplay } from "../components/PriceDisplay";
import { EmptyState } from "../components/EmptyState";
import {
  BookmarkIcon,
  LeafIcon,
  PackageIcon,
  ShieldIcon,
  TruckIcon,
} from "../components/icons";

function DetailInfoCard({ title, children, icon }) {
  return (
    <article className="detail-info-card">
      <span className="detail-info-icon">{icon}</span>

      <div>
        <h3>{title}</h3>
        {children}
      </div>
    </article>
  );
}

function DetailPillList({ items = [] }) {
  if (!items.length) return null;

  return (
    <div className="detail-pill-list">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

export function ProductDetailPage({
  product,
  relatedProducts = [],
  setPage,
  onAddToCart,
  onViewProduct,
  isWishlisted = false,
  onToggleWishlist,
}) {
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState("");

  const estimatedTotal = useMemo(() => {
    if (!product) return formatCurrency(0);

    return formatCurrency(product.finalPrice * quantity);
  }, [product, quantity]);

  if (!product) {
    return (
      <main className="detail-page wrap">
        <button
          className="back-link"
          type="button"
          onClick={() => setPage("shop")}
        >
          Back to shop
        </button>

        <section className="detail-card detail-empty-card">
          <EmptyState
            icon={<PackageIcon />}
            eyebrow="Product missing"
            title="Product not found"
            message="The selected product could not be found. It may have been removed, renamed, or is not available in the current product list."
            tips={["Browse all products", "Try search", "Ask on WhatsApp"]}
          >
            <button
              className="btn"
              type="button"
              onClick={() => setPage("shop")}
            >
              Browse products
            </button>

            <button
              className="btn btn-outline"
              type="button"
              onClick={() => setPage("contact")}
            >
              Contact us
            </button>
          </EmptyState>
        </section>
      </main>
    );
  }

  function decreaseQuantity() {
    setQuantity((currentQuantity) => {
      return Math.max(1, currentQuantity - 1);
    });
  }

  function increaseQuantity() {
    setQuantity((currentQuantity) => {
      return Math.min(25, currentQuantity + 1);
    });
  }

  function handleQuantityInput(event) {
    const value = event.target.value;

    if (value === "") {
      setQuantity(1);
      return;
    }

    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) {
      return;
    }

    setQuantity(Math.min(25, Math.max(1, numberValue)));
  }

  function handleAddToCart() {
    const safeQuantity = Math.min(25, Math.max(1, Number(quantity) || 1));

    onAddToCart?.(product, safeQuantity);

    setAddedNotice(`${safeQuantity} × ${product.name} added to cart.`);
  }

  return (
    <main className="detail-page wrap">
      <button
        className="back-link"
        type="button"
        onClick={() => setPage("shop")}
      >
        Back to shop
      </button>

      <section className="detail-card">
        <div className="detail-image-wrap">
          <img
            src={product.image}
            alt={product.alt}
            loading="lazy"
            decoding="async"
          />

          {product.hasDiscount ? (
            <span className="detail-sale-badge">
              {STORE_SETTINGS.labels.discountBadge}
            </span>
          ) : null}
        </div>

        <div className="detail-copy">
          <p className="eyebrow">{product.categoryName}</p>

          <h1>{product.name}</h1>

          <p className="detail-size">{product.size}</p>

          <p className="detail-desc">{product.description}</p>

          <div className="detail-price">
            <PriceDisplay product={product} />
          </div>

          <div
            className="detail-buy-box"
            aria-label="Choose quantity before adding to cart"
          >
            <div>
              <span className="detail-buy-label">Quantity</span>

              <div className="quantity-stepper" data-no-translate>
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <input
                  type="number"
                  min="1"
                  max="25"
                  value={quantity}
                  onChange={handleQuantityInput}
                  aria-label="Product quantity"
                />

                <button
                  type="button"
                  onClick={increaseQuantity}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="detail-estimate">
              <span>Estimated item total</span>
              <strong data-no-translate>{estimatedTotal}</strong>
            </div>
          </div>

          <div className="detail-actions">
            <button
              className="btn"
              type="button"
              onClick={handleAddToCart}
              data-no-translate
            >
              Add {quantity} to cart
            </button>

            <button
              className="btn btn-outline"
              type="button"
              onClick={() => onToggleWishlist?.(product.id)}
            >
              <BookmarkIcon />{" "}
              {isWishlisted ? "Saved to wish list" : "Save for later"}
            </button>

            <button
              className="btn btn-outline"
              type="button"
              onClick={() => setPage("checkout")}
            >
              Go to WhatsApp checkout
            </button>
          </div>

          {addedNotice ? (
            <p className="detail-added-notice" role="status" data-no-translate>
              {addedNotice}
            </p>
          ) : null}

          <div className="detail-points">
            <div>
              <strong>Made in Ghana</strong>
              <span>Produced by Debee Farms.</span>
            </div>

            <div>
              <strong>Natural pantry staple</strong>
              <span>Good for family meals and everyday use.</span>
            </div>

            <div>
              <strong>WhatsApp-ready order</strong>
              <span>
                Add your quantity, review the cart, then send the order by
                WhatsApp.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-extra-grid" aria-label="Product details">
        <DetailInfoCard title="Ingredients" icon={<LeafIcon />}>
          <DetailPillList items={product.ingredients} />
        </DetailInfoCard>

        <DetailInfoCard title="Size and pack info" icon={<PackageIcon />}>
          <p>{product.weightDetail}</p>
        </DetailInfoCard>

        <DetailInfoCard title="Storage instructions" icon={<ShieldIcon />}>
          <p>{product.storage}</p>
        </DetailInfoCard>

        <DetailInfoCard title="Delivery note" icon={<TruckIcon />}>
          <p>
            Available for Ghana delivery or pickup. International shipping can
            be confirmed through WhatsApp before packing.
          </p>
        </DetailInfoCard>
      </section>

      <section
        className="detail-lifestyle-grid"
        aria-label="How to use this product"
      >
        <div className="detail-list-card">
          <p className="eyebrow">Usage ideas</p>

          <h2>How customers can use it</h2>

          <ul>
            {product.usageIdeas?.map((idea) => (
              <li key={idea}>{idea}</li>
            ))}
          </ul>
        </div>

        <div className="detail-list-card detail-good-for-card">
          <p className="eyebrow">Good for</p>

          <h2>Best fit for this product</h2>

          <DetailPillList items={product.goodFor} />

          <div className="detail-mini-trust">
            <span>
              <ShieldIcon />
            </span>

            <p>
              Tip: customers can still ask questions about ingredients,
              delivery, or bulk orders before sending the WhatsApp order.
            </p>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="detail-related-card" aria-label="Related products">
          <div className="detail-section-head">
            <div>
              <p className="eyebrow">Related products</p>

              <h2>You may also like</h2>
            </div>

            <button
              className="details-btn"
              type="button"
              onClick={() => setPage("shop")}
            >
              View all
            </button>
          </div>

          <div className="detail-related-grid">
            {relatedProducts.map((item) => (
              <article className="detail-related-item" key={item.id}>
                <button
                  type="button"
                  className="detail-related-image"
                  onClick={() => onViewProduct?.(item)}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </button>

                <div>
                  <strong>{item.name}</strong>
                  <span>{item.size}</span>

                  <PriceDisplay product={item} />

                  <div className="detail-related-actions">
                    <button
                      className="details-btn"
                      type="button"
                      onClick={() => onViewProduct?.(item)}
                    >
                      See details
                    </button>

                    <button
                      className="details-btn"
                      type="button"
                      onClick={() => onToggleWishlist?.(item.id)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
