
const tableTodos = document.getElementById("getTodos")
const tbody = document.getElementById("todo")
const loadingScreen = document.getElementById("loadingScreen")

const createTodos = new CreateTodo()
const app = new App(createTodos,tableTodos,loadingScreen,tbody)
app.start()

const giveDate = document.getElementById("todaysDate")
giveDate.textContent = monthNames[month - 1] + " " + today + ", " + year;
