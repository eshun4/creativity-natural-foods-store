import { products } from '../data/products';

/* 4 category tiles — each maps to one representative product image */
const categoryTiles = [
  { id: 'honey',   label: 'Honey',         productId: 'honey-1l' },
  { id: 'pb',      label: 'Peanut Butter',  productId: 'pb-bucket' },
  { id: 'porridge',label: 'Porridge',       productId: 'mixed-porridge-tombrown' },
  { id: 'porridge',label: 'Sorghum',        productId: 'sorghum-powder-1kg' },
].map((item) => ({
  ...item,
  product: products.find((p) => p.id === item.productId),
})).filter((item) => item.product);

export function PromoCardGrid({ setActiveCategories, setDiscountFilter, setPage }) {
  function showCategory(categoryId) {
    setActiveCategories([categoryId]);
    setDiscountFilter('all');
    setPage('shop');
    window.setTimeout(() => {
      document.getElementById(`section-${categoryId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  return (
    <section className="cat-strip" aria-label="Shop by category">
      {categoryTiles.map(({ id, label, product }) => (
        <button
          key={`${id}-${label}`}
          type="button"
          className="cat-tile"
          onClick={() => showCategory(id)}
          aria-label={`Shop ${label}`}
        >
          <span className="cat-tile-img-wrap">
            <img
              src={product.image}
              alt={label}
              loading="lazy"
              decoding="async"
            />
          </span>
          <span className="cat-tile-label">{label}</span>
        </button>
      ))}
    </section>
  );
}
