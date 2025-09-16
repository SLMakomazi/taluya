import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Music.module.css';

gsap.registerPlugin(ScrollTrigger);

const Music = () => {
  const [activeMix, setActiveMix] = useState(0);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  // Sample mixes data - replace with actual data from your backend
  const mixes = [
    {
      id: 1,
      title: 'Cosmic Journey',
      platform: 'SoundCloud',
      url: 'https://soundcloud.com/...',
      cover: '/images/mix-cover-1.jpg',
      date: 'September 2023'
    },
    {
      id: 2,
      title: 'Midnight Grooves',
      platform: 'Mixcloud',
      url: 'https://www.mixcloud.com/...',
      cover: '/images/mix-cover-2.jpg',
      date: 'July 2023'
    },
    {
      id: 3,
      title: 'Sunrise Sessions',
      platform: 'HearThis',
      url: 'https://hearthis.at/...',
      cover: '/images/mix-cover-3.jpg',
      date: 'May 2023'
    }
  ];

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

  const nextMix = () => {
    setActiveMix((prev) => (prev + 1) % mixes.length);
  };

  const prevMix = () => {
    setActiveMix((prev) => (prev - 1 + mixes.length) % mixes.length);
  };

  return (
    <section id="music" className={styles.music} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title} ref={titleRef}>
          Latest Mixes
        </h2>
        
        <div className={styles.content} ref={contentRef}>
          <div className={styles.mixPlayer}>
            <div className={styles.mixCover}>
              <div className={styles.coverImage}>
                <div className={styles.placeholderCover}></div>
              </div>
              <div className={styles.mixInfo}>
                <h3 className={styles.mixTitle}>{mixes[activeMix].title}</h3>
                <p className={styles.mixPlatform}>{mixes[activeMix].platform}</p>
                <p className={styles.mixDate}>{mixes[activeMix].date}</p>
              </div>
            </div>
            
            <div className={styles.audioControls}>
              <button className={styles.controlButton} onClick={prevMix}>
                <span className={styles.arrowLeft}></span>
              </button>
              
              <div className={styles.playButton}>
                <div className={styles.playIcon}></div>
              </div>
              
              <button className={styles.controlButton} onClick={nextMix}>
                <span className={styles.arrowRight}></span>
              </button>
            </div>
            
            <a 
              href={mixes[activeMix].url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.platformButton}
            >
              Listen on {mixes[activeMix].platform}
            </a>
          </div>
          
          <div className={styles.mixList}>
            <h4 className={styles.moreMixesTitle}>More Mixes</h4>
            <div className={styles.mixThumbnails}>
              {mixes.map((mix, index) => (
                <div 
                  key={mix.id} 
                  className={`${styles.mixThumbnail} ${index === activeMix ? styles.active : ''}`}
                  onClick={() => setActiveMix(index)}
                >
                  <div className={styles.thumbnailImage}></div>
                  <div className={styles.thumbnailInfo}>
                    <span className={styles.thumbnailTitle}>{mix.title}</span>
                    <span className={styles.thumbnailDate}>{mix.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Music;
