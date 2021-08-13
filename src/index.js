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
import SliderCarousel from './modules/SliderCarousel';

  // timer
  countTimer('16 august 2021');

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

  // слайдер Карусель
  const carousel = new SliderCarousel({
    main: '.companies-wrapper',
    wrap: '.companies-hor',
    slidesToShow: 4,
    infinity: true,
    responsive: [{
      breakpoint: 1024, 
      slidesToShow: 3,
    },
    {
      breakpoint: 768, 
      slidesToShow: 2,
    },
    {
      breakpoint: 576, 
      slidesToShow: 1,
    },
    ]
  });
  carousel.init();