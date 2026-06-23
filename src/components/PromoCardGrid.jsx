import { products } from "../data/products";

/* 4 horizontal category product cards below the banner carousel */
const categoryTiles = [
  {
    id: "honey",
    tone: "honey",
    title: "Honey",
    subtitle: "Honey",
    productId: "honey-1l",
  },
  {
    id: "pb",
    tone: "peanut",
    title: "Peanut Butter",
    subtitle: "Peanut Butter",
    productId: "pb-bucket",
  },
  {
    id: "porridge",
    tone: "porridge",
    title: "Porridge",
    subtitle: "Porridge",
    productId: "mixed-porridge-tombrown",
  },
  {
    id: "sorghum",
    tone: "sorghum",
    title: "Sorghum",
    subtitle: "Sorghum",
    productId: "sorghum-powder-1kg",
  },
]
  .map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId),
  }))
  .filter((item) => item.product);

export function PromoCardGrid({
  setActiveCategories,
  setDiscountFilter,
  setPage,
}) {
  function showCategory(categoryId) {
    setActiveCategories([categoryId]);
    setDiscountFilter("all");
    setPage("shop");

    window.setTimeout(() => {
      document
        .getElementById(`section-${categoryId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  return (
    <section className="category-product-section" aria-label="Shop by category">
      <div className="category-product-scroll">
        {categoryTiles.map(({ id, tone, title, subtitle, product }) => (
          <button
            key={`${id}-${title}`}
            type="button"
            className="category-product-card"
            data-card-tone={tone}
            onClick={() => showCategory(id)}
            aria-label={`Shop ${title}`}
          >
            <span className="category-product-image-section">
              <img
                className="category-product-image"
                src={product.image}
                alt={product.alt || title}
                loading="lazy"
                decoding="async"
              />

              <span className="category-product-action">Shop</span>
            </span>

            <span className="category-product-info">
              <span className="category-product-title">{title}</span>
              {/* <span className="category-product-subtitle">{subtitle}</span> */}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
