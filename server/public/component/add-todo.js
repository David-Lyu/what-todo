class AddToDo {
  constructor(formElement) {
    this.formElement = formElement;
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    const input = e.currentTarget.children[0].children[1]
    this.addTodoTask(input, this.projectId, this.queryKey)
  }

  addNewTodo(addTodoTask, projectId, queryKey) {
    this.queryKey = queryKey
    this.addTodoTask = addTodoTask
    this.projectId = projectId
    this.formElement.removeEventListener("submit", this.handleSubmit)
    this.formElement.addEventListener("submit",this.handleSubmit)
  }
}
