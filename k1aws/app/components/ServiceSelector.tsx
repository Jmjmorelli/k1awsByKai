"use client";

import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";
import GalleryCarousel, { type GalleryImage } from "./GalleryCarousel";
import styles from "./ServiceSelector.module.css";

type Service = { id: number; name: string; basePrice: number; baseDurationMinutes: number; description: string | null };
type Category = { id: number; name: string; description: string | null; requiresSize: boolean; requiresShape: boolean; services: Service[] };
type CatalogOption = { id: number; name: string; displayOrder: number };
type Tier = { id: number; name: string; additionalPrice: number; additionalDurationMinutes: number; description: string | null; displayOrder: number };
type ServiceCatalog = { categories: Category[] };
type ServiceOptions = { sizes: CatalogOption[]; shapes: CatalogOption[]; tiers: Tier[] };
type AvailabilitySlot = { id: number; availabilityDate: string; startTime: string; endTime: string; isAvailable: boolean };
type CheckoutResponse = { bookingId?: number; checkoutUrl?: string; message?: string };
type ReferencePhoto = { name: string; base64: string; contentType: string };
type ClientDetails = { firstName: string; lastName: string; email: string; phoneNumber: string };

const catalogUrl = "/api/service-catalog";
const optionsUrl = "/api/service-options";
const availabilitySlotsUrl = "/api/availability-slots";
const menuHighlights = [
  ["Gel-X", "Lightweight extensions tailored to your preferred length and shape."],
  ["Gel Overlays", "Structured support over your natural nails for a polished, lasting finish."],
  // ["Detailed Designs", "Frenchies, 3D details, charms, and art that make the set yours."],
];
const galleryImagesByTitle: Record<string, GalleryImage[]> = {
  "Gel-X": [
    { src: "/Gel-X/gelX1.png", alt: "Gel-X nail set" },
    { src: "/Gel-X/gelX2.jpeg", alt: "Gel-X nail set" },
    { src: "/Gel-X/gelX3.png", alt: "Gel-X nail set" },
  ],
  "Gel Overlays": [
    { src: "/Gel Overlay/gelOverlay1.png", alt: "Gel overlay nail set" },
  ],
};
const existingLengthOptions: CatalogOption[] = [
  { id: -1, name: "Keep my nail length", displayOrder: 0 },
  { id: -2, name: "Shorten my nail length", displayOrder: 1 },
];
const tierLabels: Record<string, string> = {
  "Tier 0": "Plain / No Design",
  "Tier 1": "Klassic",
  "Tier 2": "Karma",
  "Tier 3": "Kustom",
  "Tier 4": "Khrome",
};

const getTierLabel = (tier: Tier) => tierLabels[tier.name] ?? tier.name;
const nextCalendarDate = (date: string) => {
  const value = new Date(`${date}T00:00:00Z`);
  value.setUTCDate(value.getUTCDate() + 1);
  return value.toISOString().slice(0, 10);
};
const formatSlotTime = (time: string) => {
  const [hourText, minuteText] = time.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
};
const slotStartsAt = (slot: AvailabilitySlot | null) => {
  if (!slot) return "";
  return `${slot.availabilityDate}T${slot.startTime.length === 5 ? `${slot.startTime}:00` : slot.startTime}`;
};

export default function ServiceSelector() {
  const [catalog, setCatalog] = useState<ServiceCatalog | null>(null);
  const [options, setOptions] = useState<ServiceOptions | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSize, setSelectedSize] = useState<CatalogOption | null>(null);
  const [selectedShape, setSelectedShape] = useState<CatalogOption | null>(null);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [pendingTierName, setPendingTierName] = useState<string | null>(null);
  const [requests, setRequests] = useState("");
  const [referralName, setReferralName] = useState("");
  const [referencePhoto, setReferencePhoto] = useState<ReferencePhoto | null>(null);
  const [referencePhotoError, setReferencePhotoError] = useState<string | null>(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState<string | null>(null);
  const [client, setClient] = useState<ClientDetails>({ firstName: "", lastName: "", email: "", phoneNumber: "" });
  const [showCart, setShowCart] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
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

  useEffect(() => {
    if (!appointmentDate) {
      setAvailableSlots([]);
      setSelectedSlot(null);
      setSlotError(null);
      return;
    }

    const controller = new AbortController();
    setIsLoadingSlots(true);
    setSlotError(null);
    setSelectedSlot(null);
    const to = nextCalendarDate(appointmentDate);

    async function loadSlots() {
      try {
        const response = await fetch(`${availabilitySlotsUrl}?from=${encodeURIComponent(appointmentDate)}&to=${encodeURIComponent(to)}&availableOnly=true`, {
          signal: controller.signal,
        });
        const slots = await response.json() as AvailabilitySlot[] | { message?: string };
        if (!response.ok || !Array.isArray(slots)) {
          throw new Error(!Array.isArray(slots) ? slots.message : "Unable to load appointment times.");
        }
        setAvailableSlots(slots);
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        console.error("Failed to load appointment slots:", requestError);
        setAvailableSlots([]);
        setSlotError(requestError instanceof Error ? requestError.message : "Unable to load appointment times.");
      } finally {
        if (!controller.signal.aborted) setIsLoadingSlots(false);
      }
    }

    void loadSlots();
    return () => controller.abort();
  }, [appointmentDate]);

  const open = useCallback(() => {
    setExpanded(true);
    setMenuVisible(false);
    revealTimer.current = window.setTimeout(() => setMenuVisible(true), 320);
  }, []);

  const selectCollectionTier = useCallback((tierName: string) => {
    open();
    if (!options) {
      setPendingTierName(tierName);
      return;
    }

    const tier = options.tiers.find((option) => option.name === tierName);

    if (!tier) {
      setError("This tier is unavailable right now. Please select a tier manually.");
      return;
    }

    setError(null);
    setCheckoutError(null);
    setShowCart(false);
    setSelectedCategory(null);
    setSelectedService(null);
    setSelectedSize(null);
    setSelectedShape(null);
    setSelectedTier(tier);
    setPendingTierName(null);
  }, [open, options]);

  useEffect(() => {
    window.addEventListener("k1aws:open-booking", open);
    return () => window.removeEventListener("k1aws:open-booking", open);
  }, [open]);

  useEffect(() => {
    const handleTierSelection = (event: Event) => {
      const tierName = (event as CustomEvent<{ tierName?: string }>).detail?.tierName;
      if (tierName) selectCollectionTier(tierName);
    };

    window.addEventListener("k1aws:select-tier", handleTierSelection);
    return () => window.removeEventListener("k1aws:select-tier", handleTierSelection);
  }, [selectCollectionTier]);

  useEffect(() => {
    if (pendingTierName && options) selectCollectionTier(pendingTierName);
  }, [options, pendingTierName, selectCollectionTier]);

  const close = () => {
    if (revealTimer.current !== null) window.clearTimeout(revealTimer.current);
    setExpanded(false);
    setMenuVisible(false);
    setSelectedCategory(null);
    setSelectedService(null);
    setSelectedSize(null);
    setSelectedShape(null);
    setSelectedTier(null);
    setRequests("");
    setReferralName("");
    setReferencePhoto(null);
    setReferencePhotoError(null);
    setAppointmentDate("");
    setAvailableSlots([]);
    setSelectedSlot(null);
    setIsLoadingSlots(false);
    setSlotError(null);
    setClient({ firstName: "", lastName: "", email: "", phoneNumber: "" });
    setShowCart(false);
    setCheckoutError(null);
    setIsCheckingOut(false);
  };

  const chooseCategory = (category: Category) => {
    setShowCart(false);
    setCheckoutError(null);
    setSelectedCategory(category);
    setSelectedService(null);
    setSelectedSize(null);
    setSelectedShape(null);
  };

  const chooseService = (service: Service) => {
    setShowCart(false);
    setCheckoutError(null);
    setSelectedService(service);
    setSelectedSize(null);
    setSelectedShape(null);
  };

  const chooseTier = (tier: Tier) => {
    setShowCart(false);
    setCheckoutError(null);
    setSelectedTier(tier);
  };

  const isGelX = selectedCategory?.name === "Gel X";
  const isGelXFullSet = selectedService?.name === "Gel X Full Set";
  const usesExistingLength = Boolean(isGelX && selectedService && !isGelXFullSet);
  const needsSize = Boolean(selectedCategory?.requiresSize);
  const needsShape = Boolean(selectedCategory?.requiresShape && !usesExistingLength);
  const choosingSize = Boolean(selectedService && needsSize && !selectedSize);
  const choosingShape = Boolean(selectedService && needsShape && (!needsSize || selectedSize) && !selectedShape);
  const choosingTier = Boolean(selectedService && (!needsSize || selectedSize) && (!needsShape || selectedShape) && !selectedTier);
  const selectionComplete = Boolean(selectedService && !choosingSize && !choosingShape && !choosingTier);
  const selectionCount = [selectedCategory, selectedService, selectedSize, selectedShape, selectedTier].filter(Boolean).length;
  const menuStep = choosingSize ? "size" : choosingShape ? "shape" : choosingTier ? "tier" : selectionComplete ? "complete" : selectedCategory ? "service" : "category";
  const selectionTotal = (selectedService?.basePrice ?? 0) + (selectedTier?.additionalPrice ?? 0);
  const estimatedDurationMinutes = (selectedService?.baseDurationMinutes ?? 0) + (selectedTier?.additionalDurationMinutes ?? 0);

  useEffect(() => {
    if (!selectionComplete) return;

    const timer = window.setTimeout(() => setShowCart(true), 850);
    return () => window.clearTimeout(timer);
  }, [selectionComplete]);

  const goBack = () => {
    setShowCart(false);
    setCheckoutError(null);
    if (selectionComplete) {
      if (selectedTier) setSelectedTier(null);
      else if (needsShape) setSelectedShape(null);
      else if (needsSize) setSelectedSize(null);
      else setSelectedService(null);
      return;
    }
    if (choosingShape) {
      if (needsSize) setSelectedSize(null);
      else setSelectedService(null);
      return;
    }
    if (choosingTier) {
      if (needsShape) setSelectedShape(null);
      else if (needsSize) setSelectedSize(null);
      else setSelectedService(null);
      return;
    }
    if (choosingSize) {
      setSelectedService(null);
      return;
    }
    setSelectedCategory(null);
  };

  const editSelection = (step: "category" | "service" | "size" | "shape" | "tier") => {
    setShowCart(false);
    setCheckoutError(null);

    if (step === "category") {
      setSelectedCategory(null);
      setSelectedService(null);
      setSelectedSize(null);
      setSelectedShape(null);
      return;
    }
    if (step === "service") {
      setSelectedService(null);
      setSelectedSize(null);
      setSelectedShape(null);
      return;
    }
    if (step === "size") {
      setSelectedSize(null);
      setSelectedShape(null);
      return;
    }
    if (step === "shape") {
      setSelectedShape(null);
      return;
    }
    setSelectedTier(null);
  };

  const handleReferencePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setReferencePhoto(null);
      setReferencePhotoError(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setReferencePhoto(null);
      setReferencePhotoError("Reference photos must be 5 MB or smaller.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const [, base64] = String(reader.result).split(",", 2);
      setReferencePhoto({ name: file.name, base64, contentType: file.type || "application/octet-stream" });
      setReferencePhotoError(null);
    };
    reader.readAsDataURL(file);
  };

  const formatDuration = (minutes: number) => minutes < 60 ? `${minutes} min` : `${Math.floor(minutes / 60)}h${minutes % 60 ? ` ${minutes % 60}m` : ""}`;
  const beginCheckout = async () => {
    if (!selectedCategory || !selectedService || isCheckingOut) return;

    if (!selectedSlot || !client.firstName.trim() || !client.lastName.trim() || !client.email.trim() || !client.phoneNumber.trim()) {
      setCheckoutError("Please select an available appointment time and provide your contact details.");
      return;
    }

    setCheckoutError(null);
    setIsCheckingOut(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startsAt: slotStartsAt(selectedSlot),
          client: {
            firstName: client.firstName.trim(),
            lastName: client.lastName.trim(),
            email: client.email.trim(),
            phoneNumber: client.phoneNumber.trim(),
          },
          categoryId: selectedCategory.id,
          serviceId: selectedService.id,
          sizeId: selectedSize?.id ?? null,
          shapeId: selectedShape?.id ?? null,
          tierId: selectedTier?.id ?? null,
          removalId: null,
          requests: requests.trim() || null,
          referralName: referralName.trim() || null,
          referencePhoto: referencePhoto ? { url: null, base64: referencePhoto.base64, contentType: referencePhoto.contentType } : null,
        }),
      });
      const checkout = await response.json() as CheckoutResponse;

      if (!response.ok) {
        throw new Error(checkout.message ?? "Unable to start checkout.");
      }
      if (!checkout.checkoutUrl) {
        throw new Error("Checkout did not return a payment link.");
      }

      window.location.assign(checkout.checkoutUrl);
    } catch (checkoutRequestError) {
      console.error("Failed to start checkout:", checkoutRequestError);
      setCheckoutError(checkoutRequestError instanceof Error ? checkoutRequestError.message : "Unable to start checkout.");
      setIsCheckingOut(false);
    }
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
      <div className={styles.menuHighlights}>{menuHighlights.map(([title, description]) => {
        const images = galleryImagesByTitle[title];
        return <article className={styles.menuItem} key={title}>
          <div className={styles.menuCopy}>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          <div className={styles.menuVisual}>
            {images ? <GalleryCarousel id={title === "Gel-X" ? "gallery" : undefined} images={images}/> : <i className={styles.menuPlaceholder} aria-hidden="true"/>}
          </div>
        </article>;
      })}</div>
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
          {choosingTier && <>
            <button className={styles.back} type="button" onClick={goBack}>Back to shape</button>
            {[...(options?.tiers ?? [])].sort((a, b) => a.displayOrder - b.displayOrder).map((tier) => <button className={styles.service} key={tier.id} type="button" onClick={() => chooseTier(tier)}>
              <strong>{getTierLabel(tier)}</strong><small>{tier.description ?? "Choose this design tier."}</small><b className={styles.price}>+${tier.additionalPrice}</b>
            </button>)}
          </>}
          {selectionComplete && <div className={styles.selectionSummary} aria-hidden="true" />}
        </div>
      </>}
    </div>}
    {expanded && selectedCategory && <aside className={`${styles.selectionTrail} ${showCart ? styles.selectionComplete : selectionComplete ? styles.selectionLeaving : ""}`} aria-label="Current selection">
      {showCart && <button className={styles.summaryBack} type="button" onClick={goBack}>← Back</button>}
      <div className={styles.selectionHeading}>
        <p>{showCart ? "Summary" : "Your selection"}</p>
        {showCart && <span className={styles.itemCount}>{selectionCount} {selectionCount === 1 ? "item" : "items"}</span>}
      </div>
      <ol>
        <li><button type="button" onClick={() => editSelection("category")}><span>Category</span><strong>{selectedCategory.name}</strong></button></li>
        {selectedService && <li><button type="button" onClick={() => editSelection("service")}><span>Service</span><strong>{selectedService.name}</strong></button></li>}
        {selectedSize && <li><button type="button" onClick={() => editSelection("size")}><span>Length</span><strong>{selectedSize.name}</strong></button></li>}
        {selectedShape && <li><button type="button" onClick={() => editSelection("shape")}><span>Shape</span><strong>{selectedShape.name}</strong></button></li>}
        {selectedTier && <li><button type="button" onClick={() => editSelection("tier")}><span>Tier</span><strong>{getTierLabel(selectedTier)}</strong></button></li>}
      </ol>
      {showCart && <div className={styles.cartActions}>
        <div className={styles.selectionMeta}>
          <p className={styles.selectionTotal}><span>Starting at</span><strong>${selectionTotal}</strong></p>
          <p className={styles.selectionDuration}><span>Estimated duration</span><strong>{formatDuration(estimatedDurationMinutes)}</strong></p>
        </div>
        <label className={styles.requestField}>
          <span>Appointment date</span>
          <input type="date" value={appointmentDate} onChange={(event) => setAppointmentDate(event.target.value)} required/>
        </label>
        {appointmentDate && <div className={styles.slotPicker}>
          <span>Available times</span>
          {isLoadingSlots && <p>Loading available times…</p>}
          {slotError && <p className={styles.checkoutError} role="alert">{slotError}</p>}
          {!isLoadingSlots && !slotError && availableSlots.length === 0 && <p>No appointment times are available on this date.</p>}
          {!isLoadingSlots && availableSlots.length > 0 && <div className={styles.slotList}>
            {availableSlots.map((slot) => <button className={styles.slotButton} key={slot.id} type="button"
              aria-pressed={selectedSlot?.id === slot.id} onClick={() => { setSelectedSlot(slot); setCheckoutError(null); }}>
              {formatSlotTime(slot.startTime)}
            </button>)}
          </div>}
        </div>}
        <div className={styles.clientFields}>
          <label className={styles.requestField}>
            <span>First name</span>
            <input type="text" value={client.firstName} onChange={(event) => setClient((current) => ({ ...current, firstName: event.target.value }))} autoComplete="given-name" required/>
          </label>
          <label className={styles.requestField}>
            <span>Last name</span>
            <input type="text" value={client.lastName} onChange={(event) => setClient((current) => ({ ...current, lastName: event.target.value }))} autoComplete="family-name" required/>
          </label>
        </div>
        <div className={styles.clientFields}>
          <label className={styles.requestField}>
            <span>Email</span>
            <input type="email" value={client.email} onChange={(event) => setClient((current) => ({ ...current, email: event.target.value }))} autoComplete="email" required/>
          </label>
          <label className={styles.requestField}>
            <span>Phone number</span>
            <input type="tel" value={client.phoneNumber} onChange={(event) => setClient((current) => ({ ...current, phoneNumber: event.target.value }))} autoComplete="tel" required/>
          </label>
        </div>
        <label className={styles.requestField}>
          <span>Requests or comments</span>
          <textarea value={requests} onChange={(event) => setRequests(event.target.value)} placeholder="Add any notes for your appointment" rows={3}/>
        </label>
        <label className={styles.requestField}>
          <span>Referred by</span>
          <input type="text" value={referralName} onChange={(event) => setReferralName(event.target.value)} placeholder="Name of the person who referred you"/>
        </label>
        <label className={styles.referencePhoto}>
          <span>Reference photo</span>
          <input type="file" accept="image/*" onChange={handleReferencePhoto}/>
          <b>{referencePhoto ? referencePhoto.name : "Add photo"}</b>
        </label>
        {referencePhotoError && <p className={styles.checkoutError} role="alert">{referencePhotoError}</p>}
        <div className={styles.checkoutActions}>
          <button type="button" onClick={beginCheckout} disabled={isCheckingOut}>{isCheckingOut ? "Redirecting…" : "Continue to secure checkout"}</button>
        </div>
      </div>}
      {checkoutError && <p className={styles.checkoutError} role="alert">{checkoutError}</p>}
    </aside>}
    {expanded && <p className={styles.helper}>{choosingSize ? usesExistingLength ? "Keep your current length or shorten it." : "Select a nail length." : choosingShape ? "Select a nail shape." : choosingTier ? "Select a design tier." : selectionComplete ? "Your service is selected." : selectedCategory ? "Choose a service to continue." : "Choose a service category to see its options."}</p>}
  </section>;
}
