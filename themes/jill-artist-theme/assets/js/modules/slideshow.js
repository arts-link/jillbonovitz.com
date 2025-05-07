export function initSlideshow() {
  const slideshowElement = document.querySelector('.slideshow');
  if (!slideshowElement) return;

  const slides = document.querySelectorAll('.slide');
  if (!slides || slides.length === 0) return;

  // Slideshow functionality
  const slideshow = {
    slides: slides,
    captions: document.querySelectorAll('.caption'),
    // Use a single set of button selectors
    prevBtn: document.querySelector('.slide-nav.prev'),
    nextBtn: document.querySelector('.slide-nav.next'),
    currentSlideEl: document.getElementById('current-slide'),
    totalSlides: slides.length,
    currentIndex: 0,
    touchStartX: 0,
    touchEndX: 0,
    
    init: function() {
      // Check for hash in URL on page load
      this.checkUrlHash();
      
      // Set up click events for the unified buttons
      if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
      if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
      
      // Set up keyboard navigation
      document.addEventListener('keydown', this.handleKeydown);
      
      // Set up touch events
      this.setupTouchEvents();
      
      // Handle browser navigation (back/forward buttons)
      window.addEventListener('hashchange', this.handleHashChange);
    },
    
    // Check URL hash and navigate to correct slide
    checkUrlHash: function() {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#slide')) {
        const slideIndex = parseInt(hash.replace('#slide', ''), 10);
        if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < this.totalSlides) {
          this.showSlide(slideIndex, false); // false = don't update hash again
        }
      } else {
        // No hash or invalid hash, start at first slide
        this.showSlide(0, true);
      }
    },
    
    setupTouchEvents: function() {
      const container = document.querySelector('.slideshow');
      
      container.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      }, {passive: true});
      
      container.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      }, {passive: true});
    },
    
    handleSwipe: debounce(function() {
      const threshold = 50; // Minimum distance for a swipe
      const diff = this.touchStartX - this.touchEndX;
      
      if (Math.abs(diff) < threshold) return; // Not a significant swipe
      
      if (diff > 0) {
        // Swiped left - go to next slide
        this.nextSlide();
      } else {
        // Swiped right - go to previous slide
        this.prevSlide();
      }
    }, 100),
    
    showSlide: function(index, updateHash = true) {
      // Find currently active slide
      const currentSlide = document.querySelector('.slide.active');
      const currentIndex = currentSlide ? parseInt(currentSlide.getAttribute('data-index'), 10) : -1;
      
      // Don't do anything if clicking on the same slide
      if (currentIndex === index) return;
      
      // Handle caption transitions first (they're faster)
      if (this.captions && this.captions.length > 0) {
        this.captions.forEach(caption => {
          caption.classList.remove('active');
        });
        
        if (this.captions[index]) {
          this.captions[index].classList.add('active');
        }
      }
      
      // Mark current slide for fade out
      if (currentSlide) {
        currentSlide.classList.remove('active');
        currentSlide.classList.add('fade-out');
        
        // Remove the fade-out class after transition completes
        setTimeout(() => {
          currentSlide.classList.remove('fade-out');
          currentSlide.classList.add('inactive');
        }, 700); // Match transition time (0.7s = 700ms)
      }
      
      // Show new slide
      this.slides[index].classList.remove('inactive');
      this.slides[index].classList.add('active');
      
      // Update counter
      if (this.currentSlideEl) {
        this.currentSlideEl.textContent = index + 1;
      }
      
      // Update URL hash if needed
      if (updateHash) {
        try {
          if (document.body.contains(this.slides[index])) {
            history.replaceState(null, null, `#slide${index}`);
          }
        } catch (e) {
          console.warn('Could not update URL hash:', e);
        }
      }
      
      // Update current index
      this.currentIndex = index;
    },
    
    nextSlide: function() {
      let newIndex = this.currentIndex + 1;
      if (newIndex >= this.totalSlides) newIndex = 0;
      this.showSlide(newIndex);
    },
    
    prevSlide: function() {
      let newIndex = this.currentIndex - 1;
      if (newIndex < 0) newIndex = this.totalSlides - 1;
      this.showSlide(newIndex);
    },

    cleanup: function() {
      document.removeEventListener('keydown', this.handleKeydown);
      window.removeEventListener('hashchange', this.handleHashChange);
    }
  };

  // Store bound event handlers for later cleanup
  slideshow.handleKeydown = (e) => {
    if (e.key === 'ArrowLeft') slideshow.prevSlide();
    if (e.key === 'ArrowRight') slideshow.nextSlide();
  };

  slideshow.handleHashChange = () => slideshow.checkUrlHash();

  // Initialize the slideshow
  slideshow.init();

  // Return the slideshow object to allow cleanup from outside
  return slideshow;
}

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}