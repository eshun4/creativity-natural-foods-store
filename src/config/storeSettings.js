export const CUSTOMER_MARKET_STORAGE_KEY = "cnf:customerMarket";

export const CUSTOMER_MARKETS = {
  ghana: {
    id: "ghana",
    label: "Ghana",
    shortLabel: "Ghana",
    currencyCode: "GHS",
    currencyLabel: "Ghana cedi",
    locale: "en-GH",
  },
  international: {
    id: "international",
    label: "International",
    shortLabel: "International",
    currencyCode: "USD",
    currencyLabel: "US dollar",
    locale: "en-US",
  },
};

export const STORE_SETTINGS = {
  brand: {
    name: "Creativity Natural Foods",
    subtitle: "Debee Farms · Teshie-Nungua, Ghana",
    producedBy: "Produced in Ghana by Debee Farms",
    addressLines: ["P.O. Box TN 1277, Teshie-Nungua"],
    phoneText: "Tel: 0244 084792 · 0266 222691",
    footerNote:
      "Honey may crystallise over time — stand the bottle in warm water to restore it. Keep out of direct sunlight.",
  },
  checkout: {
    whatsappBaseUrl: "https://wa.me",
    defaultRegion: "ghana",
    regions: {
      ghana: {
        id: "ghana",
        label: "Ghana",
        countryCode: "+233",
        phonePlaceholder: "0244 000000",
        businessWhatsappNumber: "233244084792",
        businessWhatsappDisplay: "+233 244 084 792",
        helper: "Orders from Ghana go to the Ghana business WhatsApp number.",
      },
      usa: {
        id: "usa",
        label: "USA",
        countryCode: "+1",
        phonePlaceholder: "208 000 0000",
        businessWhatsappNumber: "12084038352",
        businessWhatsappDisplay: "+1 208 403 8352",
        helper: "Orders from the USA go to the USA business WhatsApp number.",
      },
    },
  },
  defaults: {
    mode: "dark",
    language: "en",
    activeCategories: ["honey", "pb", "porridge"],
    priceFilter: "all",
    discountFilter: "all",
    page: "shop",
    customerMarket: "international",
  },
  markets: CUSTOMER_MARKETS,
  labels: {
    currency: "$",
    darkMode: "Dark",
    lightMode: "Light",
    cart: "Cart",
    checkout: "Checkout",
    backToShop: "Back to shop",
    continueShopping: "Continue shopping",
    emptyCart: "Your cart is empty.",
    emptyCheckout: "Your checkout is empty. Add products to your cart first.",
    orderSummary: "Order summary",
    cartPreview: "Cart preview",
    remove: "Remove",
    subtotal: "Subtotal",
    total: "Total",
    quantity: "Qty",
    discountBadge: "Sale",
    noDiscount: "No discount",
    savings: "Savings",
    customerDetails: "Customer details",
    checkoutNote:
      "First version checkout uses WhatsApp Business. Paystack payment can be added later.",
  },
  categories: [
    { id: "honey", labelKey: "n_honey" },
    { id: "pb", labelKey: "n_pb" },
    { id: "porridge", labelKey: "n_porridge" },
  ],
  priceFilters: [
    { id: "all", label: "All prices", min: 0, max: Infinity },
    { id: "under15", label: "Under $15", min: 0, max: 14.99 },
    { id: "15to30", label: "$15 – $30", min: 15, max: 30 },
    { id: "over30", label: "Over $30", min: 30.01, max: Infinity },
  ],
  priceFiltersByMarket: {
    ghana: [
      { id: "all", label: "All prices", min: 0, max: Infinity },
      { id: "under50", label: "Under GHS 50", min: 0, max: 49.99 },
      { id: "50to150", label: "GHS 50 – GHS 150", min: 50, max: 150 },
      { id: "over150", label: "Over GHS 150", min: 150.01, max: Infinity },
    ],
    international: [
      { id: "all", label: "All prices", min: 0, max: Infinity },
      { id: "under15", label: "Under $15", min: 0, max: 14.99 },
      { id: "15to30", label: "$15 – $30", min: 15, max: 30 },
      { id: "over30", label: "Over $30", min: 30.01, max: Infinity },
    ],
  },
  discountFilters: [
    { id: "all", label: "All products" },
    { id: "discounted", label: "Discounted only" },
    { id: "regular", label: "No discount" },
  ],
  theme: {
    dark: {
      "--primary": "#232220",
      "--on-primary": "#F4EFE6",
      "--accent": "#E3A52C",
      "--on-accent": "#2A1C02",
      "--bg": "#141311",
      "--card": "#1C1B19",
      "--surface": "#2A2825",
      "--text": "#F4EFE6",
      "--muted": "#B8AE9E",
      "--border": "#34322E",
      "--price": "#E3A52C",
      "--img-bg": "#2E2A24",
      "--footer-bg": "#0F0E0D",
      "--footer-text": "#C9BFAE",
      "--card-shadow": "0 12px 28px rgba(0,0,0,.5)",
      "--toggle-hover": "rgba(255,255,255,.08)",
      "--glow": "rgba(227,165,44,.5)",
      "--subnav-bg": "#1A1917",
      "--dd-hover": "rgba(227,165,44,.15)",
    },
    light: {
      "--primary": "#16304F",
      "--on-primary": "#F4ECDD",
      "--accent": "#C99A3B",
      "--on-accent": "#2A1E08",
      "--bg": "#FAF7F1",
      "--card": "#FFFFFF",
      "--surface": "#F4ECDD",
      "--text": "#121A26",
      "--muted": "#5A6270",
      "--border": "#E6DECF",
      "--price": "#16304F",
      "--img-bg": "#ECE3D2",
      "--footer-bg": "#16304F",
      "--footer-text": "#E4D9C2",
      "--card-shadow": "0 12px 26px rgba(20,30,50,.14)",
      "--toggle-hover": "rgba(255,255,255,.12)",
      "--glow": "rgba(201,154,59,.45)",
      "--subnav-bg": "#11243C",
      "--dd-hover": "rgba(201,154,59,.16)",
    },
  },
};

export function getThemeVariables(mode) {
  return STORE_SETTINGS.theme[mode] || STORE_SETTINGS.theme.dark;
}

export function normalizeCustomerMarket(value) {
  const rawValue = String(value || "")
    .trim()
    .toLowerCase();

  if (["ghana", "gh", "ghs", "cedi", "cedis"].includes(rawValue)) {
    return "ghana";
  }

  if (
    ["international", "usd", "us", "usa", "dollar", "dollars"].includes(
      rawValue,
    )
  ) {
    return "international";
  }

  return STORE_SETTINGS.defaults.customerMarket;
}

function readSavedCustomerMarket() {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }

  try {
    const value = window.localStorage.getItem(CUSTOMER_MARKET_STORAGE_KEY);
    if (!value) return null;
    return normalizeCustomerMarket(JSON.parse(value));
  } catch {
    return null;
  }
}

export function saveCustomerMarket(market) {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.setItem(
      CUSTOMER_MARKET_STORAGE_KEY,
      JSON.stringify(normalizeCustomerMarket(market)),
    );
  } catch {
    // localStorage may be blocked.
  }
}

export function getUrlMarketOverride() {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const rawMarket =
    params.get("market") || params.get("currency") || params.get("country");

  if (!rawMarket) return null;

  if (rawMarket.toLowerCase() === "gh") return "ghana";
  if (rawMarket.toLowerCase() === "ghana") return "ghana";
  if (rawMarket.toLowerCase() === "ghs") return "ghana";
  if (rawMarket.toLowerCase() === "us") return "international";
  if (rawMarket.toLowerCase() === "usa") return "international";
  if (rawMarket.toLowerCase() === "usd") return "international";

  return normalizeCustomerMarket(rawMarket);
}

export function detectMarketFromBrowser() {
  if (typeof window === "undefined") {
    return STORE_SETTINGS.defaults.customerMarket;
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  const languages = [navigator.language, ...(navigator.languages || [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (timeZone === "Africa/Accra" || languages.includes("-gh")) {
    return "ghana";
  }

  return "international";
}

export function getInitialCustomerMarket() {
  return (
    getUrlMarketOverride() ||
    readSavedCustomerMarket() ||
    detectMarketFromBrowser() ||
    STORE_SETTINGS.defaults.customerMarket
  );
}

export async function fetchCustomerMarketFromServer() {
  if (typeof window === "undefined" || getUrlMarketOverride()) {
    return null;
  }

  const hostname = window.location.hostname;

  const isLocalDev =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0";

  // Vite local dev does not run Vercel serverless functions.
  // So locally, use browser/timezone/url detection instead.
  // On Vercel, /api/location will work.
  if (isLocalDev) {
    return null;
  }

  try {
    const response = await fetch("/api/location", {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return null;

    const data = await response.json();
    return normalizeCustomerMarket(data?.market);
  } catch {
    return null;
  }
}

export function getMarketSettings(market) {
  return (
    CUSTOMER_MARKETS[normalizeCustomerMarket(market)] ||
    CUSTOMER_MARKETS.international
  );
}

export function formatCurrency(amount, market = getInitialCustomerMarket()) {
  const marketSettings = getMarketSettings(market);
  const numericAmount = Number(amount);
  const safeAmount = Number.isFinite(numericAmount) ? numericAmount : 0;

  return new Intl.NumberFormat(marketSettings.locale, {
    style: "currency",
    currency: marketSettings.currencyCode,
    minimumFractionDigits: marketSettings.currencyCode === "GHS" ? 0 : 2,
    maximumFractionDigits: marketSettings.currencyCode === "GHS" ? 0 : 2,
  }).format(safeAmount);
}

export function getPriceFilters(market = getInitialCustomerMarket()) {
  const marketId = normalizeCustomerMarket(market);
  return (
    STORE_SETTINGS.priceFiltersByMarket[marketId] ||
    STORE_SETTINGS.priceFiltersByMarket.international
  );
}

export function getProductMarketPrice(
  product,
  market = getInitialCustomerMarket(),
) {
  const marketId = normalizeCustomerMarket(market);
  const fallbackPrice = {
    originalPrice: product?.originalPrice ?? 0,
    salePrice: product?.salePrice ?? null,
  };

  const price =
    product?.prices?.[marketId] ||
    product?.prices?.international ||
    fallbackPrice;
  const originalPrice = Number(
    price.originalPrice ?? fallbackPrice.originalPrice ?? 0,
  );
  const rawSalePrice = price.salePrice ?? null;
  const salePrice = rawSalePrice === null ? null : Number(rawSalePrice);

  return {
    market: marketId,
    originalPrice: Number.isFinite(originalPrice) ? originalPrice : 0,
    salePrice: Number.isFinite(salePrice) ? salePrice : null,
  };
}

export function getProductFinalPrice(product, market) {
  const price = getProductMarketPrice(product, market);
  return price.salePrice ?? price.originalPrice;
}

export function getProductSavings(product, market) {
  const price = getProductMarketPrice(product, market);

  if (price.salePrice === null) return 0;

  return Math.max(0, price.originalPrice - price.salePrice);
}

export function getDisplayPriceFromPriceSet(
  prices,
  market = getInitialCustomerMarket(),
) {
  const marketId = normalizeCustomerMarket(market);
  const price = prices?.[marketId] ||
    prices?.international || { originalPrice: 0, salePrice: null };
  const originalPrice = Number(price.originalPrice || 0);
  const rawSalePrice = price.salePrice ?? null;
  const salePrice = rawSalePrice === null ? null : Number(rawSalePrice);
  const hasDiscount = Number.isFinite(salePrice) && salePrice < originalPrice;
  const finalPrice = hasDiscount ? salePrice : originalPrice;

  return {
    market: marketId,
    finalPrice,
    originalPrice,
    salePrice: hasDiscount ? salePrice : null,
    hasDiscount,
    priceText: formatCurrency(finalPrice, marketId),
    originalPriceText: formatCurrency(originalPrice, marketId),
  };
}
