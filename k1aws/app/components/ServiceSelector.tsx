"use client";

import { useState } from "react";
import styles from "./ServiceSelector.module.css";

const services = [
  ["01", "Gel X", "Lightweight extensions, shaped for you."],
  ["02", "Hard gel", "Strength and polish for natural nails."],
  ["03", "Custom art", "Details worth a closer look."],
];

export default function ServiceSelector() {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return <section className={`${styles.experience} ${expanded ? styles.expanded : ""}`} aria-label="The essentials">
    <button className={styles.close} type="button" onClick={() => setExpanded(false)} aria-label="Close essentials">Close <span>×</span></button>
    <div className={styles.title}><p>APPOINTMENT MENU</p><h2>THE<br />ESSENTIALS.</h2></div>
    <div className={styles.options}>
      {services.map(([number, name, description]) => <button className={selected === name ? styles.selected : ""} key={name} type="button" onClick={() => expanded ? setSelected(name) : setExpanded(true)}>
        <span>{number}</span><strong>{name}</strong><small>{description}</small><b>↗</b>
      </button>)}
    </div>
    {expanded && <p className={styles.helper}>{selected ? `${selected} selected` : "Choose the service that feels most like you."}</p>}
  </section>;
}
