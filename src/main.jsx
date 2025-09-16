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

// Create root
const root = createRoot(document.getElementById('root'));

// Render the app
root.render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
