import API_URL from "../config/api";

const API_BASE = `${API_URL}/api`;

export function isConfigured() {
  return true;
}

export async function findMany(collection, filter = {}) {
  const params = new URLSearchParams();
  if (filter.category) params.set("category", filter.category);

  const url = `${API_BASE}/${collection}${params.toString() ? "?" + params : ""}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function findOne(collection, filter = {}) {
  if (filter.slug) {
    const res = await fetch(`${API_BASE}/${collection}/${filter.slug}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  }

  const docs = await findMany(collection, filter);
  return docs[0] || null;
}

export async function getDoc(collection) {
  const res = await fetch(`${API_BASE}/${collection}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
