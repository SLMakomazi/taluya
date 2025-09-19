import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getEvents } from '../../utils/api'; // Fetch events from JSON via PHP
import styles from './Events.module.css';

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents(); // Your API call returning JSON
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time part for accurate date comparison
        
        // Filter out past events
        const upcomingEvents = data.filter(event => {
          const eventDate = new Date(event.date);
          eventDate.setHours(0, 0, 0, 0);
          return eventDate >= today;
        });
        
        // Sort events by date (earliest first)
        upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        setEvents(upcomingEvents);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!loading && !error && contentRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          markers: false,
        },
      });

      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      ).fromTo(
        contentRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );
    }
  }, [loading, error]);

  return (
    <section className={`${styles.events} section`} ref={sectionRef}>
      <div className="container">
        <h2 className="section-title" ref={titleRef}>
          Upcoming Events
        </h2>

        <div className={styles.content} ref={contentRef}>
          {loading ? (
            <div className={styles.loading}>
              <i className="fas fa-spinner fa-spin"></i> Loading events...
            </div>
          ) : error ? (
            <div className={styles.error}>
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          ) : events.length === 0 ? (
            <div className={styles.noEvents}>
              <i className="far fa-calendar-check"></i> No upcoming events scheduled. Check back soon!
            </div>
          ) : (
            <div className={styles.eventsGrid}>
              {events.map((event) => (
                <div key={event.id} className={styles.eventCard}>
                  <div className={styles.eventImage}>
                    <img
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                      onError={(e) => (e.target.src = '/images/placeholder-event.jpg')}
                    />
                  </div>

                  <div className={styles.eventDetails}>
                    <div className={styles.eventInfo}>
                      <h3 className={styles.eventTitle}>{event.title}</h3>
                      <div className={styles.eventMeta}>
                        <span className={styles.eventVenue}>
                          <i className="fas fa-map-marker-alt"></i> {event.venue}, {event.city}
                        </span>
                        <span className={styles.eventDate}>
                          <i className="far fa-calendar"></i> {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Events;
