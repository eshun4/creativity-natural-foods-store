import { STORE_SETTINGS } from "../config/storeSettings";
import { MoonIcon, SunIcon } from "./icons";

export function Footer({
  setPage,
  mode,
  setMode,
  dateLabel,
  setThemePreference,
}) {
  const nextMode = mode === "dark" ? "light" : "dark";
  const ThemeToggleIcon = nextMode === "dark" ? MoonIcon : SunIcon;
  const nextModeLabel =
    nextMode === "dark"
      ? STORE_SETTINGS.labels.darkMode
      : STORE_SETTINGS.labels.lightMode;
  function toggleManualTheme() {
    setThemePreference?.("manual");
    setMode?.((cur) => (cur === "dark" ? "light" : "dark"));
  }

  function useAutoTheme() {
    setThemePreference?.("auto");
  }

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col">
          <div className="footer-brand">{STORE_SETTINGS.brand.name}</div>
          <div className="footer-meta">{STORE_SETTINGS.brand.producedBy}</div>
        </div>

        <div className="footer-col">
          <div className="footer-col-label">Quick links</div>
          <nav className="footer-links-grid">
            <button
              type="button"
              className="footer-link-btn"
              onClick={() => setPage?.("shop")}
            >
              Shop all products
            </button>
            <button
              type="button"
              className="footer-link-btn"
              onClick={() => setPage?.("story")}
            >
              Our story
            </button>
            <button
              type="button"
              className="footer-link-btn"
              onClick={() => setPage?.("delivery-details")}
            >
              Delivery &amp; tracking
            </button>
            <button
              type="button"
              className="footer-link-btn"
              onClick={() => setPage?.("faq")}
            >
              FAQ
            </button>
            <button
              type="button"
              className="footer-link-btn"
              onClick={() => setPage?.("contact")}
            >
              Contact us
            </button>
          </nav>
        </div>

        <div className="footer-col">
          <div className="footer-col-label">Contact</div>
          <address className="footer-meta footer-address">
            {STORE_SETTINGS.brand.addressLines.map((line) => (
              <span key={line} className="footer-address-line">
                {line}
              </span>
            ))}
            <span className="footer-address-line footer-phone">
              {STORE_SETTINGS.brand.phoneText}
            </span>
          </address>
        </div>
      </div>

      {/* ── Theme bar: date left · buttons right ── */}
      <div className="footer-theme-bar" aria-label="Display settings">
        <div className="footer-theme-date">
          <span className="footer-date-label">{dateLabel}</span>
        </div>
        <div className="footer-theme-btns">
          <button
            className="footer-theme-btn"
            type="button"
            aria-label={`Switch to ${nextModeLabel} mode`}
            onClick={toggleManualTheme}
          >
            <ThemeToggleIcon />
            {nextModeLabel}
          </button>
          <button
            className="footer-theme-btn"
            type="button"
            onClick={useAutoTheme}
          >
            Auto by time
          </button>
        </div>
      </div>

      <div className="footer-note">{STORE_SETTINGS.brand.footerNote}</div>
      <div className="footer-copyright">
        © {new Date().getFullYear()} Kofi Junior Eshun. All rights reserved.
      </div>
    </footer>
  );
}
