const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
        input = document.querySelectorAll('input'),
        name = document.getElementsByName('fio')[0],
        statusMessage = document.createElement('div');

  statusMessage.style.cssText = `
    font-size: 2rem;
    color: black;
    text-align: center;
  `;

  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    });
  };

  document.addEventListener('input', (event) => {
    if(event.target.placeholder === 'Ваше имя'){
      event.target.value = event.target.value.replace(/[^а-яё\s]/gi,'');
    }
  });

  input.forEach((elem) => {
    elem.addEventListener('blur', () => {
    name.value = name.value.replace(/([а-яё])([а-яё]+)/gi, (match, val1, val2) => val1.toUpperCase() + val2);
    });
  });

  let valid = false;

  document.addEventListener('input', (event) => {
    if(event.target.placeholder === 'Ваше имя' && /^[а-яё]{3,20}$/i.test(event.target.value)){
      valid = true;
      return;
    } else {
      valid = false;
    }
    if(event.target.placeholder === 'Телефон*' && event.target.value.length === 18){
      valid = true;
      return;
    } else {
      valid = false;
    }
  });


  document.addEventListener('submit', (event) => {
    event.preventDefault();
    let target = event.target;
    if(valid === true){
      target.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(target);
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });
      input.forEach((item) => {
        item.value = '';
      });
      postData(body)
            .then((response) => {
              if(response.status !== 200){
                throw new Error('Status network not 200');
              }
              statusMessage.textContent = successMessage;
              document.querySelector('.feedback').value = 'отправлено';
              setTimeout(() => {
                document.querySelector('.feedback').value = 'отправить';
                statusMessage.textContent = '';
              }, 5000);
            })
            .catch(error => {
              statusMessage.textContent = errorMessage;
              console.error(error);
              document.querySelector('.feedback').value = 'отправляется';
              setTimeout(() => {
                document.querySelector('.feedback').value = 'отправить';
                statusMessage.textContent = '';
              }, 5000);
            });
    } else {
      return;
    }
    valid = false;
  });
};
export default sendForm;