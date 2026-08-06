import { DoorOpen, Ruler } from "lucide-react";
import "./FloorPlans.css";

const PLANS = [
  { type: "2 BHK", area: "1012 sqft", pdf: "/pdfs/Plot no. -12(F-104)2bhk-1012sqft.pdf" },
  { type: "2 BHK", area: "1005 sqft", pdf: "/pdfs/Plot no. -12(F-103)2bhk-1005sqft.pdf" },
  { type: "3 BHK", area: "1405 sqft", pdf: "/pdfs/Plot no. -12(F-105)3bhk-1405sqft.pdf" },
  { type: "3 BHK", area: "1485 sqft", pdf: "/pdfs/Plot no. -12(F-101)3bhk-1485sqft.pdf" },
  { type: "3 BHK", area: "1525 sqft", pdf: "/pdfs/Plot no. -12(F-102)3bhk-1525sqft.pdf" },
];

export default function FloorPlans() {
  return (
    <div className="details-section">
      <h3>Floor Plans</h3>
      <div className="floor-plans-grid">
        {PLANS.map((plan) => (
          <a href={plan.pdf} target="_blank" rel="noopener noreferrer" className="floor-plan-card" key={plan.pdf}>
            <div className="floor-plan-icon"><DoorOpen size={30} strokeWidth={1.6} /></div>
            <strong>{plan.type}</strong>
            <small>{plan.area}</small>
            <span className="floor-plan-tag">View PDF</span>
          </a>
        ))}
      </div>
      <p className="floor-plans-note"><Ruler size={14} strokeWidth={1.8} /> Saleable area as per brochure</p>
    </div>
  );
}
