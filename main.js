var todayTodos = document.querySelector(".today-todo");
var todayTodosList = todayTodos.querySelector("ul");



var getTodos = new GetToDos();
var recommendator = new TheRecommender();
var app = new App(getTodos,recommendator,todayTodosList)
