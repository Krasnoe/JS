'use strict';

const DomElement = function (selector, height, width, bg, fontSize){
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
};

DomElement.prototype.getElement = function () {

  if(this.selector.match(/^\./)) {
    let newElement = document.createElement('div');
    newElement.classList.add(this.selector.substring(1));
    newElement.textContent = prompt('Введите любой текст', 'Что ж, значит точка');
    document.body.append(newElement);
  }
  if(this.selector.match(/^\#/)){
    let newElement = document.createElement('p');
    newElement.id = this.selector.substring(1);
    newElement.textContent = prompt('Введите любой текст', 'решетка тоже неплохо');
    document.body.append(newElement);
  }
  let element = document.querySelector(this.selector);
  element.style.cssText = `
    height: ${this.height};
    width: ${this.width};
    background: ${this.bg};
    font-size: ${this.fontSize};
  `;
};
let question = prompt('какой знак . или #?');
if(question === '.'){
  const NewDomElement = new DomElement('.newElement', '100px', '100px', 'red', '14px');
  NewDomElement.getElement();
}
if(question === '#'){
  const NewDomElement = new DomElement('#newElement', '100px', '200px', 'yellow', '14px');
  NewDomElement.getElement();
}