// Function to update the title with flipping headphone icon
const setupTitleAnimation = () => {
  const title = document.querySelector('title');
  if (!title) return;
  
  // Create a link element for the headphone icon if not already present
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
  }
  
  // Set up the title with the icon
  const updateTitle = () => {
    title.innerHTML = 'Ta Luya | Artist / DJ <i class="fas fa-headphones" style="color:#ff1493;margin-left:5px;transition:transform 0.5s ease-in-out"></i>';
    const icon = title.querySelector('i');
    
    // Toggle between normal and flipped state
    let isFlipped = false;
    setInterval(() => {
      isFlipped = !isFlipped;
      icon.style.transform = isFlipped ? 'scaleX(-1)' : 'scaleX(1)';
    }, 5000);
  };
  
  // Wait for Font Awesome to load
  if (document.readyState === 'complete') {
    updateTitle();
  } else {
    window.addEventListener('load', updateTitle);
  }
};

// Run the animation when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupTitleAnimation);
} else {
  setupTitleAnimation();
}
