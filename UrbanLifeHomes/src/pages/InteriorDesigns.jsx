import { Link } from "react-router-dom";
import { ArrowDownRight } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import "../components/ScrollReveal.css";
import "./ServicePages.css";

const OFFERINGS = [
  {
    num: "01",
    title: "Residential Interiors",
    text: "Complete home interiors designed around how you actually live — every room planned, measured and finished.",
  },
  {
    num: "02",
    title: "Modular Kitchens",
    text: "German-grade hardware, seamless finishes and utility-first layouts that make every meal effortless.",
  },
  {
    num: "03",
    title: "Wardrobes & Storage",
    text: "Custom joinery that hides clutter and shows craft — built to fit your space exactly, down to the last drawer.",
  },
  {
    num: "04",
    title: "Styling & Décor",
    text: "Lighting, textiles and art direction that finish every room — the layer that turns a house into a home.",
  },
];

const STEPS = [
  { num: "01", title: "Design consultation", text: "We listen before we sketch — how you live, what you love, and what your space must do every day." },
  { num: "02", title: "Visualise everything", text: "3D visuals, a material palette and transparent costing before a single hammer swings." },
  { num: "03", title: "Execute & style", text: "A dedicated project team, on-time installation and a styled final reveal — walk in, it's finished." },
];

export default function InteriorDesigns() {
  return (
    <main className="sp-page">
      <header className="sp-hero">
        <p className="eyebrow">THE INTERIORS STUDIO</p>
        <h1>Spaces that<br /><em>feel</em> like you.</h1>
        <p>Bespoke interiors that blend elegance, function and thoughtful detailing — designed around one person: you.</p>
      </header>

      <section className="sp-intro">
        <div className="sp-intro-copy">
          <ScrollReveal animation="fade-up">
            <p className="eyebrow">THE STUDIO / 01</p>
            <h2>Walk in. It's finished. It's you.</h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p>Great interiors are not about trends — they are about the feeling a room gives you at six in the evening. We design spaces with quiet luxury: proportions that breathe, materials that age beautifully and details that reveal themselves slowly.</p>
          </ScrollReveal>
        </div>
        <ScrollReveal animation="fade-up" delay={100}>
          <figure className="sp-figure">
            <img src="/images/interior.jpg" alt="Urban Life Homes interior design" />
            <figcaption>Interior detail · Urban Life Homes</figcaption>
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
        <p>Live beautifully, every single day.</p>
        <Link to="/contact">Book a design consultation <ArrowDownRight size={22} /></Link>
      </section>
    </main>
  );
}
