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
    allTextInputs = document.querySelectorAll('input[type="text"]');

let expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    periodSelect = document.querySelector('.period-select'), 
    incomeItems = document.querySelectorAll('.income-items');

class AppData {
  constructor() {
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
    this.moneyDeposit = 0;
  }
  start() {
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth(); 
    this.getAddExpenses();
    this.getAddIncome();
    this.getIncomeMonth();
    this.getBudget();
    this.getCancel();
    this.showResalt();
  }
  cancel() {
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
    this.eventsListeners();
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
  }
  showResalt() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod(); 
    periodSelect.addEventListener('input', () => {
      periodAmount.textContent = '1';
      periodAmount.textContent = periodSelect.value; 
      incomePeriodValue.value = this.calcPeriod();
    });
  }
  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelectorAll('input').forEach(elem => elem.value = '');
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  }
  addIncomeBlock() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelectorAll('input').forEach(elem => elem.value = '');
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
      incomePlus.style.display = 'none';
    }
  }
  getExpenses(){
    expensesItems.forEach((item) =>{
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }
  getIncome() {
    incomeItems.forEach((item) =>{
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        this.income[itemIncome] = cashIncome;
      }
    });
  }
  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) =>{
      item = item.trim();
      if(item !== ''){
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    additionalIncomeItem.forEach((item) =>{
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }
  getIncomeMonth() {
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getBudget() {
    this.budgetMonth = (this.budget + this.incomeMonth - this.expensesMonth);
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }
  getCancel() {
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
  }
  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }
  isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
  }
  eventsListeners() {
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.cancel.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
    incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
    start.disabled = true;
    salaryAmount.addEventListener('input', () => {
      if(this.isNumber(salaryAmount.value)){
        start.disabled = false;
      } else {start.disabled = true;
      }
    });
  }
}
const appData = new AppData();

appData.eventsListeners();
