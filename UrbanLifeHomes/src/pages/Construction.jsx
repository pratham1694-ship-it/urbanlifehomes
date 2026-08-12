import { Link } from "react-router-dom";
import { ArrowDownRight } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import "../components/ScrollReveal.css";
import "./ServicePages.css";

const OFFERINGS = [
  {
    num: "01",
    title: "Turnkey Construction",
    text: "Design-to-handover delivery for residences, villas and independent floors — one accountable partner, one promise.",
  },
  {
    num: "02",
    title: "Structural Works",
    text: "RCC frames, basements and civil engineering executed to exacting standards, with material integrity at every pour.",
  },
  {
    num: "03",
    title: "Renovation & Expansion",
    text: "Vertical extensions, re-modelling and upgrades that respect your budget, your timeline and your existing home.",
  },
  {
    num: "04",
    title: "Quality Assurance",
    text: "Material testing, milestone audits and transparent project reporting at every stage — nothing left to chance.",
  },
];

const STEPS = [
  { num: "01", title: "Consult & estimate", text: "Share your drawings or your vision; we translate it into a fixed-cost plan with a clear timeline." },
  { num: "02", title: "Build with oversight", text: "Structured milestones, on-site engineers and weekly progress reviews keep every phase on track." },
  { num: "03", title: "Hand over with confidence", text: "A snag-free handover, documented warranty and post-construction support long after the keys change hands." },
];

export default function Construction() {
  return (
    <main className="sp-page">
      <header className="sp-hero">
        <p className="eyebrow">THE CONSTRUCTION DIVISION</p>
        <h1>Built to<br /><em>outlast</em> trends.</h1>
        <p>Turnkey construction, structural works and end-to-end development with premium quality standards — delivered on time, on spec, on promise.</p>
      </header>

      <section className="sp-intro">
        <div className="sp-intro-copy">
          <ScrollReveal animation="fade-up">
            <p className="eyebrow">THE BUILD / 01</p>
            <h2>Every slab is a promise.</h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p>From the first foundation pour to the final switch plate, we build the way we would build for our own family — premium materials, disciplined engineering and a single point of accountability from day one to handover.</p>
          </ScrollReveal>
        </div>
        <ScrollReveal animation="fade-up" delay={100}>
          <figure className="sp-figure">
            <img src="/images/Residential-3.jpg" alt="Urban Life Homes construction site" />
            <figcaption>Under construction · Urban Life Homes</figcaption>
          </figure>
        </ScrollReveal>
      </section>

      <section className="sp-listing">
        <ScrollReveal animation="fade-up">
          <p className="eyebrow">WHAT WE OFFER</p>
        </ScrollReveal>
        <div className="sp-rows">
          {OFFERINGS.map((item, i) => (
            <ScrollReveal key={item.num} animation="fade-up" delay={i * 80}>
              <article className="sp-row">
                <span className="sp-row-num">{item.num}</span>
                <h3>{item.title}</h3>
                <p className="sp-row-text">{item.text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="sp-process">
        <ScrollReveal animation="fade-up">
          <p className="eyebrow">THE JOURNEY</p>
        </ScrollReveal>
        <div className="sp-steps">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.num} animation="fade-up" delay={i * 120}>
              <article className="sp-step">
                <span>{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="sp-closing">
        <p>We build the way you would build for your own family.</p>
        <Link to="/contact">Start your build <ArrowDownRight size={22} /></Link>
      </section>
    </main>
  );
}
