import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import global styles
import './styles/global.css';
import App from './App.jsx';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Set default GSAP settings
gsap.defaults({ ease: 'power3.out' });

// Function to update the title with flipping headphone icon
const setupTitleAnimation = () => {
  const title = document.querySelector('title');
  if (!title) return;
  
  // Create a link element for the headphone icon
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
  document.head.appendChild(link);
  
  // Set up the title with the icon
  const updateTitle = () => {
    title.textContent = 'Ta Luya | Artist / DJ ';
    const icon = document.createElement('i');
    icon.className = 'fas fa-headphones';
    icon.style.color = '#ff1493';
    icon.style.marginLeft = '5px';
    icon.style.transition = 'transform 0.5s ease-in-out';
    title.appendChild(icon);
    
    // Toggle between normal and flipped state
    let isFlipped = false;
    setInterval(() => {
      isFlipped = !isFlipped;
      icon.style.transform = isFlipped ? 'scaleX(-1)' : 'scaleX(1)';
    }, 5000);
  };
  
  // Wait for Font Awesome to load
  link.onload = updateTitle;
  
  // Cleanup function
  return () => {
    clearInterval(updateTitle.interval);
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
  };
};

// Create root
const root = createRoot(document.getElementById('root'));

// Set up title animation when the app mounts
const setupApp = () => {
  setupTitleAnimation();
  
  // Render the app
  root.render(
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>
  );
};

// Initialize the app
setupApp();
