import { LOGO_SVG } from '../data/logo';

export function LogoBadge() {
  return (
    <div
      className="logo-badge"
      role="img"
      aria-label="Creativity Natural Foods logo"
      dangerouslySetInnerHTML={{ __html: LOGO_SVG }}
    />
  );
}
