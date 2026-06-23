import { useEffect, useRef, useState } from "react";
import { bannerSlides } from "../data/bannerSlides";
import { getDisplayPriceFromPriceSet } from "../config/storeSettings";

export function HeroCarousel({ onSlideAction, customerMarket }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  function startTimer() {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex(
        (currentIndex) => (currentIndex + 1) % bannerSlides.length,
      );
    }, 6500);
  }

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  function goTo(index) {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    startTimer();
  }

  function prev() {
    const nextIndex =
      activeIndex === 0 ? bannerSlides.length - 1 : activeIndex - 1;
    setDirection(-1);
    goTo(nextIndex);
  }

  function next() {
    setDirection(1);
    goTo((activeIndex + 1) % bannerSlides.length);
  }

  function runAction(action) {
    if (!action || !onSlideAction) return;
    onSlideAction(action);
  }

  return (
    <section
      className="hero-carousel-section"
      aria-label="Featured product promotions"
    >
      <div className="hero-carousel" style={{ "--slide-direction": direction }}>
        <div className="hero-carousel-stage">
          {bannerSlides.map((slide, index) => {
            const isActive = index === activeIndex;
            const priceInfo = getDisplayPriceFromPriceSet(
              slide.prices,
              customerMarket,
            );

            return (
              <article
                key={slide.id}
                className={`carousel-slide ${isActive ? "is-active" : ""} content-${slide.contentSide} theme-${slide.theme}`}
                aria-hidden={!isActive}
              >
                <img
                  className="carousel-slide-image"
                  src={slide.image}
                  alt={slide.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "auto"}
                />

                <div className="carousel-copy-wrap">
                  <div className="carousel-copy-card">
                    <p className="carousel-eyebrow">{slide.eyebrow}</p>
                    <h1>{slide.title}</h1>

                    <div
                      className="carousel-meta-row"
                      aria-label="Product information"
                    >
                      <span>{slide.detail}</span>
                      <span className="carousel-price-pill">
                        {priceInfo.priceText}
                      </span>
                      {priceInfo.hasDiscount ? (
                        <span className="carousel-was-pill">
                          Was {priceInfo.originalPriceText}
                        </span>
                      ) : null}
                    </div>

                    <p className="carousel-subtitle">{slide.subtitle}</p>
                    <p className="carousel-trust-line">{slide.trustLine}</p>

                    <div className="carousel-actions">
                      <button
                        className="carousel-primary-btn"
                        type="button"
                        onClick={() => runAction(slide.primaryAction)}
                      >
                        {slide.cta}
                      </button>

                      <button
                        className="carousel-secondary-btn"
                        type="button"
                        onClick={() => runAction(slide.secondaryAction)}
                      >
                        {slide.secondaryCta}
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14" />
                          <path d="m13 6 6 6-6 6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <button
          className="carousel-arrow carousel-arrow-left"
          type="button"
          aria-label="Previous banner"
          onClick={prev}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          className="carousel-arrow carousel-arrow-right"
          type="button"
          aria-label="Next banner"
          onClick={next}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <nav className="carousel-dots" aria-label="Banner slide navigation">
          {bannerSlides.map((slide, index) => (
            <button
              key={slide.id}
              className={`carousel-dot ${index === activeIndex ? "active" : ""}`}
              type="button"
              aria-label={`Go to ${slide.title} banner ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </nav>
      </div>
    </section>
  );
}
