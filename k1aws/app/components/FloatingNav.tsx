"use client";

import { useEffect, useState } from "react";
import styles from "./FloatingNav.module.css";

export default function FloatingNav() {
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;
      setVisible(currentScrollY < 10 || isScrollingUp);
      setHasScrolled(currentScrollY > 10 && isScrollingUp);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);
  const openBooking = () => {
    window.dispatchEvent(new Event("k1aws:open-booking"));
    closeMenu();
  };

  return (
    <>
      <header className={`${styles.header} ${visible || open ? styles.visible : styles.hidden} ${hasScrolled ? styles.scrolled : ""}`}>
        <a href="#home" className={styles.wordmark} onClick={closeMenu}>K1AWS<span>BY KAI</span></a>
        <button className={styles.menuButton} type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="site-menu">
          <span>{open ? "Close" : "Menu"}</span><i aria-hidden="true" />
        </button>
      </header>
      <aside className={`${styles.menu} ${open ? styles.open : ""}`} id="site-menu" aria-hidden={!open}>
        <nav aria-label="Site menu">
          <a href="#home" onClick={closeMenu}>Home</a><a href="#collections" onClick={closeMenu}>Collections</a><a href="#about" onClick={closeMenu}>About Me</a><a href="#services" onClick={closeMenu}>Services</a><a href="#services" onClick={openBooking}>Book now</a>
        </nav>
        <div className={styles.menuFooter}><span>ORLANDO, FL</span><a href="https://www.instagram.com/kailenks/"><span>INSTAGRAM</span></a><span>© 2026 K1AWS</span></div>
        <strong aria-hidden="true">K1AWS</strong>
      </aside>
    </>
  );
}
