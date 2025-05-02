export function initNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNavigation = document.querySelector('.main-navigation');
  
  if (!menuToggle || !mainNavigation) return;
  
  // Store handler reference
  const toggleHandler = function() {
    // Check if elements still exist in DOM before operating on them
    if (!document.body.contains(menuToggle) || !document.body.contains(mainNavigation)) {
      menuToggle.removeEventListener('click', toggleHandler);
      return;
    }
    
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
    mainNavigation.classList.toggle('active');
  };
  
  menuToggle.addEventListener('click', toggleHandler);
  
  // Add cleanup function
  const cleanup = () => {
    menuToggle.removeEventListener('click', toggleHandler);
  };
  
  // Return cleanup function
  return cleanup;
}