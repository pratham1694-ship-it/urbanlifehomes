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
    <main className="sd-page">
      <header className="sd-hero" style={{ backgroundImage: `url(${data.hero.image})` }}>
        <div className="sd-hero__shade" />
        <div className="sd-hero__inner">
          <ScrollReveal animation="fade-up">
            <p className="sd-eyebrow">{data.hero.eyebrow}</p>
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
            <p className="sd-hero__note">{data.hero.note}</p>
          </ScrollReveal>
        </div>
        <div className="sd-hero__strip">
          {data.stats.slice(0, 4).map((stat, i) => (
            <ScrollReveal key={stat.label} animation="fade-up" delay={i * 90}>
              <div className="sd-hero__fact">
                <strong>{stat.num}</strong>
                <span>{stat.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </header>

      <section className="sd-intro">
        <div className="sd-intro__copy">
          <ScrollReveal animation="fade-up">
            <p className="sd-eyebrow">{data.intro.eyebrow}</p>
            <h2>{data.intro.heading}</h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={120}>
            <p>{data.intro.text}</p>
          </ScrollReveal>
        </div>
        <div className="sd-intro__media">
          <ScrollReveal animation="zoom-in" delay={200}>
            <img src={data.intro.image} alt={data.intro.caption} />
            <span>{data.intro.caption}</span>
          </ScrollReveal>
        </div>
      </section>

      <section className="sd-offerings">
        <div className="sd-block-heading">
          <ScrollReveal animation="fade-up">
            <p className="sd-eyebrow">{data.offerings.eyebrow}</p>
            <h2>{data.offerings.heading}</h2>
          </ScrollReveal>
        </div>
        <div className="sd-offerings__list">
          {data.offerings.items.map((item, i) => (
            <ScrollReveal key={item.num} animation="fade-up" delay={i * 60}>
              <article className="sd-offering">
                <span className="sd-offering__num">{item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="sd-process">
        <div className="sd-process__head">
          <ScrollReveal animation="fade-up">
            <p className="sd-eyebrow">{data.process.eyebrow}</p>
            <h2>{data.process.heading}</h2>
          </ScrollReveal>
        </div>
        <div className="sd-process__steps">
          {data.process.steps.map((step, i) => (
            <ScrollReveal key={step.num} animation="fade-up" delay={i * 90}>
              <article className="sd-process__step">
                <span className="sd-process__num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="sd-features">
        <div className="sd-block-heading">
          <ScrollReveal animation="fade-up">
            <p className="sd-eyebrow">{data.features.eyebrow}</p>
            <h2>{data.features.heading}</h2>
          </ScrollReveal>
        </div>
        <div className="sd-features__grid">
          {data.features.items.map((item, i) => (
            <ScrollReveal key={item.title} animation="fade-up" delay={i * 70}>
              <article className="sd-feature">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="sd-closing">
        <ScrollReveal animation="fade-up">
          <p className="sd-eyebrow">{data.closing.eyebrow}</p>
          <h2>{data.closing.heading}</h2>
          <p className="sd-closing__text">{data.closing.text}</p>
          <div className="sd-closing__cta">
            <button
              type="button"
              className="sd-cta sd-cta--primary"
              onClick={() => openBooking(data.closing.bookingLabel || "")}
            >
              {data.closing.cta}
            </button>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="sd-cta sd-cta--ghost">
              Chat on WhatsApp
            </a>
            {data.closing.link && (
              <Link to={data.closing.link.to} className="sd-cta sd-cta--ghost">
                {data.closing.link.label}
              </Link>
            )}
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
