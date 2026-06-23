import { STORE_SETTINGS } from "../config/storeSettings";

function subnavClass(isActive) {
  return isActive ? "is-active" : undefined;
}

export function Subnav({ t, onSubnavSelect, setPage, activeItem = "all" }) {
  return (
    <nav className="subnav" aria-label="Product categories">
      <a
        className={subnavClass(activeItem === "all")}
        href="#all-products"
        aria-current={activeItem === "all" ? "page" : undefined}
        onClick={(e) => {
          e.preventDefault();
          onSubnavSelect("all");
        }}
      >
        {t.n_all}
      </a>
      {STORE_SETTINGS.categories.map((cat) => (
        <a
          className={subnavClass(activeItem === cat.id)}
          href={`#section-${cat.id}`}
          key={cat.id}
          aria-current={activeItem === cat.id ? "page" : undefined}
          onClick={(e) => {
            e.preventDefault();
            onSubnavSelect(cat.id);
          }}
        >
          {t[cat.labelKey]}
        </a>
      ))}
      {/* <a
        className={subnavClass(activeItem === "deals")}
        href="#section-deals"
        aria-current={activeItem === "deals" ? "page" : undefined}
        onClick={(e) => {
          e.preventDefault();
          onSubnavSelect("deals");
        }}
      >
        Deals
      </a> */}
      {/* <a
        className={subnavClass(activeItem === "story")}
        href="#story"
        aria-current={activeItem === "story" ? "page" : undefined}
        onClick={(e) => {
          e.preventDefault();
          setPage("story");
        }}
      >
        Our Story
      </a> */}
      {/* <a
        className={subnavClass(activeItem === "local-staples")}
        href="#local-staples"
        aria-current={activeItem === "local-staples" ? "page" : undefined}
        onClick={(e) => {
          e.preventDefault();
          setPage("local-staples");
        }}
      >
        Local Staples
      </a> */}
      <a
        className={subnavClass(activeItem === "delivery-details")}
        href="#delivery"
        aria-current={activeItem === "delivery-details" ? "page" : undefined}
        onClick={(e) => {
          e.preventDefault();
          setPage("delivery-details");
        }}
      >
        Delivery
      </a>
      <a
        className={subnavClass(activeItem === "faq")}
        href="#faq"
        aria-current={activeItem === "faq" ? "page" : undefined}
        onClick={(e) => {
          e.preventDefault();
          setPage("faq");
        }}
      >
        FAQ
      </a>
      <a
        className={subnavClass(activeItem === "contact")}
        href="#contact"
        aria-current={activeItem === "contact" ? "page" : undefined}
        onClick={(e) => {
          e.preventDefault();
          setPage("contact");
        }}
      >
        Contact
      </a>
    </nav>
  );
}
