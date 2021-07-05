window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  function countTimer(deadline) {
    let time = document.getElementById('time'),
        dayOfWeek = document.getElementById('dayofweek'),
        day = document.getElementById('day'),
        timeToNY = document.getElementById('timeremaining');
  
    function getTimeRemaining(){
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        timeNow = new Date(),
        days = Math.floor((timeRemaining / 60 / 60 / 24) % 365);
        return {days, timeNow};
    }
    function updateClock(){
      let timer = getTimeRemaining();
      // time
      time.textContent = timer.timeNow.toLocaleTimeString('ru');
      // dayOfWeekNow
      const dayOfWeekNow = new Date().getDay(),
            days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
      dayOfWeek.textContent = days[dayOfWeekNow];
      // day
      if(new Date().getHours() > 5 & new Date().getHours() < 12){
        day.textContent = 'Доброе утро';
      } else if(new Date().getHours() > 12 & new Date().getHours() < 18){
        day.textContent = 'Добрый день';
      } else if(new Date().getHours() > 18 & new Date().getHours() < 24){
        day.textContent = 'Добрый вечер';
      } else {
        day.textContent = 'доброй ночи';
      }
      // n days
      const declination = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

      timeToNY.textContent =`${timer.days} ${declination(timer.days, ['день', 'дня', 'дней'])}`;

    }
    setInterval(updateClock, 1000);
  }

  countTimer('01 january 2022');

});