import { useDoc } from "../lib/useData";
import { FALLBACK_SITE_SETTINGS } from "../lib/fallbackData";
import ScrollReveal from "../components/ScrollReveal";
import "../components/ScrollReveal.css";

export default function Contact() {
  const { data: settings } = useDoc("site-settings");
  const s = settings && settings.companyName ? settings : FALLBACK_SITE_SETTINGS;

  return (
    <section className="section-contact">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-subtitle">GET IN TOUCH</p>
            <h2 className="section-title">Contact Us</h2>
            <div className="section-divider"></div>
          </div>
        </ScrollReveal>
        <div className="contact-content">
          <ScrollReveal animation="fade-right" delay={150}>
            <div className="contact-info">
              <h3>Visit Us</h3>
              <p>{s.address}</p>
              <div className="contact-details">
                <p><strong>Phone:</strong> {(s.phone || []).join(", ")}</p>
                <p><strong>Email:</strong> {s.email}</p>
                <p><strong>Hours:</strong> {s.hours}</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-left" delay={250}>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <input type="text" placeholder="Your Name" className="form-input" />
                <input type="email" placeholder="Email Address" className="form-input" />
              </div>
              <div className="form-row">
                <input type="tel" placeholder="Phone Number" className="form-input" />
                <select className="form-input">
                  <option value="">Interested In</option>
                  <option>2 BHK</option>
                  <option>3 BHK</option>
                  <option>4 BHK</option>
                  <option>Villa</option>
                  <option>Commercial</option>
                </select>
              </div>
              <textarea placeholder="Your Message" className="form-input form-textarea" rows="4"></textarea>
              <button type="submit" className="form-submit">Send Enquiry</button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
