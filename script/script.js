'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

const todoData = [] || JSON.parse(localStorage.getItem('data'));

const render = function(){
  todoList.textContent = '';
  todoCompleted.textContent = '';
  headerInput.value = '';

  todoData.forEach(function(item, i){
    let li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
      '<div class="todo-buttons">' + 
      '<button class="todo-remove"></button>' + 
      '<button class="todo-complete"></button>' +
      '</div>';
    if(item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoComplete = li.querySelector('.todo-complete');
    btnTodoComplete.addEventListener('click', function(){
      item.completed = !item.completed;
      render();
    });

    const btnDelete = li.querySelector('.todo-remove');
    btnDelete.addEventListener('click', function(){
      todoData.splice(i, 1);
      li.remove();
      render();
    });

  }); 

  localStorage.setItem('data', JSON.stringify(todoData));

}; 

todoControl.addEventListener('submit', function(event){
  event.preventDefault();
  
  const newTodo = {
    value: headerInput.value,
    completed: false
  };
  if(headerInput.value.trim() === ''){
    console.log('пусто');
  } else {
    todoData.push(newTodo);
  }

  render();

});

render();