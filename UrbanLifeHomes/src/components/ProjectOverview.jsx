import { CheckCircle2, LayoutGrid, Sun, ArrowUpDown, ShieldCheck } from "lucide-react";
import "./ProjectOverview.css";

const CHECKS = ["2 & 3 BHK premium apartments", "Vaastu compliant", "Cross-ventilated", "High-speed elevators"];

const HIGHLIGHTS = [
  { icon: LayoutGrid, text: "2 & 3 BHK" },
  { icon: Sun, text: "Cross ventilation" },
  { icon: ArrowUpDown, text: "High-speed lifts" },
  { icon: ShieldCheck, text: "24×7 security" },
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
