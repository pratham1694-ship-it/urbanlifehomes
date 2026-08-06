import { University, School, Route, Hospital, Store, Flag, HeartPulse, TrainFront } from "lucide-react";
import "./LocationAdvantages.css";

const LOCATIONS = [
  { icon: University, text: "Amity University 6.5 kms" },
  { icon: School, text: "Pathways School 1.2 kms" },
  { icon: Route, text: "Noida Expressway 2.5 kms" },
  { icon: Hospital, text: "Apollo Hospital 8.3 kms" },
  { icon: Store, text: "DLF Mall of India 9.1 kms" },
  { icon: Flag, text: "Noida Golf Course 4.9 kms" },
  { icon: HeartPulse, text: "MAX Hospital 5.2 kms" },
  { icon: TrainFront, text: "Sector 101 Metro 4.1 kms" },
];

export default function LocationAdvantages() {
  return (
    <div className="details-section">
      <h3>Location Advantages</h3>
      <div className="location-advantages-panel">
        {LOCATIONS.map(({ icon: Icon, text }) => (
          <div className="location-advantage-item" key={text}>
            <Icon size={22} strokeWidth={1.6} />
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
