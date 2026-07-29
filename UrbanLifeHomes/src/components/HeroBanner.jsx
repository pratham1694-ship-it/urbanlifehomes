import { useState, useEffect } from "react";
import { useCollection } from "../lib/useData";
import { FALLBACK_BANNERS } from "../lib/fallbackData";
import "./HeroBanner.css";

export default function HeroBanner() {
  const { data: mongoBanners } = useCollection("banners");
  const banners = mongoBanners || FALLBACK_BANNERS;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (!banners.length) return null;

  return (
    <section className="hero-banner">
      {banners.map((banner, i) => (
        <div
          key={i}
          className={`hero-slide ${i === current ? "hero-slide-active" : ""}`}
        >
          <div
            className="hero-slide-bg"
            style={{ backgroundImage: `url(${banner.image})` }}
          />
          <div className="hero-slide-overlay" />
          <div className="hero-slide-content">
            <h1 className="hero-slide-title">{banner.title}</h1>
            <p className="hero-slide-subtitle">{banner.subtitle}</p>
          </div>
        </div>
      ))}

      {banners.length > 1 && (
        <div className="hero-dots">
          {banners.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === current ? "hero-dot-active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
