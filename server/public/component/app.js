class App {
  constructor(createTodo,tableTodos,loadingScreen,tbody, addTodo) {
    this.createTodo = createTodo
    this.addTodo = addTodo
    this.tbody = tbody
    this.tableTodos = tableTodos
    this.loadingScreen = loadingScreen
    this.addTodoTask = this.addTodoTask.bind(this)
    this.getTodosTask = this.getTodosTask.bind(this)
    this.editTodoTask = this.editTodoTask.bind(this)
    this.deleteProject = this.deleteProject.bind(this)
    this.getTodosProjects = this.getTodosProjects.bind(this)
    this.createNewProject = this.createNewProject.bind(this)
    this.handleEditTodoTaskSuccess = this.handleEditTodoTaskSuccess.bind(this)
    this.handleGetTodosTaskSuccess = this.handleGetTodosTaskSuccess.bind(this)
    this.handleGetTodoProjectSuccess = this.handleGetTodoProjectSuccess.bind(this)
    this.handleSuccessGetRecommendation = this.handleSuccessGetRecommendation.bind(this);
    this.createProjects = new CreateProjects(this.getTodosTask,tbody, this.createNewProject,this.deleteProject)
  }

  handleSuccessGetRecommendation(data, queryKey) {
    let projectName = queryKey
    let defaultRecommendation
    if(data.Similar.Results.length === 0 ){
      defaultRecommendation = "N/A";
    } else {
      defaultRecommendation = data.Similar.Results[0].Name;
    }
    const recommendationsHeading = document.getElementById("recommendation");
    recommendationsHeading.textContent = `Todays recommended music for ${projectName} is ${defaultRecommendation}`;
    this.tableTodos.classList.remove("hidden")
    this.loadingScreen.classList.add("hidden")
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
    this.createTodo.renderTodo(data, this.tbody, this.editTodoTask)
    this.getRecommendation(queryKey)
  }

  getTodosTask(projectId = 2236484331, queryKey = "you") {
    this.addTodo.addNewTodo(this.addTodoTask, projectId)
    $.ajax(
      {
        url: `/api/task/${projectId}`,
        success: data => this.handleGetTodosTaskSuccess(data,queryKey),
        error: console.error
      }
    )
  }


  handleEditTodoTaskSuccess() {
    this.tbody.innerHTML = "";
    this.getTodosTask()
  }

  editTodoTask(content, todoId) {
    $.ajax({
      method: "PUT",
      url: `/api/task/${todoId}`,
      contentType: "application/json",
      data: JSON.stringify({
        content: content
      }),
      success: this.handleEditTodoTaskSuccess,
      error: console.error
    })
  }

  addTodoTask(newTask, projectId) {
    $.ajax({
      method: "POST",
      url: `/api/task/${projectId}`,
      contentType: "application/json",
      data: JSON.stringify({
        content: newTask
      }),
      success: console.log,
      error: console.error
    })
  }

  handleGetTodoProjectSuccess(data){
    this.createProjects.createProjectButtons(data)
  }

  getTodosProjects() {
    $.ajax({
      url: '/api/projects',
      success: this.handleGetTodoProjectSuccess,
      error: console.error
    })
  }

  createNewProject(projectName) {
    $.ajax({
      method: 'POST',
      url: '/api/projects',
      contentType: 'application/json',
      data: JSON.stringify({
        projectName
      }),
      success: this.getTodosProjects,
      error: console.error
    })
  }

  deleteProject(projectId) {
    $.ajax({
      method: "DELETE",
      url: `/api/projects/${projectId}`,
      success: this.getTodosProjects,
      error: console.error
    })
  }

  start(){
    this.getTodosTask();
    this.getTodosProjects();
  }
}
