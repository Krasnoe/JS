'use strict';

let money = parseInt(prompt('Ваш месячный доход?'), 10),
  income = 'подработка',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Например, еда, одежда, проездной'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 350000,
  expenses1 = prompt('Введите обязательную статью расходов?'),
  expenses2 = prompt('Введите обязательную статью расходов?'),
  amount1 = parseInt(prompt('Во сколько это обойдется?'), 10),
  amount2 = parseInt(prompt('Во сколько это обойдется?'), 10),
  budgetMonth = (money - (amount1 + amount2)),
  budgetDay = budgetMonth / 30,
  period = Math.ceil(mission / budgetMonth);

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);
console.log(budgetMonth);
console.log(period);

if (budgetDay >= 1200){
  console.log('У вас высокий уровень дохода');
} 
else if (budgetDay >= 600 && budgetDay < 1200){
  console.log('У вас средний уровень дохода');
} 
else if (budgetDay >= 0 && budgetDay < 600){
  console.log('К сожалению у вас уровень дохода ниже среднего');
} 
else {
  console.log('Что то пошло не так');
}