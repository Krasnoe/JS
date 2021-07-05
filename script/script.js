window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // timer
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
    const zero = str => str < 10 ? `0${str}` : str;
    function updateClock(){
      let timer = getTimeRemaining();
      timerHours.textContent = zero(timer.hours);
      timerMinutes.textContent = zero(timer.minutes);
      timerSeconds.textContent = zero(timer.seconds);
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
  // countTimer('05 jule 2021');

});
