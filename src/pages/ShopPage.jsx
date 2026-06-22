import { STORE_SETTINGS } from "../config/storeSettings";
import { ProductCard } from "../components/ProductCard";
import { HeroCarousel } from "../components/HeroCarousel";
import { PromoCardGrid } from "../components/PromoCardGrid";
import { ProductRowCarousel } from "../components/ProductRowCarousel";
import { DeliveryInfoSection } from "../components/DeliveryInfoSection";
import { TrustSection } from "../components/TrustSection";
import { FaqSection } from "../components/FaqSection";
import { EmptyState } from "../components/EmptyState";
import { SearchIcon } from "../components/icons";

export function ShopPage({
  t,
  clearFilters,
  activeCategories,
  toggleCategory,
  priceFilter,
  setPriceFilter,
  discountFilter,
  setDiscountFilter,
  allProducts,
  filteredProducts,
  onAddToCart,
  onViewProduct,
  setActiveCategories,
  setPage,
  wishlistIds = [],
  onToggleWishlist,
  recentlyViewedProducts = [],
  cartQuantityById = {},
}) {
  const bestSellerProducts = allProducts.filter((product) =>
    ["honey-1l", "honey-2l", "pb-bucket", "mixed-porridge-tombrown"].includes(
      product.id,
    ),
  );

  const dealProducts = allProducts.filter((product) => product.hasDiscount);

  const breakfastProducts = allProducts.filter((product) =>
    [
      "mixed-porridge-tombrown",
      "mixed-porridge-1kg",
      "mixed-porridge-2kg",
      "sorghum-powder-1kg",
      "sorghum-powder-2kg",
      "honey-500ml",
    ].includes(product.id),
  );

  const honeyProducts = allProducts.filter(
    (product) => product.category === "honey",
  );
  const peanutProducts = allProducts.filter(
    (product) => product.category === "pb",
  );
  const porridgeProducts = allProducts.filter(
    (product) => product.category === "porridge",
  );

  function handleSlideAction(action) {
    if (!action) return;

    if (action.type === "category") {
      setActiveCategories([action.category]);
      setDiscountFilter("all");
      setPage("shop", { scroll: false });
      setTimeout(() => {
        document
          .getElementById(`section-${action.category}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return;
    }

    if (action.type === "product") {
      const product = allProducts.find((item) => item.id === action.productId);
      if (product) onViewProduct(product);
    }
  }

  return (
    <>
      <HeroCarousel onSlideAction={handleSlideAction} />

      <PromoCardGrid
        t={t}
        setActiveCategories={setActiveCategories}
        setDiscountFilter={setDiscountFilter}
        setPage={setPage}
      />

      <TrustSection />

      <ProductRowCarousel
        sectionId="section-honey"
        title="Honey"
        note="Pure wild honey options for tea, breakfast, cooking, and bulk family use."
        products={honeyProducts}
        t={t}
        onAddToCart={onAddToCart}
        onViewProduct={onViewProduct}
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
        cartQuantityById={cartQuantityById}
      />

      <ProductRowCarousel
        sectionId="section-pb"
        title="Peanut Butter"
        note="Groundnut paste for soups, spreads, sauces, and family meal prep."
        products={peanutProducts}
        t={t}
        onAddToCart={onAddToCart}
        onViewProduct={onViewProduct}
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
        cartQuantityById={cartQuantityById}
      />

      <ProductRowCarousel
        sectionId="section-porridge"
        title="Porridge"
        note="Tombrown and sorghum powder for warm breakfasts and Ghanaian staples."
        products={porridgeProducts}
        t={t}
        onAddToCart={onAddToCart}
        onViewProduct={onViewProduct}
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
        cartQuantityById={cartQuantityById}
      />

      <ProductRowCarousel
        sectionId="section-best-sellers"
        title="Best Sellers"
        note="Customer favorites for everyday home use."
        products={bestSellerProducts}
        t={t}
        onAddToCart={onAddToCart}
        onViewProduct={onViewProduct}
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
        cartQuantityById={cartQuantityById}
      />

      {dealProducts.length > 0 && (
        <ProductRowCarousel
          sectionId="section-deals"
          title="Deals"
          note="Discounted products available now."
          products={dealProducts}
          t={t}
          onAddToCart={onAddToCart}
          onViewProduct={onViewProduct}
          wishlistIds={wishlistIds}
          onToggleWishlist={onToggleWishlist}
          cartQuantityById={cartQuantityById}
        />
      )}

      <ProductRowCarousel
        sectionId="section-breakfast"
        title="Breakfast Essentials"
        note="Porridge, powders, and honey for the family."
        products={breakfastProducts}
        t={t}
        onAddToCart={onAddToCart}
        onViewProduct={onViewProduct}
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
        cartQuantityById={cartQuantityById}
      />

      {recentlyViewedProducts.length > 0 && (
        <ProductRowCarousel
          sectionId="section-recently-viewed"
          title="Recently Viewed"
          note="Saved on this device so returning customers can quickly find products they checked earlier."
          products={recentlyViewedProducts}
          t={t}
          onAddToCart={onAddToCart}
          onViewProduct={onViewProduct}
          wishlistIds={wishlistIds}
          onToggleWishlist={onToggleWishlist}
          cartQuantityById={cartQuantityById}
        />
      )}

      <DeliveryInfoSection setPage={setPage} />

      <FaqSection setPage={setPage} />

      <main className="catalog wrap" id="all-products">
        <h2 className="section-title">{t.sectitle}</h2>
        <p className="section-note">{t.secnote}</p>

        <div className="shop-layout">
          <aside className="filter-sidebar">
            <div className="filter-block">
              <h3 className="filter-heading">{t.f_category}</h3>
              {STORE_SETTINGS.categories.map((category) => (
                <label className="filter-option" key={category.id}>
                  <input
                    type="checkbox"
                    className="cat-filter"
                    value={category.id}
                    checked={activeCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                  />
                  <span>{t[category.labelKey]}</span>
                </label>
              ))}
            </div>

            <div className="filter-block">
              <h3 className="filter-heading">{t.f_price}</h3>
              {STORE_SETTINGS.priceFilters.map((filter) => (
                <label className="filter-option" key={filter.id}>
                  <input
                    type="radio"
                    name="priceFilter"
                    className="price-filter"
                    value={filter.id}
                    checked={priceFilter === filter.id}
                    onChange={(event) => setPriceFilter(event.target.value)}
                  />
                  <span>{filter.label}</span>
                </label>
              ))}
            </div>

            <div className="filter-block">
              <h3 className="filter-heading">Discount</h3>
              {STORE_SETTINGS.discountFilters.map((filter) => (
                <label className="filter-option" key={filter.id}>
                  <input
                    type="radio"
                    name="discountFilter"
                    className="discount-filter"
                    value={filter.id}
                    checked={discountFilter === filter.id}
                    onChange={(event) => setDiscountFilter(event.target.value)}
                  />
                  <span>{filter.label}</span>
                </label>
              ))}
            </div>

            <button
              type="button"
              className="filter-clear"
              id="filterClear"
              onClick={clearFilters}
            >
              {t.f_clear}
            </button>
          </aside>

          <div className="catalog-main">
            {filteredProducts.length > 0 ? (
              <div className="grid" id="productGrid" aria-live="polite">
                {filteredProducts.map((product) => (
                  <ProductCard
                    product={product}
                    t={t}
                    onAddToCart={onAddToCart}
                    onViewProduct={onViewProduct}
                    isWishlisted={wishlistIds.includes(product.id)}
                    onToggleWishlist={onToggleWishlist}
                    cartQuantity={cartQuantityById[product.id] || 0}
                    key={product.id}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<SearchIcon />}
                eyebrow="No matching products"
                title="No products found"
                message="Your search or filters did not match any products in the store right now. Clear the filters or try a broader search like honey, tombrown, porridge, sorghum, or groundnut."
                tips={[
                  "Try fewer filters",
                  "Check spelling",
                  "Browse all products",
                ]}
              >
                <button className="btn" type="button" onClick={clearFilters}>
                  Clear filters
                </button>
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={() => setPage("contact")}
                >
                  Ask on WhatsApp
                </button>
              </EmptyState>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
