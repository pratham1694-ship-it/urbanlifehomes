import { useState } from "react";
import { useDoc } from "../lib/useData";
import { FALLBACK_SITE_SETTINGS } from "../lib/fallbackData";
import ScrollReveal from "../components/ScrollReveal";
import "../components/ScrollReveal.css";

export default function Contact() {
  const { data: settings } = useDoc("site-settings");
  const s = settings && settings.companyName ? settings : FALLBACK_SITE_SETTINGS;

  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "", message: "" });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const digits = (s.phone?.[0] || "").replace(/\D/g, "");
    const lines = [
      "Hi Urban Life Homes! New enquiry from the website.",
      form.name ? `Name: ${form.name}` : "",
      form.phone ? `Phone: ${form.phone}` : "",
      form.email ? `Email: ${form.email}` : "",
      form.interest ? `Interested in: ${form.interest}` : "",
      form.message ? `Message: ${form.message}` : "",
    ].filter(Boolean);
    window.open(`https://wa.me/${digits}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  };

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
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input type="text" placeholder="Your Name" className="form-input" value={form.name} onChange={set("name")} required />
                <input type="email" placeholder="Email Address" className="form-input" value={form.email} onChange={set("email")} />
              </div>
              <div className="form-row">
                <input type="tel" placeholder="Phone Number" className="form-input" value={form.phone} onChange={set("phone")} required />
                <select className="form-input" value={form.interest} onChange={set("interest")}>
                  <option value="">Interested In</option>
                  <option>2 BHK</option>
                  <option>3 BHK</option>
                  <option>4 BHK</option>
                  <option>Villa</option>
                  <option>Commercial</option>
                </select>
              </div>
              <textarea placeholder="Your Message" className="form-input form-textarea" rows="4" value={form.message} onChange={set("message")}></textarea>
              <button type="submit" className="form-submit">Send Enquiry</button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
