export function initNavigation() {
  
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNavigation = document.querySelector('.main-navigation');
  
  if (!menuToggle || !mainNavigation) return;
  
  menuToggle.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
    
    mainNavigation.classList.toggle('active');
    
  });
}