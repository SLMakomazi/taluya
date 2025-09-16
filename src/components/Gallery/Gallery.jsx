import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Gallery.module.css';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const lightboxRef = useRef(null);

  // Fetch gallery items from the backend
  useEffect(() => {
    // In a real app, you would fetch this from your backend
    // fetch('/api/gallery')
    //   .then(response => response.json())
    //   .then(data => {
    //     setGalleryItems(data);
    //     setLoading(false);
    //   });
    
    // Mock data
    const mockGallery = Array.from({ length: 9 }, (_, i) => ({
      id: i + 1,
      src: `/images/gallery/gallery-${i + 1}.jpg`,
      alt: `Gallery image ${i + 1}`,
      category: ['live', 'studio', 'behind-scenes'][Math.floor(Math.random() * 3)]
    }));
    
    // Simulate API call
    const timer = setTimeout(() => {
      setGalleryItems(mockGallery);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Animation for gallery section
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

  // Animation for gallery items
  useEffect(() => {
    if (galleryItems.length > 0) {
      gsap.utils.toArray(`.${styles.galleryItem}`).forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.05,
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  }, [galleryItems]);

  // Handle lightbox open/close
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
      gsap.to(lightboxRef.current, {
        opacity: 1,
        duration: 0.3,
        display: 'flex',
      });
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedImage]);

  const closeLightbox = () => {
    gsap.to(lightboxRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setSelectedImage(null);
      },
    });
  };

  const navigateImage = (direction) => {
    const currentIndex = galleryItems.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    } else {
      newIndex = (currentIndex + 1) % galleryItems.length;
    }
    
    setSelectedImage(galleryItems[newIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <section id="gallery" className={styles.gallery} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title} ref={titleRef}>
          Gallery
        </h2>
        
        <div className={styles.content} ref={contentRef}>
          {loading ? (
            <div className={styles.loading}>Loading gallery...</div>
          ) : (
            <div className={styles.galleryGrid}>
              {galleryItems.map((item) => (
                <div 
                  key={item.id} 
                  className={styles.galleryItem}
                  onClick={() => setSelectedImage(item)}
                >
                  <div className={styles.imageWrapper}>
                    <div className={styles.placeholderImage}></div>
                    <div className={styles.overlay}>
                      <span className={styles.viewButton}>View</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className={styles.lightbox} ref={lightboxRef} onClick={closeLightbox}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
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
              <div className={styles.placeholderImage}></div>
              <div className={styles.imageInfo}>
                <span>{selectedImage.alt}</span>
                <span className={styles.imageCounter}>
                  {galleryItems.findIndex(img => img.id === selectedImage.id) + 1} / {galleryItems.length}
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
        </div>
      )}
    </section>
  );
};

export default Gallery;
