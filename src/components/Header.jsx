import { useState } from "react";
import { CODE, FLAG, LANG_OPTIONS } from "../data/i18n";
import { STORE_SETTINGS } from "../config/storeSettings";
import { getCartQuantity } from "../utils/cart";
import {
  AccountIcon,
  BurgerIcon,
  CaretIcon,
  CloseIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  CartIcon,
} from "./icons";
import { LogoBadge } from "./LogoBadge";
import { SearchEmptyState } from "./EmptyState";

export function Header({
  mode,
  clockLabel,
  lang,
  setLang,
  t,
  openDropdown,
  setOpenDropdown,
  searchText,
  setSearchText,
  searchOpen,
  setSearchOpen,
  suggestions,
  submitSearch,
  chooseSuggestion,
  cartItems,
  setPage,
  onOpenCart,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = getCartQuantity(cartItems);

  function toggleDropdown(name, event) {
    event.stopPropagation();
    setOpenDropdown((cur) => (cur === name ? null : name));
  }

  function chooseLanguage(code, event) {
    event.stopPropagation();
    setLang(code);
    setOpenDropdown(null);
  }

  function goToPage(pageName) {
    setPage(pageName);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }

  function openCart() {
    onOpenCart();
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }

  const ModeIcon = mode === "dark" ? MoonIcon : SunIcon;

  return (
    <>
      <header className="site-header">
        {/* ── Brand ── */}
        <button
          className="brand-button"
          type="button"
          onClick={() => goToPage("shop")}
        >
          <LogoBadge />
          <span className="brand-text">
            <span className="brand-mark">{STORE_SETTINGS.brand.name}</span>
            <span className="brand-sub">{STORE_SETTINGS.brand.subtitle}</span>
          </span>
        </button>

        {/* ── Search — hidden on mobile, shown on ≥640px ── */}
        <form className="header-search" onSubmit={submitSearch}>
          <input
            id="searchInput"
            className="search-input"
            type="search"
            placeholder={t.search}
            aria-label="Search products"
            autoComplete="off"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setSearchOpen(Boolean(e.target.value.trim()));
            }}
            onFocus={() => setSearchOpen(Boolean(searchText.trim()))}
          />
          <button className="search-btn" aria-label="Search" type="submit">
            <SearchIcon />
          </button>
          <div
            className={`search-popout ${searchOpen ? "open" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {searchText.trim() && suggestions.length === 0 ? (
              <div className="search-popout-empty">
                <SearchEmptyState query={searchText} />
              </div>
            ) : (
              suggestions.map((product) => (
                <button
                  className="search-popout-item"
                  key={product.id}
                  type="button"
                  onClick={() => {
                    chooseSuggestion(product);
                    setMobileMenuOpen(false);
                  }}
                >
                  <img
                    src={product.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <span>
                    <span className="spi-name">{product.name}</span>
                    <span className="spi-meta">
                      {product.categoryName} · {product.priceText}
                    </span>
                  </span>
                </button>
              ))
            )}
          </div>
        </form>

        {/* ── Desktop cluster (≥768px) ── */}
        <div className="header-cluster">
          {/* Language picker */}
          <div
            className={`dropdown lang ${openDropdown === "lang" ? "open" : ""}`}
          >
            <button
              className="dd-toggle"
              aria-haspopup="true"
              aria-expanded={openDropdown === "lang"}
              type="button"
              onClick={(e) => toggleDropdown("lang", e)}
            >
              <span className={`fi fi-${FLAG[lang] || "gb"}`}></span>
              <span>{CODE[lang] || lang.toUpperCase()}</span>
              <CaretIcon />
            </button>
            <div
              className="dd-menu lang-menu"
              onClick={(e) => e.stopPropagation()}
            >
              {LANG_OPTIONS.map((opt) => (
                <button
                  className={`dd-item lang-item ${opt.code === lang ? "current" : ""}`}
                  key={opt.code}
                  type="button"
                  onClick={(e) => chooseLanguage(opt.code, e)}
                >
                  <span className={`fi fi-${FLAG[opt.code] || "gb"}`}></span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Account picker */}
          <div
            className={`dropdown account ${openDropdown === "account" ? "open" : ""}`}
          >
            <button
              className="dd-toggle acct-toggle"
              aria-haspopup="true"
              aria-expanded={openDropdown === "account"}
              type="button"
              onClick={(e) => toggleDropdown("account", e)}
            >
              <AccountIcon />
              <span>
                <span className="l1">{t.hello}</span>
                <span className="l2">{t.acct}</span>
              </span>
              <CaretIcon />
            </button>
            <div
              className="dd-menu acct-menu"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="signin-btn is-disabled"
                type="button"
                disabled
                aria-disabled="true"
              >
                {t.signin} paused
              </button>
              <p className="newcust auth-paused-note">
                Accounts are disabled for version one. Customers can still order
                as guests through WhatsApp.
              </p>
              <hr className="dd-sep" />
              <button
                className="dd-item"
                type="button"
                onClick={() => goToPage("account")}
              >
                {t.a_account}
              </button>
              <button
                className="dd-item"
                type="button"
                onClick={() => goToPage("orders")}
              >
                {t.a_orders}
              </button>
              <button
                className="dd-item"
                type="button"
                onClick={() => goToPage("wishlist")}
              >
                {t.a_wish}
              </button>
            </div>
          </div>

          {/* Cart */}
          <div className="cart-wrap">
            <button className="cart" type="button" onClick={openCart}>
              <CartIcon />
              <span className="cart-label">{STORE_SETTINGS.labels.cart}</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>

          {/* Clock replaces the old header mode toggle */}
          <div
            className="header-time-pill"
            aria-label={`Current time ${clockLabel}`}
          >
            <ModeIcon />
            <strong>{clockLabel}</strong>
          </div>
        </div>

        {/* ── Mobile right strip (cart count + burger) ── */}
        <div className="mobile-strip">
          <button
            className="cart cart-mobile"
            type="button"
            onClick={openCart}
            aria-label={`Cart, ${cartCount} items`}
          >
            <CartIcon />
            <span className="cart-label">{STORE_SETTINGS.labels.cart}</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <button
            className="burger-btn"
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? <CloseIcon /> : <BurgerIcon />}
          </button>
        </div>
      </header>

      {/* ── Mobile search row (always visible below header on small screens) ── */}
      <div className="mobile-search-row">
        <form className="mobile-search-form" onSubmit={submitSearch}>
          <input
            className="search-input"
            type="search"
            placeholder={t.search}
            aria-label="Search products"
            autoComplete="off"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setSearchOpen(Boolean(e.target.value.trim()));
            }}
            onFocus={() => setSearchOpen(Boolean(searchText.trim()))}
          />
          <button className="search-btn" aria-label="Search" type="submit">
            <SearchIcon />
          </button>
          <div
            className={`search-popout ${searchOpen ? "open" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {searchText.trim() && suggestions.length === 0 ? (
              <div className="search-popout-empty">
                <SearchEmptyState query={searchText} />
              </div>
            ) : (
              suggestions.map((product) => (
                <button
                  className="search-popout-item"
                  key={product.id}
                  type="button"
                  onClick={() => {
                    chooseSuggestion(product);
                    setMobileMenuOpen(false);
                  }}
                >
                  <img
                    src={product.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <span>
                    <span className="spi-name">{product.name}</span>
                    <span className="spi-meta">
                      {product.categoryName} · {product.priceText}
                    </span>
                  </span>
                </button>
              ))
            )}
          </div>
        </form>
      </div>

      {/* ── Mobile drawer overlay ── */}
      {mobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      <nav
        className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-drawer-inner">
          {/* Account section */}
          <div className="mobile-nav-section">
            <p className="mobile-nav-label">{t.hello}</p>
            <button
              className="signin-btn is-disabled"
              type="button"
              disabled
              aria-disabled="true"
            >
              {t.signin} paused
            </button>
            <p className="newcust auth-paused-note" style={{ marginTop: 10 }}>
              Accounts are disabled for now. Checkout stays guest-only through
              WhatsApp.
            </p>
          </div>

          <hr className="dd-sep" />

          {/* Navigation links */}
          <div className="mobile-nav-section">
            <p className="mobile-nav-label">My account</p>
            <button
              className="mobile-nav-item"
              type="button"
              onClick={() => goToPage("account")}
            >
              {t.a_account}
            </button>
            <button
              className="mobile-nav-item"
              type="button"
              onClick={() => goToPage("orders")}
            >
              {t.a_orders}
            </button>
            <button
              className="mobile-nav-item"
              type="button"
              onClick={() => goToPage("wishlist")}
            >
              {t.a_wish}
            </button>
            <button
              className="mobile-nav-item mobile-cart-link"
              type="button"
              onClick={openCart}
            >
              <CartIcon />
              <span>Cart ({cartCount})</span>
            </button>
          </div>

          <hr className="dd-sep" />

          {/* Shop links */}
          <div className="mobile-nav-section">
            <p className="mobile-nav-label">Shop</p>
            <button
              className="mobile-nav-item"
              type="button"
              onClick={() => goToPage("shop")}
            >
              All products
            </button>
            <button
              className="mobile-nav-item"
              type="button"
              onClick={() => goToPage("story")}
            >
              Our story
            </button>
            <button
              className="mobile-nav-item"
              type="button"
              onClick={() => goToPage("local-staples")}
            >
              Local staples
            </button>
            <button
              className="mobile-nav-item"
              type="button"
              onClick={() => goToPage("delivery-details")}
            >
              Delivery & tracking
            </button>
            <button
              className="mobile-nav-item"
              type="button"
              onClick={() => goToPage("faq")}
            >
              FAQ
            </button>
            <button
              className="mobile-nav-item"
              type="button"
              onClick={() => goToPage("contact")}
            >
              Contact us
            </button>
          </div>

          <hr className="dd-sep" />

          {/* Language + Time row */}
          <div className="mobile-nav-section mobile-settings-row">
            <div
              className={`dropdown lang ${openDropdown === "lang" ? "open" : ""}`}
            >
              <button
                className="dd-toggle mobile-dd-toggle"
                type="button"
                onClick={(e) => toggleDropdown("lang", e)}
              >
                <span className={`fi fi-${FLAG[lang] || "gb"}`}></span>
                <span>{CODE[lang] || lang.toUpperCase()}</span>
                <CaretIcon />
              </button>
              <div
                className="dd-menu lang-menu"
                style={{
                  bottom: "calc(100% + 8px)",
                  top: "auto",
                  right: "auto",
                  left: 0,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {LANG_OPTIONS.map((opt) => (
                  <button
                    className={`dd-item lang-item ${opt.code === lang ? "current" : ""}`}
                    key={opt.code}
                    type="button"
                    onClick={(e) => chooseLanguage(opt.code, e)}
                  >
                    <span className={`fi fi-${FLAG[opt.code] || "gb"}`}></span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mobile-time-pill">
              <ModeIcon />
              <span>{clockLabel}</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
