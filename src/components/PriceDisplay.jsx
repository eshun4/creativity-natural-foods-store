export function PriceDisplay({ product }) {
  return (
    <span className="price-stack">
      <span className="price">{product.priceText}</span>
      {product.hasDiscount ? (
        <span className="was-price">Was {product.originalPriceText}</span>
      ) : null}
    </span>
  );
}
