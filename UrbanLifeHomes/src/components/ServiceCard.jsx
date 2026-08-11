import "./ServiceCard.css";

export default function ServiceCard({ image, title, index }) {
  return (
    <div className="svc-card">
      <div className="svc-card__img">
        <img src={image} alt={title} />
      </div>
      <div className="svc-card__glow" />
      <div className="svc-card__content">
        <span className="svc-card__num">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="svc-card__title">{title}</h3>
        <div className="svc-card__line" />
        <p className="svc-card__cta">
          Explore
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </p>
      </div>
    </div>
  );
}
