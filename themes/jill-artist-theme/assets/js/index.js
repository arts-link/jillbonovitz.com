// Import modules conditionally based on page elements
document.addEventListener('DOMContentLoaded', async () => {
  // Store cleanup functions
  window._cleanupFunctions = window._cleanupFunctions || [];
  
  // Always load navigation
  const { initNavigation } = await import('./modules/navigation.js');
  const navCleanup = initNavigation();
  if (navCleanup) window._cleanupFunctions.push(navCleanup);
  
  // Load slideshow only if needed
  if (document.querySelector('.slideshow')) {
    const { initSlideshow } = await import('./modules/slideshow.js');
    const slideshowCleanup = initSlideshow();
    if (slideshowCleanup) window._cleanupFunctions.push(slideshowCleanup);
  }
  
  // Load content map only if needed
  if (document.getElementById('content-map')) {
    const { initContentMap } = await import('./modules/content-map.js');
    const mapCleanup = initContentMap();
    if (mapCleanup) window._cleanupFunctions.push(mapCleanup);
  }
  
  // Clean up previous page's event handlers
  document.addEventListener('beforeunload', () => {
    window._cleanupFunctions.forEach(cleanup => {
      if (typeof cleanup === 'function') cleanup();
    });
    window._cleanupFunctions = [];
  });
});