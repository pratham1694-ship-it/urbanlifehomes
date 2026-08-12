import { Link } from "react-router-dom";
import { ArrowDownRight } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import "../components/ScrollReveal.css";
import "./ServicePages.css";

const OFFERINGS = [
  {
    num: "01",
    title: "Residential Plots",
    text: "Thoughtfully zoned plots across emerging residential corridors — sized from compact beginnings to sprawling estates.",
  },
  {
    num: "02",
    title: "Commercial Plots",
    text: "High-visibility parcels on growth roads, positioned for retail, offices and long-term rental yield.",
  },
  {
    num: "03",
    title: "Corner & Premium Plots",
    text: "Frontage positions with enhanced utility and silhouette — ideal for flagship homes and independent structures.",
  },
  {
    num: "04",
    title: "Pre-Launch Allotments",
    text: "Early-stage allocations at ground-floor pricing, with priority plot selection and flexible payment plans.",
  },
];

const STEPS = [
  { num: "01", title: "Select the parcel", text: "Explore available plots or share your preferred location, budget and intent — we shortlist what fits." },
  { num: "02", title: "Verify & register", text: "We guide you through title scrutiny, approvals and complete documentation — every paper in place." },
  { num: "03", title: "Build or hold", text: "Develop at your own pace with our construction partners, or hold your land as a growing asset." },
];

export default function Plotting() {
  return (
    <main className="sp-page">
      <header className="sp-hero">
        <p className="eyebrow">THE PLOTTING DIVISION</p>
        <h1>Land, planned<br />for <em>generations.</em></h1>
        <p>Prime plotted developments planned for value and long-term growth — land as an address, and as an asset that appreciates with time.</p>
      </header>

      <section className="sp-intro">
        <div className="sp-intro-copy">
          <ScrollReveal animation="fade-up">
            <p className="eyebrow">WHY PLOTTING / 01</p>
            <h2>Own the ground your tomorrow stands on.</h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p>A plot is more than land — it is a canvas for your future. We source, plan and develop carefully chosen parcels in emerging corridors, handling approvals, layouts and amenities so your investment grows quietly while you plan the life above it.</p>
          </ScrollReveal>
        </div>
        <ScrollReveal animation="fade-up" delay={100}>
          <figure className="sp-figure">
            <img src="/images/plotting.jpg" alt="Urban Life Homes plotted development" />
            <figcaption>Plotted development · Urban Life Homes</figcaption>
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
        <p>The address you choose today is the legacy you leave tomorrow.</p>
        <Link to="/contact">Speak with our land desk <ArrowDownRight size={22} /></Link>
      </section>
    </main>
  );
}
