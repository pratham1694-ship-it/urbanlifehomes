import ServicePage from "../components/ServicePage";

const data = {
  hero: {
    eyebrow: "URBAN LIFE HOMES / CONSTRUCTION",
    lines: [
      { text: "We build with" },
      { text: "precision and purpose.", accent: true },
    ],
    note: "Turnkey construction, structural works and end-to-end project delivery — engineered to standards that outlast trends.",
    image: "/images/Residential-3.jpg",
  },
  intro: {
    eyebrow: "THE CRAFT OF BUILDING",
    heading: "Construction is not just about materials. It is about method, discipline and accountability.",
    text: "From foundation to final finish, every Urban Life Homes construction project is delivered as a single point of accountability. We manage structural engineering, procurement, labour, approvals and quality audits in-house, so nothing is left to chance — and nothing is hidden from you. Transparent milestones, staged inspections and documented quality checks keep every project on time and on promise.",
    image: "/images/15.png",
    caption: "Residential build / Noida",
  },
  offerings: {
    eyebrow: "WHAT WE DELIVER",
    heading: "Every detail, engineered.",
    items: [
      { num: "01", title: "Turnkey Construction", text: "Complete builds from excavation to handover — structure, façades, interiors, services and finishing under one accountable contract." },
      { num: "02", title: "Structural Works", text: "RCC frameworks, load-bearing systems and seismic-conscious engineering, calculated and tested to meet modern safety codes." },
      { num: "03", title: "Renovation & Remodeling", text: "Reconfigure and restore existing homes with updated layouts, upgraded services and finishes that match new-build standards." },
      { num: "04", title: "Project Management", text: "Planning, procurement, vendor coordination and schedule control, with milestone reporting that keeps you informed at every stage." },
      { num: "05", title: "Quality Assurance", text: "Material testing, workmanship benchmarks and staged inspections across structure, waterproofing, services and finishes." },
      { num: "06", title: "Green Building", text: "Energy-efficient systems, sustainable materials and eco-conscious methods that lower running costs and environmental impact." },
    ],
  },
  process: {
    eyebrow: "HOW WE WORK",
    heading: "A method, not a moment.",
    steps: [
      { num: "01", title: "Consult", text: "We understand your needs, site and budget to define the scope, timeline and delivery promise." },
      { num: "02", title: "Design & Engineer", text: "Architecture, structure and MEP are resolved together so drawings are buildable, not theoretical." },
      { num: "03", title: "Approve", text: "Sanctions, clearances and statutory approvals are secured and verified before construction begins." },
      { num: "04", title: "Build", text: "Scheduled, supervised construction with staged quality audits, safety compliance and progress reports." },
      { num: "05", title: "Handover", text: "Final snagging, documentation and a walkthrough with you — because delivery is only done when you say it is." },
    ],
  },
  stats: [
    { num: "15+", label: "Years of Trust" },
    { num: "5000+", label: "Homes Delivered" },
    { num: "12", label: "Projects Completed" },
    { num: "100%", label: "On-Time Delivery" },
  ],
  features: {
    eyebrow: "THE SPECIFICATIONS",
    heading: "Built to a higher standard.",
    items: [
      { title: "Premium RCC & Steel", text: "Grade-certified concrete and high-tensile steel, with mix designs tested for strength and durability." },
      { title: "Waterproofing Systems", text: "Multi-layer waterproofing on terraces, toilets and retaining walls to protect the structure for decades." },
      { title: "Sound & Thermal Insulation", text: "Insulated walls and fenestration that keep homes quiet, comfortable and energy-efficient." },
      { title: "Fire-Rated Materials", text: "Fire-resistant doors, wiring and cladding specified across service shafts and escape routes." },
      { title: "Energy-Efficient Fenestration", text: "High-performance glazing and shading design that cuts heat gain and reduces power bills." },
      { title: "Finishes That Last", text: "Proven paint, stone, timber and tiling systems selected for wear resistance, not just looks." },
    ],
  },
  closing: {
    eyebrow: "START YOUR PROJECT",
    heading: "Let's build something worth keeping.",
    text: "Whether it is a single residence or a complete development, our construction team delivers with the same care we give our own projects. Tell us what you want to build.",
    cta: "Book a consultation",
    bookingLabel: "Construction consultation",
  },
};

export default function Construction() {
  return <ServicePage data={data} />;
}
