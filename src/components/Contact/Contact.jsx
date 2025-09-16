import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    // Animation for contact section
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // In a real app, you would send this to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just log the form data
      console.log('Form submitted:', formData);
      
      // Show success message
      setSubmitStatus({ success: true, message: 'Message sent successfully!' });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ 
        success: false, 
        message: 'Failed to send message. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { 
      name: 'Instagram', 
      url: 'https://instagram.com/taluya', 
      icon: 'instagram',
      color: '#E1306C'
    },
    { 
      name: 'SoundCloud', 
      url: 'https://soundcloud.com/taluya', 
      icon: 'soundcloud',
      color: '#FF8800'
    },
    { 
      name: 'Mixcloud', 
      url: 'https://mixcloud.com/taluya', 
      icon: 'mixcloud',
      color: '#3146FF'
    },
    { 
      name: 'YouTube', 
      url: 'https://youtube.com/taluya', 
      icon: 'youtube',
      color: '#FF0000'
    },
    { 
      name: 'Twitter', 
      url: 'https://twitter.com/taluya', 
      icon: 'twitter',
      color: '#1DA1F2'
    },
    { 
      name: 'Spotify', 
      url: 'https://open.spotify.com/artist/taluya', 
      icon: 'spotify',
      color: '#1DB954'
    },
  ];

  return (
    <section id="contact" className={styles.contact} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title} ref={titleRef}>
          Get In Touch
        </h2>
        
        <div className={styles.content} ref={contentRef}>
          <div className={styles.contactInfo}>
            <h3 className={styles.contactTitle}>Contact Information</h3>
            <p className={styles.contactText}>
              For booking inquiries or just to say hello, feel free to reach out. 
              I'll get back to you as soon as possible.
            </p>
            
            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:booking@taluya.com" className={styles.contactLink}>
                    booking@taluya.com
                  </a>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📱</span>
                <div>
                  <h4>Management</h4>
                  <a href="tel:+27123456789" className={styles.contactLink}>
                    +27 12 345 6789
                  </a>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <div>
                  <h4>Based in</h4>
                  <p>Cape Town, South Africa</p>
                </div>
              </div>
            </div>
            
            <div className={styles.socialLinks}>
              <h4>Follow Me</h4>
              <div className={styles.socialIcons}>
                {socialLinks.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialIcon}
                    style={{ '--social-color': social.color }}
                    aria-label={social.name}
                  >
                    <i className={`fab fa-${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className={styles.contactFormContainer}>
            <form onSubmit={handleSubmit} className={styles.contactForm} ref={formRef}>
              {submitStatus && (
                <div className={`${styles.alert} ${submitStatus.success ? styles.success : styles.error}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                  Your Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.formInput}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email Address <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.formInput}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>
                  Your Message <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={styles.formTextarea}
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <span className={styles.buttonIcon}>
                  {isSubmitting ? '⏳' : '✉️'}
                </span>
              </button>
            </form>
            
            <div className={styles.newsletter}>
              <h4>Subscribe to my newsletter</h4>
              <p>Get updates on new releases, events, and exclusive content.</p>
              <form className={styles.newsletterForm}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className={styles.newsletterInput}
                  required
                />
                <button type="submit" className={styles.newsletterButton}>
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
