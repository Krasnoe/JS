'use strict';

const start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodAmount = document.querySelector('.period-amount'),
    allTextInputs = document.querySelectorAll('input[type="text"]'),
    depositCheck = document.getElementById('deposit-check'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    periodSelect = document.querySelector('.period-select');


let expensesItems = document.querySelectorAll('.expenses-items'),
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
    this.getInfoDeposit();
    this.depositHandler();
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
    this.depositHandler();
    this.eventsListeners();
    if (expensesItems.length === 2) {
      expensesItems[1].remove();
      expensesItems = document.querySelectorAll('.expenses-items');
    } else if (expensesItems.length === 3) {
      expensesItems[1].remove();
      expensesItems[2].remove();
      expensesItems = document.querySelectorAll('.expenses-items');
      expensesPlus.style.display = 'block';
    }
    if (incomeItems.length === 2) {
      incomeItems[1].remove();
      incomeItems = document.querySelectorAll('.income-items');
    } else if (incomeItems.length === 3) {
      incomeItems[1].remove();
      incomeItems[2].remove();
      incomeItems = document.querySelectorAll('.income-items');
      incomePlus.style.display = 'block';
    }
    depositCheck.checked = false;
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
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelectorAll('input').forEach(elem => elem.value = '');
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  }
  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelectorAll('input').forEach(elem => elem.value = '');
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  }
  getExpenses() {
    expensesItems.forEach(item => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }
  getIncome() {
    incomeItems.forEach(item => {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    });
  }
  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(item => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    additionalIncomeItem.forEach(item => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth() {
    for (const key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }
  getIncomeMonth() {
    for (const key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getBudget() {
    const monthDeposit = Math.ceil(this.moneyDeposit * (this.percentDeposit / 100));
    this.budgetMonth = Math.ceil((this.budget + this.incomeMonth - this.expensesMonth + monthDeposit));
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
  }
  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }
  getCancel() {
    if (this.start) {
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
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  changePercent() {
    depositPercent.value = '';
    depositPercent.addEventListener('input', () => {
      if (isNaN(parseFloat(depositPercent.value))) {
        alert('Введите корректное значение в поле проценты');
        start.disabled = true;
        depositPercent.value = '';
      } else if (depositPercent.value < 0 || depositPercent.value > 100) {
        alert('Процент не может быть больше 100');
        depositPercent.value = '';
      } else {
        start.disabled = false;
      }
    });
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
    } else {
      depositPercent.value = valueSelect;
      depositPercent.style.display = 'none';
    }
  }
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  eventsListeners() {
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.cancel.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
    incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
    start.disabled = true;
    salaryAmount.addEventListener('input', () => {
      if (this.isNumber(salaryAmount.value)) {
        start.disabled = false;
      } else {
        start.disabled = true;
      }
    });
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }
}
const appData = new AppData();

appData.eventsListeners();
