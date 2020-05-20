class CreateTodo {
  constructor(){
    this.handleTrClick = this.handleTrClick.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
  }

  handleTrClick(e) {
    e.currentTarget.classList.add("strikeout")
  }

  handleEditClick(e){
    e.stopPropagation();
    const formModal = document.querySelector("form")
    formModal.classList.remove("hidden")
  }

  renderTodo(todos){
    console.log(todos)
    const tbody = document.getElementById("todo")
    if(todos.length){
      for(let i = 0; i < todos.lengths; i++){
        const tr = document.createElement("tr");
        tr.addEventListener("click", this.handleTrClick)
        const tdContent = document.createElement("td")
        const tdDueDate = document.createElement("td")
        const tdUtilites = document.createElement("td")
      }
    }else {
      const td = document.createElement("td")
      td.textContent = "No todos recorded"
      tbody.appendChild(td)
    }
    const addTodoTr = document.createElement("tr")

  }

  makeUtilites(td) {
    const editIcon = document.createElement("i")
    editIcon.className = "far fa-edit"
    editIcon.addEventListener("click", this.handleEditClick)
  }
}
