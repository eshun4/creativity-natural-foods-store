import { STORE_SETTINGS } from '../config/storeSettings';

export function EmptyState({
  icon,
  eyebrow = 'Nothing here yet',
  title,
  message,
  tips = [],
  children,
  compact = false,
  align = 'center',
}) {
  return (
    <section className={`empty-state ${compact ? 'empty-state-compact' : ''} empty-state-${align}`}>
      {icon ? <div className="empty-state-icon" aria-hidden="true">{icon}</div> : null}
      {eyebrow ? <p className="eyebrow empty-state-eyebrow">{eyebrow}</p> : null}
      {title ? <h2>{title}</h2> : null}
      {message ? <p className="empty-state-message">{message}</p> : null}

      {tips.length > 0 ? (
        <div className="empty-state-tips" aria-label="Helpful suggestions">
          {tips.map((tip) => <span key={tip}>{tip}</span>)}
        </div>
      ) : null}

      {children ? <div className="empty-state-actions">{children}</div> : null}
    </section>
  );
}

export function SearchEmptyState({ query }) {
  const cleanQuery = query?.trim();

  return (
    <div className="search-empty-mini" role="status">
      <strong>No product matches{cleanQuery ? ` “${cleanQuery}”` : ''}</strong>
      <span>Try honey, tombrown, porridge, sorghum, or groundnut paste.</span>
      <small>{STORE_SETTINGS.brand.name}</small>
    </div>
  );
}
