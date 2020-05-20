const todayTodos = document.querySelector(".today-todo");
const todayTodosList = todayTodos.querySelector("ul");

const createTodos = new CreateTodo()

const app = new App(createTodos)
app.start()


const giveDate = document.getElementById("todaysDate")
giveDate.textContent = monthNames[month] + " " + today + ", " + year;
