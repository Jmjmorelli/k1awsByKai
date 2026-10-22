"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ServiceSelector.module.css";

import gelOverlay1 from "../../public/gelOverlay1.png";

type Service = { id: number; name: string; basePrice: number; baseDurationMinutes: number; description: string | null };
type Category = { id: number; name: string; description: string | null; requiresSize: boolean; requiresShape: boolean; services: Service[] };
type CatalogOption = { id: number; name: string; displayOrder: number };
type ServiceCatalog = { categories: Category[] };
type ServiceOptions = { sizes: CatalogOption[]; shapes: CatalogOption[] };

const catalogUrl = "/api/service-catalog";
const optionsUrl = "/api/service-options";
const menuHighlights = [
  ["Gel-X", "Lightweight extensions tailored to your preferred length and shape."],
  ["Gel Overlays", "Structured support over your natural nails for a polished, lasting finish."],
  ["Custom Sizes", "Every set is fitted thoughtfully, so your nails feel as good as they look."],
  ["Detailed Designs", "Frenchies, 3D details, charms, and art that make the set yours."],
];
const existingLengthOptions: CatalogOption[] = [
  { id: -1, name: "Keep my nail length", displayOrder: 0 },
  { id: -2, name: "Shorten my nail length", displayOrder: 1 },
];

export default function ServiceSelector() {
  const [catalog, setCatalog] = useState<ServiceCatalog | null>(null);
  const [options, setOptions] = useState<ServiceOptions | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSize, setSelectedSize] = useState<CatalogOption | null>(null);
  const [selectedShape, setSelectedShape] = useState<CatalogOption | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const revealTimer = useRef<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      try {
        const [catalogResponse, optionsResponse] = await Promise.all([
          fetch(catalogUrl, { signal: controller.signal }),
          fetch(optionsUrl, { signal: controller.signal }),
        ]);
        if (!catalogResponse.ok || !optionsResponse.ok) throw new Error("Unable to load services");

        const [catalogData, optionsData] = await Promise.all([
          catalogResponse.json() as Promise<ServiceCatalog>,
          optionsResponse.json() as Promise<ServiceOptions>,
        ]);
        setCatalog(catalogData);
        setOptions(optionsData);
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        console.error("Failed to load service catalog:", requestError);
        setError("Services are unavailable right now. Please try again shortly.");
      }
    }

    void loadData();
    return () => controller.abort();
  }, []);

  useEffect(() => () => {
    if (revealTimer.current !== null) window.clearTimeout(revealTimer.current);
  }, []);

  const open = useCallback(() => {
    setExpanded(true);
    setMenuVisible(false);
    revealTimer.current = window.setTimeout(() => setMenuVisible(true), 320);
  }, []);

  useEffect(() => {
    window.addEventListener("k1aws:open-booking", open);
    return () => window.removeEventListener("k1aws:open-booking", open);
  }, [open]);

  const close = () => {
    if (revealTimer.current !== null) window.clearTimeout(revealTimer.current);
    setExpanded(false);
    setMenuVisible(false);
    setSelectedCategory(null);
    setSelectedService(null);
    setSelectedSize(null);
    setSelectedShape(null);
    setShowCart(false);
  };

  const chooseCategory = (category: Category) => {
    setShowCart(false);
    setSelectedCategory(category);
    setSelectedService(null);
    setSelectedSize(null);
    setSelectedShape(null);
  };

  const chooseService = (service: Service) => {
    setShowCart(false);
    setSelectedService(service);
    setSelectedSize(null);
    setSelectedShape(null);
  };

  const isGelX = selectedCategory?.name === "Gel X";
  const isGelXFullSet = selectedService?.name === "Gel X Full Set";
  const usesExistingLength = Boolean(isGelX && selectedService && !isGelXFullSet);
  const needsSize = Boolean(selectedCategory?.requiresSize);
  const needsShape = Boolean(selectedCategory?.requiresShape && !usesExistingLength);
  const choosingSize = Boolean(selectedService && needsSize && !selectedSize);
  const choosingShape = Boolean(selectedService && needsShape && (!needsSize || selectedSize) && !selectedShape);
  const selectionComplete = Boolean(selectedService && !choosingSize && !choosingShape);
  const menuStep = choosingSize ? "size" : choosingShape ? "shape" : selectionComplete ? "complete" : selectedCategory ? "service" : "category";

  useEffect(() => {
    if (!selectionComplete) return;

    const timer = window.setTimeout(() => setShowCart(true), 850);
    return () => window.clearTimeout(timer);
  }, [selectionComplete]);

  const goBack = () => {
    setShowCart(false);
    if (selectionComplete) {
      if (needsShape) setSelectedShape(null);
      else if (needsSize) setSelectedSize(null);
      else setSelectedService(null);
      return;
    }
    if (choosingShape) {
      if (needsSize) setSelectedSize(null);
      else setSelectedService(null);
      return;
    }
    if (choosingSize) {
      setSelectedService(null);
      return;
    }
    setSelectedCategory(null);
  };

  return <section className={`${styles.experience} ${expanded ? styles.expanded : ""}`} aria-label="The essentials">
    <button className={styles.close} type="button" onClick={close} aria-label="Close essentials">Close <span>×</span></button>
    <div className={styles.title}>
      <p>Gel-X ·</p>
      <p>Gel overlays · </p>
      <p>Custom sizes · </p>
      <p>Detailed designs ·</p>
      <h2>The<br />K1aws Menu</h2></div>


    {!expanded && <>
      <div className={styles.menuHighlights}>{menuHighlights.map(([title, description]) => <article className={styles.menuItem} key={title}>
        <div className={styles.menuCopy}><h3>{title}</h3><p>{description}</p></div>
        <div className={styles.menuVisual}>{title === "Gel Overlays" ? <Image src={gelOverlay1} alt="Gel overlay nails" sizes="(max-width: 700px) 100vw, 50vw"/> : <><i/><i/><i/></>}</div>
      </article>)}</div>
      <div className={styles.entry}>
        <button type="button" onClick={open} aria-expanded="false">BOOK NOW<span></span></button>
      </div>
    </>}

    {expanded && <div className={`${styles.options} ${menuVisible ? styles.menuVisible : ""} ${selectedCategory ? styles.showingServices : ""}`} aria-live="polite">
      {menuVisible && <>
        <div className={styles.menuContent} key={menuStep}>
          {!catalog && !error && <p className={styles.status}>Loading services…</p>}
          {error && <p className={styles.status}>{error}</p>}
          {!selectedCategory && catalog?.categories.map((category) => <button key={category.id} type="button" onClick={() => chooseCategory(category)}>
            <strong>{category.name}</strong><small>{category.description ?? "View available services."}</small><b>→</b>
          </button>)}
          {selectedCategory && !selectedService && <>
            <button className={styles.back} type="button" onClick={goBack}>Back to categories</button>
            {selectedCategory.services.filter((service) => !(selectedCategory.name === "Gel X" && service.name === "Length Change")).map((service) => <button className={styles.service} key={service.id} type="button" onClick={() => chooseService(service)}>
              <strong>{service.name}</strong><small>{service.description ?? `${service.baseDurationMinutes} minutes`}</small><b className={styles.price}>${service.basePrice}</b>
            </button>)}
          </>}
          {choosingSize && <>
            <button className={styles.back} type="button" onClick={goBack}>Back to services</button>
            {[...(usesExistingLength ? existingLengthOptions : options?.sizes ?? [])].sort((a, b) => a.displayOrder - b.displayOrder).map((size) => <button className={styles.service} key={size.id} type="button" onClick={() => setSelectedSize(size)}>
              <strong>{size.name}</strong><b>→</b>
            </button>)}
          </>}
          {choosingShape && <>
            <button className={styles.back} type="button" onClick={goBack}>Back to length</button>
            {[...(options?.shapes ?? [])].sort((a, b) => a.displayOrder - b.displayOrder).map((shape) => <button className={styles.service} key={shape.id} type="button" onClick={() => setSelectedShape(shape)}>
              <strong>{shape.name}</strong><b>→</b>
            </button>)}
          </>}
          {selectionComplete && <div className={styles.selectionSummary} aria-hidden="true" />}
        </div>
      </>}
    </div>}
    {expanded && selectedCategory && <aside className={`${styles.selectionTrail} ${showCart ? styles.selectionComplete : selectionComplete ? styles.selectionLeaving : ""}`} aria-label="Current selection">
      <p>Your selection</p>
      <ol>
        <li><span>Category</span><strong>{selectedCategory.name}</strong></li>
        {selectedService && <li><span>Service</span><strong>{selectedService.name}</strong></li>}
        {selectedSize && <li><span>Length</span><strong>{selectedSize.name}</strong></li>}
        {selectedShape && <li><span>Shape</span><strong>{selectedShape.name}</strong></li>}
      </ol>
      {showCart && <div className={styles.cartActions}>
        <p>Selection complete</p>
        <button type="button" onClick={goBack}>Edit selection</button>
      </div>}
    </aside>}
    {expanded && <p className={styles.helper}>{choosingSize ? usesExistingLength ? "Keep your current length or shorten it." : "Select a nail length." : choosingShape ? "Select a nail shape." : selectionComplete ? "Your service is selected." : selectedCategory ? "Choose a service to continue." : "Choose a service category to see its options."}</p>}
  </section>;
}
