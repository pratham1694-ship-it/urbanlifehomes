import { CheckCircle2, LayoutGrid, Sun, ArrowUpDown, ShieldCheck, FileText, Download } from "lucide-react";
import "./ProjectOverview.css";

const CHECKS = ["2 & 3 BHK premium apartments", "Vaastu compliant", "Cross-ventilated", "High-speed elevators"];

const HIGHLIGHTS = [
  { icon: LayoutGrid, text: "2 & 3 BHK" },
  { icon: Sun, text: "Cross ventilation" },
  { icon: ArrowUpDown, text: "High-speed lifts" },
  { icon: ShieldCheck, text: "24×7 security" },
];

const PLAN_PDFS = [
  { label: "2 BHK · F103", area: "1005 sq ft", pdf: "/pdfs/Plot no. -12(F-103)2bhk-1005sqft.pdf" },
  { label: "2 BHK · F104", area: "1012 sq ft", pdf: "/pdfs/Plot no. -12(F-104)2bhk-1012sqft.pdf" },
  { label: "3 BHK · F105", area: "1405 sq ft", pdf: "/pdfs/Plot no. -12(F-105)3bhk-1405sqft.pdf" },
  { label: "3 BHK · F101", area: "1485 sq ft", pdf: "/pdfs/Plot no. -12(F-101)3bhk-1485sqft.pdf" },
  { label: "3 BHK · F102", area: "1525 sq ft", pdf: "/pdfs/Plot no. -12(F-102)3bhk-1525sqft.pdf" },
];

export default function ProjectOverview({ property }) {
  return (
    <div className="details-section">
      <h3>Project Overview</h3>
      <div className="project-overview-grid">
        <div className="project-overview-text">
          <p><strong>{property.location}</strong> — {property.description}</p>
          <div className="project-overview-checks">
            {CHECKS.map((check) => (
              <span key={check}><CheckCircle2 size={18} strokeWidth={1.6} /> {check}</span>
            ))}
          </div>
          <div className="project-overview-pdfs">
            <h5><FileText size={15} strokeWidth={1.8} /> Floor Plan PDFs</h5>
            <div className="project-overview-pdf-list">
              {PLAN_PDFS.map((plan) => (
                <a href={plan.pdf} target="_blank" rel="noopener noreferrer" key={plan.pdf}>
                  <Download size={14} strokeWidth={1.8} />
                  <span><strong>{plan.label}</strong><small>{plan.area}</small></span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="project-overview-highlights">
          <ul>
            {HIGHLIGHTS.map(({ icon: Icon, text }) => (
              <li key={text}><Icon size={18} strokeWidth={1.6} /> {text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
