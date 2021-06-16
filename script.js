'use script';

const books = document.querySelectorAll('.book'),
      adv = document.querySelector('.adv'),
      body = document.querySelector('body'),
      collection2book = books[0].querySelector('ul'),
      collection4book = books[4].querySelector('a'),
      collection5book = books[5].querySelector('ul'),
      collection6book = books[2].querySelector('ul'),
      elem2book = collection2book.querySelectorAll('li'),
      elem5book = collection5book.querySelectorAll('li'),
      elem6book = collection6book.querySelectorAll('li'),
      newElem = document.createElement('li');

newElem.textContent = 'Глава 8: За пределами ES6';

// Первое задание
books[0].before(books[1]);
books[2].before(books[4]);
books[5].after(books[2]);

// Второе
body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

// Третье
collection4book.textContent = 'Книга 3. this и Прототипы Объектов';
collection4book.style.color = 'darkkhaki';

// Четвертое
adv.remove();

// Пятое
elem2book[4].before(elem2book[8]);
elem2book[2].before(elem2book[3]);
elem2book[3].after(elem2book[6]);
elem2book[9].after(elem2book[2]);

elem5book[1].after(elem5book[9]);
elem5book[4].after(elem5book[2]);
elem5book[2].after(elem5book[6]);
elem5book[6].after(elem5book[7]);

// Шестое

collection6book.append(newElem);
elem6book[9].before(newElem);

console.log(collection4book);