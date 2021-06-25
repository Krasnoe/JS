'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');


let todoData = [];
// [ JSON.parse(localStorage.getItem())
//   // получение дел из localstorage **********************************************************
//   // {
//   //   value: 'Сварить кофе',
//   //   completed: false
//   // },
//   // {
//   //   value: 'Помыть посуду',
//   //   completed: true
//   // }
// ];

const render = function(){
  todoList.textContent = '';
  todoCompleted.textContent = '';
  headerInput.value = '';

  todoData.forEach(function(item){
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
      console.log(li);
      li.remove();
      
    });
  }); 
}; 


todoControl.addEventListener('submit', function(event){
  event.preventDefault();
  
  const newTodo = {
    value: headerInput.value,
    completed: false
  };
  if(headerInput.value === ''){
    console.log('пусто');
  } else {
    todoData.push(newTodo);
  }

  localStorage.setItem(todoData, JSON.stringify(todoData));
  render();
  

});




render();