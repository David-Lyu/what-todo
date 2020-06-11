class AddToDo {
  constructor(formElement) {
    this.formElement = formElement;
    this.handleSubmit = this.handleSubmit.bind(this)
    this.removeModal = this.removeModal.bind(this)
  }

  removeModal() {
    console.log("hello")
    this.formElement.nextElementSibling.classList.add("hidden")
  }

  handleBadRequest() {
    this.formElement.children[0].children[1].value = ""
    const errorModal = this.formElement.nextElementSibling
    console.log(errorModal)
    errorModal.classList.remove("hidden")
    this.formElement.children[0].children[2].removeAttribute("disabled", null)
    const cancelButton = errorModal.children[0].children[1]
    console.log(cancelButton)
    cancelButton.addEventListener("click", this.removeModal)
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
