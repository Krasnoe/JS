'use strict';

const money = parseInt(prompt('Ваш месячный доход?'), 10),
  income = 'подработка',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Еда, одежда, проездной'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 350000,
  expenses1 = prompt('Введите обязательную статью расходов?'),
  amount1 = parseInt(prompt('Во сколько это обойдется?'), 10),
  expenses2 = prompt('Введите обязательную статью расходов?'),
  amount2 = parseInt(prompt('Во сколько это обойдется?'), 10),
  accumulatedMonth = getAccumulatedMonth(),
  budgetDay = Math.floor(accumulatedMonth / 30);

let showTypeOf = function(data){
  console.log(typeof(data));
};

// Сумма всех обязательных расходов за месяц
function getExpensesMonth(){
  return (amount1 + amount2);
}

// Накопления за месяц
function getAccumulatedMonth(){
  return (money - getExpensesMonth());
}

// За какой период будет достигнута цель
function getTargetMonth(){
  return Math.ceil(mission / accumulatedMonth);
}

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

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Расходы за месяц: ', getExpensesMonth());
console.log(addExpenses.toLowerCase().split(', '));
console.log('Cрок достижения цели в месяцах: ', getTargetMonth());
console.log(`Бюджет на день: ${budgetDay}`);
console.log(getStatusIncome());


