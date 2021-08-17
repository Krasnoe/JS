const slider = (time, booling) => {
  const slide = document.querySelectorAll('.item'),
        slider = document.querySelector('.top-slider'),
        table = document.querySelectorAll('.table');
        
  let currentSlide = 0,
      interval;

  const ul = document.createElement('ul');
  ul.className = 'slick-dots';
  slider.appendChild(ul);
  // const dotParent = document.querySelector('.slick-dots');

  for (let i = 0; i < slide.length; i++) {
      const dots = document.createElement('li');
      dots.className = 'dot';
      ul.appendChild(dots);
  }

  const dot = document.querySelectorAll('.dot');
        dot[0].classList.add('slick-active');
  
  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };

  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };
  
  const addStyle = () => {
    const style = document.createElement('style');
    style.textContent = `
      .item-active {
        position: absolute !important;
        background-size: cover;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
      }
      .dot {
        z-index: 15;
      }
      `;
    document.head.appendChild(style);
  };
  addStyle();

  const autoPlaySlide = () => {
    prevSlide(slide, currentSlide, 'item-active');
    prevSlide(table, currentSlide, 'active');
    prevSlide(dot, currentSlide, 'slick-active');
    currentSlide++;
    if(currentSlide >= slide.length){
      currentSlide = 0;
    }
    nextSlide(slide, currentSlide, 'item-active');
    nextSlide(table, currentSlide, 'active');
    nextSlide(dot, currentSlide, 'slick-active');
  };

  const startSlide = () => {
    if(booling){
      interval = setInterval(autoPlaySlide, time);
    }
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  slider.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;
    
    if(!target.matches('.dot')){
      return;
    }
    prevSlide(slide, currentSlide, 'item-active');
    prevSlide(table, currentSlide, 'active');
    prevSlide(dot, currentSlide, 'slick-active');
    if(target.matches('.dot')){
      dot.forEach((elem, index) => {
        if(elem === target){
          currentSlide = index;
        }
      });
    }
    if(currentSlide >= slide.length){
      currentSlide = 0;
    }
    if(currentSlide < 0){
      currentSlide = slide.length - 1;
    }
    nextSlide(slide, currentSlide, 'item-active');
    nextSlide(table, currentSlide, 'active');
    nextSlide(dot, currentSlide, 'slick-active');
  });
  
  slider.addEventListener('mouseover', (event) => {
    if(event.target.matches('.dot')){
      stopSlide();
    }
  });

  slider.addEventListener('mouseout', (event) => {
    if(event.target.matches('.dot')){
      startSlide();
    }
  });
  
  startSlide();
};
export default slider;