import { ProductCard } from "./ProductCard";

export function ProductRowCarousel({
  title,
  note,
  products,
  t,
  onAddToCart,
  onViewProduct,
  wishlistIds = [],
  onToggleWishlist,
  sectionId,
  cartQuantityById = {},
}) {
  if (!products.length) return null;

  return (
    <section className="product-row-section wrap" id={sectionId}>
      <div className="product-row-head">
        <div>
          <h2>{title}</h2>
          {note ? <p>{note}</p> : null}
        </div>
      </div>

      <div className="product-row-scroll">
        {products.map((product) => (
          <div className="product-row-item" key={product.id}>
            <ProductCard
              product={product}
              t={t}
              onAddToCart={onAddToCart}
              onViewProduct={onViewProduct}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              cartQuantity={cartQuantityById[product.id] || 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
