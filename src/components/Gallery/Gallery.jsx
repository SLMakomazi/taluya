import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImages from '../../data/heroImages.json';
import styles from './Gallery.module.css';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleItems, setVisibleItems] = useState(8); // Show first 8 items (2 rows of 4)
  const itemsPerLoad = 4; // Number of items to show each time (1 row)

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const lightboxRef = useRef(null);
  const galleryGridRef = useRef(null);

  // Initialize GSAP animations
  const initAnimations = useCallback(() => {
    if (!titleRef.current || !contentRef.current || !sectionRef.current) return;

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Content animation
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [sectionRef, titleRef, contentRef]);

  // Load gallery items and initialize animations
  useEffect(() => {
    try {
      const items = heroImages.images.map((src, index) => ({
        id: index + 1,
        src,
        alt: `Gallery Image ${index + 1}`,
      }));

      setGalleryItems(items);
      setLoading(false);

      const timer = setTimeout(initAnimations, 100);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Error loading gallery images:', error);
      setLoading(false);
    }
  }, [initAnimations]);

  // Animate gallery items
  useEffect(() => {
    if (!galleryGridRef.current) return;

    const items = galleryGridRef.current.querySelectorAll(
      `.${styles.galleryItem}`
    );

    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, [galleryItems, visibleItems]);

  // Lightbox controls
  const openLightbox = useCallback((item) => {
    // Store current scroll position
    const scrollY = window.scrollY;
    document.body.classList.add('lightbox-open');
    document.body.style.top = `-${scrollY}px`;
    
    setSelectedImage(item);
    
    // Force reflow to ensure the element is in the DOM
    requestAnimationFrame(() => {
      if (lightboxRef.current) {
        lightboxRef.current.classList.add(styles.active);
        gsap.fromTo(
          lightboxRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 }
        );
      }
    });
  }, [lightboxRef]);

  const closeLightbox = useCallback(() => {
    if (!lightboxRef.current) return;
    
    gsap.to(lightboxRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        // Restore scroll position
        const scrollY = document.body.style.top;
        document.body.classList.remove('lightbox-open');
        document.body.style.top = '';
        
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
        
        lightboxRef.current.classList.remove(styles.active);
        setSelectedImage(null);
      },
    });
  }, [lightboxRef]);

  const navigateImage = useCallback((direction) => {
    if (!selectedImage) return;

    const currentIndex = galleryItems.findIndex(
      (img) => img.id === selectedImage.id
    );

    const newIndex =
      direction === 'prev'
        ? (currentIndex - 1 + galleryItems.length) % galleryItems.length
        : (currentIndex + 1) % galleryItems.length;

    setSelectedImage(galleryItems[newIndex]);
  }, [galleryItems, selectedImage]);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'ArrowRight') navigateImage('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Ensure we clean up any potential scroll locks
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [selectedImage, closeLightbox, navigateImage]);

  return (
    <section id="gallery" className={styles.gallery} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title} ref={titleRef}>
          Ta Luya & Friends Gallery
        </h2>

        <div className={styles.content} ref={contentRef}>
          {loading ? (
            <div className={styles.loading}>Loading gallery...</div>
          ) : (
            <div className={styles.galleryGrid} ref={galleryGridRef}>
              {galleryItems.slice(0, visibleItems).map((item) => (
                <div
                  key={item.id}
                  className={styles.galleryItem}
                  onClick={() => openLightbox(item)}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className={styles.image}
                    />
                    <div className={styles.overlay}>
                      <span className={styles.viewButton}>View</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className={styles.buttonContainer}>
                {galleryItems.length > visibleItems ? (
                  <button 
                    className={styles.loadMoreButton}
                    onClick={() => setVisibleItems(prev => prev + itemsPerLoad)}
                  >
                    Show More
                  </button>
                ) : visibleItems > itemsPerLoad ? (
                  <button 
                    className={styles.loadMoreButton}
                    onClick={() => setVisibleItems(itemsPerLoad)}
                  >
                    Show Less
                  </button>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <div
        className={`${styles.lightbox} ${selectedImage ? styles.active : ''}`}
        ref={lightboxRef}
        onClick={closeLightbox}
      >
        {selectedImage && (
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={`${styles.lightboxButton} ${styles.closeButton}`}
              onClick={closeLightbox}
              aria-label="Close"
            >
              &times;
            </button>

            <button
              className={`${styles.lightboxButton} ${styles.navButton} ${styles.prevButton}`}
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              aria-label="Previous image"
            >
              &larr;
            </button>

            <div className={styles.lightboxImageContainer}>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className={styles.lightboxImage}
              />
              <div className={styles.imageInfo}>
                <span>{selectedImage.alt}</span>
                <span className={styles.imageCounter}>
                  {galleryItems.findIndex((img) => img.id === selectedImage.id) +
                    1}{' '}
                  / {galleryItems.length}
                </span>
              </div>
            </div>

            <button
              className={`${styles.lightboxButton} ${styles.navButton} ${styles.nextButton}`}
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              aria-label="Next image"
            >
              &rarr;
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
