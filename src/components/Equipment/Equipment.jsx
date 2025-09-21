import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getEquipment } from '../../utils/api';
import styles from './Equipment.module.css';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Equipment = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [equipmentItems, setEquipmentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch equipment data
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setLoading(true);
        const data = await getEquipment();
        setEquipmentItems(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching equipment:', err);
        setError('Failed to load equipment. Please try again later.');
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  // Animation on component mount and when loading/error states change
  useEffect(() => {
    if (contentRef.current && !loading && !error) {
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
        contentRef.current?.children,
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
  }, [loading, error]);

  if (loading) {
    return (
      <section className={`${styles.equipment} section`} ref={sectionRef} id="equipment">
        <div className="container">
          <h2 className="section-title">Entertainment Equipment Hire</h2>
          <div className={styles.loading}>
            <i className="fas fa-spinner fa-spin"></i> Loading equipment...
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`${styles.equipment} section`} ref={sectionRef} id="equipment">
        <div className="container">
          <h2 className="section-title">Entertainment Equipment Hire</h2>
          <div className={styles.error}>
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        </div>
      </section>
    );
  }

  // Show coming soon message if no items are available
  if (equipmentItems.length === 0) {
    return (
      <section className={`${styles.equipment} section`} ref={sectionRef} id="equipment">
        <div className="container">
          <h2 className="section-title" ref={titleRef}>Entertainment Equipment Hire</h2>
          
          <div className={styles.comingSoon}>
            <div className={styles.comingSoonContent}>
              <i className="fas fa-tools"></i>
              <h3>Equipment List Coming Soon</h3>
              <p>I'm currently putting together a detailed list of all my music production and performance equipment.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.equipment} section`} ref={sectionRef} id="equipment">
      <Helmet>
        <title>Entertainment Equipment Hire | Ta Luya</title>
        <meta name="description" content="Professional entertainment equipment for hire. High-quality audio and lighting equipment for events and performances." />
      </Helmet>
      
      <div className="container">
        <h2 className="section-title" ref={titleRef}>Entertainment Equipment Hire</h2>
        
        <div className={styles.equipmentGrid} ref={contentRef}>
          {equipmentItems.map((item) => (
            <div key={item.id} className={styles.equipmentCard}>
              <div className={styles.equipmentImage}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  loading="lazy"
                  onError={(e) => (e.target.src = '/images/placeholder-equipment.jpg')}
                />
                {item.isNew && <span className={styles.newBadge}>New</span>}
              </div>
              <div className={styles.equipmentInfo}>
                <h3 className={styles.equipmentName}>{item.name}</h3>
                <p className={styles.equipmentCategory}>{item.category}</p>
                <p className={styles.equipmentDescription}>{item.description}</p>
                <div className={styles.equipmentSpecs}>
                  {item.specs && item.specs.map((spec, index) => (
                    <span key={index} className={styles.specItem}>
                      <i className={`fas fa-${spec.icon || 'check'}`}></i> {spec.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Equipment;
