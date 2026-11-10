import Image from "next/image";
import CollectionExploreButton from "./components/CollectionExploreButton";
import FloatingNav from "./components/FloatingNav";
import GalleryCarousel, { type GalleryImage } from "./components/GalleryCarousel";
import ParallaxText from "./components/ParallaxText";
import ServiceSelector from "./components/ServiceSelector";
import styles from "./page.module.css";

import kailenPfp from "../public/kailenPfp.png";

const collections: { title: string; description: string; images?: GalleryImage[]; tierName: string }[] = [
    {
        title: "THE KLASSIC",
        description: "Frenchies or 1 design per hand",
        tierName: "Tier 1",
    },
    {
        title: "THE KARMA",
        description: "3D on one finger with simple designs",
        tierName: "Tier 2",
        images: [
            { src: "/Gel-X/gelX1.png", alt: "Karma nail set" },
        ],
    },
    {
        title: "THE KHROME",
        description: "3D on 2-4 nails per hand, polish designs, chrome, or charms",
        tierName: "Tier 4",
        images: [
            { src: "/Gel-X/gelX2.jpeg", alt: "KHROME nail set" },
        ],
    },
    {
        title: "THE KUSTOM",
        description: "100% customized, different designs on every finger, 3D, chrome, and charms",
        tierName: "Tier 3",

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
            {/*<div className={styles.aboutCopy}><span>"Don't pick a boring design"</span></div>*/}
            <div className={styles.aboutCopy}><span>                        Welcome to K1aws! I’m Kailen and I’m a student at University of Central Florida and I’ve been
                        doing nails for about 6 years.
                        I love creating cute, quality sets while keeping my prices affordable
                        :)
</span></div>
            <div className={styles.aboutImage}><Image src={kailenPfp} alt="Kailen, founder of K1aws by Kai"
                                                       sizes="(max-width: 100px) 50vw, 50vw" quality={100}/></div>
        </section>

        <section className={styles.collections} id="collections">
            <div className={styles.titleRow}><ParallaxText className={styles.parallaxTitle}><h2>COLLECTIONS</h2>
            </ParallaxText><p><br/>.</p></div>
            <div className={styles.collectionGrid}>{collections.map(({ title, description, images, tierName }) => <article
                className={styles.collection} key={title}>
                <div className={styles.collectionVisual}>{images ? <GalleryCarousel images={images}/> : <i aria-hidden="true"/>}</div>
                <h3>{title}</h3><p>{description}</p><CollectionExploreButton className={styles.collectionExplore} tierName={tierName}/></article>)}</div>
        </section>

        <section className={styles.finish} id="studio">
            <div className={styles.finishServices} id="services"><ServiceSelector/></div>
        </section>

        <footer><span>K1AWS BY KAI — ORLANDO, FL</span><a href="#home">BACK TO TOP ↑</a><span>© 2026</span></footer>
    </main>;
}
