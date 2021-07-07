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
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li');
    
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };
    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
    
  };
  toggleMenu();

  // popup**************************************************************************
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupClose = document.querySelector('.popup-close'),
          popupContent = document.querySelector('.popup-content');

    let count = 0;
    let flyInterval;
    let flyAnimate = () => {
      count++;
      if(count < 361){
        popupContent.style.transform = `rotate(${count}deg)`;
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

    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });
    
  };
  
  togglePopUp();


});