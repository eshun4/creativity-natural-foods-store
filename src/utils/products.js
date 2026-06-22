import {
  STORE_SETTINGS,
  formatCurrency,
  getProductFinalPrice,
  getProductSavings,
} from '../config/storeSettings';

export function translateProduct(product, t) {
  const finalPrice = getProductFinalPrice(product);
  const savings = getProductSavings(product);

  return {
    ...product,
    name: t[product.nameKey] || product.nameKey,
    categoryName: t[product.categoryKey] || product.category,
    size: t[product.sizeKey] || product.sizeKey,
    description: t[product.descKey] || product.descKey,
    finalPrice,
    savings,
    hasDiscount: Boolean(product.salePrice),
    priceText: formatCurrency(finalPrice),
    originalPriceText: formatCurrency(product.originalPrice),
  };
}

export function priceInRange(price, priceFilter) {
  const filter = STORE_SETTINGS.priceFilters.find((item) => item.id === priceFilter);
  if (!filter || filter.id === 'all') return true;
  return price >= filter.min && price <= filter.max;
}

export function discountMatches(product, discountFilter) {
  if (discountFilter === 'discounted') return product.hasDiscount;
  if (discountFilter === 'regular') return !product.hasDiscount;
  return true;
}
