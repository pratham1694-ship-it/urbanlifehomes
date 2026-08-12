import { Link } from "react-router-dom";
import { ArrowDownRight } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import "../components/ScrollReveal.css";
import "./ServicePages.css";

const OFFERINGS = [
  {
    num: "01",
    title: "Premium Apartments",
    text: "Thoughtfully planned layouts with generous natural light, cross-ventilation and finishes made to last.",
  },
  {
    num: "02",
    title: "Modern Amenities",
    text: "Clubhouses, green courts and everyday conveniences woven into each community — life beyond the front door.",
  },
  {
    num: "03",
    title: "Prime Locations",
    text: "Growth corridors with schools, transit and commerce within reach — addresses that only appreciate.",
  },
  {
    num: "04",
    title: "Community Living",
    text: "Neighbourhoods designed to be lived in, not just located — shared gardens, shared moments, shared growth.",
  },
];

const STEPS = [
  { num: "01", title: "Explore & shortlist", text: "Browse current and upcoming residences across our communities, matched to your lifestyle and budget." },
  { num: "02", title: "Visit privately", text: "Walk the finished homes and open spaces before you decide — at your pace, with your questions answered." },
  { num: "03", title: "Book & move in", text: "Transparent pricing, clear documentation and a seamless possession — the journey ends with your key." },
];

export default function ResidentialProjects() {
  return (
    <main className="sp-page">
      <header className="sp-hero">
        <p className="eyebrow">THE RESIDENTIAL DIVISION</p>
        <h1>Addresses that<br />write your <em>story.</em></h1>
        <p>Premium apartments and residences crafted for modern urban living — homes where daily life feels like a considered choice.</p>
      </header>

      <section className="sp-intro">
        <div className="sp-intro-copy">
          <ScrollReveal animation="fade-up">
            <p className="eyebrow">THE RESIDENCES / 01</p>
            <h2>Not just apartments. A way of living.</h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p>We design residential communities the way families actually use them — light-filled rooms, well-planned storage, greenspaces for slow evenings and layouts that breathe. Every residence is built to be lived in for decades, not staged for a season.</p>
          </ScrollReveal>
        </div>
        <ScrollReveal animation="fade-up" delay={100}>
          <figure className="sp-figure">
            <img src="/images/residential1.jpg" alt="Urban Life Homes residential project" />
            <figcaption>Residential project · Urban Life Homes</figcaption>
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
        <p>The story of your home starts with a single visit.</p>
        <Link to="/projects">Explore current projects <ArrowDownRight size={22} /></Link>
      </section>
    </main>
  );
}