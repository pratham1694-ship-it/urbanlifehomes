import { useMemo, useState } from "react";
import { ArrowDownRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useCollection } from "../lib/useData";
import { FALLBACK_PRICING } from "../lib/fallbackData";
import "../components/ScrollReveal.css";

const parsePrice = (value) => Number(String(value).match(/[\d.]+/)?.[0] || 0) * (String(value).includes("Cr") ? 100 : 1);

export default function Pricing() {
  const { data: mongoPricing, loading } = useCollection("pricing");
  const pricing = mongoPricing || FALLBACK_PRICING;
  const [selected, setSelected] = useState(1);
  const [area, setArea] = useState(50);
  const [monthly, setMonthly] = useState(120000);
  const plan = pricing[selected] || pricing[0];
  const areaRange = plan?.area?.match(/\d+/g)?.map(Number) || [1000, 1800];
  const squareFeet = Math.round(areaRange[0] + ((areaRange[1] - areaRange[0]) * area) / 100);
  const estimatedPrice = useMemo(() => Math.round(parsePrice(plan?.price) * (0.86 + area / 100 * 0.28)), [plan, area]);
  const years = Math.max(8, Math.min(25, Math.round((estimatedPrice * 100000 * 0.78) / (monthly * 12))));

  if (loading) return <section className="section-pricing"><p className="pricing-loading">Preparing your residence options…</p></section>;

  return (
    <main className="residence-planner">
      <header className="planner-hero">
        <p className="eyebrow">PRIVATE RESIDENCE PLANNER</p>
        <h1>Start with the life<br />you want to live.</h1>
        <p>Choose a residence, shape the space around you, and receive a more meaningful starting point for your home search.</p>
      </header>

      <section className="planner-flow" aria-label="Residence planner">
        <div className="planner-step"><span>01</span><p>Choose your residence</p></div>
        <div className="residence-choices" role="tablist" aria-label="Residence type">
          {pricing.map((item, index) => <button key={item.type} className={selected === index ? "is-selected" : ""} onClick={() => { setSelected(index); setArea(50); }} role="tab" aria-selected={selected === index}><small>{index === 1 ? "Most requested" : "Residence"}</small>{item.type}<ArrowDownRight size={22} /></button>)}
        </div>

        <div className="planner-details">
          <div className="planner-step"><span>02</span><p>Set the scale of your space</p></div>
          <div className="slider-block">
            <div className="slider-label"><span>Residence area</span><strong>{squareFeet.toLocaleString()} sq. ft.</strong></div>
            <input type="range" min="0" max="100" value={area} onChange={(event) => setArea(Number(event.target.value))} style={{ "--value": `${area}%` }} aria-label="Residence area" />
            <div className="slider-range"><span>{areaRange[0].toLocaleString()} sq. ft.</span><span>{areaRange[1].toLocaleString()} sq. ft.</span></div>
          </div>
          <div className="plan-specs">
            <span><Check size={14} /> {plan.bedrooms} bedrooms</span>
            <span><Check size={14} /> {plan.bathrooms} bathrooms</span>
            {plan.features.slice(0, 2).map((feature) => <span key={feature}><Check size={14} /> {feature}</span>)}
          </div>
        </div>

        <div className="planner-outcome">
          <div className="planner-step"><span>03</span><p>Meet your comfort zone</p></div>
          <div className="outcome-grid">
            <div className="estimate"><small>Indicative investment</small><strong>₹{estimatedPrice >= 100 ? `${(estimatedPrice / 100).toFixed(2)} Cr` : `${estimatedPrice} L`}</strong><p>Based on your selected space. Final pricing is confirmed during your private consultation.</p></div>
            <div className="payment-input"><label htmlFor="monthly-budget">A comfortable monthly payment</label><div><span>₹</span><input id="monthly-budget" type="number" min="25000" step="5000" value={monthly} onChange={(event) => setMonthly(Number(event.target.value) || 0)} /></div><small>Estimated financing horizon: {years} years</small></div>
          </div>
          <Link to="/contact" className="planner-cta">Arrange a private conversation <ArrowDownRight size={18} /></Link>
        </div>
      </section>
      <p className="planner-note">Indicative planning only. Availability, loan terms and final pricing are subject to confirmation.</p>
    </main>
  );
}
