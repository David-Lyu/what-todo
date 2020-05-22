class CreateTodo {
  constructor(){
    this.handleTrClick = this.handleTrClick.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
  }

  handleTrClick(e,id) {
    console.log(e.currentTarget.classList, typeof e.currentTarget.className)
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

  handleEditClick(e){
    e.stopPropagation();
    console.log(e.currentTarget)
    const formModal = document.querySelector("form")
    formModal.classList.remove("hidden")
  }

  renderTodo(todos){
    const tbody = document.getElementById("todo")
    if(todos.length !== 0){
      for(let i = 0; i < todos.length; i++){
        const tr = document.createElement("tr");
        tr.addEventListener("click", (e)=>this.handleTrClick(e,todos[i].id))
        tr.classList.add("pointer")
        const tdContent = document.createElement("td")
        tdContent.textContent = todos[i].content
        const tdUtilites = document.createElement("td")
        this.makeUtilites(tdUtilites)
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

  makeUtilites(td) {
    const editIcon = document.createElement("i")
    editIcon.className = "far fa-edit"
    editIcon.addEventListener("click", this.handleEditClick)
    editIcon.addEventListener("mouseover", ()=>{editIcon.classList.add("edit-pointer")})
    editIcon.addEventListener("mouseout", ()=> editIcon.classList.remove("edit-pointer"))
    td.appendChild(editIcon)
  }
}
