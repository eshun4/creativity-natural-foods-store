import {
  formatCurrency,
  getPriceFilters,
  getProductFinalPrice,
  getProductMarketPrice,
  getProductSavings,
  getMarketSettings,
} from "../config/storeSettings";

export function translateProduct(product, t, customerMarket) {
  const marketPrice = getProductMarketPrice(product, customerMarket);
  const finalPrice = getProductFinalPrice(product, customerMarket);
  const savings = getProductSavings(product, customerMarket);
  const marketSettings = getMarketSettings(marketPrice.market);

  return {
    ...product,
    name: t[product.nameKey] || product.nameKey,
    categoryName: t[product.categoryKey] || product.category,
    size: t[product.sizeKey] || product.sizeKey,
    description: t[product.descKey] || product.descKey,
    market: marketPrice.market,
    marketLabel: marketSettings.label,
    currencyCode: marketSettings.currencyCode,
    originalPrice: marketPrice.originalPrice,
    salePrice: marketPrice.salePrice,
    finalPrice,
    savings,
    hasDiscount: savings > 0,
    priceText: formatCurrency(finalPrice, marketPrice.market),
    originalPriceText: formatCurrency(
      marketPrice.originalPrice,
      marketPrice.market,
    ),
  };
}

export function priceInRange(price, priceFilter, customerMarket) {
  const filter = getPriceFilters(customerMarket).find(
    (item) => item.id === priceFilter,
  );
  if (!filter || filter.id === "all") return true;
  return price >= filter.min && price <= filter.max;
}

export function discountMatches(product, discountFilter) {
  if (discountFilter === "discounted") return product.hasDiscount;
  if (discountFilter === "regular") return !product.hasDiscount;
  return true;
}
