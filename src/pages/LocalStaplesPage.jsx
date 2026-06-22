export function LocalStaplesPage({ setPage, setActiveCategories }) {
  function shopStaples() {
    setActiveCategories(['porridge']);
    setPage('shop');
    setTimeout(() => {
      document.getElementById('productGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  return (
    <main className="content-page wrap">
      <button className="back-link" type="button" onClick={() => setPage('shop')}>Back to shop</button>

      <section className="content-card">
        <p className="eyebrow">Local Ghana staples</p>
        <h1>Banku, koko, breakfast, and pantry essentials</h1>
        <p>
          Traditional Ghana-made staples: sorghum powder, mixed porridge Tom Brown, groundnut paste, and wild honey.
        </p>

        <div className="content-grid content-grid--spaced">
          <div>
            <strong>Banku / Koko powder</strong>
            <span>Sorghum powder options for traditional meals.</span>
          </div>
          <div>
            <strong>Tom Brown</strong>
            <span>Breakfast porridge blend for the family.</span>
          </div>
          <div>
            <strong>Wild honey</strong>
            <span>Natural sweetener for tea, porridge, and recipes.</span>
          </div>
        </div>

        <button className="btn" type="button" onClick={shopStaples}>Shop staples</button>
      </section>
    </main>
  );
}
