const mobileMenu = () => {
  const addClass = () => {
    document.querySelector('.mobile-menu').classList.toggle('open');
  };

  document.addEventListener('click', (event) => {
    if(event.target.closest('.mob-menu-btn')){
      addClass();
    } 
    if(event.target.closest('.mobile-menu-close') || event.target.closest('li')){
      addClass();
    }
  });
};
export default mobileMenu();