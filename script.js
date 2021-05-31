'use strict';

// Доход за месяц
let money = 50000;
// Дополнительный доход
let income = 20000;
// Дополнительные расходы
let addExpenses= 'еда, кальян, виски';
// Любое булево значение
let deposit = true;
// Сумма, которую хочу накопить
let mission = 350000;
// От 1 до 12 месяцев
let period = 12;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log([addExpenses.toLowerCase()]);

// Дневной бюджет
let budgetDay = money / 30;
console.log(budgetDay);