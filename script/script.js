window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // timer **************************************************************
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

  function getTimeRemaining(){
    let dateStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      seconds = Math.floor(timeRemaining % 60),
      minutes = Math.floor((timeRemaining / 60) % 60),
      hours = Math.floor(timeRemaining / 60 / 60);
      return {timeRemaining, hours, minutes, seconds};
  }
  function updateClock(){
    let timer = getTimeRemaining();
    if(timer.hours < 10){
      timerHours.textContent = '0' + timer.hours;
    } else {
      timerHours.textContent = timer.hours;
    }
    if(timer.minutes < 10){
      timerMinutes.textContent = '0' + timer.minutes;
    } else {
      timerMinutes.textContent = timer.minutes;
    }
    if(timer.seconds < 10){
      timerSeconds.textContent = '0' + timer.seconds;
    } else {
      timerSeconds.textContent = timer.seconds;
    }
  }
  let idInterval = setInterval(updateClock, 1000),
      timer = getTimeRemaining().timeRemaining;

  if (timer === 0 || timer < 0) {
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
      clearInterval(idInterval);
  }
  }
  countTimer('31 december 2022');

  // menu********************************************************************
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
  toggleMenu();

  // popup**************************************************************************
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupContent = document.querySelector('.popup-content');

    let count = 0;
    let flyInterval;
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
  togglePopUp();

  // табы*************************************************************************
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');
    const toggleTabContent = (index) => {
      for(let i = 0; i < tabContent.length; i++){
        if(index === i){
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if(target){
        tab.forEach((item, i) => {
          if(item === target){
              toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();

  // слайдер************************************************************************
  const slider = (time, booling) => {
    const slide = document.querySelectorAll('.portfolio-item'),
    slider = document.querySelector('.portfolio-content'),
    dotParent = document.querySelector('.portfolio-dots');

    let currentSlide = 0,
        interval;

    for (let i = 0; i < slide.length; i++) {
      const dots = document.createElement('li');
      dots.className = 'dot';
      dotParent.appendChild(dots);
    }
    const dot = document.querySelectorAll('.dot');
          dot[0].classList.add('dot-active');

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if(currentSlide >= slide.length){
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
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

      if(!target.matches('.portfolio-btn, .dot')){
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if(target.matches('#arrow-right')){
        currentSlide++;
      } else if(target.matches('#arrow-left')){
        currentSlide--;
      } else if(target.matches('.dot')){
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

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });
    
    slider.addEventListener('mouseover', (event) => {
      if(event.target.matches('.portfolio-btn') || 
      event.target.matches('.dot')){
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', (event) => {
      if(event.target.matches('.portfolio-btn') || 
      event.target.matches('.dot')){
        startSlide();
      }
    });

    startSlide();



  };
  slider(1500, true);

  // смена фотографий***************************************************************
  const changeFoto = () => {
    document.addEventListener('mouseover', (event) => {
      const target = event.target;
      if(target.closest('.command__photo')){
        [target.src, target.dataset.img] = [target.dataset.img, target.src];
      }
    });
    document.addEventListener('mouseout', (event) => {
        const target = event.target;
        [target.src, target.dataset.img] = [target.dataset.img, target.src];
    });
  };
  changeFoto();

  // Дата Атрибуты, Регулярные Выражения*********************************************
  const check = () =>{
    const calcBlock = document.querySelector('.calc-block');
    calcBlock.addEventListener('input', (event) => {
      if(event.target.closest('.calc-square, .calc-count, .calc-day')){
        event.target.value = event.target.value.replace(/\D/g, '');
      }
    });

    document.addEventListener('input', (event) => {
      const target = event.target;
      if(target.closest('#form1-name, #form2-name, #form2-message')){
        target.value = target.value.replace(/[^а-яё\-\s]/gi,'');
      }
      if(event.target.closest('#form1-email, #form2-email')){
        target.value = target.value.replace(/[а-яё0-9+^$\][}{)(?/]/gi, '');
      }
      if(event.target.closest('#form1-phone, #form2-phone')){
        target.value = target.value.replace(/[^0-9\-)()]/gi, '');
      }
    });

    const input = document.querySelectorAll('input'),
          name1 = document.getElementById('form1-name'),
          name2 = document.getElementById('form2-name');
      input.forEach((elem) => {
        elem.addEventListener('blur', () => {
          elem.value = elem.value.replace(/\s+/g, ' ')
                                 .replace(/\-+/g, '-')
                                 .replace(/^\-*\s*\-*|\-*\s*\-*$/g, '')
                                 .replace(/^\s*\-*\s*|\s*\-*\s*$/g, '').trim();
          name1.value = name1.value.replace(/([а-яё])([а-яё]+)/gi, (match, val1, val2) => val1.toUpperCase() + val2);
          name2.value = name2.value.replace(/([а-яё])([а-яё]+)/gi, (match, val1, val2) => val1.toUpperCase() + val2);
      });
    });
    
  };
  check();
  
  // calc*****************************************************************************
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcDay = document.querySelector('.calc-day'),
          calcCount = document.querySelector('.calc-count'),
          totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
          countValue = 1,
          dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
          squareValue = +calcSquare.value;

      if(calcCount.value > 1){
        countValue += (calcCount.value - 1) / 10;
      }

      if(calcDay.value && calcDay.value < 5){
        dayValue *= 2;
      } else if(calcDay.value && calcDay.value < 10){
        dayValue *= 1.5;
      } 

      if(typeValue && squareValue){
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      totalValue.textContent = total;
    };

    calcBlock.addEventListener('change', (event) =>{
      const target = event.target;
      if(target.matches('select') || target.matches('input')){
        countSum();
      }
    });
  };
  calc();
  
});
