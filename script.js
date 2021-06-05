'use strict';

const isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
const income = 'подработка';

const start = function() {
  do{
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
};

start();

const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Еда, одежда, проездной'),
deposit = confirm('Есть ли у вас депозит в банке?'),
mission = 350000;



const showTypeOf = function(data){
  console.log(typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

const expenses = [];

// Сумма всех обязательных расходов за месяц
const getExpensesMonth = function(){
  let param = 0;
  let sum = 0;
  
  for (let i = 0; i < 2; i++) {

    expenses[i] = prompt('Введите обязательную статью расходов?');

    param = +prompt('Во сколько это обойдется?');

    while (isNaN(param) || param.trim() === '' || param === null){
      param = +prompt('Во сколько это обойдется?');
    }
    sum += param;
    }
  return sum;

};


const expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ', expensesAmount);

// Накопления за месяц
const getAccumulatedMonth = function(a, b){
  return (a - b);
};

const accumulatedMonth = getAccumulatedMonth(money, expensesAmount);
const budgetDay = Math.floor(accumulatedMonth / 30);
  
// За какой период будет достигнута цель
const getTargetMonth = function(par1, par2){
  return Math.ceil(par1 / par2);
};

const getStatusIncome = function(){
  if (budgetDay >= 1200){
    return ('У вас высокий уровень дохода');
  } 
  else if (budgetDay >= 600 && budgetDay < 1200){
    return ('У вас средний уровень дохода');
  } 
  else if (budgetDay >= 0 && budgetDay < 600){
    return ('К сожалению у вас уровень дохода ниже среднего');
  } 
  else {
    return ('Что то пошло не так');
  }
};

console.log(addExpenses.toLowerCase().split(', '));
console.log('Cрок достижения цели в месяцах: ', getTargetMonth(mission, accumulatedMonth));
console.log(`Бюджет на день: ${budgetDay}`);
console.log(getStatusIncome());