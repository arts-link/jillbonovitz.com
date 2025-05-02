export function initContentMap() {
  // First check if content map exists before proceeding
  const contentMap = document.getElementById('content-map');
  if (!contentMap) return; // Exit early if content map doesn't exist
  
  // Store handlers for cleanup
  const handlers = {
    mapToggleClick: null,
    mobileToggleClick: null,
    contentMapHeaderClick: null,
    documentClick: null,
    h3ToggleClicks: [],
    mapLinkClicks: []
  };
  
  // Add content map class to body
  document.body.classList.add('has-content-map');
  
  // Get all necessary elements first
  const mapToggle = contentMap.querySelector('.content-map-toggle');
  const mobileToggle = document.getElementById('mobile-map-toggle');
  const contentMapHeader = contentMap.querySelector('.content-map-header');
  
  if (!mapToggle) return; // Exit if toggle doesn't exist
  
  // Set initial state - start expanded
  contentMap.classList.remove('collapsed');
  
  // Main content map toggle for desktop
  handlers.mapToggleClick = function() {
    // On desktop, toggle collapsed state
    if (window.innerWidth >= 900) {
      contentMap.classList.toggle('collapsed');
      const isCollapsed = contentMap.classList.contains('collapsed');
      mapToggle.setAttribute('aria-expanded', !isCollapsed);
      
      // Force layout recalculation to ensure transition works
      const pageContent = document.querySelector('.page-content');
      if (pageContent) {
        window.getComputedStyle(pageContent).paddingLeft;
      }
    } 
    // On mobile, close the mobile menu
    else if (mobileToggle) {
      contentMap.classList.remove('active');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  };
  mapToggle.addEventListener('click', handlers.mapToggleClick);
  
  // Mobile toggle
  if (mobileToggle) {
    handlers.mobileToggleClick = function() {
      contentMap.classList.toggle('active');
      mobileToggle.classList.toggle('active');
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
    };
    mobileToggle.addEventListener('click', handlers.mobileToggleClick);
  }
  
  // H3 accordions - Add null check before forEach
  const h3Toggles = contentMap.querySelectorAll('.h3-toggle');
  if (h3Toggles && h3Toggles.length > 0) {
    h3Toggles.forEach((toggle, index) => {
      if (!toggle) return;
      
      handlers.h3ToggleClicks[index] = function() {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !expanded);
        
        const list = toggle.nextElementSibling;
        if (!list) return;
        if (expanded) {
          list.setAttribute('hidden', '');
        } else {
          list.removeAttribute('hidden');
        }
      };
      
      toggle.addEventListener('click', handlers.h3ToggleClicks[index]);
    });
  }
  
  // Close mobile menu when clicking a link - Add null check before forEach
  const mapLinks = contentMap.querySelectorAll('.map-link');
  if (mapLinks && mapLinks.length > 0 && mobileToggle) {
    mapLinks.forEach((link, index) => {
      if (!link) return;
      
      handlers.mapLinkClicks[index] = function() {
        if (window.innerWidth < 900) {
          contentMap.classList.remove('active');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      };
      
      link.addEventListener('click', handlers.mapLinkClicks[index]);
    });
  }
  
  // NEW: Close when clicking outside of content map (mobile only)
  handlers.documentClick = function(event) {
    // Only in mobile mode
    if (window.innerWidth >= 900) return;
    
    // If the content map is not active, do nothing
    if (!contentMap.classList.contains('active')) return;
    
    // Check if the click was inside the content map or the toggle button
    if (!contentMap.contains(event.target) && event.target !== mobileToggle && !mobileToggle.contains(event.target)) {
      // Close the content map
      contentMap.classList.remove('active');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  };
  document.addEventListener('click', handlers.documentClick);
  
  // NEW: Close when clicking on the content map header in mobile mode
  if (contentMapHeader) {
    handlers.contentMapHeaderClick = function(event) {
      // Only in mobile mode
      if (window.innerWidth >= 900) return;
      
      // Don't interfere with the desktop toggle button
      if (mapToggle.contains(event.target)) return;
      
      // Close the content map
      contentMap.classList.remove('active');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    };
    contentMapHeader.addEventListener('click', handlers.contentMapHeaderClick);
  }
  
  // Add cleanup function
  return function cleanup() {
    mapToggle.removeEventListener('click', handlers.mapToggleClick);
    
    if (mobileToggle) {
      mobileToggle.removeEventListener('click', handlers.mobileToggleClick);
    }
    
    if (contentMapHeader) {
      contentMapHeader.removeEventListener('click', handlers.contentMapHeaderClick);
    }
    
    document.removeEventListener('click', handlers.documentClick);
    
    // Clean up h3 toggle handlers
    if (h3Toggles && h3Toggles.length > 0) {
      h3Toggles.forEach((toggle, index) => {
        if (toggle && handlers.h3ToggleClicks[index]) {
          toggle.removeEventListener('click', handlers.h3ToggleClicks[index]);
        }
      });
    }
    
    // Clean up map link handlers
    if (mapLinks && mapLinks.length > 0) {
      mapLinks.forEach((link, index) => {
        if (link && handlers.mapLinkClicks[index]) {
          link.removeEventListener('click', handlers.mapLinkClicks[index]);
        }
      });
    }
  };
}