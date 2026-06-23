import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { I18N } from "./data/i18n";
import { products } from "./data/products";
import {
  STORE_SETTINGS,
  fetchCustomerMarketFromServer,
  getInitialCustomerMarket,
  getMarketSettings,
  getThemeVariables,
  saveCustomerMarket,
} from "./config/storeSettings";
import { Header } from "./components/Header";
import { Subnav } from "./components/Subnav";
import { Footer } from "./components/Footer";
import { ShopPage } from "./pages/ShopPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { AccountPage } from "./pages/AccountPage";
import { OrdersPage } from "./pages/OrdersPage";
import { WishlistPage } from "./pages/WishlistPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { StoryPage } from "./pages/StoryPage";
import { LocalStaplesPage } from "./pages/LocalStaplesPage";
import { OrderSuccessPage } from "./pages/OrderSuccessPage";
import { DeliveryDetailsPage } from "./pages/DeliveryDetailsPage";
import { CheckoutPreferencesPage } from "./pages/CheckoutPreferencesPage";
import { ContactPage } from "./pages/ContactPage";
import { FaqPage } from "./pages/FaqPage";
import { AdminPage } from "./pages/AdminPage";
import { CartDrawer } from "./components/CartDrawer";
import { StickyCartButton } from "./components/StickyCartButton";
import { FloatingJuniorChatbot } from "./components/FloatingJuniorChatbot";
import {
  translateProduct,
  priceInRange,
  discountMatches,
} from "./utils/products";
import { STORAGE_KEYS, readStorage, writeStorage } from "./utils/storage";
import { useSiteTranslation } from "./utils/siteTranslator";
import { getCartQuantity } from "./utils/cart";

const ADMIN_PAGE_PATHS = {
  "/admin": "admin-dashboard",
  "/admin/dashboard": "admin-dashboard",
  "/admin/products": "admin-products",
  "/admin/orders": "admin-orders",
  "/admin/customers": "admin-customers",
  "/admin/delivery": "admin-delivery",
  "/admin/settings": "admin-settings",
};

const ADMIN_PATH_BY_PAGE = Object.fromEntries(
  Object.entries(ADMIN_PAGE_PATHS).map(([path, page]) => [page, path]),
);

ADMIN_PATH_BY_PAGE["admin-dashboard"] = "/admin";

function getAutoThemeInfo(date = new Date()) {
  const hour = date.getHours();
  const suggestedMode = hour >= 7 && hour < 19 ? "light" : "dark";

  const clockLabel = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const dateLabel = date.toLocaleDateString([], {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return { suggestedMode, clockLabel, dateLabel };
}

function sanitizeQuantity(value, fallback = 1) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return fallback;
  }

  return Math.max(1, Math.floor(numeric));
}

function sanitizeCart(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .filter((item) => item && item.id)
    .map((item) => ({
      id: item.id,
      quantity: sanitizeQuantity(item.quantity),
    }));
}

function getInitialPageFromUrl() {
  if (typeof window === "undefined") {
    return STORE_SETTINGS.defaults.page;
  }

  const cleanPath = window.location.pathname.replace(/\/$/, "") || "/";
  return ADMIN_PAGE_PATHS[cleanPath] || STORE_SETTINGS.defaults.page;
}

export default function App() {
  const alignTimerRef = useRef(null);

  const [clockState, setClockState] = useState(() => getAutoThemeInfo());

  const [themePreference, setThemePreference] = useState(() =>
    readStorage(STORAGE_KEYS.themePreference, "auto"),
  );

  const [mode, setMode] = useState(() => {
    const savedPreference = readStorage(STORAGE_KEYS.themePreference, "auto");

    return savedPreference === "manual"
      ? readStorage(STORAGE_KEYS.mode, getAutoThemeInfo().suggestedMode)
      : getAutoThemeInfo().suggestedMode;
  });

  const [lang, setLang] = useState(() =>
    readStorage(STORAGE_KEYS.language, STORE_SETTINGS.defaults.language),
  );

  const [customerMarket, setCustomerMarket] = useState(() =>
    getInitialCustomerMarket(),
  );

  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [committedSearch, setCommittedSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const [activeCategories, setActiveCategories] = useState(
    STORE_SETTINGS.defaults.activeCategories,
  );

  const [activeSubnavItem, setActiveSubnavItem] = useState("all");

  const [priceFilter, setPriceFilter] = useState(
    STORE_SETTINGS.defaults.priceFilter,
  );

  const [discountFilter, setDiscountFilter] = useState(
    STORE_SETTINGS.defaults.discountFilter,
  );

  const [page, setPage] = useState(() => getInitialPageFromUrl());

  const [cart, setCart] = useState(() =>
    sanitizeCart(readStorage(STORAGE_KEYS.cart, [])),
  );

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [wishlistIds, setWishlistIds] = useState(() =>
    readStorage(STORAGE_KEYS.wishlist, []),
  );

  const [recentlyViewedIds, setRecentlyViewedIds] = useState(() =>
    readStorage(STORAGE_KEYS.recentlyViewed, []),
  );

  const savedLastOrder = readStorage(STORAGE_KEYS.lastOrder, null);

  const [lastOrderItems, setLastOrderItems] = useState(
    savedLastOrder?.items || [],
  );

  const [lastOrderDetails, setLastOrderDetails] = useState(
    savedLastOrder?.details || null,
  );

  const [orderHistory, setOrderHistory] = useState(() =>
    readStorage(STORAGE_KEYS.orderHistory, []),
  );

  const t = I18N[lang] || I18N.en;
  useSiteTranslation(lang);

  const themeVariables = getThemeVariables(mode);

  function navigateToPage(pageName, options = {}) {
    setPage(pageName);

    if (typeof window !== "undefined") {
      const path = ADMIN_PATH_BY_PAGE[pageName] || "/";

      if (window.location.pathname !== path) {
        window.history.pushState({ page: pageName }, "", path);
      }
    }

    if (options.scroll !== false && typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    function syncFromClock() {
      const nextClock = getAutoThemeInfo();
      setClockState(nextClock);

      if (themePreference === "auto") {
        setMode(nextClock.suggestedMode);
      }
    }

    syncFromClock();

    const msToNextMinute =
      (60 - new Date().getSeconds()) * 1000 - new Date().getMilliseconds();

    const alignTimer = window.setTimeout(() => {
      syncFromClock();

      const timer = window.setInterval(syncFromClock, 60 * 1000);
      alignTimerRef.current = timer;
    }, msToNextMinute);

    return () => {
      window.clearTimeout(alignTimer);
      window.clearInterval(alignTimerRef.current);
    };
  }, [themePreference]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.themePreference, themePreference);

    if (themePreference === "auto") {
      setMode(getAutoThemeInfo().suggestedMode);
    }
  }, [themePreference]);

  useEffect(() => {
    function handlePopState() {
      setPage(getInitialPageFromUrl());
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.mode, mode);
  }, [mode]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.language, lang);
  }, [lang]);

  useEffect(() => {
    let shouldIgnore = false;

    async function syncCustomerMarket() {
      const remoteMarket = await fetchCustomerMarketFromServer();

      if (!shouldIgnore && remoteMarket) {
        setCustomerMarket(remoteMarket);
      }
    }

    syncCustomerMarket();

    return () => {
      shouldIgnore = true;
    };
  }, []);

  useEffect(() => {
    saveCustomerMarket(customerMarket);
    setPriceFilter(STORE_SETTINGS.defaults.priceFilter);
  }, [customerMarket]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.cart, cart);
  }, [cart]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.wishlist, wishlistIds);
  }, [wishlistIds]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.recentlyViewed, recentlyViewedIds);
  }, [recentlyViewedIds]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.orderHistory, orderHistory);
  }, [orderHistory]);

  useEffect(() => {
    document.body.style.overflow = cartDrawerOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [cartDrawerOpen]);

  useEffect(() => {
    function closeAll() {
      setOpenDropdown(null);
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setSearchOpen(false);
        setCartDrawerOpen(false);
      }
    }

    document.addEventListener("click", closeAll);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("click", closeAll);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const translatedProducts = useMemo(
    () =>
      products.map((product) => translateProduct(product, t, customerMarket)),
    [customerMarket, t],
  );

  const productMap = useMemo(
    () => new Map(translatedProducts.map((product) => [product.id, product])),
    [translatedProducts],
  );

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => {
          const product = productMap.get(item.id);

          if (!product) {
            return null;
          }

          return {
            ...product,
            quantity: sanitizeQuantity(item.quantity),
          };
        })
        .filter(Boolean),
    [cart, productMap],
  );

  const cartQuantity = useMemo(() => getCartQuantity(cartItems), [cartItems]);

  const cartQuantityById = useMemo(() => {
    return cartItems.reduce((lookup, item) => {
      lookup[item.id] = item.quantity;
      return lookup;
    }, {});
  }, [cartItems]);

  const wishlistProducts = useMemo(
    () => wishlistIds.map((id) => productMap.get(id)).filter(Boolean),
    [productMap, wishlistIds],
  );

  const recentlyViewedProducts = useMemo(
    () => recentlyViewedIds.map((id) => productMap.get(id)).filter(Boolean),
    [productMap, recentlyViewedIds],
  );

  const filteredProducts = useMemo(() => {
    const q = committedSearch.trim().toLowerCase();

    return translatedProducts.filter((product) => {
      const categoryMatch =
        activeCategories.length === 0 ||
        activeCategories.includes(product.category);

      const priceMatch = priceInRange(
        product.finalPrice,
        priceFilter,
        customerMarket,
      );
      const discountMatch = discountMatches(product, discountFilter);

      const text =
        `${product.name} ${product.categoryName} ${product.size} ${product.description} ${product.priceText} ${product.originalPriceText}`.toLowerCase();

      const textMatch = !q || text.includes(q);

      return categoryMatch && priceMatch && discountMatch && textMatch;
    });
  }, [
    activeCategories,
    committedSearch,
    discountFilter,
    priceFilter,
    translatedProducts,
    customerMarket,
  ]);

  const suggestions = useMemo(() => {
    const q = searchText.trim().toLowerCase();

    if (!q) {
      return [];
    }

    return translatedProducts.filter((product) => {
      const text =
        `${product.name} ${product.categoryName} ${product.size} ${product.description}`.toLowerCase();

      return text.includes(q);
    });
  }, [searchText, translatedProducts]);

  function submitSearch(event) {
    event.preventDefault();
    setCommittedSearch(searchText);
    setSearchOpen(false);
    navigateToPage("shop");
  }

  function scrollToShopSection(sectionId) {
    if (typeof window === "undefined") {
      return;
    }

    window.setTimeout(() => {
      const target = document.getElementById(sectionId);

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 90);
  }

  function handleSubnavSelect(target) {
    setActiveSubnavItem(target);
    setSearchText("");
    setCommittedSearch("");
    setPriceFilter(STORE_SETTINGS.defaults.priceFilter);

    if (target === "all") {
      setActiveCategories(STORE_SETTINGS.defaults.activeCategories);
      setDiscountFilter(STORE_SETTINGS.defaults.discountFilter);
      navigateToPage("shop", { scroll: false });
      scrollToShopSection("all-products");
      return;
    }

    if (target === "deals") {
      setActiveCategories(STORE_SETTINGS.defaults.activeCategories);
      setDiscountFilter("discounted");
      navigateToPage("shop", { scroll: false });
      scrollToShopSection("section-deals");
      return;
    }

    setActiveCategories([target]);
    setDiscountFilter(STORE_SETTINGS.defaults.discountFilter);
    navigateToPage("shop", { scroll: false });
    scrollToShopSection(`section-${target}`);
  }

  function viewProduct(product) {
    setSelectedProductId(product.id);

    setRecentlyViewedIds((current) =>
      [product.id, ...current.filter((id) => id !== product.id)].slice(0, 8),
    );

    setSearchOpen(false);
    setOpenDropdown(null);
    navigateToPage("product-detail");
  }

  function chooseSuggestion(product) {
    setSearchText(product.name);
    setCommittedSearch("");
    viewProduct(product);
  }

  function toggleCategory(category) {
    setActiveCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  }

  function clearFilters() {
    setActiveCategories(STORE_SETTINGS.defaults.activeCategories);
    setPriceFilter(STORE_SETTINGS.defaults.priceFilter);
    setDiscountFilter(STORE_SETTINGS.defaults.discountFilter);
    setSearchText("");
    setCommittedSearch("");
    setSearchOpen(false);
    navigateToPage("shop");
  }

  function toggleWishlist(productId) {
    setWishlistIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [productId, ...current],
    );
  }

  function addToCart(product, quantity = 1) {
    const safeQuantity = sanitizeQuantity(quantity);

    setCart((current) => {
      const normalized = sanitizeCart(current);
      const existing = normalized.find((item) => item.id === product.id);

      if (existing) {
        return normalized.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: sanitizeQuantity(item.quantity) + safeQuantity,
              }
            : item,
        );
      }

      return [...normalized, { id: product.id, quantity: safeQuantity }];
    });

    setCartDrawerOpen(true);
  }

  function changeCartQuantity(id, nextQuantityOrUpdater) {
    setCart((current) => {
      const normalized = sanitizeCart(current);

      return normalized.flatMap((item) => {
        if (item.id !== id) {
          return [item];
        }

        const rawNextQuantity =
          typeof nextQuantityOrUpdater === "function"
            ? nextQuantityOrUpdater(item.quantity)
            : nextQuantityOrUpdater;

        const nextQuantity = Math.floor(Number(rawNextQuantity));

        if (!Number.isFinite(nextQuantity) || nextQuantity <= 0) {
          return [];
        }

        return [{ ...item, quantity: nextQuantity }];
      });
    });
  }

  function removeFromCart(id) {
    setCart((current) =>
      sanitizeCart(current).filter((item) => item.id !== id),
    );
  }

  function placeOrder(orderDetails = null) {
    const marketSettings = getMarketSettings(customerMarket);
    const storedItems = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      size: item.size,
      image: item.image,
      finalPrice: item.finalPrice,
      quantity: item.quantity,
      market: item.market,
      currencyCode: item.currencyCode,
    }));

    const orderRecord = {
      id: `CNF-${Date.now()}`,
      createdAt: new Date().toISOString(),
      items: storedItems,
      market: customerMarket,
      currencyCode: marketSettings.currencyCode,
      details: {
        ...orderDetails,
        market: customerMarket,
        currencyCode: marketSettings.currencyCode,
      },
    };

    setLastOrderItems(storedItems);
    setLastOrderDetails(orderDetails);

    writeStorage(STORAGE_KEYS.lastOrder, {
      items: storedItems,
      details: orderDetails,
    });

    setOrderHistory((current) => [orderRecord, ...current].slice(0, 12));
    setCart([]);
    setCartDrawerOpen(false);
    navigateToPage("order-success");
  }

  function renderPage() {
    switch (page) {
      case "admin-dashboard":
      case "admin-products":
      case "admin-orders":
      case "admin-customers":
      case "admin-delivery":
      case "admin-settings":
        return (
          <AdminPage
            activePage={page}
            setPage={navigateToPage}
            products={translatedProducts}
            orderHistory={orderHistory}
          />
        );

      case "checkout":
        return (
          <CheckoutPage
            cartItems={cartItems}
            setPage={navigateToPage}
            changeCartQuantity={changeCartQuantity}
            removeFromCart={removeFromCart}
            onPlaceOrder={placeOrder}
          />
        );

      case "product-detail":
        return (
          <ProductDetailPage
            product={productMap.get(selectedProductId)}
            relatedProducts={translatedProducts
              .filter(
                (item) =>
                  item.id !== selectedProductId &&
                  item.category === productMap.get(selectedProductId)?.category,
              )
              .slice(0, 3)}
            setPage={navigateToPage}
            onAddToCart={addToCart}
            onViewProduct={viewProduct}
            isWishlisted={wishlistIds.includes(selectedProductId)}
            onToggleWishlist={toggleWishlist}
            cartQuantity={cartQuantityById[selectedProductId] || 0}
          />
        );

      case "story":
        return <StoryPage setPage={navigateToPage} />;

      case "local-staples":
        return (
          <LocalStaplesPage
            setPage={navigateToPage}
            setActiveCategories={setActiveCategories}
          />
        );

      case "order-success":
        return (
          <OrderSuccessPage
            orderItems={lastOrderItems}
            orderDetails={lastOrderDetails}
            setPage={navigateToPage}
          />
        );

      case "signin":
      case "create-account":
      case "signed-out":
      case "account":
        return (
          <AccountPage
            setPage={navigateToPage}
            cartCount={cartQuantity}
            wishlistCount={wishlistProducts.length}
            orderCount={orderHistory.length}
          />
        );

      case "delivery-details":
        return <DeliveryDetailsPage setPage={navigateToPage} />;

      case "checkout-preferences":
        return <CheckoutPreferencesPage setPage={navigateToPage} />;

      case "orders":
        return (
          <OrdersPage setPage={navigateToPage} orderHistory={orderHistory} />
        );

      case "wishlist":
        return (
          <WishlistPage
            setPage={navigateToPage}
            wishlistProducts={wishlistProducts}
            onAddToCart={addToCart}
            onViewProduct={viewProduct}
            onToggleWishlist={toggleWishlist}
          />
        );

      case "contact":
        return <ContactPage setPage={navigateToPage} />;

      case "faq":
        return <FaqPage setPage={navigateToPage} />;

      default:
        return (
          <ShopPage
            t={t}
            clearFilters={clearFilters}
            activeCategories={activeCategories}
            toggleCategory={toggleCategory}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            discountFilter={discountFilter}
            setDiscountFilter={setDiscountFilter}
            allProducts={translatedProducts}
            filteredProducts={filteredProducts}
            onAddToCart={addToCart}
            onViewProduct={viewProduct}
            setActiveCategories={setActiveCategories}
            setPage={navigateToPage}
            wishlistIds={wishlistIds}
            onToggleWishlist={toggleWishlist}
            recentlyViewedProducts={recentlyViewedProducts}
            cartQuantityById={cartQuantityById}
            customerMarket={customerMarket}
          />
        );
    }
  }

  const isAdminPage = page.startsWith("admin-");

  return (
    <div className="page" data-mode={mode} style={themeVariables}>
      {!isAdminPage && (
        <Header
          mode={mode}
          clockLabel={clockState.clockLabel}
          lang={lang}
          setLang={setLang}
          t={t}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          searchText={searchText}
          setSearchText={setSearchText}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          suggestions={suggestions}
          submitSearch={submitSearch}
          chooseSuggestion={chooseSuggestion}
          cartItems={cartItems}
          setPage={navigateToPage}
          removeFromCart={removeFromCart}
          changeCartQuantity={changeCartQuantity}
          onOpenCart={() => setCartDrawerOpen(true)}
        />
      )}

      {!isAdminPage && (
        <Subnav
          t={t}
          onSubnavSelect={handleSubnavSelect}
          activeItem={page === "shop" ? activeSubnavItem : page}
          setPage={(pageName) => {
            setActiveSubnavItem(pageName);
            navigateToPage(pageName);
          }}
        />
      )}

      {renderPage()}

      {!isAdminPage && (
        <CartDrawer
          isOpen={cartDrawerOpen}
          cartItems={cartItems}
          onClose={() => setCartDrawerOpen(false)}
          onCheckout={() => {
            setCartDrawerOpen(false);
            navigateToPage("checkout");
          }}
          onContinueShopping={() => {
            setCartDrawerOpen(false);
            navigateToPage("shop");
          }}
          onRemove={removeFromCart}
          onChangeQuantity={changeCartQuantity}
        />
      )}

      {!isAdminPage && (
        <StickyCartButton
          cartItems={cartItems}
          onOpen={() => setCartDrawerOpen(true)}
        />
      )}

      {!isAdminPage && (
        <FloatingJuniorChatbot setPage={navigateToPage} mode={mode} />
      )}

      {!isAdminPage && (
        <Footer
          setPage={navigateToPage}
          mode={mode}
          setMode={setMode}
          clockLabel={clockState.clockLabel}
          dateLabel={clockState.dateLabel}
          themePreference={themePreference}
          setThemePreference={setThemePreference}
        />
      )}
    </div>
  );
}
