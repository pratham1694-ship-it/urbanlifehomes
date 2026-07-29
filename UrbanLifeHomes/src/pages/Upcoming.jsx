import PropertyCard from "../components/PropertyCard";
import { useCollection } from "../lib/useData";
import { FALLBACK_PROPERTIES } from "../lib/fallbackData";

export default function Upcoming() {
  const { data: mongoProps, loading } = useCollection("properties", { category: "upcoming" });

  const properties = mongoProps || FALLBACK_PROPERTIES.filter((p) => p.category === "upcoming");

  if (loading) {
    return (
      <section className="section-upcoming">
        <div className="container">
          <p style={{ textAlign: "center", padding: "4rem 0" }}>Loading upcoming projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-upcoming">
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">COMING SOON</p>
          <h2 className="section-title">Upcoming Projects</h2>
          <div className="section-divider"></div>
        </div>
        <div className="property-grid">
          {properties.map((p) => (
            <PropertyCard key={p.slug} title={p.title} description={p.description} price={p.price} />
          ))}
        </div>
      </div>
    </section>
  );
}
