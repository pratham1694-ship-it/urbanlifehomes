import "dotenv/config";
import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB || "urbanlifehomes";

if (!MONGO_URI) {
  console.error("ERROR: Set MONGO_URI in .env");
  process.exit(1);
}

const PROPERTIES = [
  { slug: "sapphire-enclave", image: "/images/15.png", images: ["/images/15.png"], title: "Plot 15", tagline: "Premium 2 & 3 BHK Luxury Apartments", location: "Plot 15, Sector 107, Noida", price: "Call for Price", status: "Under Construction", category: "current", possession: "Call for Possession", rera: "UPRERAPRJ4521", description: "Discover Luxury Living at Sapphire Enclave. Welcome to Sapphire Enclave, a premium residential development offering beautifully designed 2 BHK and 3 BHK luxury apartments in Sector 107, Noida. Designed with elegance, functionality, and comfort in mind, every residence provides spacious interiors, abundant natural light, excellent ventilation, and premium specifications.", highlights: ["Health Centres Nearby", "Educational Institutions Nearby", "Shopping Centres & Malls Nearby", "High-Speed World-Class Elevators", "24x7 Security", "Apartments Planned for Maximum Space", "Excellent Road Connectivity", "Adequate Water Supply", "Large Plate Glass Windows", "Excellent Cross Ventilation", "Abundant Natural Sunlight"], configurations: [{ type: "2 BHK", area: "", price: "" }, { type: "3 BHK", area: "", price: "" }] },
  { slug: "plot-12a", image: "/images/12a.png", images: ["/images/12a.png"], title: "Sapphire Enclave", tagline: "Premium 2 & 3 BHK Luxury Apartments — Plot 12", location: "Plot 12, Sector 107, Noida", price: "Call for Price", status: "Under Construction", category: "current", possession: "Call for Possession", rera: "", description: "Welcome to Sapphire Enclave at Plot 12, a premium residential development offering beautifully designed 2 BHK and 3 BHK luxury apartments in Sector 107, Noida. Designed with elegance, functionality, and comfort in mind, every residence provides spacious interiors, abundant natural light, excellent ventilation, and premium specifications.", highlights: ["Intelligent Space Planning", "Large Windows for Abundant Daylight", "Excellent Cross Ventilation", "Spacious Living & Dining Areas", "Premium Balconies", "Comfortable Bedroom Layouts", "Contemporary Architecture", "Elegant Facade", "High-Speed Passenger Lift", "24x7 Security & CCTV"], configurations: [{ type: "2 BHK (F103)", area: "1005 Sq. Ft.", price: "" }, { type: "2 BHK (F104)", area: "1012 Sq. Ft.", price: "" }, { type: "2 BHK (F106)", area: "1190 Sq. Ft.", price: "" }, { type: "3 BHK (F105)", area: "1405 Sq. Ft.", price: "" }, { type: "3 BHK (F101)", area: "1485 Sq. Ft.", price: "" }, { type: "3 BHK (F102)", area: "1525 Sq. Ft.", price: "" }] },
  { slug: "plot-5a", image: "/images/5a.png", images: ["/images/5a.png", "/images/5a-2.png"], title: "Plot 5A", tagline: "Premium 2 & 3 BHK Residences", location: "Plot 5A, Sector 107, Noida", price: "Call for Price", status: "Under Construction", category: "current", possession: "Call for Possession", rera: "", description: "Welcome to Plot 5A, a thoughtfully designed residential development offering premium 2 and 3 BHK apartments in the heart of Sector 107, Noida. Combining modern architecture, spacious layouts, premium specifications, and excellent connectivity, Plot 5A offers everything today's families need for a comfortable and sophisticated lifestyle.", highlights: ["Smart Space Planning", "Large Plate Glass Windows", "Excellent Cross Ventilation", "Maximum Natural Daylight", "Spacious Living Areas", "Modern Architecture", "Premium Interior Finishes", "Elegant Balcony Spaces", "Gated Community with CCTV", "HYBON High-Speed Lift"], configurations: [{ type: "2 BHK", area: "1110 Sq. Ft.", price: "" }, { type: "3 BHK", area: "1545 Sq. Ft.", price: "" }] },
  // Completed Projects
  { slug: "shakti-khand-4-724", image: "/images/shakti-khand-4-724.png", title: "Shakti Khand 4 724", description: "Modern independent floors showcasing contemporary design and premium construction quality.", category: "completed" },
  { slug: "166-shakti-khand-2", image: "/images/166-shakti-khand-2.png", title: "166 Shakti Khand 2", description: "Contemporary independent builder floors with elegant architecture and premium finishes.", category: "completed" },
  { slug: "niti-khand-2-185", image: "/images/niti-khand-2-185.png", title: "Niti Khand 2 185", description: "Classic residential project offering spacious homes with refined architectural character.", category: "completed" },
  { slug: "gyan-khand-2-indirapuram", image: "/images/gyan-khand-2-indirapuram.png", title: "Gyan Khand 2 Indirapuram", description: "Elegant luxury apartments with timeless architecture and thoughtfully crafted interiors.", category: "completed" },
  { slug: "gyan-khand-1-175", image: "/images/gyan-khand-1-175.png", title: "Gyan Khand 1 175", description: "Sophisticated residential development blending modern aesthetics with everyday comfort.", category: "completed" },
  { slug: "gyan-khand-1-176", image: "/images/gyan-khand-1-176.png", title: "Gyan Khand 1 176", description: "Premium multi-storey residence designed for spacious, contemporary urban living.", category: "completed" },
  { slug: "577-niti-khand-1-indirapuram", image: "/images/577-niti-khand-1-indirapuram.jpg.jpeg", title: "577 Niti Khand 1 Indirapuram", description: "Modern luxury residence featuring bold design, spacious layouts, and refined detailing.", category: "completed" },
];

const PRICING = [
  { type: "2 BHK", price: "₹75 Lacs*", area: "1100 - 1300 sq. ft.", bedrooms: 2, bathrooms: 2, features: ["Modular Kitchen", "1 Covered Parking"], featured: false },
  { type: "3 BHK", price: "₹1.2 Cr*", area: "1600 - 1900 sq. ft.", bedrooms: 3, bathrooms: 3, features: ["Modular Kitchen + Utility", "2 Covered Parking", "Private Balcony"], featured: true },
  { type: "4 BHK", price: "₹2.1 Cr*", area: "2400 - 2800 sq. ft.", bedrooms: 4, bathrooms: 4, features: ["Kitchen + Pantry", "2 Covered Parking", "Private Terrace"], featured: false },
];

const SITE_SETTINGS = {
  companyName: "Urban Life Homes",
  tagline: "Crafting Tomorrow",
  about: "Urban Life Homes Private Limited is a real estate development company committed to creating thoughtfully designed, high-quality living spaces that elevate modern lifestyles. Through innovative design, superior construction standards, and customer-focused solutions, we deliver homes built on trust, comfort, and lasting value.",
  address: "Plot No 12, Sapphire Enclave, Sec 107, Noida 201301",
  phone: ["+91 - 9288-52-9288", "+91 - 9873-73-0101"],
  email: "info@urbanlifehomes.com",
  hours: "Mon - Sat, 10:00 AM - 7:00 PM",
  social: { facebook: "#", instagram: "#", linkedin: "#" },
};

const SERVICES = [
  { title: "Construction", image: "/images/Residential-3.jpg", description: "Turnkey construction, structural works and end-to-end development with premium quality standards." },
  { title: "Interior Designs", image: "/images/interior.jpg", description: "Bespoke interiors that blend elegance, function and thoughtful detailing." },
  { title: "Plotting", image: "/images/plotting.jpg", description: "Prime plotted developments planned for value and long-term growth." },
  { title: "Residential Projects", image: "/images/residential1.jpg", description: "Premium apartments and residences crafted for modern urban living." },
];

const VISION = {
  heading: "At Urban Life Homes, we don't just build structures; we craft environments where families grow, and legacies are built.",
  description: "Our commitment extends beyond construction. We believe in creating spaces that honour the environment, enrich neighbourhoods, and stand the test of time. Every project we undertake is a step towards a more beautiful, connected and sustainable tomorrow.",
  values: [
    { num: "01", title: "Innovation", text: "Embracing new technologies and design philosophies to create homes that are ahead of their time." },
    { num: "02", title: "Sustainability", text: "Building with eco-conscious materials and energy-efficient systems for a greener future." },
    { num: "03", title: "Community", text: "Designing spaces that bring people together and foster meaningful connections." },
  ],
};

const LEGACY = {
  heading: "Building trust, one home at a time.",
  description: "Since our founding, Urban Life Homes has been driven by a singular purpose — to create living spaces that stand as testaments to quality, innovation and care. Over the years, we have delivered thousands of homes, each one a chapter in our story of commitment to excellence.",
  stats: [
    { num: "15+", label: "Years of Trust" },
    { num: "5000+", label: "Homes Delivered" },
    { num: "12", label: "Projects Completed" },
    { num: "100%", label: "On-Time Delivery" },
  ],
  timeline: [
    { year: "2010", text: "Founded with a vision to transform urban housing in NCR." },
    { year: "2014", text: "Completed first residential project — GreenVista, Noida Sector 62." },
    { year: "2018", text: "Expanded to commercial and mixed-use developments." },
    { year: "2022", text: "Launched premium villa collection — Royal Heritage." },
    { year: "2026", text: "Sapphire Enclave and new-era projects under development." },
  ],
};

const BANNERS = [
  { title: "Plot 15", subtitle: "Premium 2 & 3 BHK Apartments — Plot 15, Sector 107, Noida", image: "/images/15.png" },
  { title: "Sapphire Enclave", subtitle: "Premium 2 & 3 BHK Apartments — Plot 12, Sector 107, Noida", image: "/images/12a.png" },
  { title: "Plot 5A", subtitle: "Premium 2 & 3 BHK Residences — Plot 5A, Sector 107, Noida", image: "/images/5a.png" },
];

async function seed() {
  const client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
  await client.connect();
  console.log("Connected to MongoDB Atlas");

  const db = client.db(DB_NAME);

  await db.collection("properties").deleteMany({});
  await db.collection("pricing").deleteMany({});
  await db.collection("site-settings").deleteMany({});
  await db.collection("services").deleteMany({});
  await db.collection("vision").deleteMany({});
  await db.collection("legacy").deleteMany({});
  await db.collection("banners").deleteMany({});

  await db.collection("properties").insertMany(PROPERTIES);
  console.log(`Inserted ${PROPERTIES.length} properties`);

  await db.collection("pricing").insertMany(PRICING);
  console.log(`Inserted ${PRICING.length} pricing tiers`);

  await db.collection("site-settings").insertOne(SITE_SETTINGS);
  console.log("Inserted site settings");

  await db.collection("services").insertMany(SERVICES);
  console.log(`Inserted ${SERVICES.length} services`);

  await db.collection("vision").insertOne(VISION);
  console.log("Inserted vision");

  await db.collection("legacy").insertOne(LEGACY);
  console.log("Inserted legacy");

  await db.collection("banners").insertMany(BANNERS);
  console.log(`Inserted ${BANNERS.length} banners`);

  console.log("Database seeded successfully!");
  await client.close();
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
