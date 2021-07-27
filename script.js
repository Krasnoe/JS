'use strict';

class Todo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
  }
  addToStorage(){
    localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
  }
  render(){
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
    this.input.placeholder = 'Какие планы?';
  }
  createItem(items) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = items.key;
    li.insertAdjacentHTML('beforeend', `
      <span class="text-todo">${items.value}</span>
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
    `);
    if(items.completed){
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }
  addTodo(e){
    e.preventDefault();
    if(this.input.value.trim()){
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generatekey(),
      };
      this.todoData.set(newTodo.key, newTodo);
      this.input.value = '';
      this.render();
    } else {
      this.input.placeholder = 'Пустое дело добавить нельзя!';
    }
  }
  generatekey(){
    return Math.random().toString(10).substring(2, 9);
  }
  deleteItem(targetKey){
    this.todoData.delete(targetKey.key);
    this.render();
  }
  completedItem(targetKey){
    this.todoData.forEach((item) => {
      if(targetKey.key === item.key){
        item.completed = !item.completed;
      }
    });
    this.render();
  }
  hendler(){
    document.addEventListener('click', (event) => {
      let target = event.target,
          targetKey = target.closest('li');
      if(target.className === 'todo-remove'){
        this.deleteItem(targetKey);
      } else if(target.className === 'todo-complete'){
        this.completedItem(targetKey);
      }
    });
  }
  init(){
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();
    this.hendler();
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.init();