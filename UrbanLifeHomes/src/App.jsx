import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import WelcomeIntro from "./components/WelcomeIntro";

import HeroBanner from "./components/HeroBanner";
import PropertyJourney from "./components/PropertyJourney";
import ScrollReveal from "./components/ScrollReveal";
import ServiceCard from "./components/ServiceCard";
import PixelBlast from "./components/PixelBlast";
import bg1 from "./assets/WhatsApp Image 2026-07-25 at 17.50.53.jpeg";
import Vision from "./pages/Vision";
import Pricing from "./pages/Pricing";
import Legacy from "./pages/Legacy";
import Contact from "./pages/Contact";
import PropertyDetails from "./pages/PropertyDetails";
import Upcoming from "./pages/Upcoming";
import Projects from "./pages/Projects";
import { useCollection, useDoc } from "./lib/useData";
import { FALLBACK_SERVICES, FALLBACK_SITE_SETTINGS } from "./lib/fallbackData";
import "./components/ScrollReveal.css";
import "./App.css";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PixelBlastBackground() {
  return (
    <div className="pixelblast-bg">
        <PixelBlast
          variant="square"
          pixelSize={4}
          imageSrc={bg1}
          color="#2a0808"
          patternScale={2}
          patternDensity={1}
          pixelSizeJitter={0}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={1.2}
          edgeFade={0.25}
          transparent
        />
    </div>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-custom ${isScrolled ? "navbar-scrolled" : ""} ${pathname === "/pricing" ? "navbar-pricing" : ""}`}>
      <div className="container-fluid">
        <div className="nav-left">
          <button
            className="btn btn-link sidebar-toggle"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-label="Open Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </button>
        </div>

        <div className="nav-center">
          <Link className="navbar-brand" to="/">
            URBAN LIFE HOMES
          </Link>

          <ul className="navbar-nav flex-row">
            <li className="nav-item">
              <Link className="nav-link" to="/vision">Vision</Link>
            </li>

          <li className="nav-item">
              <Link className="nav-link" to="/Legacy">Legacy</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/projects">Projects</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/pricing">Pricing</Link>
            </li>
            
            
          </ul>
        </div>

        <div className="nav-right">
          <Link to="/contact" className="btn btn-enquire">Enquire</Link>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.94 7.94 0 0 0 8 0C3.586 0 .007 3.578.007 8c0 1.41.367 2.78 1.064 3.98L.057 16l4.113-1.084A7.93 7.93 0 0 0 8 16c4.411 0 7.993-3.578 7.993-7.994A7.94 7.94 0 0 0 13.601 2.326zM8 14.4A6.405 6.405 0 0 1 4.39 12.8l-.28-.163-2.44.645.653-2.38-.183-.29A6.37 6.37 0 0 1 1.6 8c0-3.535 2.876-6.41 6.4-6.4 3.524 0 6.4 2.874 6.4 6.4 0 3.535-2.876 6.4-6.4 6.4m3.507-4.72c-.193-.096-1.14-.562-1.317-.627-.182-.065-.315-.096-.448.096-.134.192-.515.627-.63.756-.117.128-.233.145-.426.049-.193-.096-.815-.3-1.552-.93-.572-.49-.958-1.1-1.07-1.223.096-.117.193-.29.289-.434.098-.145.13-.243.196-.405.065-.165.033-.31-.015-.434-.049-.128-.448-1.083-.614-1.482-.162-.39-.327-.337-.448-.343-.117-.005-.249-.006-.382-.006-.134 0-.348.049-.53.243-.182.193-.695.68-.695 1.658 0 .978.711 1.922.81 2.053.096.13 1.391 2.124 3.371 2.978.471.204.838.325 1.124.417.473.151.902.129 1.24.078.379-.056 1.14-.467 1.3-1.014.16-.547.16-1.016.112-1.113-.049-.096-.182-.155-.375-.251z" />
            </svg>
          </a>
          <button className="btn-icon" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

function Sidebar() {
  const { data: settings } = useDoc("site-settings");
  const s = settings || FALLBACK_SITE_SETTINGS;

  const dismissOffcanvas = () => {
    const el = document.getElementById('sidebarMenu');
    if (el) {
      const instance = window.bootstrap?.Offcanvas?.getInstance(el) || window.bootstrap?.Offcanvas?.getOrCreateInstance(el);
      if (instance) instance.hide();
    }
  };

  return (
    <div className="offcanvas offcanvas-start sidebar-custom" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="sidebarMenuLabel">{s.companyName || "Urban Life Homes"}</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="sidebar-links">
          <li><Link to="/vision" onClick={dismissOffcanvas}>Vision</Link></li>
          <li><Link to="/pricing" onClick={dismissOffcanvas}>Pricing</Link></li>
          <li><Link to="/legacy" onClick={dismissOffcanvas}>Legacy</Link></li>
          <li><Link to="/projects" onClick={dismissOffcanvas}>Projects</Link></li>
          <li><Link to="/upcoming" onClick={dismissOffcanvas}>Upcoming Projects</Link></li>
          <li><Link to="/contact" onClick={dismissOffcanvas}>Contact</Link></li>
        </ul>
        <div className="sidebar-divider"></div>
        <div className="sidebar-contact">
          <p className="sidebar-contact-label">Get in touch</p>
          <a href={`mailto:${s.email}`} className="sidebar-contact-link">{s.email}</a>
          {s.phone && s.phone[0] && (
            <a href={`tel:${s.phone[0]}`} className="sidebar-contact-link">{s.phone[0]}</a>
          )}
        </div>
      </div>
    </div>
  );
}

function GoToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button className={`go-to-top ${visible ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Go to top">
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}

function Footer() {
  const { data: settings } = useDoc("site-settings");
  const s = settings || FALLBACK_SITE_SETTINGS;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-invitation">
          <p>URBAN LIFE HOMES / PRIVATE VIEWINGS</p>
          <Link to="/contact">Book your visit <span>↗</span></Link>
        </div>
        <div className="footer-grid">
          <div className="footer-col footer-about">
            <h3>{s.companyName || "Urban Life Homes"}</h3>
            <p>{s.about || "Urban Life Homes is driven by innovation, quality, and thoughtful design. Trusted for every project we deliver."}</p>
            <div className="footer-social">
              {s.social?.facebook && (
                <a href={s.social.facebook} className="footer-social-link" aria-label="Facebook">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {s.social?.instagram && (
                <a href={s.social.instagram} className="footer-social-link" aria-label="Instagram">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              )}
              {s.social?.linkedin && (
                <a href={s.social.linkedin} className="footer-social-link" aria-label="LinkedIn">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div className="footer-col footer-links-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/vision">Vision</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/legacy">Legacy</Link></li>
              <li><Link to="/#about">About</Link></li>
            </ul>
          </div>

          <div className="footer-col footer-contact-col">
            <h4>Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{(s.address || "Plot No 12, Sapphire Enclave, Sec 107, Noida 201301").replace(", ", ",\n")}</span>
              </li>
              <li>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <span>{(s.phone || ["+91 - 9288-52-9288", "+91 - 9873-73-0101"]).join(", ")}</span>
              </li>
              <li>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>{s.email || "info@urbanlifehomes.com"}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {s.companyName || "Urban Life Homes"}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  const { data: mongoServices } = useCollection("services");
  const services = mongoServices || FALLBACK_SERVICES;

  return (
    <>
      <HeroBanner />

      <PropertyJourney />

      <section className="brand-intro">
        <div className="brand-left">
          <ScrollReveal animation="fade-right" delay={100}>
            <div className="brand-content">
              <h2 className="brand-title">Crafting Tomorrow</h2>
              <p className="brand-descripsmoothtion">
                Urban Life Homes Private Limited is a real estate development company committed to creating thoughtfully designed, high-quality living spaces that elevate modern lifestyles. Through innovative design, superior construction standards, and customer-focused solutions, we deliver homes built on trust, comfort, and lasting value.
              </p>
            </div>
          </ScrollReveal>
        </div>
        <div className="brand-right">
          <ScrollReveal animation="zoom-in" delay={300}>
            <div className="brand-image-wrapper">
              <img src="./src/assets/FRONT copy.svg" alt="Urban Life Homes" className="brand-image" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-services">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <p className="section-subtitle">WHAT WE OFFER</p>
              <h2 className="section-title">Our Services</h2>
              <div className="section-divider"></div>
            </div>
          </ScrollReveal>
          <div className="services-grid">
            {services.map((svc, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 120}>
                <ServiceCard image={svc.image} title={svc.title} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}

function Layout({ children }) {
  return (
    <>
      <PixelBlastBackground />
      <Navbar />
      <Sidebar />
      <div className="main-content main-content-visible">
        {children}
      </div>
      <GoToTop />
      <Footer />
    </>
  );
}

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && <WelcomeIntro onComplete={() => setIntroComplete(true)} />}
      {introComplete && (
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/legacy" element={<Legacy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/property/:slug" element={<PropertyDetails />} />
              <Route path="/upcoming" element={<Upcoming />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
