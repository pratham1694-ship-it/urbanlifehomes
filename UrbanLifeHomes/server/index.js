import "dotenv/config";
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB || "urbanlifehomes";

app.use(cors());
app.use(express.json());

let db;

async function connectDB() {
  const client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
  await client.connect();
  db = client.db(DB_NAME);
  console.log(`Connected to MongoDB: ${DB_NAME}`);
}

app.get("/api/properties", async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const properties = await db.collection("properties").find(filter).toArray();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/properties/:slug", async (req, res) => {
  try {
    const property = await db.collection("properties").findOne({ slug: req.params.slug });
    if (!property) return res.status(404).json({ error: "Not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/pricing", async (req, res) => {
  try {
    const pricing = await db.collection("pricing").find({}).toArray();
    res.json(pricing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/site-settings", async (req, res) => {
  try {
    const doc = await db.collection("site-settings").findOne({});
    res.json(doc || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/services", async (req, res) => {
  try {
    const docs = await db.collection("services").find({}).toArray();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/vision", async (req, res) => {
  try {
    const doc = await db.collection("vision").findOne({});
    res.json(doc || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/legacy", async (req, res) => {
  try {
    const doc = await db.collection("legacy").findOne({});
    res.json(doc || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/banners", async (req, res) => {
  try {
    const docs = await db.collection("banners").find({}).toArray();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
