import { LayoutGrid, Sun, ArrowUpDown, ShieldCheck, FileText, Download } from "lucide-react";
import "./ProjectOverview.css";

const HIGHLIGHTS = [
  { icon: LayoutGrid, text: "2 & 3 BHK" },
  { icon: Sun, text: "Cross ventilation" },
  { icon: ArrowUpDown, text: "High-speed lifts" },
  { icon: ShieldCheck, text: "24×7 security" },
];

const SITE_PLAN = { label: "2 BHK · F103", area: "1005 sq ft", pdf: "/pdfs/Plot no. -12(F-103)2bhk-1005sqft.pdf" };

export default function ProjectOverview({ property }) {
  return (
    <div className="details-section">
      <h3>Project Overview</h3>
      <div className="project-overview-grid">
        <div className="project-overview-text">
          <p><strong>{property.location}</strong> — {property.description}</p>
          <div className="project-overview-pdfs">
            <h5><FileText size={15} strokeWidth={1.8} /> Site Plan PDF</h5>
            <div className="project-overview-pdf-list">
              <a href={SITE_PLAN.pdf} target="_blank" rel="noopener noreferrer">
                <Download size={14} strokeWidth={1.8} />
                <span><strong>{SITE_PLAN.label}</strong><small>{SITE_PLAN.area}</small></span>
              </a>
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
