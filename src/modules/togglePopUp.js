const togglePopUp = () => {
  const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupContent = document.querySelector('.popup-content');

  let count = 0,
      flyInterval;
  let flyAnimate = () => {
    count++;
    if(count < 60.1){
      popupContent.style.transform = `rotate(${count * 6}deg)`;
    } else {
      cancelAnimationFrame(flyInterval);
      count = 0;
      return;
    }
    flyInterval = requestAnimationFrame(flyAnimate);
  };
  
  popupBtn.forEach((elem) => {
    elem.addEventListener('click', () => {
      if(document.documentElement.clientWidth < 768){
        popup.style.display = 'block';
      } else {
        popup.style.display = 'block';
        flyInterval = requestAnimationFrame(flyAnimate);
      }
    });
  });
  
  popup.addEventListener('click', (event) => {
    let target = event.target;
    if(target.classList.contains('popup-close')){
      popup.style.display = 'none';
    } else {
      target = target.closest('.popup-content');
      if(!target){
        popup.style.display = 'none';
      }
    }
  });
};
export default togglePopUp;