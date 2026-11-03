import Image from "next/image";
import FloatingNav from "./components/FloatingNav";
import ServiceSelector from "./components/ServiceSelector";
import styles from "./page.module.css";

import kailenPfp from "../public/kailenPfp.png";

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

        <section className={styles.finish} id="studio">
            <div className={styles.finishServices} id="services"><ServiceSelector/></div>
        </section>

        <footer><span>K1AWS BY KAI — ORLANDO, FL</span><a href="#home">BACK TO TOP ↑</a><span>© 2026</span></footer>
    </main>;
}
