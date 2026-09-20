"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ServiceSelector.module.css";

type Service = { id: number; name: string; basePrice: number; baseDurationMinutes: number; description: string | null };
type Category = { id: number; name: string; description: string | null; requiresSize: boolean; requiresShape: boolean; services: Service[] };
type ServiceCatalog = { categories: Category[]; tiers: Array<{ id: number; name: string; additionalPrice: number; additionalDurationMinutes: number; description: string | null; displayOrder: number }> };

const catalogUrl = "/api/service-catalog";

export default function ServiceSelector() {
  const [catalog, setCatalog] = useState<ServiceCatalog | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);
  const revealTimer = useRef<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCatalog() {
      try {
        const response = await fetch(catalogUrl, { signal: controller.signal });
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
        setCatalog(await response.json());
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        console.error("Failed to load service catalog:", requestError);
        setError("Services are unavailable right now. Please try again shortly.");
      }
    }

    void loadCatalog();
    return () => controller.abort();
  }, []);

  useEffect(() => () => {
    if (revealTimer.current !== null) window.clearTimeout(revealTimer.current);
  }, []);

  const open = () => {
    setExpanded(true);
    setMenuVisible(false);
    revealTimer.current = window.setTimeout(() => setMenuVisible(true), 320);
  };

  const close = () => {
    if (revealTimer.current !== null) window.clearTimeout(revealTimer.current);
    setExpanded(false);
    setMenuVisible(false);
    setSelectedCategory(null);
  };

  return <section className={`${styles.experience} ${expanded ? styles.expanded : ""}`} aria-label="The essentials">
    <button className={styles.close} type="button" onClick={close} aria-label="Close essentials">Close <span>×</span></button>
    <div className={styles.title}>
      <p>{selectedCategory ? `Services / ${selectedCategory.name}` : "Services"}</p>
      <h2>THE<br />ESSENTIALS.</h2>
    </div>

    {!expanded && <div className={styles.entry}>
      <button type="button" onClick={open} aria-expanded="false">Explore services <span>→</span></button>
    </div>}

    {expanded && <div className={`${styles.options} ${menuVisible ? styles.menuVisible : ""} ${selectedCategory ? styles.showingServices : ""}`} aria-live="polite">
      {menuVisible && <>
        {!catalog && !error && <p className={styles.status}>Loading services…</p>}
        {error && <p className={styles.status}>{error}</p>}
        {!selectedCategory && catalog?.categories.map((category, index) => <button key={category.id} type="button" onClick={() => setSelectedCategory(category)}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{category.name}</strong>
          <small>{category.description ?? "View available services."}</small>
          <b>→</b>
        </button>)}
        {selectedCategory && <>
          <button className={styles.back} type="button" onClick={() => setSelectedCategory(null)}>← Back to categories</button>
          {selectedCategory.services.map((service, index) => <button className={styles.service} key={service.id} type="button">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{service.name}</strong>
            <small>{service.description ?? `${service.baseDurationMinutes} minutes`}</small>
            <b>${service.basePrice}</b>
          </button>)}
        </>}
      </>}
    </div>}
    {expanded && <p className={styles.helper}>{selectedCategory ? `Choose a ${selectedCategory.name} service.` : "Choose a service category to see its options."}</p>}
  </section>;
}
