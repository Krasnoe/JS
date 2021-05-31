'use strict';

// Доход за месяц
const money = 50000,
// Дополнительный доход
  income = 'подработка',
// Дополнительные расходы
  addExpenses= 'Еда, Кальян, Виски',
// Любое булево значение
  deposit = true,
// Сумма, которую хочу накопить
  mission = 350000,
// От 1 до 12 месяцев
  period = 12,
// Дневной бюджет
  budgetDay = money / 30;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);