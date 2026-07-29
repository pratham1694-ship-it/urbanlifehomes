import PropertyCard from "../components/PropertyCard";
import { useCollection } from "../lib/useData";
import { FALLBACK_PROPERTIES } from "../lib/fallbackData";

function filterByCategory(properties, category) {
  return properties.filter((p) => p.category === category);
}

export default function Projects() {
  const { data: mongoProps, loading } = useCollection("properties");

  const properties = [...FALLBACK_PROPERTIES];
  if (mongoProps?.length) {
    mongoProps.forEach(mp => {
      const i = properties.findIndex(p => p.slug === mp.slug);
      if (i >= 0) properties[i] = mp;
      else properties.push(mp);
    });
  }
  const current = filterByCategory(properties, "current");
  const completed = filterByCategory(properties, "completed");
  const upcoming = filterByCategory(properties, "upcoming");

  if (loading) {
    return (
      <section className="section-featured">
        <div className="container">
          <p style={{ textAlign: "center", padding: "4rem 0" }}>Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {current.length > 0 && (
        <section className="section-featured projects-editorial">
          <div className="projects-heading">
            <div className="section-header">
              <p className="section-subtitle">OUR PROPERTIES</p>
              <h2 className="section-title">Current Projects</h2>
              <div className="section-divider"></div>
            </div>
            <div className="property-grid property-sequence">
              {current.map((p) => (
                <PropertyCard key={p.slug} image={p.image} title={p.title} description={p.description} price={p.price} slug={p.slug} />
              ))}
            </div>
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section className="section-featured projects-editorial">
          <div className="projects-heading">
            <div className="section-header">
              <p className="section-subtitle">DELIVERED</p>
              <h2 className="section-title">Completed Projects</h2>
              <div className="section-divider"></div>
            </div>
            <div className="property-grid property-sequence">
              {completed.map((p) => (
                <PropertyCard key={p.slug} image={p.image} title={p.title} description={p.description} price={p.price} btnLabel="Completed" />
              ))}
            </div>
          </div>
        </section>
      )}

      {upcoming.length > 0 && (
        <section className="section-featured projects-editorial">
          <div className="projects-heading">
            <div className="section-header">
              <p className="section-subtitle">COMING SOON</p>
              <h2 className="section-title">Upcoming Projects</h2>
              <div className="section-divider"></div>
            </div>
            <div className="property-grid property-sequence">
              {upcoming.map((p) => (
                <PropertyCard key={p.slug} title={p.title} description={p.description} price={p.price} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
