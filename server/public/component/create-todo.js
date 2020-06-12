class CreateTodo {
  constructor(formModalEdit, tableTodos){
    this.formModalEdit = formModalEdit
    this.tableTodos = tableTodos
    this.tableLoadingScreen = tableTodos.previousElementSibling.children[0]
    this.handleTrClick = this.handleTrClick.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
    this.handleEditFail = this.handleEditFail.bind(this)
    this.handleEditResponse = this.handleEditResponse.bind(this)
    this.cancelEditFailModal = this.cancelEditFailModal.bind(this)
  }

  handleTrClick(e,id) {
    if (!e.currentTarget.className.includes("strikeout")){
      e.currentTarget.classList.add("strikeout")
      $.ajax({
        method: "post",
        url: `/api/task/close/${id}`,
      })
    } else {
      e.currentTarget.classList.remove("strikeout"),
        $.ajax({
          method: "post",
          url: `/api/task/open/${id}`,
        })
    }
  }

  handleEditResponse() {
    this.tableTodos.classList.remove("hidden")
    this.tableLoadingScreen.classList.add("hidden")
  }

  cancelEditFailModal() {
    this.editModalFail.classList.add("hidden")
  }

  handleEditFail() {
    this.handleEditResponse();
    this.editModalFail = document.getElementById("editModalFail")
    this.editModalFail.classList.remove("hidden")
    this.editModalFail.addEventListener("click", this.cancelEditFailModal)
    this.editModalFail.children[0].addEventListener("click", (e) => e.stopPropagation())
    const cancelButton = this.editModalFail.children[0].children[1]
    cancelButton.addEventListener("click", this.cancelEditFailModal)
  }

  handleEditSubmit(e) {
    e.preventDefault();
    this.editTodoTask(this.todo.id, this.form.children[0].children[1].value)
    this.formModalEdit.classList.add("hidden")
    this.inputTodoChange.value = ""
    this.tableTodos.classList.add("hidden")
    this.tableLoadingScreen.classList.remove("hidden")
  }

  handleEditClick(e,todo, editTodoTask){
    this.todo = todo
    this.editTodoTask = editTodoTask
    e.stopPropagation();
    if(!e.currentTarget.parentElement.parentElement.className.includes("strikeout")){
      const formModal = this.formModalEdit
      formModal.addEventListener("click", ()=> {
      formModal.classList.add("hidden")
      })
      formModal.classList.remove("hidden")
      const innerModal = document.querySelector(".inner-modal")
      innerModal.addEventListener("click", (e)=> e.stopPropagation())
      this.form = document.querySelector("form")
      const pTag = this.form.children[0].children[0]
      pTag.textContent = `You want to change "${todo.content}" to :`
      this.inputTodoChange = this.form.children[0].children[1]
      this.inputTodoChange.value = todo.content

      this.form.addEventListener("submit", this.handleEditSubmit)
    }
  }

  renderTodo(todos,tbody,editTodoTask){
    tbody.innerHTML = ""
    if(todos.length !== 0){
      for(let i = 0; i < todos.length; i++){
        const tr = document.createElement("tr");
        tr.addEventListener("click", (e)=>this.handleTrClick(e,todos[i].id))
        tr.classList.add("pointer","hover-change")
        const tdContent = document.createElement("td")
        tdContent.textContent = todos[i].content
        const tdUtilites = document.createElement("td")
        this.makeUtilites(tdUtilites,todos[i], editTodoTask)
        tr.append(tdContent,tdUtilites)
        tbody.append(tr)
      }
    }else {
      const td = document.createElement("td")
      td.textContent = "No todos recorded"
      tbody.appendChild(td)
    }
  }

  makeUtilites(td,todo, editTodoTask) {
    const editIcon = document.createElement("i")
    editIcon.className = "far fa-edit"
    editIcon.addEventListener("click", (e) => this.handleEditClick(e,todo, editTodoTask))
    editIcon.addEventListener("mouseover", ()=>{editIcon.classList.add("edit-pointer")})
    editIcon.addEventListener("mouseout", ()=> editIcon.classList.remove("edit-pointer"))
    td.appendChild(editIcon)
  }
}
