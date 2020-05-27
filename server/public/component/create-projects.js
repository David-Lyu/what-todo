class CreateProjects {
  constructor(getTodoTasks,tbody, createNewProject) {
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleAddProjectClick = this.handleAddProjectClick.bind(this)
    this.createNewProject = createNewProject
    this.getTodoTasks = getTodoTasks
    this.tbody = tbody
  }

  handleAddProjectClick(){
    const formModal = document.querySelectorAll(".form-modal")[1]
    formModal.addEventListener("click", () => {
      formModal.classList.add("hidden")
    })
    formModal.classList.remove("hidden")
    const innerModal = document.querySelectorAll(".inner-modal")[1]
    innerModal.addEventListener("click", (e) => e.stopPropagation())
    const label = document.getElementById("projectModal")
    const pTag = label.children[0]
    pTag.textContent = "Create New Project:"

    const form = label.parentElement
    console.log(form)
    form.addEventListener("submit", e => {
      e.preventDefault();
      this.createNewProject(label.children[1].value)
    })
  }

  handleButtonClick(project){
    this.tbody.innerHTML = '';
    this.getTodoTasks(project.id,project.name)
  }

  createProjectButtons(projects) {
    const divProject = document.getElementById("projectButtons")
    divProject.innerHTML = ""
    for(let i = 1; i < projects.length; i++) {
      const buttonProject = document.createElement("button")
      buttonProject.textContent = projects[i].name
      buttonProject.addEventListener("click", () => this.handleButtonClick(projects[i]))
      const deleteIcon = document.createElement("i")
      divProject.appendChild(buttonProject)
    }
    const addProjectButton = document.getElementById("projectUtilites").children[0]
    addProjectButton.addEventListener("click", this.handleAddProjectClick)
  }
}
