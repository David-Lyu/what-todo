class AddToDo {
  constructor(formElement) {
    this.formElement = formElement;
  }

  handleSubmit(e, addTodoTask, projectId) {
    e.preventDefault();
    const inputVal = this.formElement.children[0].children[0].value
    console.log(inputVal)
    addTodoTask(inputVal, projectId)
  }

  addNewTodo(addTodoTask, projectId) {
    this.formElement.addEventListener("submit", (e) => this.handleSubmit(e,addTodoTask,projectId))
  }
}
