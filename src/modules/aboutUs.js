const aboutUs = () => {

  document.querySelector('.num1').style.opacity = '1';
  document.querySelector('.num2').style.opacity = '1';
  document.querySelector('.num3').style.opacity = '1';
  document.querySelector('.num4').style.opacity = '1';

  let count = 0,
      flyInterval;

  const flyAnimate = () => {
    count++;
    if(count < 31){
      document.querySelector('.num1').textContent = `${count}`;
      document.querySelector('.num2').textContent = `${count + 15}`;
      document.querySelector('.num3').textContent = `${count - 17}`;
      document.querySelector('.num4').textContent = `${count + 148}`;
    } else {
      cancelAnimationFrame(flyInterval);
      count = 0;
      return;
    }
    flyInterval = requestAnimationFrame(flyAnimate);
  };

  let stop = false;

  document.addEventListener('scroll', () => {
    if(window.pageYOffset > 1200 && !stop){
      flyAnimate();
      stop = true;
    }
  });
};
export default aboutUs;