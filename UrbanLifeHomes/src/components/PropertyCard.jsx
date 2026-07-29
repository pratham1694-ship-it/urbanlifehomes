import { Link } from "react-router-dom";
import { ArrowDownRight } from "lucide-react";
import './PropertyCard.css';

export default function PropertyCard({ image, title, description, price, slug, btnLabel }) {
  return (
    <article className="property-card">
      <div className="property-card-image">
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div className="property-card-placeholder">
            <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M2 22V8l7-5 7 5v14M9 22V12h6v10" />
            </svg>
          </div>
        )}
      </div>
      <div className="property-card-body">
        <h3 className="property-card-title">{title}</h3>
        <p className="property-card-desc">{description || "A considered residence shaped around daylight, proportion and everyday ease."}</p>
        {price && <p className="property-card-price">{price}</p>}
        {slug ? (
          <Link to={`/property/${slug}`} className="property-card-btn">Explore residence <ArrowDownRight size={18} /></Link>
        ) : (
          <span className="property-card-btn">{btnLabel || "Coming Soon"}</span>
        )}
      </div>
    </article>
  );
}
