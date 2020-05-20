// var todayTodos = document.querySelector(".today-todo");
// var todayTodosList = todayTodos.querySelector("ul");

// var app = new App()
// app.getRecommendation("shopping")


// var giveDate = document.getElementById("todaysDate")
// giveDate.textContent = monthNames[month] + " " + today + " ";


// get todos
// $.ajax(
//   {
//     url: "https://api.todoist.com/rest/v1/projects",
//     headers: {
//       "Authorization": "Bearer 16a9c130decfb3e9c69796fca3d4000a212223db"
//     },
//     success: (data)=>{console.log(data)},
//     error: console.error
//   }
// )

// create todo
//create new project
// $.ajax(
//   {
//     url: "https://api.todoist.com/rest/v1/projects",
//     headers: {
//       Authorization: "Bearer 16a9c130decfb3e9c69796fca3d4000a212223db",
//       "Content-Type": "application/json"
//     }
//   }
// )


//gettasks
// $.ajax(
//   {
//     url: "https://api.todoist.com/rest/v1/tasks",
//     headers: {
//       "Authorization": "Bearer 16a9c130decfb3e9c69796fca3d4000a212223db"
//     },
//     data: {
//       project_id: 2236484331
//     },
//     success: (data) => { console.log(data) },
//     error: console.error
//   }
// )

//create task
// $.ajax(
//   {
//     url: "https://api.todoist.com/rest/v1/tasks",
//     method: "POST",
//     headers: {
//       "Authorization": "Bearer 16a9c130decfb3e9c69796fca3d4000a212223db",
//       "Content-Type": "application/json"
//     },
//     data: JSON.stringify({
//       "content": "Adding new Task",
//       // "due_string": "05/22/2020",
//       // parent: 2236484331
//     }),
//     dataType: "json",
//     success: console.log,
//     error: console.error
//   }
// )


$.ajax(
  {
    url: "http://localhost:3001/api/tasks",
    success: console.log
  }
)
