export function initContentMap() {
  // First check if content map exists before proceeding
  const contentMap = document.getElementById('content-map');
  if (!contentMap) return; // Exit early if content map doesn't exist
  
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
  mapToggle.addEventListener('click', function() {
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
  });
  
  // Mobile toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      contentMap.classList.toggle('active');
      mobileToggle.classList.toggle('active');
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
    });
  }
  
  // H3 accordions - Add null check before forEach
  const h3Toggles = contentMap.querySelectorAll('.h3-toggle');
  if (h3Toggles && h3Toggles.length > 0) {
    h3Toggles.forEach(toggle => {
      if (!toggle) return;
      toggle.addEventListener('click', function() {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !expanded);
        
        const list = toggle.nextElementSibling;
        if (!list) return;
        if (expanded) {
          list.setAttribute('hidden', '');
        } else {
          list.removeAttribute('hidden');
        }
      });
    });
  }
  
  // Close mobile menu when clicking a link - Add null check before forEach
  const mapLinks = contentMap.querySelectorAll('.map-link');
  if (mapLinks && mapLinks.length > 0 && mobileToggle) {
    mapLinks.forEach(link => {
      if (!link) return;
      link.addEventListener('click', function() {
        if (window.innerWidth < 900) {
          contentMap.classList.remove('active');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
  
  // NEW: Close when clicking outside of content map (mobile only)
  document.addEventListener('click', function(event) {
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
  });
  
  // NEW: Close when clicking on the content map header in mobile mode
  if (contentMapHeader) {
    contentMapHeader.addEventListener('click', function(event) {
      // Only in mobile mode
      if (window.innerWidth >= 900) return;
      
      // Don't interfere with the desktop toggle button
      if (mapToggle.contains(event.target)) return;
      
      // Close the content map
      contentMap.classList.remove('active');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  }
}