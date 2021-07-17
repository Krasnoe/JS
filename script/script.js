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
      currentClick = currentClick.closest('.col-md-1, main');
      if(currentClick){
        handlerMenu();
      } else {
        currentClick = event.target;
      }
      currentClick = currentClick.closest('li>a, .close-btn');
      if(currentClick){
        handlerMenu();
      }
      console.log(currentClick);
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

});
