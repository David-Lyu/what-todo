class AddToDo {
  constructor(formElement) {
    this.formElement = formElement;
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    e.currentTarget.children[0].children[2].setAttribute("disabled", null)
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
