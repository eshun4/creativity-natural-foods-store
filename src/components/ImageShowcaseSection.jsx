export function ImageShowcaseSection({ title, note, images, actionLabel, onAction }) {
  if (!images?.length) return null;

  return (
    <section className="image-showcase-section wrap">
      <div className="product-row-head">
        <div>
          <h2>{title}</h2>
          {note ? <p>{note}</p> : null}
        </div>
        {actionLabel ? (
          <button className="showcase-action" type="button" onClick={onAction}>{actionLabel}</button>
        ) : null}
      </div>

      <div className="image-showcase-scroll">
        {images.map((item, index) => (
          <button className="image-showcase-card" type="button" key={`${item.label}-${index}`} onClick={onAction}>
            <img src={item.image} alt={item.label} loading="lazy" decoding="async" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
