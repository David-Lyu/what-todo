class CreateProjects {
  constructor(getTodoTasks,tbody, createNewProject, deleteProject) {
    this.formModal = document.querySelectorAll(".form-modal")[1]
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleSurplusProj = this.handleSurplusProj.bind(this)
    this.handleAddProjectClick = this.handleAddProjectClick.bind(this)
    this.createNewProject = createNewProject
    this.deleteProject = deleteProject
    this.getTodoTasks = getTodoTasks
    this.tbody = tbody
  }

  handleSurplusProj() {
    const surplusProjModal = document.getElementById("surplusProject")
    surplusProjModal.classList.remove("hidden")
    surplusProjModal.addEventListener("click",()=> surplusProjModal.classList.add("hidden"))
  }

  handleShowDeleteButtonClick(projectUtilitiesDiv, deleteIcons, cancelDeleteButton) {
    for (let i = 0; i < deleteIcons.length; i++) {
      deleteIcons[i].classList.remove("hidden")
    }
    projectUtilitiesDiv.classList.add("hidden")
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

    form.removeEventListener("submit", e=> {
      e.preventDefault();
    })

    form.addEventListener("submit", e => {
      e.preventDefault();
      this.createNewProject(label.children[1].value)
      label.children[1].value = ""
    })
  }

  handleButtonClick(project){
    this.tbody.innerHTML = '';
    this.getTodoTasks(project.id,project.name)
  }

  createProjectButtons(projects) {
    const projectUtilitiesDiv = document.getElementById("projectUtilities")
    const cancelDeleteButton = projectUtilitiesDiv.nextElementSibling
    const divProject = document.getElementById("projectButtons")
    divProject.innerHTML = ""
    for(let i = 1; i < projects.length; i++) {
      const individualProjectDiv = document.createElement("div")
      const buttonProject = document.createElement("button")
      buttonProject.textContent = projects[i].name
      buttonProject.addEventListener("click", () => this.handleButtonClick(projects[i]))

      const deleteIcon = document.createElement("i")
      deleteIcon.classList.add('hidden', "far", "fa-times-circle", "delete-project")
      deleteIcon.addEventListener("click", () => {
        this.deleteProject(projects[i].id)
        cancelDeleteButton.classList.add("hidden")
        projectUtilitiesDiv.classList.remove("hidden")
      })

      individualProjectDiv.appendChild(deleteIcon)
      individualProjectDiv.appendChild(buttonProject)
      divProject.appendChild(individualProjectDiv)
    }

    const addProjectButton = projectUtilitiesDiv.children[0]
    for(let i = 0; i < projectUtilitiesDiv.children.length; i++) {
      console.log(projectUtilitiesDiv.children[i])
      projectUtilitiesDiv.children[i].classList.remove("hidden")
    }
    addProjectButton.removeEventListener("click", this.handleAddProjectClick)
    addProjectButton.removeEventListener("click", this.handleSurplusProj)
    if (projects.length < 6) {
      addProjectButton.addEventListener("click", this.handleAddProjectClick)
    } else {
      addProjectButton.addEventListener("click",this.handleSurplusProj)
      this.formModal.classList.add("hidden")
    }

    const deleteIcons = document.querySelectorAll(".delete-project")
    const showDeleteIcon = projectUtilitiesDiv.children[1]
    showDeleteIcon.addEventListener("click", ()=> this.handleShowDeleteButtonClick(projectUtilitiesDiv,deleteIcons,cancelDeleteButton))
  }
}
