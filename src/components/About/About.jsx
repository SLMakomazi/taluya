import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';
const taLuyaImage = '/heroImages/487460468_4113766728951079_631340646104197273_n.jpg';

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
          <h2 className={styles.title}>About Ta-Luya</h2>
          <p className={styles.bio}>
            Luyanda Mkontwana, known by many as Ta-Luya, is a versatile Deep House DJ from Khayamandi, Stellenbosch. 
            With sets that range from dark, mysterious beats to electrifying vocals and groovy rhythms, 
            Ta-Luya connects deeply with audiences. His mixing style is both intuitive and creative, 
            bringing passion and energy to every performance.
          </p>

          <div className={styles.twoColumnLayout}>
            <div className={styles.experienceSection}>
              <h3 className={styles.sectionTitle}>As a seasoned DJ:</h3>
              <ul className={styles.experienceList}>
                <li>Sharing stages with well-known artists</li>
                <li>Tailoring experiences for individuals, organizations, and events</li>
                <li>Curating memorable nights for parties, corporate events, weddings, and nightclubs</li>
              </ul>

              <h3 className={styles.sectionTitle}>Ta-Luya's strength lies in:</h3>
              <ul className={styles.strengthsList}>
                <li>Versatility, adapting to diverse tastes and settings</li>
                <li>Compromise, ensuring universal enjoyment</li>
                <li>Creating unforgettable memories through music</li>
              </ul>
            </div>

            <div className={styles.imageContainer} ref={imageRef}>
              <div className={styles.imageWrapper}>
                <img 
                  src={taLuyaImage} 
                  alt="Ta-Luya performing live" 
                  className={styles.aboutImage}
                />
              </div>
            </div>
          </div>

          
          
          <div className={styles.sectionBreak}></div>
          <div className={styles.contentSection}>
            <div className={styles.columnsContainer}>
              <div className={styles.column}>
                <h3 className={styles.detailsTitle}>DISCOGRAPHY</h3>
                <ul className={styles.detailsList}>
                  <li>Ignition Podcast:<span className={styles.highlightText}> Ta-Luya</span></li>
                  <li>Just House Music Podcast:<span className={styles.highlightText}> Nick SA</span></li>
                  <li>Groove Linguistics Bongani:<span className={styles.highlightText}> Infinix</span></li>
                  <li>Bush Radio 89.5:<span className={styles.highlightText}> Everyday People</span></li>
                  <li>Good Hope FM:<span className={styles.highlightText}> The Godfathers House with Dino Michael</span></li>
                  <li className={styles.noBullet}>& many more</li>
                </ul>
              </div>
              
              <div className={styles.column}>
                <h3 className={styles.detailsTitle}>VENUES</h3>
                <ul className={styles.detailsList}>
                  <li>Stellenbosch<span className={styles.highlightText}> – Cubanna, Corridor, Kay Vibes Lounge</span></li>
                  <li>Khayelitsha<span className={styles.highlightText}> – Spine Road, Paris Lifestyle, Rands Cape Town</span></li>
                  <li>Kraaifontein<span className={styles.highlightText}> – 1st Class Events, Monday Vibe Dealers</span></li>
                  <li>Paarl<span className={styles.highlightText}> – Chippas Place</span></li>
                  <li className={styles.noBullet}>& many more</li>
                </ul>
              </div>
              
              <div className={styles.column}>
                <h3 className={styles.detailsTitle}>RESIDENCY</h3>
                <ul className={styles.detailsList}>
                  <li>Spineroad Lifestyle<span className={styles.highlightText}> – Saturdays</span></li>
                  <li>1stClass Events<span className={styles.highlightText}> – Sundays</span></li>
                  <li>Kay Vibes Lounge<span className={styles.highlightText}> – Mondays</span></li>
                  <li>Cubanna<span className={styles.highlightText}> – Weekends</span></li>
                  <li>Empompeni<span className={styles.highlightText}> – Weekends</span></li>
                  <li>Corridor<span className={styles.highlightText}> – Weekends</span></li>
                  <li className={styles.noBullet}>& many more</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        
      </div>
    </section>
  );
};

export default About;
