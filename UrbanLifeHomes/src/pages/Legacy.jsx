import { useCollection, useDoc } from "../lib/useData";
import { FALLBACK_LEGACY, FALLBACK_PROPERTIES } from "../lib/fallbackData";
import ScrollReveal from "../components/ScrollReveal";
import "../components/ScrollReveal.css";

export default function Legacy() {
  const { data: mongoLegacy } = useDoc("legacy");
  const { data: mongoProperties } = useCollection("properties");
  const l = mongoLegacy && mongoLegacy.heading ? mongoLegacy : FALLBACK_LEGACY;
  const properties = [...FALLBACK_PROPERTIES];
  if (mongoProperties?.length) {
    mongoProperties.forEach((property) => {
      const index = properties.findIndex((item) => item.slug === property.slug);
      if (index >= 0) properties[index] = property;
      else properties.push(property);
    });
  }
  const completedProjects = properties.filter((property) => property.category === "completed");

  return (
    <main className="legacy-editorial">
      <header className="legacy-opening">
        <p className="eyebrow">URBAN LIFE HOMES / EST. 2010</p>
        <h1>Built over time.<br /><em>Made to last.</em></h1>
      </header>
      <section className="legacy-introduction">
        <ScrollReveal animation="fade-up"><p className="eyebrow">OUR STORY</p><h2>{l.heading}</h2></ScrollReveal>
        <ScrollReveal animation="fade-up" delay={100}><p>{l.description}</p></ScrollReveal>
      </section>
      {completedProjects.length > 0 && <section className="legacy-projects">
        <div className="legacy-projects-heading"><p className="eyebrow">THE PLACES WE HAVE DELIVERED</p><h2>Proof, in every<br />finished detail.</h2></div>
        <div className="legacy-projects-track">
          {completedProjects.map((project, index) => <ScrollReveal key={project.slug} animation="fade-up" delay={index * 75}><article className="legacy-project"><div className="legacy-project-image">{project.image ? <img src={project.image} alt={project.title} /> : null}</div><p>Delivered residence / {String(index + 1).padStart(2, "0")}</p><h3>{project.title}</h3><span>{project.description}</span></article></ScrollReveal>)}
        </div>
      </section>}
      <section className="legacy-timeline-section">
        <div className="legacy-timeline-intro"><p className="eyebrow">A TIMELINE OF INTENT</p><h2>Every chapter<br />leaves a mark.</h2></div>
        <div className="legacy-timeline">
          {l.timeline.map((item, index) => <ScrollReveal key={item.year} animation="fade-up" delay={index * 90}><article className="legacy-timeline-item"><span className="legacy-year">{item.year}</span><p>{item.text}</p><i /></article></ScrollReveal>)}
        </div>
      </section>
    </main>
  );
}
