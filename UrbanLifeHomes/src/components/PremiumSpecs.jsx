import "./PremiumSpecs.css";

const SPECS = [
  { title: "Living / Dining", text: "32″×64″ vitrified tile flooring" },
  { title: "Bedrooms", text: "Premium vitrified tiles, acrylic emulsion" },
  { title: "Walls & Ceilings", text: "Acrylic emulsion / OBD finish, false ceiling with cove lighting" },
  { title: "Wardrobes", text: "Modular HDHMR with glass/ac/laminate finish, Hettich/Hafele hardware" },
  { title: "Electricals", text: "Polycab / Finolex / Havells, ceiling fans, light fixtures" },
  { title: "Lifts", text: "HYBON high speed, 8 passenger capacity" },
];

export default function PremiumSpecs() {
  return (
    <div className="details-section">
      <h3>Premium Specifications</h3>
      <div className="premium-specs-section">
        <div className="premium-specs-grid">
          {SPECS.map((spec) => (
            <div className="premium-spec-item" key={spec.title}>
              <h5>{spec.title}</h5>
              <p>{spec.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
