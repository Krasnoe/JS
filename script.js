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
  incomePeriodValue = document.querySelector('.income_period-value'),
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  periodSelect = document.querySelector('.period-select'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-items .income-title'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  incomeItem = document.querySelectorAll('.income-items');

let expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomeItems = document.querySelectorAll('.income-items');

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function (n) {
  return (n === null || n.length === 0 || n.trim() === '' || isNumber(n));
};

const appData = {
  budget: 0, // ЗП на месяц
  budgetDay: 0, // остаток на день
  budgetMonth: 0, // остаток на месяц
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {}, // объект с расходами на месяц
  expensesMonth: 0, // расходы за месяц
  addExpenses: [], // Возможные расходы
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,

  start: function () {
    if(salaryAmount.value === ''){
      alert('Ошибка, после "Месячный доход" должно быть заполнено!');
      return;
    }
    appData.budget = +salaryAmount.value;
    appData.getExpenses();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getIncome();
    appData.getBudget();
    appData.showResalt();

  },
  showResalt: function(){
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcPeriod();
    additionalIncomeValue.value = appData.getIncome();
    console.log(appData.income);
    console.log(appData.expenses);
  },
  addExpensesBlock: function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
      plusExpenses.style.display = 'none';
    }
  },
  getExpenses: function(){
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function(){
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        appData.income[itemIncome] = cashIncome;
      }
      });
  },
  getAddExpenses: function(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function(){
    additionalIncome.forEach(function(item){
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = (appData.budget + appData.incomeMonth - appData.expensesMonth);
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      appData.percentDeposit = +prompt('Какой годовой процент?', 10);
      while (isNaN(appData.percentDeposit) || appData.percentDeposit === null || appData.percentDeposit === 0) {
        appData.percentDeposit = +prompt('Какой годовой процент?', 10);
      }
      appData.moneyDeposit = +prompt('Какая сумма заложена?', 10000);
      while (isNaN(appData.moneyDeposit) || appData.moneyDeposit === null || appData.moneyDeposit === 0) {
        appData.moneyDeposit = +prompt('Какая сумма заложена?', 10000);
      }
    }
  },
  calcPeriod: function(){
    return appData.budgetMonth * periodSelect.value;
  }
};

buttonStart.addEventListener('click', appData.start);
plusExpenses.addEventListener('click', appData.addExpensesBlock);



  // console.log(appData.addExpenses.join(', '));
  // console.log(String(appData.addExpenses.map(item => item[0].toUpperCase() + item.slice(1))));