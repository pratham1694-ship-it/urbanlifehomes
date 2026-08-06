import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCollection } from "../lib/useData";
import { FALLBACK_SERVICES, FALLBACK_PROPERTIES } from "../lib/fallbackData";
import "./SearchOverlay.css";

const PAGES = [
  { title: "Vision", path: "/vision", meta: "Our philosophy & principles", keywords: "about philosophy values innovation sustainability community craft" },
  { title: "Legacy", path: "/legacy", meta: "Milestones, trust & delivered homes", keywords: "history journey milestones completed trust story" },
  { title: "Projects", path: "/projects", meta: "Current, completed & upcoming developments", keywords: "apartments flats residences bhk villas floors properties" },
  { title: "Pricing", path: "/pricing", meta: "Plans, configurations & estimates", keywords: "price cost plan emi configurations budget" },
  { title: "Upcoming Projects", path: "/upcoming", meta: "Coming soon developments", keywords: "future launches new coming soon" },
  { title: "Contact", path: "/contact", meta: "Book a private viewing", keywords: "visit booking reach email phone call address" },
];

const CATEGORY_LABEL = { current: "Current", completed: "Completed", upcoming: "Upcoming" };

const RECENT_KEY = "ulh_recent_searches";

function readRecents() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
  } catch {
    return [];
  }
}

function Highlight({ text, query }) {
  if (!query || !text) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function SearchOverlay({ open, onClose }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [recents, setRecents] = useState(readRecents);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const { data: mongoServices } = useCollection("services");
  const { data: mongoProps } = useCollection("properties");

  const services = mongoServices?.length ? mongoServices : FALLBACK_SERVICES;

  const properties = useMemo(() => {
    const base = [...FALLBACK_PROPERTIES];
    if (mongoProps?.length) {
      mongoProps.forEach((mp) => {
        const i = base.findIndex((p) => p.slug === mp.slug);
        if (i >= 0) base[i] = mp;
        else base.push(mp);
      });
    }
    return base;
  }, [mongoProps]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { projects: [], services: [], pages: [], total: 0 };

    const match = (...fields) => fields.some((f) => f && f.toLowerCase().includes(q));
    const rank = (t) => (t && t.toLowerCase().startsWith(q) ? 0 : 1);

    const projects = properties
      .filter((p) => match(p.title, p.tagline, p.location, p.description))
      .sort((a, b) => rank(a.title) - rank(b.title));

    const svcs = services
      .filter((s) => match(s.title, s.description))
      .sort((a, b) => rank(a.title) - rank(b.title));

    const pages = PAGES.filter((p) => match(p.title, p.meta, p.keywords));

    return { projects, services: svcs, pages, total: projects.length + svcs.length + pages.length };
  }, [query, properties, services]);

  const flat = useMemo(
    () => [
      ...results.projects.map((p) => ({ key: `p-${p.slug}`, kind: "project", item: p })),
      ...results.services.map((s) => ({ key: `s-${s.title}`, kind: "service", item: s })),
      ...results.pages.map((pg) => ({ key: `page-${pg.path}`, kind: "page", item: pg })),
    ],
    [results]
  );

  const safeActive = flat.length ? Math.min(active, flat.length - 1) : 0;

  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => {
      setQuery("");
      setActive(0);
      inputRef.current?.focus();
    });
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
      document.getElementById("navSearchBtn")?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (openRef.current) onClose();
  }, [pathname, onClose]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setActive(0);
    if (listRef.current) listRef.current.scrollTop = 0;
  };

  const saveRecent = (term) => {
    const t = term.trim();
    if (!t) return;
    setRecents((prev) => {
      const next = [t, ...prev.filter((r) => r.toLowerCase() !== t.toLowerCase())].slice(0, 5);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  };

  const openResult = (entry) => {
    const { kind, item } = entry;
    if (kind === "project") navigate(`/property/${item.slug}`);
    else if (kind === "service") {
      if (pathname === "/") {
        document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/#services");
      }
    } else navigate(item.path);
    saveRecent(query);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (flat.length ? Math.min(a + 1, flat.length - 1) : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (flat.length ? Math.max(a - 1, 0) : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const entry = flat[safeActive];
      if (entry) openResult(entry);
    }
  };

  const clearQuery = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className={`search-overlay ${open ? "is-open" : ""}`} onMouseDown={(e) => e.target === e.currentTarget && onClose()} aria-hidden={!open}>
      <div className="search-panel" role="dialog" aria-modal="true" aria-label="Search Urban Life Homes">
        <div className="search-field">
          <svg className="search-field__icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={handleQueryChange}
            onKeyDown={handleKeyDown}
            placeholder="Search projects, services, pages…"
            aria-label="Search"
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <button className="search-clear" onClick={clearQuery} aria-label="Clear search">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
          <span className="search-kbd">ESC</span>
        </div>

        <div className="search-body" ref={listRef}>
          {!query.trim() && (
            <>
              <div className="search-intro">
                <p className="search-intro__title">Find your space</p>
                <p className="search-intro__sub">Search every project, service and page across Urban Life Homes.</p>
              </div>
              {recents.length > 0 && (
                <div className="search-section">
                  <p className="search-section__label">Recent searches</p>
                  <div className="search-chips">
                    {recents.map((r) => (
                      <button key={r} className="search-chip" onClick={() => setQuery(r)}>{r}</button>
                    ))}
                    <button className="search-chip search-chip--ghost" onClick={() => { setRecents([]); try { localStorage.removeItem(RECENT_KEY); } catch { /* storage unavailable */ } }}>Clear all</button>
                  </div>
                </div>
              )}
              <div className="search-section">
                <p className="search-section__label">Explore</p>
                <div className="search-chips">
                  {["Sapphire Enclave", "Construction", "Interior Designs", "Pricing", "Upcoming", "Book a visit"].map((s) => (
                    <button key={s} className="search-chip" onClick={() => setQuery(s)}>{s}</button>
                  ))}
                </div>
              </div>
            </>
          )}

          {query.trim() && flat.length === 0 && (
            <div className="search-empty">
              <p className="search-empty__title">No results for “{query.trim()}”</p>
              <p className="search-empty__sub">Try a project name, location, service or page.</p>
              <div className="search-chips">
                {["Sapphire Enclave", "Plot 5A", "Construction", "Vision"].map((s) => (
                  <button key={s} className="search-chip" onClick={() => setQuery(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && flat.length > 0 && (
            <>
              {results.projects.length > 0 && (
                <div className="search-section">
                  <p className="search-section__label">Projects <span>{results.projects.length}</span></p>
                  {results.projects.map((p) => {
                    const entry = { key: `p-${p.slug}`, kind: "project", item: p };
                    const isActive = flat.findIndex((f) => f.key === entry.key) === safeActive;
                    return (
                      <button
                        key={entry.key}
                        className={`search-item ${isActive ? "is-active" : ""}`}
                        onMouseEnter={() => setActive(flat.findIndex((f) => f.key === entry.key))}
                        onClick={() => openResult(entry)}
                      >
                        {p.image && <img className="search-thumb" src={p.image} alt="" />}
                        <span className="search-item__text">
                          <span className="search-item__title"><Highlight text={p.title} query={query} /></span>
                          <span className="search-item__meta">
                            {p.location ? <span><Highlight text={p.location} query={query} /></span> : null}
                            {p.tagline ? <span><Highlight text={p.tagline} query={query} /></span> : null}
                          </span>
                        </span>
                        <span className="search-badge">{CATEGORY_LABEL[p.category] || "Project"}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {results.services.length > 0 && (
                <div className="search-section">
                  <p className="search-section__label">Services <span>{results.services.length}</span></p>
                  {results.services.map((s) => {
                    const entry = { key: `s-${s.title}`, kind: "service", item: s };
                    const isActive = flat.findIndex((f) => f.key === entry.key) === safeActive;
                    return (
                      <button
                        key={entry.key}
                        className={`search-item ${isActive ? "is-active" : ""}`}
                        onMouseEnter={() => setActive(flat.findIndex((f) => f.key === entry.key))}
                        onClick={() => openResult(entry)}
                      >
                        {s.image && <img className="search-thumb" src={s.image} alt="" />}
                        <span className="search-item__text">
                          <span className="search-item__title"><Highlight text={s.title} query={query} /></span>
                          {s.description && <span className="search-item__meta"><Highlight text={s.description} query={query} /></span>}
                        </span>
                        <span className="search-badge search-badge--gold">Service</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {results.pages.length > 0 && (
                <div className="search-section">
                  <p className="search-section__label">Pages <span>{results.pages.length}</span></p>
                  {results.pages.map((pg) => {
                    const entry = { key: `page-${pg.path}`, kind: "page", item: pg };
                    const isActive = flat.findIndex((f) => f.key === entry.key) === safeActive;
                    return (
                      <button
                        key={entry.key}
                        className={`search-item ${isActive ? "is-active" : ""}`}
                        onMouseEnter={() => setActive(flat.findIndex((f) => f.key === entry.key))}
                        onClick={() => openResult(entry)}
                      >
                        <span className="search-monogram">{pg.title.charAt(0)}</span>
                        <span className="search-item__text">
                          <span className="search-item__title"><Highlight text={pg.title} query={query} /></span>
                          <span className="search-item__meta"><Highlight text={pg.meta} query={query} /></span>
                        </span>
                        <svg className="search-item__arrow" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        <div className="search-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Open</span>
          <span><kbd>ESC</kbd> Close</span>
          <span className="search-footer__brand">URBAN LIFE HOMES</span>
        </div>
      </div>
    </div>
  );
}
