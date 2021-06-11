'use strict';

const isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

const start = function() {
  do{
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
};
start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {}, // объект с расходами на месяц
  addExpenses: [], // Возможные расходы
  deposit: false,
  mission: 350000, // цель
  period: 0, 
  budget: money, // ЗП на месяц
  budgetDay: 0, // остаток на день
  budgetMonth: 0, // остаток на месяц
  expensesMonth: 0, // расходы за месяц

  asking: function(){
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Еда, одежда, проездной');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
    for (let i = 0; i < 2; i++) {
        let question1 = 0, 
            question2 = 0; 
        question1 = prompt('Введите обязательную статью расходов');
        question2 = +prompt('Во сколько это обойдется?');
        while (isNaN(question2) || question2 === null || question2 === 0){
          question2 = +prompt('Во сколько это обойдется?');
        }
        appData.expenses[question1] = question2;
        } return;
        },

    getExpensesMonth: function(){
        for (let key in appData.expenses){
          appData.expensesMonth += appData.expenses[key];
        }
        return appData.expensesMonth;
      },
    getBudget: function(){
      appData.budgetMonth = (appData.budget - appData.expensesMonth);
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function(){
        appData.period = Math.ceil(appData.mission / appData.budgetMonth);
          if (appData.period >= 0) {
            console.log(`Cрок достижения цели в месяцах: ${appData.period}`);
          } else {
            console.log('Цель не будет достигнута');
          }
        return appData.period;
    },
    getStatusIncome: function(){
      if (appData.budgetDay >= 1200){
        return ('У вас высокий уровень дохода');
      } 
      else if (appData.budgetDay >= 600 && appData.budgetDay < 1200){
        return ('У вас средний уровень дохода');
      } 
      else if (appData.budgetDay >= 0 && appData.budgetDay < 600){
        return ('К сожалению у вас уровень дохода ниже среднего');
      } 
      else {
        return ('Что то пошло не так');
      }
    },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getStatusIncome();

console.log(`Расходы за месяц: ${appData.expensesMonth}`);
appData.getTargetMonth();
console.log(appData.getStatusIncome());

console.log("Наша программа включает в себя данные: ");

for (let key2 in appData) {
  console.log(key2 + " : " + appData[key2]);
}

