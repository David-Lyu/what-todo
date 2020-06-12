class AddToDo {
  constructor(formElement, loadingScreen, tableTodos) {
    this.formElement = formElement
    this.tableTodos = tableTodos
    this.loadingScreen = loadingScreen
    this.handleSubmit = this.handleSubmit.bind(this)
    this.removeModal = this.removeModal.bind(this)
  }

  removeModal() {
    this.formElement.nextElementSibling.classList.add("hidden")
  }

  handleBadRequest() {
    this.formElement.children[0].children[1].value = ""
    const errorModal = this.formElement.nextElementSibling
    errorModal.classList.remove("hidden")
    this.formElement.children[0].children[2].removeAttribute("disabled", null)
    const cancelButton = errorModal.children[0].children[1]
    cancelButton.addEventListener("click", this.removeModal)
    this.loadingScreen.classList.add("hidden")
    this.tableTodos.classList.remove("hidden")
  }

  handleSubmit(e) {
    e.preventDefault();
    const button = e.currentTarget.children[0].children[2]
    button.setAttribute("disabled", null)
    const input = e.currentTarget.children[0].children[1]
    this.addTodoTask(input, this.projectId, this.queryKey)
  }

  addNewTodo(addTodoTask, projectId, queryKey) {
    this.queryKey = queryKey
    this.addTodoTask = addTodoTask
    this.projectId = projectId
    this.formElement.children[0].children[2].removeAttribute("disabled", null)
    this.formElement.removeEventListener("submit", this.handleSubmit)
    this.formElement.addEventListener("submit",this.handleSubmit)
  }
}
