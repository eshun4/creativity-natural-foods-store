export const STORE_SETTINGS = {
  brand: {
    name: 'Creativity Natural Foods',
    subtitle: 'Debee Farms · Teshie-Nungua, Ghana',
    producedBy: 'Produced in Ghana by Debee Farms',
    addressLines: ['P.O. Box TN 1277, Teshie-Nungua'],
    phoneText: 'Tel: 0244 084792 · 0266 222691',
    footerNote: 'Honey may crystallise over time — stand the bottle in warm water to restore it. Keep out of direct sunlight.',
  },
  checkout: {
    whatsappBaseUrl: 'https://wa.me',
    defaultRegion: 'ghana',
    regions: {
      ghana: {
        id: 'ghana',
        label: 'Ghana',
        countryCode: '+233',
        phonePlaceholder: '0244 000000',
        businessWhatsappNumber: '233244084792',
        businessWhatsappDisplay: '+233 244 084 792',
        helper: 'Orders from Ghana go to the Ghana business WhatsApp number.',
      },
      usa: {
        id: 'usa',
        label: 'USA',
        countryCode: '+1',
        phonePlaceholder: '208 000 0000',
        businessWhatsappNumber: '12084038352',
        businessWhatsappDisplay: '+1 208 403 8352',
        helper: 'Orders from the USA go to the USA business WhatsApp number.',
      },
    },
  },
  defaults: {
    mode: 'dark',
    language: 'en',
    activeCategories: ['honey', 'pb', 'porridge'],
    priceFilter: 'all',
    discountFilter: 'all',
    page: 'shop',
  },
  labels: {
    currency: '$',
    darkMode: 'Dark',
    lightMode: 'Light',
    cart: 'Cart',
    checkout: 'Checkout',
    backToShop: 'Back to shop',
    continueShopping: 'Continue shopping',
    emptyCart: 'Your cart is empty.',
    emptyCheckout: 'Your checkout is empty. Add products to your cart first.',
    orderSummary: 'Order summary',
    cartPreview: 'Cart preview',
    remove: 'Remove',
    subtotal: 'Subtotal',
    total: 'Total',
    quantity: 'Qty',
    discountBadge: 'Sale',
    noDiscount: 'No discount',
    savings: 'Savings',
    customerDetails: 'Customer details',
    checkoutNote: 'First version checkout uses WhatsApp Business. Paystack payment can be added later.',
  },
  categories: [
    { id: 'honey', labelKey: 'n_honey' },
    { id: 'pb', labelKey: 'n_pb' },
    { id: 'porridge', labelKey: 'n_porridge' },
  ],
  priceFilters: [
    { id: 'all', label: 'All prices', min: 0, max: Infinity },
    { id: 'under15', label: 'Under $15', min: 0, max: 14.99 },
    { id: '15to30', label: '$15 – $30', min: 15, max: 30 },
    { id: 'over30', label: 'Over $30', min: 30.01, max: Infinity },
  ],
  discountFilters: [
    { id: 'all', label: 'All products' },
    { id: 'discounted', label: 'Discounted only' },
    { id: 'regular', label: 'No discount' },
  ],
  theme: {
    dark: {
      '--primary': '#232220',
      '--on-primary': '#F4EFE6',
      '--accent': '#E3A52C',
      '--on-accent': '#2A1C02',
      '--bg': '#141311',
      '--card': '#1C1B19',
      '--surface': '#2A2825',
      '--text': '#F4EFE6',
      '--muted': '#B8AE9E',
      '--border': '#34322E',
      '--price': '#E3A52C',
      '--img-bg': '#2E2A24',
      '--footer-bg': '#0F0E0D',
      '--footer-text': '#C9BFAE',
      '--card-shadow': '0 12px 28px rgba(0,0,0,.5)',
      '--toggle-hover': 'rgba(255,255,255,.08)',
      '--glow': 'rgba(227,165,44,.5)',
      '--subnav-bg': '#1A1917',
      '--dd-hover': 'rgba(227,165,44,.15)',
    },
    light: {
      '--primary': '#16304F',
      '--on-primary': '#F4ECDD',
      '--accent': '#C99A3B',
      '--on-accent': '#2A1E08',
      '--bg': '#FAF7F1',
      '--card': '#FFFFFF',
      '--surface': '#F4ECDD',
      '--text': '#121A26',
      '--muted': '#5A6270',
      '--border': '#E6DECF',
      '--price': '#16304F',
      '--img-bg': '#ECE3D2',
      '--footer-bg': '#16304F',
      '--footer-text': '#E4D9C2',
      '--card-shadow': '0 12px 26px rgba(20,30,50,.14)',
      '--toggle-hover': 'rgba(255,255,255,.12)',
      '--glow': 'rgba(201,154,59,.45)',
      '--subnav-bg': '#11243C',
      '--dd-hover': 'rgba(201,154,59,.16)',
    },
  },
};

export function getThemeVariables(mode) {
  return STORE_SETTINGS.theme[mode] || STORE_SETTINGS.theme.dark;
}

export function formatCurrency(amount) {
  return `${STORE_SETTINGS.labels.currency}${Number(amount).toFixed(2)}`;
}

export function getProductFinalPrice(product) {
  return product.salePrice ?? product.originalPrice;
}

export function getProductSavings(product) {
  if (!product.salePrice) return 0;
  return product.originalPrice - product.salePrice;
}
