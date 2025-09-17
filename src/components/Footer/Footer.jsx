import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Footer.module.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Handle mouse down on the button
  const handleMouseDown = (e) => {
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    setIsDragging(true);
    
    // Prevent text selection while dragging
    e.preventDefault();
  };

  // Handle mouse move for dragging
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;
    
    // Get viewport dimensions
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    
    // Get button dimensions
    const buttonWidth = buttonRef.current?.offsetWidth || 50;
    const buttonHeight = buttonRef.current?.offsetHeight || 50;
    
    // Calculate boundaries
    const maxX = viewportWidth - buttonWidth;
    const maxY = viewportHeight - buttonHeight;
    
    // Ensure button stays within viewport
    const boundedX = Math.max(0, Math.min(newX, maxX));
    const boundedY = Math.max(0, Math.min(newY, maxY));
    
    setPosition({ x: boundedX, y: boundedY });
  }, [isDragging, offset]);

  // Handle mouse up to stop dragging
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add/remove event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, offset, handleMouseMove, handleMouseUp]);

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
        ref={buttonRef}
        className={styles.floatingButton}
        onClick={!isDragging ? scrollToTop : undefined}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        aria-label="Back to top"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </footer>
  );
};

export default Footer;
