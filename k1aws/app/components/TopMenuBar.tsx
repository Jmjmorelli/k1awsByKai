import Link from "next/link";
import styles from "./TopMenuBar.module.css";

export default function TopMenuBar() {
  return (
    <header className={styles.header}>
      <a className={styles.brand} href="#home" aria-label="K1aws by Kai home">K1<span>A</span>WS <small>by Kai</small></a>
      <nav aria-label="Main navigation" className={styles.nav}>
        <a href="#about">About</a>
        <a href="#gallery">Gallery</a>
        <a href="#policies">Policies</a>
      </nav>
      <Link className={styles.bookLink} href="/booking">Book now <span></span></Link>
    </header>
  );
}
