import Image from "next/image";
import Link from "next/link";
import FloatingNav from "./components/FloatingNav";
import ParallaxText from "./components/ParallaxText";
import ServiceSelector from "./components/ServiceSelector";
import styles from "./page.module.css";

import mark from "../public/K1AWS.png";

const collections = [
    ["/", "THE KLASSIC", "Clean color. Perfect shape. No notes."],
    ["//", "THE KUSTOM", "Light-catching finishes in any shade."],
    ["///", "THE KHROME", "One-of-one details, made around you."],
];

export default function Home() {
    return <main className={styles.page}>
        <FloatingNav/>
        <section className={styles.hero} id="home">
            <div className={styles.heroObject}>
                <div/>
                {/*<Image src={kai} alt="Kailen, nail artist and founder of K1aws" priority*/}
                {/*       sizes="(max-width: 700px) 74vw, 36vw"/>*/}
            </div>
            <h1> Keep Kalm<br/>Book with K1aws</h1>
            <p className={styles.heroDescriptor}>Some nonsense here</p>
            <a className={styles.scrollLink} href="#collections">Explore collections <span></span></a>
        </section>

        <section className={styles.collections} id="collections">
            <div className={styles.titleRow}><ParallaxText className={styles.parallaxTitle}><h2>COLLECTIONS</h2>
            </ParallaxText><p><br/>.</p></div>
            <div className={styles.collectionGrid}>{collections.map(([number, title, description]) => <article
                className={styles.collection} key={title}>
                <div className={`${styles.collectionVisual} `}><span>{number}</span><i/>
                </div>
                <h3>{title}</h3><p>{description}</p><Link href="/booking">Explore <b></b></Link></article>)}</div>
        </section>

        <section className={styles.finish} id="studio">
            <div className={styles.finishCopy}><p className={styles.label}></p><ParallaxText
                className={styles.parallaxTitle}><h2>some inspirational<br/>text</h2></ParallaxText><p>A little bit about me... CHudington Supreme</p><Link href="/booking">Book
                an appointment <b></b></Link></div>
            <div className={styles.finishImage}><Image src={mark} alt="K1aws by Kai"
                                                       sizes="(max-width: 700px) 100vw, 50vw"/></div>
        </section>

        <div id="services"><ServiceSelector/></div>

        <footer><span>K1AWS BY KAI — ORLANDO, FL</span><a href="#home">BACK TO TOP ↑</a><span>© 2026</span></footer>
    </main>;
}
