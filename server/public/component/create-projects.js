class CreateProjects {
  constructor(getTodoTasks,tbody) {
    this.handleClick = this.handleClick.bind(this)
    this.getTodoTasks = getTodoTasks
    this.tbody = tbody
  }

  handleClick(project){
    this.tbody.innerHTML = '';
    this.getTodoTasks(project.id,project.name)
  }

  createProjectButtons(projects) {
    const divProject = document.getElementById("projectButtons")
    console.log(projects)
    for(let i = 0; i < projects.length; i++) {
      const buttonProject = document.createElement("button")
      buttonProject.textContent = projects[i].name
      buttonProject.addEventListener("click", (e) => this.handleClick(projects[i]))
      divProject.appendChild(buttonProject)
    }
  }
}
