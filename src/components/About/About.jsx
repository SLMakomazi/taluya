import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Animation for about section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      contentRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
    ).fromTo(
      imageRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );
  }, []);

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.content} ref={contentRef}>
          <h2 className={styles.title}>About Ta Luya</h2>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <h3>2020</h3>
              <p>Started producing electronic music</p>
            </div>
            <div className={styles.timelineItem}>
              <h3>2022</h3>
              <p>First major performance at Origins Nightclub</p>
            </div>
            <div className={styles.timelineItem}>
              <h3>2023</h3>
              <p>Released debut EP "Cosmic Echoes"</p>
            </div>
          </div>
          <p className={styles.bio}>
            Ta Luya is an electronic music producer and DJ based in Cape Town, South Africa. 
            With a unique blend of deep house, techno, and afro-house influences, Ta Luya creates 
            immersive soundscapes that take listeners on a journey through rhythm and melody.
          </p>
        </div>
        <div className={styles.imageContainer} ref={imageRef}>
          <div className={styles.imageWrapper}>
            {/* Replace with actual image path */}
            <div className={styles.placeholderImage}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
