import Image from "next/image";
import Link from "next/link";
import TopMenuBar from "./components/TopMenuBar";
import styles from "./page.module.css";

import kai from "../public/k1awsProfileFinal.png";
import setOne from "../public/WhatsApp Image 2026-08-18 at 11.40.33 AM.jpeg";
import setTwo from "../public/WhatsApp Image 2026-08-18 at 11.40.46 AM.jpeg";
import setThree from "../public/WhatsApp Image 2026-08-18 at 11.41.18 AM.jpeg";

const policies = [
  ["01", "Deposit", "$10 is required to secure your appointment. Your confirmation will arrive by email."],
  ["02", "Running late?", "There is a 15-minute grace period. After that, the appointment will need to be cancelled."],
  ["03", "Payment", "The remaining balance is due at your appointment. Please come prepared to pay for your set."],
];

export default function Home() {
  return (
    <main className={styles.page}>
      <TopMenuBar />

      <section className={styles.hero} id="home">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Orlando, Florida · Est. 2020</p>
          <h1>
            Nails made to be<br />
            <em>noticed.</em>
          </h1>
          <p className={styles.intro}>
            Custom sets, quiet luxury, and a little sparkle—made with care by Kailen.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href="/booking">Book your set <span>↗</span></Link>
            <a className={styles.textLink} href="#gallery">See the work <span>↓</span></a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.orbit} />
          <div className={styles.profileFrame}>
            <Image src={kai} alt="Kailen, nail artist behind K1aws" priority sizes="(max-width: 700px) 70vw, 380px" />
          </div>
          <p className={styles.scriptNote}>cute sets, always</p>
          <div className={styles.floatingStamp}>K1<br />AWS</div>
        </div>
      </section>

      <section className={styles.marquee} aria-label="Services">
        <div>Gel X <i>✦</i> Hard Gel <i>✦</i> Gel Polish <i>✦</i> Soft Gel <i>✦</i> Nail Art <i>✦</i> Gel X <i>✦</i> Hard Gel <i>✦</i></div>
      </section>

      <section className={styles.about} id="about">
        <p className={styles.sectionLabel}>A little about me</p>
        <div className={styles.aboutGrid}>
          <h2>Pretty nails should feel like <em>you.</em></h2>
          <div>
            <p>I&apos;m Kailen, a student at the University of Central Florida and a nail artist with six years of experience. I love creating cute, quality sets while keeping things approachable and affordable.</p>
            <p>Bring your saved inspo—or let&apos;s dream up something together.</p>
            <a className={styles.textLink} href="#policies">Before you book <span>↓</span></a>
          </div>
        </div>
      </section>

      <section className={styles.gallerySection} id="gallery">
        <div className={styles.sectionHeading}>
          <div><p className={styles.sectionLabel}>Recent sets</p><h2>The <em>details</em> do it.</h2></div>
          <Link href="/booking" className={styles.underlinedLink}>Bring me your inspo ↗</Link>
        </div>
        <div className={styles.gallery}>
          <figure className={styles.galleryTall}><Image src={setOne} alt="Detailed nail art set" sizes="(max-width: 700px) 100vw, 33vw" /><figcaption>01 / made for the close-up</figcaption></figure>
          <figure className={styles.galleryOffset}><Image src={setTwo} alt="Custom manicure" sizes="(max-width: 700px) 100vw, 33vw" /><figcaption>02 / a little bit extra</figcaption></figure>
          <figure className={styles.galleryTall}><Image src={setThree} alt="Glossy nail design" sizes="(max-width: 700px) 100vw, 33vw" /><figcaption>03 / your new favorite set</figcaption></figure>
        </div>
      </section>

      <section className={styles.bookingBanner} id="services">
        <p className={styles.sectionLabel}>Your appointment</p>
        <h2>Come for the set.<br /><em>Stay for the feeling.</em></h2>
        <Link className={styles.lightButton} href="/booking">View availability <span>↗</span></Link>
      </section>

      <section className={styles.policies} id="policies">
        <div className={styles.sectionHeading}><div><p className={styles.sectionLabel}>The fine print</p><h2>Good to <em>know.</em></h2></div><p className={styles.policyIntro}>A few simple things that help every appointment run smoothly.</p></div>
        <div className={styles.policyGrid}>
          {policies.map(([number, title, description]) => <article className={styles.policyCard} key={title}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}
        </div>
      </section>

      <footer className={styles.footer} id="contact">
        <p className={styles.sectionLabel}>Let&apos;s make something cute</p>
        <h2>Ready when <em>you are.</em></h2>
        <Link className={styles.primaryButton} href="/booking">Book with Kai <span>↗</span></Link>
        <div className={styles.footerBottom}><span>© 2026 K1aws by Kai</span><a href="#home">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
