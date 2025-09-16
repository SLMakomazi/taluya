import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import styles from './Bookings.module.css';

gsap.registerPlugin(ScrollTrigger);

const Bookings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const bookingTypesRef = useRef([]);
  const formRef = useRef(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const bookingTypes = [
    {
      id: 1,
      title: 'Corporate Events',
      icon: 'briefcase',
      description: 'Professional DJ services for corporate functions, product launches, and company parties. Perfect for creating the right atmosphere for your business events.'
    },
    {
      id: 2,
      title: 'Baby Showers',
      icon: 'baby',
      description: 'Celebrate the upcoming arrival with a carefully curated playlist that creates a warm and joyful atmosphere for your special day.'
    },
    {
      id: 3,
      title: '21st Birthdays',
      icon: 'birthday-cake',
      description: 'Make the milestone birthday unforgettable with high-energy mixes and seamless transitions that keep the party going all night long.'
    },
    {
      id: 4,
      title: 'Outdoor Sessions',
      icon: 'sun',
      description: 'From beach parties to garden events, I bring the perfect sound system and music selection for any outdoor celebration.'
    },
    {
      id: 5,
      title: 'Kids Parties',
      icon: 'child',
      description: 'Family-friendly entertainment with clean, age-appropriate music that gets kids dancing and having fun.'
    },
    {
      id: 6,
      title: 'Resident DJ',
      icon: 'music',
      description: 'Weekly or monthly DJ services for your venue, providing consistent quality and a growing following.'
    },
    {
      id: 7,
      title: 'Custom Events',
      icon: 'star',
      description: 'Have a special event that doesn\'t fit the usual categories? Let\'s discuss how I can make it memorable with the perfect soundtrack.'
    },
    {
      id: 8,
      title: 'Wedding Receptions',
      icon: 'rings-wedding',
      description: 'Create the perfect atmosphere for your special day with a customized playlist that reflects your unique love story.'
    }
  ];

  useEffect(() => {
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Animate booking types
    bookingTypesRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send this data to your backend
      console.log('Form submitted:', data);
      
      setSubmitStatus({
        type: 'success',
        message: 'Your booking request has been sent! We\'ll get back to you within 24-48 hours.'
      });
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'There was an error sending your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
      
      // Scroll to the form after submission
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <section className={styles.bookings} ref={sectionRef}>
      <Helmet>
        <title>Book Ta Luya | DJ & Music Producer</title>
        <meta name="description" content="Book Ta Luya for your next event. Professional DJ services for corporate events, parties, weddings, and more." />
      </Helmet>
      
      <div className="container">
        <h1 className={styles.title} ref={titleRef}>Book Ta Luya</h1>
        <p className={styles.subtitle}>Available for events of all sizes. Let's make your occasion unforgettable.</p>
        
        <div className={styles.bookingTypes}>
          {bookingTypes.map((type, index) => (
            <div 
              key={type.id} 
              className={styles.bookingTypeCard}
              ref={el => bookingTypesRef.current[index] = el}
            >
              <div className={styles.bookingTypeIcon}>
                <i className={`fas fa-${type.icon}`}></i>
              </div>
              <h3>{type.title}</h3>
              <p>{type.description}</p>
            </div>
          ))}
        </div>
        
        <div className={styles.contactSection} ref={formRef}>
          <div className={styles.contactInfo}>
            <h2>Ready to Book?</h2>
            <p>Fill out the form or contact me directly:</p>
            <ul>
              <li><i className="fas fa-envelope"></i> bookings@taluya.com</li>
              <li><i className="fas fa-phone"></i> +1 (555) 123-4567</li>
              <li><i className="fas fa-map-marker-alt"></i> Based in [Your City]</li>
            </ul>
            <div className={styles.availability}>
              <h3>Availability</h3>
              <p>I typically book 3-6 months in advance, but feel free to reach out for last-minute availability.</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className={styles.bookingForm}>
            {submitStatus && (
              <div className={`${styles.alert} ${submitStatus.type === 'success' ? styles.success : styles.error}`}>
                {submitStatus.message}
              </div>
            )}
            
            <div className={styles.formGroup}>
              <label htmlFor="name">Your Name *</label>
              <input
                id="name"
                type="text"
                {...register('name', { required: 'Name is required' })}
                className={errors.name ? styles.errorInput : ''}
              />
              {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
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
                {...register('eventType', { required: 'Please select an event type' })}
                className={errors.eventType ? styles.errorInput : ''}
                defaultValue=""
              >
                <option value="" disabled>Select an event type</option>
                {bookingTypes.map(type => (
                  <option key={type.id} value={type.title}>{type.title}</option>
                ))}
              </select>
              {errors.eventType && <span className={styles.errorMessage}>{errors.eventType.message}</span>}
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="eventDate">Event Date *</label>
                <input
                  id="eventDate"
                  type="date"
                  {...register('eventDate', { required: 'Event date is required' })}
                  className={errors.eventDate ? styles.errorInput : ''}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.eventDate && <span className={styles.errorMessage}>{errors.eventDate.message}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="eventTime">Event Time *</label>
                <input
                  id="eventTime"
                  type="time"
                  {...register('eventTime', { required: 'Event time is required' })}
                  className={errors.eventTime ? styles.errorInput : ''}
                />
                {errors.eventTime && <span className={styles.errorMessage}>{errors.eventTime.message}</span>}
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="location">Event Location *</label>
              <input
                id="location"
                type="text"
                placeholder="Venue name and address"
                {...register('location', { required: 'Event location is required' })}
                className={errors.location ? styles.errorInput : ''}
              />
              {errors.location && <span className={styles.errorMessage}>{errors.location.message}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="guests">Expected Number of Guests</label>
              <input
                id="guests"
                type="number"
                min="1"
                {...register('guests')}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message">Tell Us About Your Event *</label>
              <textarea
                id="message"
                rows="5"
                placeholder="Any special requests, music preferences, or additional details..."
                {...register('message', { required: 'Please tell us about your event' })}
                className={errors.message ? styles.errorInput : ''}
              ></textarea>
              {errors.message && <span className={styles.errorMessage}>{errors.message.message}</span>}
            </div>
            
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Booking Request'}
            </button>
            
            <p className={styles.note}>
              * Required fields. We respect your privacy and will never share your information with third parties.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Bookings;
