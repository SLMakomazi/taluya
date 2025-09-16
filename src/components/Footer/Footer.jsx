import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Footer.module.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Animation for footer
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={styles.container} ref={contentRef}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <h2>TA LUYA</h2>
            <p>Electronic Music Producer & DJ</p>
          </div>
          
          <div className={styles.footerLinks}>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#music">Music</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className={styles.footerContact}>
            <h3>Contact Info</h3>
            <p>Email: booking@taluya.com</p>
            <p>Phone: +27 12 345 6789</p>
            <p>Cape Town, South Africa</p>
          </div>
          
          <div className={styles.footerSocial}>
            <h3>Follow Me</h3>
            <div className={styles.socialIcons}>
              <a href="https://soundcloud.com/taluya" target="_blank" rel="noopener noreferrer" aria-label="SoundCloud">
                <i className="fab fa-soundcloud"></i>
              </a>
              <a href="https://mixcloud.com/taluya" target="_blank" rel="noopener noreferrer" aria-label="Mixcloud">
                <i className="fab fa-mixcloud"></i>
              </a>
              <a href="https://instagram.com/taluya" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com/taluya" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://open.spotify.com/artist/taluya" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                <i className="fab fa-spotify"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} Ta Luya. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <a href="/privacy">Privacy Policy</a>
            <span>|</span>
            <a href="/terms">Terms of Service</a>
          </div>
          <button 
            className={styles.backToTop} 
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
