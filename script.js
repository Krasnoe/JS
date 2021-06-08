'use strict';

let bot = function(){
  const a = 50;
  let b = 0;
  b = prompt('Угадай число от 1 до 100');
    
  if (b > a) {
    alert('Загаданное число меньше');
    console.log(b);
    bot();

  } 
  if (b < a && b > 0){
    alert('Загаданное число больше');
    console.log(b);
    bot();

  } 
  if (b === '50'){
    alert('Поздравляю, Вы угадали!!!');

  } 
  if (b === null){
    console.log(b);
    alert('Игра окончена');
    return;
  }
  if (isNaN(b) || b === '0' || b.trim() === ''){
    console.log(b);
    alert('Введи число!');
    bot();
  } 
};

bot();



