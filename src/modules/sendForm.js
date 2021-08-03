const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
        input = document.querySelectorAll('input'),
        statusMessage = document.createElement('div');

  statusMessage.style.csstext = 'font-size: 2rem;';
  statusMessage.style.color = 'white';

  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    });
  };

  document.addEventListener('submit', (event) => {
    event.preventDefault();
    let target = event.target;
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
            })
            .catch(error => {
              statusMessage.textContent = errorMessage;
              console.error(error);
            });
  });
};
export default sendForm;