import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import heroImages from '../../data/heroImages.json';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToNextSection = () => {
    const heroSection = document.getElementById('hero');
    const nextSection = heroSection.nextElementSibling;
    
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If there's no next section, scroll to the top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Animation for hero section
    gsap.fromTo(
      [titleRef.current, subtitleRef.current],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      }
    );

    // Button animations
    gsap.fromTo(
      [ctaRef.current, ctaRef.current?.nextSibling],
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.6,
        ease: 'back.out(1.7)',
      }
    );

    // Scroll indicator animation
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'sine.inOut'
      });
    }
  }, []);

  return (
    <section id="hero" className={styles.hero} ref={heroRef}>
      <div className={styles.imageCollage}>
        {heroImages.images.slice(0, 28).map((image, index) => (
          <div key={index} className={styles.collageItem} style={{
            aspectRatio: '1/1',
            gridColumn: (index % 7) + 1,
            gridRow: Math.floor(index / 7) + 1
          }}>
            <img 
              src={image} 
              alt="" 
              loading="lazy"
              className={styles.collageImage}
            />
          </div>
        ))}
      </div>
      <div className={styles.videoOverlay}></div>
      <div className={styles.heroContent}>
        <h1 ref={titleRef} className={styles.title}>
          TA LUYA
        </h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          Deep House & Soulful DJ/Artist
        </p>
        <div className={styles.buttonsWrapper}>
          <div className={styles.buttonGroup}>
            <button 
              ref={ctaRef} 
              className={styles.ctaButton}
              onClick={() => scrollToSection('music')}
            >
              Listen Now
            </button>
            <Link to="/bookings" className={styles.secondaryButton}>
              Book Now
            </Link>
          </div>
          <div 
            ref={scrollIndicatorRef} 
            className={styles.scrollIndicator} 
            onClick={scrollToNextSection}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToNextSection();
              }
            }}
            aria-label="Scroll to next section"
          >
            <span>Scroll Down</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
