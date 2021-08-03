const check = () => {
  const calcBlock = document.querySelector('.calc-block');

  calcBlock.addEventListener('input', (event) => {
    if(event.target.closest('.calc-square, .calc-count, .calc-day')){
      event.target.value = event.target.value.replace(/\D/g, '');
    }
  });

  document.addEventListener('input', (event) => {
    const target = event.target;
    if(target.closest('#form1-name, #form2-name, #form3-name')){
      target.value = target.value.replace(/[^а-яё\s]/gi,'');
    }
    if(target.closest('#form2-message')){
      target.value = target.value.replace(/[a-z]/gi,'');
    }
    if(event.target.closest('#form1-email, #form2-email, #form3-email')){
      target.value = target.value.replace(/[а-яё0-9+^$\][}{)(?/]/gi, '');
    }
    if(event.target.closest('#form1-phone, #form2-phone, #form3-phone')){
      target.value = target.value.replace(/[^0-9\+]/gi, '');
    }
  });

  const input = document.querySelectorAll('input'),
        name1 = document.getElementById('form1-name'),
        name2 = document.getElementById('form2-name'),
        name3 = document.getElementById('form3-name');

  input.forEach((elem) => {
    elem.addEventListener('blur', () => {
      elem.value = elem.value.replace(/\s+/g, ' ')
                              .replace(/\-+/g, '-')
                              .replace(/^\-*\s*\-*|\-*\s*\-*$/g, '')
                              .replace(/^\s*\-*\s*|\s*\-*\s*$/g, '').trim();
      name1.value = name1.value.replace(/([а-яё])([а-яё]+)/gi, (match, val1, val2) => val1.toUpperCase() + val2);
      name2.value = name2.value.replace(/([а-яё])([а-яё]+)/gi, (match, val1, val2) => val1.toUpperCase() + val2);
      name3.value = name3.value.replace(/([а-яё])([а-яё]+)/gi, (match, val1, val2) => val1.toUpperCase() + val2);
    });
  });
};
export default check;