'use strict';

import toggleMenu from './modules/toggleMenu';
import slider from './modules/slider';
import scrolls from './modules/scrolls';
import SliderCarousel from './modules/SliderCarousel';
import sendForm from './modules/sendForm';
import maskPhone from './modules/maskPhone';
import accordeon from './modules/accordeon';


toggleMenu();

slider(3000, true);

scrolls();

const carousel = new SliderCarousel({
  main: '.services-elements',
  wrap: '.services-carousel',
  next: '.arrow-right',
  prev: '.arrow-left',
  slidesToShow: 3,
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

sendForm();

maskPhone('.tel');

accordeon();