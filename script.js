'use strict';

const buttonStart = document.getElementById('start'),
      plusIncome = document.getElementsByTagName('button')[0],
      plusExpenses = document.getElementsByTagName('button')[1],
      depositCheckbox = document.querySelector('#deposit-check'),
      additionalIncome = document.querySelectorAll('.additional_income-item'),
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('.ncome_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      rangePeriod = document.querySelector('.period-select'),
      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-title'),
      incomeAmount = document.querySelector('.income-amount'),
      expensesTitle = document.querySelector('.expenses-title'),
      expensesAmount = document.querySelector('.expenses-amount'),
      additionalExpenses = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount');


const isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function(n){
  return (n === null || n.length === 0 || n.trim() === '' || isNumber(n));
};

let money;

const start = function() {
  do{
    money = prompt('Ваш месячный доход?', 50000);
  } while (!isNumber(money) || money === '' || money === null);
};
start();

const appData = {
  income: {},
  addIncome: [],
  expenses: {}, // объект с расходами на месяц
  addExpenses: [], // Возможные расходы
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 350000, // цель
  period: 0, 
  budget: money, // ЗП на месяц
  budgetDay: 0, // остаток на день
  budgetMonth: 0, // остаток на месяц
  expensesMonth: 0, // расходы за месяц

  asking: function(){
    
    if(confirm('Есть ли у вас дополнительный источник заработка?')){
      let itemIncome = prompt('Какой у вас дополнительный зароботок?', 'Таксую');
      while(isString(itemIncome)){
        itemIncome = prompt('Какой у вас дополнительный зароботок?', 'Таксую');
      }
      let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
      while(!isNumber(cashIncome) || cashIncome === '' || cashIncome === null){
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
      }
      appData.income[itemIncome] = cashIncome;
    }
    
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Еда, одежда, проездной');
      while(isString(addExpenses)){
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Еда, одежда, проездной');
      }
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        // for (let i = 0; i < appData.addExpenses.length; i++) {
        //   appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1);}
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
    for (let i = 0; i < 2; i++) {
        let question1 = 0, 
            question2 = 0; 
        question1 = prompt('Введите обязательную статью расходов');
        while(isString(question1)){
          question1 = prompt('Введите обязательную статью расходов');
        }
        question2 = +prompt('Во сколько это обойдется?');
        while (isNaN(question2) || question2 === null || question2 === 0){
          question2 = +prompt('Во сколько это обойдется?');
        }
        appData.expenses[question1] = question2;
        }
        },

    getExpensesMonth: function(){
        for (let key in appData.expenses){
          appData.expensesMonth += appData.expenses[key];
        }
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
    getInfoDeposit: function(){
      if(appData.deposit){
        appData.percentDeposit = +prompt('Какой годовой процент?', 10);
        while (isNaN(appData.percentDeposit) || appData.percentDeposit === null || appData.percentDeposit === 0){
          appData.percentDeposit = +prompt('Какой годовой процент?', 10);
        }
        appData.moneyDeposit = +prompt('Какая сумма заложена?', 10000);
        while (isNaN(appData.moneyDeposit) || appData.moneyDeposit === null || appData.moneyDeposit === 0){
          appData.moneyDeposit = +prompt('Какая сумма заложена?', 10000);
        }
      }
    },
    calcSavedMoney: function(){
      return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getStatusIncome();
appData.getInfoDeposit();
appData.calcSavedMoney();

console.log(`Расходы за месяц: ${appData.expensesMonth}`);
appData.getTargetMonth();
console.log(appData.getStatusIncome());
console.log("Наша программа включает в себя данные: ");

for (let key2 in appData) {
  console.log(key2 + " : " + appData[key2]);
}
// console.log(appData.addExpenses.join(', '));
console.log(String(appData.addExpenses.map(item => item[0].toUpperCase() + item.slice(1))));