import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getFeaturedMerchandise } from '../../utils/api';
import styles from './Merch.module.css';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Merch = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [merchItems, setMerchItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch merch data
  useEffect(() => {
    const fetchMerch = async () => {
      try {
        setLoading(true);
        const data = await getFeaturedMerchandise();
        setMerchItems(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching merchandise:', err);
        setError('Failed to load merchandise. Please try again later.');
        setLoading(false);
      }
    };

    fetchMerch();
  }, []);

  // Animation on component mount
  useEffect(() => {
    if (contentRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          markers: false
        }
      });

      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      ).fromTo(
        contentRef.current.children,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15, 
          duration: 0.6,
          ease: 'power3.out'
        },
        '-=0.4'
      );
    }
  }, []);

  if (loading) {
    return (
      <section className={`${styles.merch} section`} ref={sectionRef} id="merch">
        <div className="container">
          <h2 className="section-title">Merchandise</h2>
          <div className={styles.loading}>
            <i className="fas fa-spinner fa-spin"></i> Loading merchandise...
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`${styles.merch} section`} ref={sectionRef} id="merch">
        <div className="container">
          <h2 className="section-title">Merchandise</h2>
          <div className={styles.error}>
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.merch} section`} ref={sectionRef} id="merch">
      <div className="container">
        <h2 className="section-title" ref={titleRef}>Merchandise</h2>
        
        <div className={styles.comingSoon}>
          <div className={styles.comingSoonContent}>
            <i className="fas fa-tshirt"></i>
            <h3>Coming Soon</h3>
            <p>Our exclusive merchandise collection is on its way!</p>
            <p>Sign up for updates to be the first to know when it drops.</p>
            <button className={styles.notifyBtn}>
              Notify Me
            </button>
          </div>
        </div>

        <div className={styles.merchGrid} ref={contentRef}>
          {merchItems.map((item) => (
            <div key={item.id} className={styles.merchCard}>
              <div className={styles.merchImage}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  loading="lazy"
                  onError={(e) => (e.target.src = '/images/placeholder-merch.jpg')}
                />
                {item.isNew && <span className={styles.newBadge}>New</span>}
                {item.isBestSeller && <span className={styles.bestSellerBadge}>Bestseller</span>}
              </div>
              <div className={styles.merchInfo}>
                <h3 className={styles.merchName}>{item.name}</h3>
                <p className={styles.merchPrice}>${item.price.toFixed(2)}</p>
                <div className={styles.merchActions}>
                  <button className={styles.viewBtn}>
                    View Details
                  </button>
                  <button className={styles.cartBtn}>
                    <i className="fas fa-shopping-cart"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Merch;
