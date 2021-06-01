'use strict';

let lang = +prompt('Какой ваш язык?/What is y lang? ru - 1/en - 2');

if (lang === 1) {
  console.log('Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
} else if (lang === 2) {
  console.log('Monday, tuesday, wednesday, thursday, friday, saturday, sunday');
} else {
  alert(`Нужно ввести 1 или 2/You need to enter 1 or 2`);
}

lang = +prompt('Какой ваш язык?/What is y lang? ru - 1/en - 2');

switch (lang) {
  case 1:
    console.log('Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
    break;
  case 2:
    console.log('Monday, tuesday, wednesday, thursday, friday, saturday, sunday');
    break;
  default:
    alert(`Нужно ввести 1 или 2/You need to enter 1 or 2`);
}


