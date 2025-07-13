"use client";

import styles from "./heroHomepage.module.css";
import Image from "next/image";
import logo from "@assets/images/logo-home-hero.svg";
import { useEffect, useRef } from "react";

export default function HeroHomepage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = document.querySelector("video");
    const logo1 = document.querySelector(`.${styles.logo1basic}`);
    const logo2 = document.querySelector(`.${styles.logo2basic}`);

    if (!video || !logo1 || !logo2) return;

    const resetAnimations = () => {
      logo1.classList.remove(styles.logo1basic);
      logo2.classList.remove(styles.logo2basic);

      void (logo1 as HTMLElement).offsetWidth;
      void (logo2 as HTMLElement).offsetWidth;

      logo1.classList.add(styles.logo1basic);
      logo2.classList.add(styles.logo2basic);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        video.currentTime = 0;
        video.play().catch(() => {});
        resetAnimations();
      }
    };

    video.addEventListener("play", resetAnimations);

    video.addEventListener("ended", () => {
      video.currentTime = 0;
      video.play().catch(() => {});
      resetAnimations();
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      video.removeEventListener("play", resetAnimations);
      video.removeEventListener("ended", resetAnimations);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section ref={heroRef} className={`${styles.hero} sectionWithMargin`}>
      <video
        src="https://developedbybart.pl/_MEDIA_FOR_SITES/videos/HC_WROCLAW_hero-homepage.mp4"
        className={styles.backgroundVideo}
        autoPlay
        muted
        playsInline
      />
      <div className={styles.logosContainer}>
        <div className={styles.logosVerticalColumn}>
          <div className={styles.logo1basicParent}>
            <Image
              src={logo}
              alt="Logo 1"
              className={styles.logo1basic}
              fill
              sizes="33vw"
              priority
              loading="eager"
            />
          </div>
          <div className={styles.logo2basicParent}>
            <h1 className={styles.logo2basic}>dum pugnas victor es</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
