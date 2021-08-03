const toggleMenu = () => {
  const menu = document.querySelector('menu');
  const handlerMenu = () => {
    menu.classList.toggle('active-menu');
  };
  
  document.addEventListener('click', (event) =>{
    let currentClick = event.target;
    if(currentClick.closest('.col-md-1')){
      handlerMenu();
    } 
    if(currentClick.closest('li>a, .close-btn')){
      handlerMenu();
    } 
    if(!currentClick.closest('.active-menu, .col-md-1')){
      menu.classList.remove('active-menu');
    }
  });
};
export default toggleMenu;