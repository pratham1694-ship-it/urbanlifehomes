import { useEffect, useMemo, useRef, useState } from "react";
import { useCollection, useDoc } from "../lib/useData";
import { FALLBACK_PROPERTIES, FALLBACK_SITE_SETTINGS } from "../lib/fallbackData";
import "./BookingModal.css";

const SLOTS = ["Morning", "Afternoon", "Evening"];

export default function BookingModal({ booking, onClose }) {
  const { open, project } = booking;
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
    date: "",
    slot: SLOTS[0],
    message: "",
  });
  const [sent, setSent] = useState(false);
  const nameRef = useRef(null);

  const { data: settings } = useDoc("site-settings");
  const s = settings?.companyName ? settings : FALLBACK_SITE_SETTINGS;

  const { data: mongoProps } = useCollection("properties");

  const projects = useMemo(() => {
    const base = [...FALLBACK_PROPERTIES];
    if (mongoProps?.length) {
      mongoProps.forEach((mp) => {
        const i = base.findIndex((p) => p.slug === mp.slug);
        if (i >= 0) base[i] = mp;
        else base.push(mp);
      });
    }
    const seen = new Set();
    return base.filter((p) => {
      if (!p.title || seen.has(p.title)) return false;
      seen.add(p.title);
      return true;
    });
  }, [mongoProps]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => {
      setSent(false);
      setForm((f) => ({ ...f, project: project || f.project }));
      nameRef.current?.focus();
    });
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [open, project]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const digits = (s.phone?.[0] || "").replace(/\D/g, "");
    const lines = [
      "Hi Urban Life Homes! I'd like to book a private viewing.",
      form.project ? `Project: ${form.project}` : "",
      form.name ? `Name: ${form.name}` : "",
      form.phone ? `Phone: ${form.phone}` : "",
      form.date ? `Preferred date: ${form.date}` : "",
      `Slot: ${form.slot}`,
      form.message ? `Note: ${form.message}` : "",
    ].filter(Boolean);
    window.open(`https://wa.me/${digits}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <div
      className={`booking-overlay ${open ? "is-open" : ""}`}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      aria-hidden={!open}
    >
      <div className="booking-panel" role="dialog" aria-modal="true" aria-label="Book your visit">
        <div className="booking-header">
          <div>
            <p className="booking-eyebrow">PRIVATE VIEWINGS</p>
            <h2 className="booking-title">Book your visit</h2>
          </div>
          <button className="booking-close" onClick={onClose} aria-label="Close booking form">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {sent ? (
          <div className="booking-success">
            <span className="booking-success__icon">
              <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </span>
            <h3>Request prepared</h3>
            <p>Your viewing request has been opened in WhatsApp. Hit send there and our team will confirm your slot shortly.</p>
            <button className="booking-submit" onClick={onClose}>Done</button>
          </div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="booking-row">
              <label className="booking-field">
                <span>Full name</span>
                <input ref={nameRef} type="text" value={form.name} onChange={set("name")} placeholder="Your name" autoComplete="name" required />
              </label>
              <label className="booking-field">
                <span>Phone</span>
                <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+91" autoComplete="tel" required />
              </label>
            </div>

            <label className="booking-field">
              <span>Email <em>(optional)</em></span>
              <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" autoComplete="email" />
            </label>

            <label className="booking-field">
              <span>Project</span>
              <select value={form.project} onChange={set("project")}>
                <option value="">Any project / not sure yet</option>
                {projects.map((p) => (
                  <option key={p.slug} value={p.title}>
                    {p.title}{p.location ? ` — ${p.location}` : ""}
                  </option>
                ))}
              </select>
            </label>

            <div className="booking-row">
              <label className="booking-field">
                <span>Preferred date</span>
                <input type="date" value={form.date} onChange={set("date")} min={new Date().toISOString().split("T")[0]} />
              </label>
              <label className="booking-field">
                <span>Time slot</span>
                <select value={form.slot} onChange={set("slot")}>
                  {SLOTS.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="booking-field">
              <span>Message <em>(optional)</em></span>
              <textarea rows="3" value={form.message} onChange={set("message")} placeholder="Anything we should know?"></textarea>
            </label>

            <button type="submit" className="booking-submit">Request Visit</button>
            <p className="booking-note">You'll be redirected to WhatsApp to confirm your slot instantly.</p>
          </form>
        )}
      </div>
    </div>
  );
}
