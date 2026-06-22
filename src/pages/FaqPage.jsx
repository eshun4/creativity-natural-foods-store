import { FaqSection } from "../components/FaqSection";
import { AiFaqAssistant } from "../components/AiFaqAssistant";

export function FaqPage({ setPage }) {
  return (
    <main className="content-page wrap">
      <button
        className="back-link"
        type="button"
        onClick={() => setPage("shop")}
      >
        Back to shop
      </button>

      <section className="content-card">
        <p className="eyebrow">Help center</p>
        <h1>Frequently asked questions</h1>
        <p>
          Quick answers for customers ordering Ghanaian natural foods locally or
          internationally. This page helps shoppers understand how WhatsApp
          checkout, delivery, tracking, payment, and product care work.
        </p>
      </section>

      <AiFaqAssistant setPage={setPage} />

      <FaqSection setPage={setPage} variant="page" />
    </main>
  );
}
