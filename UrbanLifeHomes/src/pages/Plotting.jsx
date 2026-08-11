import ServicePage from "../components/ServicePage";

const data = {
  hero: {
    eyebrow: "URBAN LIFE HOMES / PLOTTING",
    lines: [
      { text: "Land, planned for" },
      { text: "lasting value.", accent: true },
    ],
    note: "Prime plotted developments — thoughtfully laid out, fully serviced and positioned for long-term growth.",
    image: "/images/plotting.jpg",
  },
  intro: {
    eyebrow: "DEVELOPED WITH FORESIGHT",
    heading: "A plot is not just land. It is the promise of what will stand on it.",
    text: "We acquire land only where growth is proven, then shape it into organised communities — clear layouts, proper roads, complete utilities and transparent titles. Every plot we develop is serviced before it is sold, so you invest in infrastructure, not intentions. From gated plot estates to integrated residential neighbourhoods, we plan for the value your land will carry ten, twenty and thirty years from now.",
    image: "/images/5a.png",
    caption: "Plotted development / master plan",
  },
  offerings: {
    eyebrow: "WHAT WE DELIVER",
    heading: "Value, planned in from day one.",
    items: [
      { num: "01", title: "Site Acquisition", text: "Location research and due diligence across titles, zoning and market trends, so your plot starts on solid ground." },
      { num: "02", title: "Layout & Master Planning", text: "Street grids, plot sizes, open spaces and utility corridors designed for convenience, privacy and appreciation." },
      { num: "03", title: "Infrastructure Development", text: "Wide carriageways, underground drainage, water supply, power and telecom — built before possession, not promised after." },
      { num: "04", title: "Approvals & Clearances", text: "Layout approvals and statutory clearances are obtained and verified, keeping every plot legal and future-proof." },
      { num: "05", title: "Gated Plot Developments", text: "Secured, landscaped communities with boundary walls, entry gates and common amenities for safer living." },
      { num: "06", title: "Registration & Transfer", text: "Clean, documented sale deeds with complete paperwork — so ownership is yours in every legal sense." },
    ],
  },
  process: {
    eyebrow: "HOW WE WORK",
    heading: "From raw land to ready value.",
    steps: [
      { num: "01", title: "Site Selection", text: "Growth corridors are shortlisted on connectivity, appreciation and title cleanliness before anything else." },
      { num: "02", title: "Layout Design", text: "Plots, roads and greens are planned to maximise usable area without compromising living quality." },
      { num: "03", title: "Approvals", text: "Statutory layout approvals and clearances are secured, transparently documented and shared with buyers." },
      { num: "04", title: "Infrastructure", text: "Roads, drainage, water, power and street lighting are fully developed and handed over with the plots." },
      { num: "05", title: "Registration", text: "Sale deeds are executed with complete documentation, giving you clear, marketable title from day one." },
    ],
  },
  stats: [
    { num: "500+", label: "Plots Developed" },
    { num: "100%", label: "Clear Titles" },
    { num: "100%", label: "Serviced Plots" },
    { num: "15+", label: "Years of Trust" },
  ],
  features: {
    eyebrow: "THE PLOT EXPERIENCE",
    heading: "Communities, not just corners.",
    items: [
      { title: "Wide Tree-Lined Avenues", text: "Generous carriageways and shaded verges that make daily movement calm, safe and pleasant." },
      { title: "Underground Utilities", text: "Power, water and telecom ducting kept out of sight and out of the way of future construction." },
      { title: "Green Pockets & Parks", text: "Central greens and open spaces that bring the neighbourhood together and lift every plot's value." },
      { title: "Street Lighting", text: "Uniformly lit streets and pedestrian-safe junctions from the first night of possession." },
      { title: "Community Infrastructure", text: "Planned space for schools, retail and civic uses within walkable distance of every plot." },
      { title: "Documentation & Title", text: "Complete deed trails, clearances and records maintained so resale and financing stay frictionless." },
    ],
  },
  closing: {
    eyebrow: "INVEST IN LAND",
    heading: "Own a piece of the future.",
    text: "The right plot, in the right place, developed the right way, is one of the safest long-term investments you can make. Let us show you where we are building next.",
    cta: "Book a site visit",
    bookingLabel: "Plotting site visit",
  },
};

export default function Plotting() {
  return <ServicePage data={data} />;
}
