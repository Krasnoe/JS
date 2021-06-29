'use strict';

const start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheckbox = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'), 
    incomeTitle = document.querySelector('.income-items .income-title'),
    expensesTitle = document.querySelector('.expenses-items .expenses-title'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodAmount = document.querySelector('.period-amount'),
    allTextInputs = document.querySelectorAll('input[type="text"]'),
    isNumber = function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n) ;
    };
let expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    periodSelect = document.querySelector('.period-select'), 
    incomeItems = document.querySelectorAll('.income-items');

function stop(){
  start.disabled = true;
  salaryAmount.addEventListener('input', function(){
      if(isNumber(salaryAmount.value)){
    start.disabled = false;
    } else {start.disabled = true;
    }
});
}
stop();

const appData = {
  budget: 0, 
  budgetDay: 0, 
  budgetMonth: 0, 
  income: {}, 
  incomeMonth: 0, 
  addIncome: [],
  expenses: {}, 
  expensesMonth: 0, 
  addExpenses: [], 
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,

  start: function () {
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth(); 
    this.getAddExpenses();
    this.getAddIncome();
    this.getIncomeMonth();
    this.getBudget();
    this.getCancel();
    stop();
    this.showResalt();
  },
  cancel: function(){
    this.budget = 0; 
    this.budgetDay = 0; 
    this.budgetMonth = 0; 
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0; 
    allTextInputs.forEach(item => {
      item.value = '';
    });
    stop();
    if(expensesItems.length === 2){
      expensesItems[1].remove();
      expensesItems = document.querySelectorAll('.expenses-items');
    } else if (expensesItems.length === 3){
      expensesItems[1].remove();
      expensesItems[2].remove();
      expensesItems = document.querySelectorAll('.expenses-items');
      expensesPlus.style.display = 'block';
    }
    if(incomeItems.length === 2){
      incomeItems[1].remove();
      incomeItems = document.querySelectorAll('.income-items');
    } else if (incomeItems.length === 3){
      incomeItems[1].remove();
      incomeItems[2].remove();
      incomeItems = document.querySelectorAll('.income-items');
      incomePlus.style.display = 'block';
    }
  },
  showResalt: function(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod(); // для вывода периода равного 1
    periodSelect.addEventListener('input', () => {  // для вывода остальных периодов
      periodAmount.textContent = '1';
      periodAmount.textContent = periodSelect.value; 
      incomePeriodValue.value = this.calcPeriod();
    });
  },
  addExpensesBlock: function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function(){
    let cloneExpensesItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneExpensesItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
      incomePlus.style.display = 'none';
    }
  },
  getExpenses: function(){
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        this.expenses[itemExpenses] = cashExpenses;
      } 
    }, this); 
  }, 
  getIncome: function(){
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        this.income[itemIncome] = cashIncome;
      } 
    }, this);
  },
  getAddExpenses: function(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !== ''){
        this.addExpenses.push(item);
      }
    }, this);
  },
  getAddIncome: function(){
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        this.addIncome.push(itemValue);
      }
    }, this);
  },
  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },
  getIncomeMonth: function(){
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },
  getBudget: function () {
    this.budgetMonth = (this.budget + this.incomeMonth - this.expensesMonth);
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  getCancel: function(){
    if(this.start){
      start.style.display = 'none';
      cancel.style.display = 'block';
      allTextInputs.forEach(item => {
      item.setAttribute("readonly", true);
    });
      incomePlus.disabled = true;
      expensesPlus.disabled = true;
    }
    cancel.addEventListener('click', () => {
      this.cancel();
      start.style.display = 'block';
      cancel.style.display = 'none';
      allTextInputs.forEach(item => {
      item.removeAttribute("readonly", true);
    });
      incomePlus.disabled = false;
      expensesPlus.disabled = false;
    });
  },
  calcPeriod: function(){
    return this.budgetMonth * periodSelect.value;
  }
};

start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.cancel.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));

