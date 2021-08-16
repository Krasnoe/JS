const toggleMenu = () => {
  // const modalMenu = document.querySelector('.modal-callback'); //работает
  // console.log(modalMenu); 
  const handlerMenu = () => {
    document.querySelector('.modal-callback').classList.toggle('active-menu');
    document.querySelector('.modal-overlay').classList.toggle('active-menu');
  };

  const addStyle = () => {
    let style = document.createElement('style');
    style.textContent = `
      .active-menu {
        display: block;
      }
      `;
    document.head.appendChild(style);
  };
  addStyle();

  document.addEventListener('click', (event) =>{
    let currentClick = event.target;
    if(currentClick.matches('.callback-btn, .modal-overlay, .button-services') || currentClick.closest('.modal-close')){
      handlerMenu();
    } 
    
  });
};
export default toggleMenu;