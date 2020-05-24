class CreateTodo {
  constructor(){
    this.handleTrClick = this.handleTrClick.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
  }

  handleTrClick(e,id) {
    if(!e.currentTarget.className.includes("strikeout")){
      e.currentTarget.classList.add("strikeout")
      $.ajax({
        method: "post",
        url: `/api/task/close/${id}`,
      })
    }else {
      e.currentTarget.classList.remove("strikeout"),
        $.ajax({
          method: "post",
          url: `/api/task/open/${id}`,
        })
    }
  }
//dont know if editTodoTask will work the way i am passing it
  handleEditClick(e,todoItem, editTodoTask){
    e.stopPropagation();
    console.log(e.currentTarget)
    const formModal = document.querySelector(".form-modal")
    formModal.classList.remove("hidden")

    const form = document.querySelector("form")
    form.placeholder = todoItem.content
    console.log(todoItem.id, form.children[0].children[0].value)
    // editTodoTask(form.children[0].children[0].value)
  }

  renderTodo(todos,tbody,editTodoTask){
    console.log(todos)
    if(todos.length !== 0){
      for(let i = 0; i < todos.length; i++){
        const tr = document.createElement("tr");
        tr.addEventListener("click", (e)=>this.handleTrClick(e,todos[i]))
        tr.classList.add("pointer")
        const tdContent = document.createElement("td")
        tdContent.textContent = todos[i].content
        const tdUtilites = document.createElement("td")
        this.makeUtilites(tdUtilites,todos[i].id, editTodoTask)
        tr.append(tdContent,tdUtilites)
        tbody.append(tr)
      }
    }else {
      const td = document.createElement("td")
      td.textContent = "No todos recorded"
      tbody.appendChild(td)
    }
    const addTodoTr = document.createElement("tr")
    tbody.appendChild(addTodoTr)
  }

  makeUtilites(td,todoItem, editTodoTask) {
    const editIcon = document.createElement("i")
    editIcon.className = "far fa-edit"
    editIcon.addEventListener("click", (e) => this.handleEditClick(e,todoItem, editTodoTask))
    editIcon.addEventListener("mouseover", ()=>{editIcon.classList.add("edit-pointer")})
    editIcon.addEventListener("mouseout", ()=> editIcon.classList.remove("edit-pointer"))
    td.appendChild(editIcon)
  }
}
