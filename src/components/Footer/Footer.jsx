import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Footer.module.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Show/hide floating button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Animation for footer
  useEffect(() => {
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

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={styles.container} ref={contentRef}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <h2>TA LUYA</h2>
            <p>Music Artist & DJ</p>
          </div>
          
          <div className={styles.footerLinks}>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/#about">About</a></li>
              <li><a href="/#music">Music</a></li>
              <li><a href="/#events">Events</a></li>
              <li><a href="/#gallery">Gallery</a></li>
              <li><a href="/bookings">Bookings</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          
          <div className={styles.footerContact}>
            <h3>Contact Info</h3>
            <p>Email: booking@taluya.com</p>
            <p>Phone: +27 12 345 6789</p>
            <p>Cape Town, South Africa</p>
          </div>
          
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} Ta Luya. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <a href="/privacy">Privacy Policy</a>
            <span>|</span>
            <a href="/terms">Terms of Service</a>
          </div>
          <p className={styles.credit}>
            Created by{' '}
            <a 
              href="https://calvin-tech-solutions.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.creditLink}
            >
              Calvin Tech Solutions
            </a>
          </p>
        </div>
      </div>
      <button 
        className={`${styles.floatingButton} ${isVisible ? styles.visible : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </footer>
  );
};

export default Footer;
