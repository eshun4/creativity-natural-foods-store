import { useEffect, useRef, useState } from 'react';
import { bannerSlides } from '../data/bannerSlides';

export function HeroCarousel({ onSlideAction }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = back
  const timerRef = useRef(null);

  function resetTimer() {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, 5500);
  }

  function advance() {
    setActiveIndex((cur) => {
      setPrevIndex(cur);
      setDir(1);
      return (cur + 1) % bannerSlides.length;
    });
  }

  useEffect(() => {
    timerRef.current = setInterval(advance, 5500);
    return () => clearInterval(timerRef.current);
  }, []);

  function goTo(idx) {
    if (idx === activeIndex) return;
    setDir(idx > activeIndex ? 1 : -1);
    setPrevIndex(activeIndex);
    setActiveIndex(idx);
    resetTimer();
  }

  function prev() {
    goTo(activeIndex === 0 ? bannerSlides.length - 1 : activeIndex - 1);
  }
  function next() {
    goTo((activeIndex + 1) % bannerSlides.length);
  }

  return (
    <section className="hero-carousel-section" aria-label="Featured product promotions">
      {/* Full-bleed stage — image IS the background */}
      <div className="hero-carousel">
        <div className="hero-carousel-stage">
          {bannerSlides.map((slide, index) => (
            <button
              key={slide.id}
              className={`carousel-slide-button ${index === activeIndex ? 'is-active' : ''}`}
              type="button"
              onClick={() => onSlideAction(slide.action)}
              aria-label={slide.actionLabel}
              tabIndex={index === activeIndex ? 0 : -1}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
            </button>
          ))}
        </div>

        {/* Left arrow — slim, translucent, Amazon-style */}
        <button
          className="carousel-arrow carousel-arrow-left"
          type="button"
          aria-label="Previous"
          onClick={prev}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <button
          className="carousel-arrow carousel-arrow-right"
          type="button"
          aria-label="Next"
          onClick={next}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        {/* Dot nav — bottom-centre */}
        <nav className="carousel-dots" aria-label="Slide navigation">
          {bannerSlides.map((slide, index) => (
            <button
              key={slide.id}
              className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex}
              onClick={() => goTo(index)}
            />
          ))}
        </nav>
      </div>
    </section>
  );
}
