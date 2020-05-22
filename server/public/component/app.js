class App {
  constructor(createTodo) {
    this.createTodo = createTodo
    this.getTodosTask = this.getTodosTask.bind(this)
    this.createProjects = new CreateProjects(this.getTodosTask)
    this.handleGetTodosTaskSuccess = this.handleGetTodosTaskSuccess.bind(this)
    this.handleGetTodoProjectSuccess = this.handleGetTodoProjectSuccess.bind(this)
    this.handleSuccessGetRecommendation = this.handleSuccessGetRecommendation.bind(this);
  }


  handleSuccessGetRecommendation(data, queryKey) {
    let projectName = queryKey
    this.recommendationObject = data;
    console.log(data)
    // this.defaultRecommendation = data.Similar.Results[0].Name;
    // const recommendationsHeading = document.getElementById("recommendation");
    // recommendationsHeading.textContent = `Todays recommended music for ${projectName} is ` + this.recommendations.defaultRecommendation;
  }

  getRecommendation(queryKey) {
    $.ajax(
      {
        url: `/api/recommendation/${queryKey}`,
        method: "GET",
        success: data => this.handleSuccessGetRecommendation(data,queryKey),
        error: console.error
      }
    )
  }

  handleGetTodosTaskSuccess(data, queryKey){
    console.log(data)
    this.createTodo.renderTodo(data)
    this.getRecommendation(queryKey)
  }

  getTodosTask(projectId = 2236484331, queryKey = "shopping") {
    $.ajax(
      {
        url: `/api/task/${projectId}`,
        success: data => this.handleGetTodosTaskSuccess(data,queryKey),
        error: console.error
      }
    )
  }

  handleGetTodoProjectSuccess(data){
    console.log(data)
    this.createProjects.createProjectButtons(data)
  }

  getTodosProjects(){
    $.ajax({
      url: '/api/projects',
      success: this.handleGetTodoProjectSuccess,
      error: console.error
    })
  }

  start(){
    this.getTodosTask();
    this.getTodosProjects();
  }
}

// makeTodaysTodos() {
//   var arrayListOfTodo = this.todoInfo.listOfTodos;
//   var recommendationsHeading = document.createElement("h4");
//   recommendationsHeading.textContent = "Todays recommended music for shopping is " + this.recommendations.defaultRecommendation;
//   this.todayTodosList.appendChild(recommendationsHeading)
//   console.log(this.todoInfo.listOfTodos, arrayListOfTodo)
//   for (var createListIndex = 0; createListIndex < arrayListOfTodo.length; createListIndex++) {
//     var label = document.createElement("label")
//     var li = document.createElement("li");
//     var input = document.createElement("input")
//     input.setAttribute("type", "checkbox")
//     li.textContent = arrayListOfTodo[createListIndex].Content;
//     li.id = arrayListOfTodo[createListIndex].Id;
//     li.parentId = arrayListOfTodo[createListIndex].ProjectId;
//     li.appendChild(input)
//     li.addEventListener("click", this.deleteTodos)
//     label.appendChild(li);
//     this.todayTodosList.appendChild(label);
//   }
// }

// deleteTodos(event) {
//   console.log(event.target, event.currentTarget)
//   this.deleteTodosArray = [];
//   this.deleteTodosArray.push(event.currentTarget.id);
//   var delElement = document.createElement("del");
//   delElement.textContent = event.currentTarget.textContent
//   event.currentTarget.innerHTML = "";
//   event.currentTarget.appendChild(delElement)
// }
