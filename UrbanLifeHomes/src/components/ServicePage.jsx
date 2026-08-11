import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { useDoc } from "../lib/useData";
import { FALLBACK_SITE_SETTINGS } from "../lib/fallbackData";
import { useBooking } from "../lib/booking";
import "./ScrollReveal.css";
import "./Services.css";

export default function ServicePage({ data }) {
  const { openBooking } = useBooking();
  const { data: settings } = useDoc("site-settings");
  const s = settings || FALLBACK_SITE_SETTINGS;
  const waLink = `https://wa.me/${(s.phone?.[0] || "").replace(/\D/g, "")}`;

  return (
    <main className="svp-page">
      <header className="svp-hero" style={{ backgroundImage: `url(${data.hero.image})` }}>
        <div className="svp-hero__shade" />
        <div className="svp-hero__inner">
          <ScrollReveal animation="fade-up">
            <p className="eyebrow">{data.hero.eyebrow}</p>
            <h1>
              {data.hero.lines.map((line, i) =>
                line.accent ? (
                  <em key={i}>{line.text}</em>
                ) : (
                  <span key={i}>
                    {line.text}
                    <br />
                  </span>
                )
              )}
            </h1>
            <p className="svp-hero__note">{data.hero.note}</p>
          </ScrollReveal>
        </div>
      </header>

      <section className="svp-intro">
        <div className="svp-intro__copy">
          <ScrollReveal animation="fade-up">
            <p className="eyebrow">{data.intro.eyebrow}</p>
            <h2>{data.intro.heading}</h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={120}>
            <p>{data.intro.text}</p>
          </ScrollReveal>
        </div>
        <div className="svp-intro__image">
          <ScrollReveal animation="zoom-in" delay={200}>
            <img src={data.intro.image} alt={data.intro.caption} />
            <span>{data.intro.caption}</span>
          </ScrollReveal>
        </div>
      </section>

      <section className="svp-offerings">
        <div className="svp-block-heading">
          <ScrollReveal animation="fade-up">
            <p className="eyebrow">{data.offerings.eyebrow}</p>
            <h2>{data.offerings.heading}</h2>
          </ScrollReveal>
        </div>
        <div className="svp-offerings__list">
          {data.offerings.items.map((item, i) => (
            <ScrollReveal key={item.num} animation="fade-up" delay={i * 80}>
              <article className="svp-offering-item">
                <span className="svp-offering-num">{item.num}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="svp-process">
        <div className="svp-process__head">
          <ScrollReveal animation="fade-up">
            <p className="eyebrow">{data.process.eyebrow}</p>
            <h2>{data.process.heading}</h2>
          </ScrollReveal>
        </div>
        <div className="svp-process__steps">
          {data.process.steps.map((step, i) => (
            <ScrollReveal key={step.num} animation="fade-up" delay={i * 90}>
              <article className="svp-process-step">
                <span>{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="svp-stats">
        {data.stats.map((stat, i) => (
          <ScrollReveal key={stat.label} animation="fade-up" delay={i * 90}>
            <div className="svp-stat">
              <strong>{stat.num}</strong>
              <span>{stat.label}</span>
            </div>
          </ScrollReveal>
        ))}
      </section>

      <section className="svp-features">
        <div className="svp-block-heading">
          <ScrollReveal animation="fade-up">
            <p className="eyebrow">{data.features.eyebrow}</p>
            <h2>{data.features.heading}</h2>
          </ScrollReveal>
        </div>
        <div className="svp-features__grid">
          {data.features.items.map((item, i) => (
            <ScrollReveal key={item.title} animation="fade-up" delay={i * 70}>
              <article className="svp-feature">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="svp-closing">
        <ScrollReveal animation="fade-up">
          <p className="eyebrow">{data.closing.eyebrow}</p>
          <h2>{data.closing.heading}</h2>
          <p className="svp-closing__text">{data.closing.text}</p>
          <div className="svp-closing__cta">
            <button type="button" className="svp-cta-primary" onClick={() => openBooking(data.closing.bookingLabel || "")}>
              {data.closing.cta}
            </button>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="svp-cta-ghost">
              Chat on WhatsApp
            </a>
            {data.closing.link && (
              <Link to={data.closing.link.to} className="svp-cta-ghost">
                {data.closing.link.label}
              </Link>
            )}
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
