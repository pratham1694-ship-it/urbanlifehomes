import ServicePage from "../components/ServicePage";

const data = {
  hero: {
    eyebrow: "URBAN LIFE HOMES / INTERIOR DESIGN",
    lines: [
      { text: "Spaces that feel" },
      { text: "as good as they look.", accent: true },
    ],
    note: "Bespoke interiors that blend elegance, function and thoughtful detailing — designed around the way you actually live.",
    image: "/images/interior.jpg",
  },
  intro: {
    eyebrow: "DESIGN WITH INTENT",
    heading: "A home should be measured in feeling, not just square footage.",
    text: "Our interior studio designs each residence as a personal composition — light, proportion, material and detail arranged around your habits and rituals. From a single room to a complete home, we handle space planning, 3D visualisation, joinery, lighting and styling, and we execute with the same precision we bring to construction. You see the finished vision before a single wall is touched.",
    image: "/images/gemini-generated-yc0aflyc0aflyc0a.jpg",
    caption: "Interior concept / in-house studio",
  },
  offerings: {
    eyebrow: "WHAT WE DELIVER",
    heading: "Every room, considered.",
    items: [
      { num: "01", title: "Space Planning & Layouts", text: "Practical floor plans that improve flow, storage and light — designed around how your family actually uses each room." },
      { num: "02", title: "Modular Kitchens & Wardrobes", text: "Precision-engineered modular systems with intelligent storage, durable finishes and hardware built for daily use." },
      { num: "03", title: "Custom Furniture", text: "Bespoke sofas, tables, headboards and built-ins crafted to your measurements, style and budget." },
      { num: "04", title: "Lighting Design", text: "Layered ambient, task and accent lighting that shapes mood and makes every space usable through the day." },
      { num: "05", title: "3D Visualization", text: "Photorealistic renders of your home before execution, so you approve the design, not the surprise." },
      { num: "06", title: "Décor & Styling", text: "Curated art, textiles, plants and accessories that give finished spaces warmth, character and a sense of belonging." },
    ],
  },
  process: {
    eyebrow: "HOW WE WORK",
    heading: "From idea to finished room.",
    steps: [
      { num: "01", title: "Discover", text: "We listen to how you live — routines, storage needs, tastes — and survey the space and its light." },
      { num: "02", title: "Design", text: "Layouts, material palettes and furniture plans are developed around a clear concept and budget." },
      { num: "03", title: "Visualize", text: "Photorealistic 3D renders let you walk through the design and refine it before anything is made." },
      { num: "04", title: "Craft", text: "In-house and vetted vendors execute joinery, finishes and installations to drawing-level precision." },
      { num: "05", title: "Install & Style", text: "Furniture, lighting, textiles and décor are placed and styled, then handed over ready to live in." },
    ],
  },
  stats: [
    { num: "120+", label: "Interiors Delivered" },
    { num: "100%", label: "3D-Approved Designs" },
    { num: "15+", label: "Years of Trust" },
    { num: "5-Year", label: "Workmanship Warranty" },
  ],
  features: {
    eyebrow: "THE DETAILS",
    heading: "The difference is in the detail.",
    items: [
      { title: "Bespoke Joinery", text: "Every cabinet, panel and moulding is made to measure — nothing standard, nothing leftover." },
      { title: "Premium Materials", text: "Natural stone, solid timber, brass and textured fabrics chosen for beauty and durability." },
      { title: "Smart Storage", text: "Deep drawers, pull-outs and hidden zones that keep daily life tidy without sacrificing style." },
      { title: "Layered Lighting", text: "Scenes for morning, evening and night — warm, functional and cinematic in equal measure." },
      { title: "Honest Finishes", text: "Details like edge banding, drawer damping and flush panels executed properly, not just specified." },
      { title: "One Team, One Promise", text: "Design, joinery, installation and styling from a single team with a single point of accountability." },
    ],
  },
  closing: {
    eyebrow: "BEGIN YOUR DESIGN",
    heading: "Make your home feel like home.",
    text: "Every great interior starts with a conversation. Share your space with us and we will show you what it could become.",
    cta: "Book a design consultation",
    bookingLabel: "Interior design consultation",
  },
};

export default function InteriorDesign() {
  return <ServicePage data={data} />;
}
