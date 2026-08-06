import { useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useProperty } from "../lib/useData";
import { useBooking } from "../lib/booking";
import { FALLBACK_PROPERTIES } from "../lib/fallbackData";
import PropertyFeatures from "../components/PropertyFeatures";

function PropertyNotFound() {
  return (
    <section className="section-details">
      <div className="container">
        <div className="details-not-found">
          <h2>Property Not Found</h2>
          <p>The property you're looking for doesn't exist.</p>
          <Link to="/" className="form-submit">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}

function PropertyLoading() {
  return (
    <section className="section-details">
      <div className="container">
        <div className="details-not-found">
          <h2>Loading...</h2>
          <p>Fetching property details...</p>
        </div>
      </div>
    </section>
  );
}

function ImageGallery({ property }) {
  const images = property.images && property.images.length > 0
    ? property.images
    : property.image
      ? [property.image]
      : [];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const prev = useCallback(() => {
    setSelectedIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setSelectedIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="property-card-placeholder">
        <svg width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M2 22V8l7-5 7 5v14M9 22V12h6v10" />
        </svg>
      </div>
    );
  }

  return (
    <div className="gallery">
      <div className="gallery-main">
        <img src={images[selectedIndex]} alt={`${property.title} ${selectedIndex + 1}`} />
        {images.length > 1 && (
          <>
            <button className="gallery-arrow gallery-arrow-left" onClick={prev} aria-label="Previous image">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="gallery-arrow gallery-arrow-right" onClick={next} aria-label="Next image">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <div className="gallery-counter">{selectedIndex + 1} / {images.length}</div>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="gallery-thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={`gallery-thumb ${i === selectedIndex ? "active" : ""}`}
              onClick={() => setSelectedIndex(i)}
            >
              <img src={img} alt={`${property.title} ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PropertyDetails() {
  const { slug } = useParams();
  const { data: mongoProperty, loading } = useProperty(slug);
  const { openBooking } = useBooking();

  const property = mongoProperty || FALLBACK_PROPERTIES.find((p) => p.slug === slug);

  if (loading) return <PropertyLoading />;
  if (!property) return <PropertyNotFound />;

  return (
    <section className="section-details">
      <div className="container">
        <Link to="/" className="details-back">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        <div className="details-hero">
          <div className="details-hero-image">
            <ImageGallery property={property} />
          </div>
          <div className="details-hero-info">
            <span className="details-status">{property.status}</span>
            <h1>{property.title}</h1>
            <p className="details-tagline">{property.tagline}</p>
            <div className="details-meta">
              <span>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {property.location}
              </span>
              {property.possession && (
                <span>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Possession: {property.possession}
                </span>
              )}
            </div>
            <div className="details-price">{property.price}</div>
            <div className="details-actions">
              <button type="button" className="form-submit" onClick={() => openBooking(property.title)}>Enquire Now</button>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="details-whatsapp">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <PropertyFeatures title={`Why ${property.title}`} />

        <div className="details-body">
          <div className="details-main">
            <div className="details-section">
              <h3>About the Project</h3>
              <p>{property.description}</p>
            </div>

            {property.highlights && property.highlights.length > 0 && (
              <div className="details-section">
                <h3>Highlights</h3>
                <ul className="details-highlights">
                  {property.highlights.map((item, i) => (
                    <li key={i}>
                      <svg width="16" height="16" fill="none" stroke="#e0c870" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20,6 9,17 4,12"/></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {property.configurations && property.configurations.length > 0 && (
              <div className="details-section">
                <h3>Configurations & Pricing</h3>
                <div className="details-config-table">
                  <div className="details-config-header">
                    <span>Type</span>
                    <span>Carpet Area</span>
                    <span>Price</span>
                  </div>
                  {property.configurations.map((config, i) => (
                    <div className="details-config-row" key={i}>
                      <span>{config.type}</span>
                      <span>{config.area}</span>
                      <span>{config.price}</span>
                    </div>
                  ))}
                </div>
                <p className="pricing-note">*Prices are indicative and subject to change. RERA registered.</p>
              </div>
            )}
          </div>

          <div className="details-sidebar">
            <div className="details-sidebar-card">
              <h4>Project Details</h4>
              {property.rera && (
                <div className="details-sidebar-row">
                  <span>RERA No.</span>
                  <span>{property.rera}</span>
                </div>
              )}
              <div className="details-sidebar-row">
                <span>Status</span>
                <span>{property.status}</span>
              </div>
              {property.possession && (
                <div className="details-sidebar-row">
                  <span>Possession</span>
                  <span>{property.possession}</span>
                </div>
              )}
              <div className="details-sidebar-row">
                <span>Location</span>
                <span>{property.location}</span>
              </div>
              <button type="button" className="form-submit" style={{ width: "100%", textAlign: "center", marginTop: "16px" }} onClick={() => openBooking(property.title)}>
                Schedule a Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
