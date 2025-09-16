import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Animation for hero section
    gsap.fromTo(
      [titleRef.current, subtitleRef.current, ctaRef.current],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      }
    );
  }, []);

  return (
    <section id="hero" className={styles.hero} ref={heroRef}>
      <div className={styles.videoOverlay}></div>
      <div className={styles.heroContent}>
        <h1 ref={titleRef} className={styles.title}>
          TA LUYA
        </h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          Electronic Music Producer & DJ
        </p>
        <button ref={ctaRef} className={styles.ctaButton}>
          Listen Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
