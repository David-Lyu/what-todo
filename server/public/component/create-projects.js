class CreateProjects {
  constructor(getTodoTasks,tbody, createNewProject, deleteProject) {
    this.formModal = document.querySelectorAll(".form-modal")[1]
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleAddProjectClick = this.handleAddProjectClick.bind(this)
    this.createNewProject = createNewProject
    this.deleteProject = deleteProject
    this.getTodoTasks = getTodoTasks
    this.tbody = tbody
  }

  handleShowDeleteButtonClick(projectUtilitiesDiv, deleteIcons) {
    for (let i = 0; i < deleteIcons.length; i++) {
      deleteIcons[i].classList.remove("hidden")
    }
    projectUtilitiesDiv.classList.add("hidden")
    const cancelDeleteButton = projectUtilitiesDiv.nextElementSibling
    cancelDeleteButton.classList.remove("hidden")
    cancelDeleteButton.addEventListener("click",()=> {
      for (let i = 0; i < deleteIcons.length; i++) {
        deleteIcons[i].classList.add("hidden")
      }
      projectUtilitiesDiv.classList.remove("hidden")
      cancelDeleteButton.classList.add("hidden")
    })
  }

  handleAddProjectClick(){
    const formModal = this.formModal
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
      const individualProjectDiv = document.createElement("div")
      const buttonProject = document.createElement("button")
      buttonProject.textContent = projects[i].name
      buttonProject.addEventListener("click", () => this.handleButtonClick(projects[i]))

      const deleteIcon = document.createElement("i")
      deleteIcon.classList.add("hidden", "far", "fa-times-circle", "delete-project")
      deleteIcon.addEventListener("click", () => this.deleteProject(projects[i].id))

      individualProjectDiv.appendChild(deleteIcon)
      individualProjectDiv.appendChild(buttonProject)
      divProject.appendChild(individualProjectDiv)
    }
    const projectUtilitiesDiv = document.getElementById("projectUtilities")
    const addProjectButton = projectUtilitiesDiv.children[0]
    if (projects.length <= 5) {
      addProjectButton.addEventListener("click", this.handleAddProjectClick)
    } else {
      addProjectButton.addEventListener("click",()=>alert("cannot have more than 5 projects"))
      this.formModal.classList.add("hidden")
    }

    const deleteIcons = document.querySelectorAll(".delete-project")
    const showDeleteIcon = projectUtilitiesDiv.children[1]
    showDeleteIcon.addEventListener("click", ()=> this.handleShowDeleteButtonClick(projectUtilitiesDiv,deleteIcons))
  }
}
