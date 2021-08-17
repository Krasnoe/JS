const scrolls = () => {
  const up = document.querySelector('.up');

  const addStyle = () => {
    const style = document.createElement('style');
    style.textContent = `
      .up {
        display: none;
      }  
      .up-active {
        display: block !important;
      }
      `;
    document.head.appendChild(style);
  };
  addStyle();

  const addClass = () => {
    const scroll = window.pageYOffset;
    if (scroll >= 503) {
      up.classList.add('up-active');
    }
    if (scroll === 0) {
      up.classList.remove('up-active');
    }
  };
  addClass();

  const goTop = () => {
    if (window.pageYOffset > 0) {
      window.scrollTo(window.pageYOffset, 0);
    }
  };

  up.addEventListener('click', goTop);
  document.addEventListener('scroll', addClass);
};
export default scrolls;