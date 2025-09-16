import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Import components
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Music from './components/Music/Music';
import Events from './components/Events/Events';
import Gallery from './components/Gallery/Gallery';
import Merch from './components/Merch/Merch';
import Equipment from './components/Equipment/Equipment';
import Bookings from './components/Bookings/Bookings';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

// Add Font Awesome icons to library
library.add(fas, fab);

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  // Smooth scroll behavior for anchor links
  useEffect(() => {
    // Handle smooth scrolling for anchor links
    const handleAnchorClick = (e) => {
      const targetId = e.currentTarget.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for fixed header if any
            behavior: 'smooth',
          });
        }
      }
    };

    // Add event listeners to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    // Cleanup
    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <Router>
      <div className="app">
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <Music />
                <Events />
                <Gallery />
                <Equipment />
                <Merch />
              </>
            } />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
