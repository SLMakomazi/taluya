import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Music.module.css';

gsap.registerPlugin(ScrollTrigger);

const Music = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  // Single mix data
  const currentMix = {
    title: 'Cosmic Journey',
    embedUrl: 'https://app.hearthis.at/luniko-ta-luya-mkontwana/embed/?hcolor=ff1491&skin=black&t=1'
  };

  useEffect(() => {
    // Animation for music section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    ).fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    );
  }, []);

  return (
    <section id="music" className={styles.music} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title} ref={titleRef}>
          Latest Mix
        </h2>
        
        <div className={styles.content} ref={contentRef}>
          <div className={styles.playerContainer}>
            <div className={styles.iframeContainer}>
              <iframe 
                scrolling="no" 
                id="hearthis_at_user_luniko-ta-luya-mkontwana" 
                width="100%" 
                height="500" 
                src={currentMix.embedUrl}
                frameBorder="0" 
                allowTransparency
                title={`${currentMix.title} Player`}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Music;
