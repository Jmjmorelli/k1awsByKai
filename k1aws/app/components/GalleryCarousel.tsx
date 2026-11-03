"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./GalleryCarousel.module.css";

export type GalleryImage = {
  src: string;
  alt: string;
};

type GalleryCarouselProps = {
  className?: string;
  id?: string;
  images: GalleryImage[];
};

export default function GalleryCarousel({ className, id, images }: GalleryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const activeImage = images[activeIndex];

  const showPrevious = () => setActiveIndex((index) => (index - 1 + images.length) % images.length);
  const showNext = () => setActiveIndex((index) => (index + 1) % images.length);

  useEffect(() => {
    if (!isFullscreen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFullscreen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isFullscreen]);

  return (
    <div className={`${styles.carousel} ${className ?? ""}`} id={id} aria-roledescription="carousel" aria-label="K1aws nail gallery">
        <button className={styles.imageWrap} type="button" onClick={() => setIsFullscreen(true)} aria-label={`View ${activeImage.alt} full size`}>
          <Image
            key={activeImage.src}
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            sizes="(max-width: 700px) 100vw, 84vw"
            quality={100}
            priority={activeIndex === 0}
          />
        </button>
        {images.length > 1 && <>
          <button className={`${styles.control} ${styles.previous}`} type="button" onClick={showPrevious} aria-label="Show previous gallery image">
            <span aria-hidden="true">&lt;</span>
          </button>
          <button className={`${styles.control} ${styles.next}`} type="button" onClick={showNext} aria-label="Show next gallery image">
            <span aria-hidden="true">&gt;</span>
          </button>
          <div className={styles.dots} role="tablist" aria-label="Gallery images">
            {images.map((image, index) => (
              <button
                className={index === activeIndex ? styles.activeDot : ""}
                key={image.src}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show image ${index + 1}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </>}
      {isFullscreen && createPortal(<div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Expanded nail gallery">
        <button className={styles.close} type="button" onClick={() => setIsFullscreen(false)} aria-label="Close full screen gallery">×</button>
        <div className={styles.fullImageWrap}>
          <Image key={activeImage.src} src={activeImage.src} alt={activeImage.alt} fill sizes="100vw" quality={100}/>
        </div>
        {images.length > 1 && <>
          <button className={`${styles.control} ${styles.previous} ${styles.lightboxControl}`} type="button" onClick={showPrevious} aria-label="Show previous gallery image"><span aria-hidden="true">&lt;</span></button>
          <button className={`${styles.control} ${styles.next} ${styles.lightboxControl}`} type="button" onClick={showNext} aria-label="Show next gallery image"><span aria-hidden="true">&gt;</span></button>
          <p className={styles.counter}>{activeIndex + 1} / {images.length}</p>
        </>}
      </div>, document.body)}
    </div>
  );
}
