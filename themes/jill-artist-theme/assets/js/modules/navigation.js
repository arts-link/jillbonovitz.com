export function initNavigation() {
  console.log('Navigation module initialized');
  
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNavigation = document.querySelector('.main-navigation');
  
  console.log('Menu toggle:', menuToggle);
  console.log('Main navigation:', mainNavigation);
  
  if (!menuToggle || !mainNavigation) return;
  
  menuToggle.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
    
    // CHANGED: Use 'active' instead of 'toggled' to match your CSS
    mainNavigation.classList.toggle('active');
    
    // Debug the state after toggle
    console.log('Toggle clicked. active class present:', mainNavigation.classList.contains('active'));
    console.log('aria-expanded:', this.getAttribute('aria-expanded'));
  });
}