import Image from "next/image";
import Link from "next/link";
import FloatingNav from "./components/FloatingNav";
import GalleryCarousel, { type GalleryImage } from "./components/GalleryCarousel";
import ParallaxText from "./components/ParallaxText";
import ServiceSelector from "./components/ServiceSelector";
import styles from "./page.module.css";

import kailenPfp from "../public/kailenPfp.png";

const collections: { title: string; description: string; images: GalleryImage[] }[] = [
    {
        title: "THE KLASSIC",
        description: "Frenchies, polish-only designs, or 3D on 1 nail per hand",
        images: [
            { src: "/Gel-X/gelX1.png", alt: "Klassic Gel-X nail set" },
            { src: "/Gel-X/gelX2.jpeg", alt: "Klassic Gel-X nail set" },
        ],
    },
    {
        title: "THE KUSTOM",
        description: "3D on 2-3 nails per hand, polish designs, and charms",
        images: [
            { src: "/Gel Overlay/gelOverlay1.png", alt: "Kustom gel overlay nail set" },
        ],
    },
    {
        title: "THE KHROME",
        description: "3D on 4-5 nails per hand, polish designs, and charms",
        images: [
            { src: "/kiaras.JPG", alt: "Khrome nail set" },
            { src: "/amerrican.JPG", alt: "Khrome nail set" },
        ],
    },
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
            <h1> Keep Kalm &<br/>Book with K1aws</h1>
            <p className={styles.heroDescriptor}>Instagram</p>
        </section>

        <section className={styles.about} id="about">
            <div className={styles.aboutCopy}><span>"Don't pick a boring design"</span></div>
            <div className={styles.aboutImage}><Image src={kailenPfp} alt="Kailen, founder of K1aws by Kai"
                                                       sizes="(max-width: 100px) 50vw, 50vw" quality={100}/></div>
        </section>

        <section className={styles.collections} id="collections">
            <div className={styles.titleRow}><ParallaxText className={styles.parallaxTitle}><h2>COLLECTIONS</h2>
            </ParallaxText><p><br/>.</p></div>
            <div className={styles.collectionGrid}>{collections.map(({ title, description, images }) => <article
                className={styles.collection} key={title}>
                <div className={styles.collectionVisual}><GalleryCarousel images={images}/></div>
                <h3>{title}</h3><p>{description}</p><Link href="/booking">Explore <b></b></Link></article>)}</div>
        </section>

        <section className={styles.finish} id="studio">
            <div className={styles.finishServices} id="services"><ServiceSelector/></div>
        </section>

        <footer><span>K1AWS BY KAI — ORLANDO, FL</span><a href="#home">BACK TO TOP ↑</a><span>© 2026</span></footer>
    </main>;
}
