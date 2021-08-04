'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeFoto from './modules/changeFoto';
import check from './modules/check';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import maskPhone from './modules/maskPhone';

  // timer
  countTimer('31 december 2022');

  // menu
  toggleMenu();

  // popup
  togglePopUp();

  // табы
  tabs();

  // слайдер
  slider(1500, true);

  // смена фотографий
  changeFoto();

  // Дата Атрибуты, Регулярные Выражения
  check();
  
  // calc
  calc();
  
  // send-ajax-form
  sendForm();
  
  // маска для поля телефона
  maskPhone('#form1-phone, #form2-phone, #form3-phone');