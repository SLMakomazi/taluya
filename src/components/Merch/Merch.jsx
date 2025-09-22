import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [showModal, setShowModal] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const navigate = useNavigate();

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

  // Show coming soon message if no items are available
  if (merchItems.length === 0) {
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
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.merch} section`} ref={sectionRef} id="merch">
      <div className="container">
        <h2 className="section-title" ref={titleRef}>Merchandise</h2>
        
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
              </div>
              <div className={styles.merchInfo}>
                <h3 className={styles.merchName}>{item.name}</h3>
                <p className={styles.merchPrice}>R {item.price.toFixed(2)}</p>
                <div className={styles.merchActions}>
                  <button
                    className={styles.cartBtn}
                    type="button"
                    onClick={() => {
                      setActiveItem(item);
                      const defaultSize = Array.isArray(item.sizes) && item.sizes.length > 0 ? item.sizes[0] : 'M';
                      setSelectedSize(defaultSize);
                      setShowModal(true);
                    }}
                    aria-label={`Buy ${item.name}`}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && activeItem && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true" aria-labelledby="merch-buy-modal-title">
          <div className={styles.modal}>
            <h3 id="merch-buy-modal-title" className={styles.modalTitle}>Buy {activeItem.name}</h3>
            <p className={styles.modalMessage}>
              Select your preferred size to continue to the booking form. We'll prefill your selection for you.
            </p>

            <div className={styles.sizeOptions} role="group" aria-label="Select size">
              {(activeItem.sizes || ['S','M','L','XL']).map((size) => (
                <label key={size} className={styles.sizeOption}>
                  <input
                    type="radio"
                    name="merch-size"
                    value={size}
                    checked={selectedSize === size}
                    onChange={() => setSelectedSize(size)}
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.modalCloseButton}
                onClick={() => {
                  setShowModal(false);
                  const params = new URLSearchParams({
                    booking: '1',
                    eventType: 'merch_purchase',
                    merchId: String(activeItem.id),
                    merchName: activeItem.name,
                    merchSize: selectedSize || 'M',
                  });
                  const to = `/?${params.toString()}#booking`;
                  navigate(to);
                  setTimeout(() => {
                    const el = document.getElementById('booking');
                    if (el) {
                      const middle = el.offsetTop + el.clientHeight / 2 - window.innerHeight / 2;
                      window.scrollTo({ top: Math.max(0, middle), behavior: 'smooth' });
                    }
                  }, 100);
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Merch;
