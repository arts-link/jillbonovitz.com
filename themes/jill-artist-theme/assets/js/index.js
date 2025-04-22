// Import modules conditionally based on page elements
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Main script loaded');
  
  // Always load navigation
  const { initNavigation } = await import('./modules/navigation.js');
  initNavigation();
  
  // Load slideshow only if slideshow container exists
  if (document.querySelector('.slideshow')) {
    const { initSlideshow } = await import('./modules/slideshow.js');
    initSlideshow();
  }
  
  // Load content map only if content map exists
  if (document.getElementById('content-map')) {
    const { initContentMap } = await import('./modules/content-map.js');
    initContentMap();
  }
});