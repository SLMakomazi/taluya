import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import styles from './BookingSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const BookingSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      location: '',
      message: ''
    }
  });
  const locationHook = useLocation();

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
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo(
        contentRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );
    }
  }, []);

  // Prefill form from query params
  useEffect(() => {
    const searchParams = new URLSearchParams(locationHook.search);
    const booking = searchParams.get('booking');
    const eventTypeParam = searchParams.get('eventType');
    const equipmentId = searchParams.get('equipmentId');
    const equipmentName = searchParams.get('equipmentName');
    const equipmentCategory = searchParams.get('equipmentCategory');
    const merchId = searchParams.get('merchId');
    const merchName = searchParams.get('merchName');
    const merchSize = searchParams.get('merchSize');

    if (booking === '1' && eventTypeParam === 'equipment_hire') {
      const prefillMessage = `Equipment Hire Request\n\nEquipment: ${equipmentName || 'N/A'}${equipmentCategory ? ` (${equipmentCategory})` : ''}${equipmentId ? `\nID: ${equipmentId}` : ''}`;

      reset((current) => ({
        ...current,
        eventType: 'equipment_hire',
        message: prefillMessage,
      }));
    }

    if (booking === '1' && eventTypeParam === 'merch_purchase') {
      const prefillMessage = `Merch Purchase Request\n\nItem: ${merchName || 'N/A'}${merchId ? `\nID: ${merchId}` : ''}${merchSize ? `\nSize: ${merchSize}` : ''}`;

      reset((current) => ({
        ...current,
        eventType: 'merch_purchase',
        message: prefillMessage,
      }));
    }
  }, [locationHook.search, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://api.taluya.com/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to submit booking');
      
      setSubmitStatus({ type: 'success', message: 'Your booking request has been sent! We\'ll get back to you soon.' });
      reset();
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitStatus({ type: 'error', message: 'Failed to submit booking. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className={styles.bookingSection} ref={sectionRef}>
      <Helmet>
        <title>Book Ta Luya | DJ & Music Producer</title>
        <meta name="description" content="Book Ta Luya for your next event. Professional DJ services for corporate events, parties, weddings, and more." />
      </Helmet>
      
      <div className="container">
        <div className={styles.bookingContent}>
          <div className={styles.bookingFormWrapper} ref={contentRef}>
            <div className={styles.sectionHeader}>
              <h2 ref={titleRef}>Reserve Your Sound Journey</h2>
              <p>Fill out the form below to inquire about booking for your event.</p>
            </div>
            
            {submitStatus && (
              <div className={`${styles.alert} ${submitStatus.type === 'success' ? styles.success : styles.error}`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className={styles.bookingForm} ref={formRef}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className={errors.name ? styles.errorInput : ''}
                  />
                  {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className={errors.email ? styles.errorInput : ''}
                  />
                  {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="eventType">Event Type *</label>
                  <select
                    id="eventType"
                    {...register('eventType', { required: 'Event type is required' })}
                    className={errors.eventType ? styles.errorInput : ''}
                  >
                    <option value="">Select Event Type</option>
                    <option value="equipment_hire">Equipment Hire</option>
                    <option value="merch_purchase">Merch Purchase</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="club">Club/Nightclub</option>
                    <option value="festival">Festival</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.eventType && <span className={styles.errorMessage}>{errors.eventType.message}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="eventDate">Event Date *</label>
                  <input
                    id="eventDate"
                    type="date"
                    {...register('eventDate', { required: 'Event date is required' })}
                    className={errors.eventDate ? styles.errorInput : ''}
                  />
                  {errors.eventDate && <span className={styles.errorMessage}>{errors.eventDate.message}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="location">Event Location *</label>
                  <input
                    id="location"
                    type="text"
                    {...register('location', { required: 'Location is required' })}
                    placeholder="City, Venue Name"
                    className={errors.location ? styles.errorInput : ''}
                  />
                  {errors.location && <span className={styles.errorMessage}>{errors.location.message}</span>}
                </div>
                
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="message">Tell us about your event *</label>
                  <textarea
                    id="message"
                    rows="4"
                    {...register('message', { 
                      required: 'Please tell us about your event',
                      minLength: {
                        value: 20,
                        message: 'Please provide more details about your event',
                      },
                    })}
                    className={errors.message ? styles.errorInput : ''}
                    placeholder="Event details, special requests, timeline, etc."
                  ></textarea>
                  {errors.message && <span className={styles.errorMessage}>{errors.message.message}</span>}
                </div>
              </div>
              
              <div className={styles.formFooter}>
                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Booking Request'}
                </button>
                <p className={styles.requiredNote}>* Required fields</p>
              </div>
            </form>
          </div>
          
          <div className={styles.bookingInfo}>
            <div className={styles.infoCard}>
              <h3>Why Book Ta Luya?</h3>
              <ul>
                <li>Professional DJ with years of experience</li>
                <li>Custom music selection for your event</li>
                <li>High-quality sound equipment</li>
                <li>Flexible packages to fit your needs</li>
                <li>Professional and reliable service</li>
              </ul>
              
              <div className={styles.contactInfo}>
                <h4>Contact Directly</h4>
                <p><i className="fas fa-envelope"></i> bookings@taluya.co.za</p>
                <p><i className="fas fa-phone"></i> +27 61 282 5618</p>
                <p><i className="fas fa-map-marker-alt"></i> Based in Cape Town, South Africa</p>
              </div>
              
              <div className={styles.socialLinks}>
                <a href="https://www.instagram.com/ta_luya1/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://hearthis.at/luniko-ta-luya-mkontwana/" target="_blank" rel="noopener noreferrer" aria-label="SoundCloud">
                  <i className="fab fa-soundcloud"></i>
                </a>
                <a href="https://www.facebook.com/djluyandaluya.mkontwana" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="fab fa-facebook"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
