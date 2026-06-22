export const STORAGE_KEYS = {
  mode: 'cnf:mode',
  language: 'cnf:language',
  cart: 'cnf:cart',
  wishlist: 'cnf:wishlist',
  recentlyViewed: 'cnf:recentlyViewed',
  checkoutCustomer: 'cnf:checkoutCustomer',
  deliveryDetails: 'cnf:deliveryDetails',
  checkoutPreferences: 'cnf:checkoutPreferences',
  lastOrder: 'cnf:lastOrder',
  orderHistory: 'cnf:orderHistory',
  themePreference: 'cnf:themePreference',
};

export function readStorage(key, fallback) {
  if (typeof window === 'undefined' || !window.localStorage) return fallback;

  try {
    const saved = window.localStorage.getItem(key);
    if (saved === null) return fallback;
    return JSON.parse(saved);
  } catch (error) {
    console.warn(`Could not read localStorage key "${key}"`, error);
    return fallback;
  }
}

export function writeStorage(key, value) {
  if (typeof window === 'undefined' || !window.localStorage) return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not save localStorage key "${key}"`, error);
  }
}

export function removeStorage(key) {
  if (typeof window === 'undefined' || !window.localStorage) return;

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Could not remove localStorage key "${key}"`, error);
  }
}
