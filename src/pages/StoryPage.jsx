import { STORE_SETTINGS } from '../config/storeSettings';

export function StoryPage({ setPage }) {
  return (
    <main className="content-page wrap">
      <button className="back-link" type="button" onClick={() => setPage('shop')}>Back to shop</button>

      <section className="content-card">
        <p className="eyebrow">Our story</p>
        <h1>Creativity Natural Foods</h1>
        <p>
          Creativity Natural Foods is a Ghana-made food brand focused on everyday pantry essentials:
          wild honey, groundnut paste, mixed porridge, and traditional powders for banku and koko.
        </p>

        <div className="content-grid content-grid--spaced">
          <div>
            <strong>Local roots</strong>
            <span>{STORE_SETTINGS.brand.producedBy}</span>
          </div>
          <div>
            <strong>Family staples</strong>
            <span>Products made for breakfast, cooking, and daily home use.</span>
          </div>
          <div>
            <strong>Simple shopping</strong>
            <span>Built for local ordering through WhatsApp, with international shipping available on request.</span>
          </div>
        </div>

        <button className="btn" type="button" onClick={() => setPage('shop')}>Shop all products</button>
      </section>
    </main>
  );
}
