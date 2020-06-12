class App {
  constructor(createTodo, tableTodos, loadingScreen, tbody, addTodo, loadingProject) {
    this.createTodo = createTodo
    this.addTodo = addTodo
    this.tbody = tbody
    this.tableTodos = tableTodos
    this.loadingScreen = loadingScreen
    this.loadingProject = loadingProject
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
    this.createProjects = new CreateProjects(this.getTodosTask, tbody, this.createNewProject, this.deleteProject, loadingProject)
  }

  handleSuccessGetRecommendation(data, queryKey) {
    let projectName = queryKey
    let defaultRecommendation
    if(data.Similar.Results.length === 0 ){
      const randomSong = ["Red Hot Chili Pepers", "White Stripes", "Beatles", "Foo Fighters", "Drake", "Beyonce"]
      const randomNum = Math.floor(Math.random() * (randomSong.length -1))
      defaultRecommendation = randomSong[randomNum];
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
    this.tableTodos.classList.remove("hidden")
    this.loadingScreen.classList.add("hidden")
    this.createTodo.renderTodo(data, this.tbody, this.editTodoTask)
    this.createTodo.handleEditSuccess()
    this.getRecommendation(queryKey)
  }

  getTodosTask(projectId = 2236484331, queryKey = "today") {
    this.addTodo.addNewTodo(this.addTodoTask, projectId, queryKey)
    $.ajax(
      {
        url: `/api/task/${projectId}`,
        success: data => this.handleGetTodosTaskSuccess(data,queryKey),
        error: console.error
      }
    )
  }

  handleEditTodoTaskSuccess() {
    this.getTodosTask()
  }

  editTodoTask(todoId, content) {
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

  handleAddTodoTask(inputElement, projectId, queryKey) {
    inputElement.value = "";
    this.getTodosTask(projectId, queryKey)
  }

  addTodoTask(input, projectId, queryKey) {
    this.loadingScreen.classList.remove("hidden")
    this.tableTodos.classList.add("hidden")
    $.ajax({
      method: "POST",
      url: `/api/task/${projectId}`,
      contentType: "application/json",
      data: JSON.stringify({
        content: input.value
      }),
      success: () => this.handleAddTodoTask(input, projectId, queryKey),
      error: ()=> {
        this.addTodo.handleBadRequest()
      }
    })
  }

  handleGetTodoProjectSuccess(data){
    this.createProjects.createProjectButtons(data)
  }

  getTodosProjects() {
    this.loadingProject.nextElementSibling.classList.add("hidden")
    this.loadingProject.classList.remove("hidden")
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
    this.loadingProject.nextElementSibling.classList.add("hidden")
    this.loadingProject.classList.remove("hidden");
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
