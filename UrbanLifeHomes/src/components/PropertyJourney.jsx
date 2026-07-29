import { Link } from "react-router-dom";
import { ArrowDownRight, Compass, Plus } from "lucide-react";
import { FALLBACK_PROPERTIES } from "../lib/fallbackData";
import "./PropertyJourney.css";

const moments = [
  { label: "Arrival", title: "A quieter way home", text: "An address composed around light, proportion and a sense of arrival.", image: "/images/15.png" },
  { label: "Living", title: "Room to exhale", text: "Generous openings, considered layouts and a home that follows the rhythm of your day.", image: "/images/5A.png" },
  { label: "After hours", title: "The city, at a distance", text: "Private balconies create a slower, more personal view of the evening.", image: "/images/12A.png" },
];

export default function PropertyJourney() {
  const featured = FALLBACK_PROPERTIES.find((property) => property.slug === "sapphire-enclave");

  return (
    <section className="property-journey" aria-label="A journey through Sapphire Enclave">
      <div className="journey-intro">
        <p className="eyebrow">SAPPHIRE ENCLAVE / SECTOR 107, NOIDA</p>
        <h2>A home is not a collection of rooms.<br />It is a way of moving through the day.</h2>
        <p className="journey-intro-copy">Scroll through the spaces, materials and quiet moments that shape life at Urban Life Homes.</p>
        <span className="journey-scroll"><ArrowDownRight size={17} /> Begin the walkthrough</span>
      </div>

      <div className="journey-progress" aria-hidden="true"><span /> <small>01 — 03</small></div>

      {moments.map((moment, index) => (
        <article className={`journey-scene journey-scene-${index + 1}`} key={moment.label}>
          <div className="journey-image" style={{ backgroundImage: `url("${moment.image}")` }} />
          <div className="journey-veil" />
          <div className="journey-copy">
            <p className="eyebrow">{String(index + 1).padStart(2, "0")} / {moment.label}</p>
            <h3>{moment.title}</h3>
            <p>{moment.text}</p>
            {index === 1 && <button className="material-hotspot" type="button"><Plus size={15} /> Discover the material palette</button>}
          </div>
        </article>
      ))}

      <article className="journey-final">
        <div>
          <p className="eyebrow">YOUR PRIVATE VIEWING</p>
          <h3>See the space<br />at your own pace.</h3>
        </div>
        <div className="journey-final-action">
          <p>Arrange a private walkthrough of Sapphire Enclave and explore the residences in person.</p>
          <Link to={featured ? `/property/${featured.slug}` : "/contact"} className="text-link">Explore Sapphire Enclave <ArrowDownRight size={18} /></Link>
          <Link to="/contact" className="journey-visit"><Compass size={17} /> Book your visit</Link>
        </div>
      </article>
    </section>
  );
}
