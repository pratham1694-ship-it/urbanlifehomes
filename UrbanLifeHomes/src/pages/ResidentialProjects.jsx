import ServicePage from "../components/ServicePage";

const data = {
  hero: {
    eyebrow: "URBAN LIFE HOMES / RESIDENTIAL PROJECTS",
    lines: [
      { text: "Homes designed for" },
      { text: "modern living.", accent: true },
    ],
    note: "Premium apartments and residences crafted for contemporary urban life — from first sketch to final handover.",
    image: "/images/residential1.jpg",
  },
  intro: {
    eyebrow: "MADE FOR REAL LIFE",
    heading: "We don't build apartments. We build the address your life happens at.",
    text: "Every residential project we develop begins with a question: how do people actually want to live here? The answers shape generous layouts, well-served kitchens, light-filled rooms and shared spaces designed for real interaction. From 2 and 3 BHK apartments in Noida's Sector 107 to larger residences in the pipeline, each home is constructed to our full construction standard and handed over with the same care we put into the brochure — only better.",
    image: "/images/12a.png",
    caption: "Sapphire Enclave / Sector 107, Noida",
  },
  offerings: {
    eyebrow: "WHAT WE DELIVER",
    heading: "A portfolio of considered living.",
    items: [
      { num: "01", title: "2 & 3 BHK Apartments", text: "Optimised layouts with functional kitchens, ventilated rooms and balconies that actually get used." },
      { num: "02", title: "Luxury Residences", text: "Larger homes with premium specifications, corner orientations and elevated finish levels." },
      { num: "03", title: "Gated Communities", text: "Secured enclaves with entry management, landscaped grounds and shared amenity zones." },
      { num: "04", title: "Amenities & Clubhouses", text: "Gymnasiums, clubhouses, kid's play areas and multi-purpose halls that make home a lifestyle." },
      { num: "05", title: "Customised Living Options", text: "Unit-level customisation on layouts and finishes at construction stage — before walls are cast." },
      { num: "06", title: "Turnkey Possession", text: "Possession-ready homes with documented handover — fittings, finishes and paperwork complete." },
    ],
  },
  process: {
    eyebrow: "HOW WE WORK",
    heading: "From vision to residence.",
    steps: [
      { num: "01", title: "Land & Vision", text: "Sites are chosen for location, infrastructure and lifestyle potential, then shaped by a clear design brief." },
      { num: "02", title: "Design & Approvals", text: "Architecture, structure and services are resolved and all statutory approvals are secured." },
      { num: "03", title: "Construction", text: "Structured, supervised building with premium materials and staged quality audits throughout." },
      { num: "04", title: "Quality Audit", text: "Independent checks on structure, waterproofing, services and finishes before anything is offered for possession." },
      { num: "05", title: "Delivery", text: "Handover with complete documentation, walkthrough and after-sales support that actually responds." },
    ],
  },
  stats: [
    { num: "5000+", label: "Homes Delivered" },
    { num: "12", label: "Projects Completed" },
    { num: "100%", label: "On-Time Possession" },
    { num: "15+", label: "Years of Trust" },
  ],
  features: {
    eyebrow: "THE LIVING STANDARD",
    heading: "What every address shares.",
    items: [
      { title: "Thoughtful Layouts", text: "Rooms sized for furniture, kitchens built for cooking, balconies placed for evening light." },
      { title: "Premium Specifications", text: "Vitrified flooring, branded fittings, modular kitchens and finishes chosen for daily use." },
      { title: "Landscaped Surroundings", text: "Planted courts, shaded walkways and green buffers that cool the site and calm the senses." },
      { title: "Security Systems", text: "Controlled entry, intercoms, CCTV and fire safety engineered into the building, not bolted on." },
      { title: "Amenity-Rich Living", text: "Shared spaces that make weekday mornings easier and weekend evenings memorable." },
      { title: "Prime Locations", text: "Well-connected addresses close to schools, markets, workplaces and transit." },
    ],
  },
  closing: {
    eyebrow: "FIND YOUR HOME",
    heading: "Your next address starts here.",
    text: "Visit a completed home, walk a construction site, or simply talk to us about what you are looking for. Every project we build is open for inspection — because seeing is believing.",
    cta: "Book a site visit",
    bookingLabel: "Residential site visit",
    link: { to: "/projects", label: "Explore Projects" },
  },
};

export default function ResidentialProjects() {
  return <ServicePage data={data} />;
}
