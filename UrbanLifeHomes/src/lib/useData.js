import { useState, useEffect, useMemo } from "react";
import { findMany, findOne, getDoc } from "./mongodb";

export function useCollection(collection, filter = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const filterKey = useMemo(() => JSON.stringify(filter), [filter]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const parsedFilter = JSON.parse(filterKey);
        const docs = await findMany(collection, parsedFilter);
        if (!cancelled) {
          setData(docs);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setData(null);
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [collection, filterKey]);

  return { data, loading };
}

export function useProperty(slug) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const doc = await findOne("properties", { slug });
        if (!cancelled) {
          setData(doc);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setData(null);
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [slug]);

  return { data, loading };
}

export function useDoc(collection) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const doc = await getDoc(collection);
        if (!cancelled) {
          setData(doc);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setData(null);
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [collection]);

  return { data, loading };
}
