
const tableTodos = document.getElementById("getTodos")
const tbody = document.getElementById("todo")
const loadingScreen = document.getElementById("loadingScreen")
const addTodoForm = document.getElementById("addTodo")
const loadingProject = document.getElementById("loadingProject")

const createTodos = new CreateTodo()
const addTodo = new AddToDo(addTodoForm)
const app = new App(createTodos,tableTodos,loadingScreen,tbody,addTodo,loadingProject)
app.start()

const giveDate = document.getElementById("todaysDate")
giveDate.textContent = monthNames[month - 1] + " " + today + ", " + year;
