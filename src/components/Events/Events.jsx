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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleShareEvent = async (event) => {
    const shareData = {
      title: event.title,
      text: `Check out ${event.title} at ${event.venue} on ${formatDate(event.date)}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = `${shareData.text}\n${shareData.url}`;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Event link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing event:', err);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents(); // Your API call returning JSON
        setEvents(data);
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
                    {event.isFeatured && (
                      <span className={styles.featuredBadge}>
                        <i className="fas fa-star"></i> Featured
                      </span>
                    )}
                  </div>

                  <div className={styles.eventDetails}>
                    <div className={styles.eventDate}>
                      <span className={styles.dateDay}>
                        {new Date(event.date).getDate()}
                      </span>
                      <span className={styles.dateMonth}>
                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                      </span>
                    </div>

                    <div className={styles.eventInfo}>
                      <h3 className={styles.eventTitle}>{event.title}</h3>
                      <div className={styles.eventMeta}>
                        <span className={styles.eventVenue}>
                          <i className="fas fa-map-marker-alt"></i> {event.venue}, {event.city}
                        </span>
                        <span className={styles.eventTime}>
                          <i className="far fa-clock"></i> {formatTime(event.time)}
                        </span>
                      </div>
                      <p className={styles.eventDescription}>{event.description}</p>

                      <div className={styles.eventActions}>
                        <a
                          href={event.ticketUrl || '#'}
                          className="btn btn-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fas fa-ticket-alt"></i> Get Tickets
                        </a>
                        <button
                          className={styles.shareButton}
                          onClick={() => handleShareEvent(event)}
                        >
                          <i className="fas fa-share-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {events.length > 0 && (
          <div className={styles.viewMore}>
            <a href="/events" className="btn btn-outline">
              View All Events
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
