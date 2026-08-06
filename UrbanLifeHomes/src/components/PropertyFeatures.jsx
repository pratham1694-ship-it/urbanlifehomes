import { Building2, MapPin, Route, ShieldCheck, Droplets, Wind } from "lucide-react";
import "./PropertyFeatures.css";

const FEATURES = [
  { icon: Building2, title: "Premium 2 & 3 BHK", text: "Spacious layouts designed for modern families" },
  { icon: MapPin, title: "Prime Location", text: "Sector 107 · excellent connectivity" },
  { icon: Route, title: "Excellent Road Network", text: "Smooth access to key destinations" },
  { icon: ShieldCheck, title: "24×7 Security", text: "Modern security infrastructure" },
  { icon: Droplets, title: "Adequate Water Supply", text: "Reliable infrastructure" },
  { icon: Wind, title: "Cross-Ventilation", text: "Abundant sunlight & natural airflow" },
];

export default function PropertyFeatures({ title = "Why Sapphire Enclave" }) {
  return (
    <div className="property-features">
      <h3>{title}</h3>
      <div className="property-features-grid">
        {FEATURES.map(({ icon: Icon, title: cardTitle, text }) => (
          <div className="property-feature-card" key={cardTitle}>
            <div className="property-feature-icon"><Icon size={30} strokeWidth={1.6} /></div>
            <h4>{cardTitle}</h4>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
