import { useDoc } from "../lib/useData";
import { FALLBACK_VISION } from "../lib/fallbackData";
import ScrollReveal from "../components/ScrollReveal";
import "../components/ScrollReveal.css";


export default function Vision() {
  const { data: mongoVision } = useDoc("vision");
  const v = mongoVision && mongoVision.heading ? mongoVision : FALLBACK_VISION;

  return (
    <main className="vision-editorial">
      <header className="vision-opening">
        <p className="eyebrow">THE URBAN LIFE POINT OF VIEW</p>
        <h1>We create the<br /><em>feeling</em> of home.</h1>
        <p className="vision-opening-note">Beyond square footage, beyond finishes—spaces made for a life lived beautifully.</p>
      </header>

      <section className="vision-manifesto">
        <div className="vision-statement">
          <ScrollReveal animation="fade-up"><p className="eyebrow">WHAT WE STAND FOR / 01</p><h2>{v.heading}</h2></ScrollReveal>
        </div>
        <div className="vision-image-wrap"><img src="/images/front-copy.svg" alt="Urban Life Homes architectural detail" /><span>Thoughtful by design</span></div>
        <ScrollReveal animation="fade-up" delay={150}><p className="vision-description">{v.description}</p></ScrollReveal>
      </section>

      <section className="vision-principles">
        <p className="eyebrow">THE PRINCIPLES IN EVERY ADDRESS</p>
        <div className="vision-values">
          {v.values.map((item, index) => (
            <ScrollReveal key={item.num} animation="fade-up" delay={index * 100}>
              <article className="vision-value-item">
                <span className="vision-value-num">{item.num}</span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
      <section className="vision-closing"><p>Made for the way you want to live.</p></section>
    </main>
  );
}
