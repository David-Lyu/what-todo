class App {
  constructor(todoInfo,recommendations,todayList) {
    this.todoInfo = todoInfo;
    this.recommendations = recommendations;
    this.todayTodosList = todayList;
  }
  startApp(){
    this.todoInfo.getUserTodos();
    this.todoInfo.getTypeOfTodos();
    this.todoInfo.getListOfTodos();
  }

  makeTodaysTodos() {
    var arrayListOfTodo = this.todoInfo.listOfTodos;
    var recommendationsHeading = document.createElement("h4");
    recommendationsHeading.textContent = "Todays recommended music for shopping is "+ this.recommendations.defaultRecommendation;
    this.todayTodosList.appendChild(recommendationsHeading)
    console.log(this.todoInfo.listOfTodos,arrayListOfTodo)
    for(var createListIndex = 0; createListIndex < arrayListOfTodo.length; createListIndex++) {
      var label = document.createElement("label")
      var li = document.createElement("li");
      var input = document.createElement("input")
      input.setAttribute("type","checkbox")
      li.textContent = arrayListOfTodo[createListIndex].Content;
      li.id = arrayListOfTodo[createListIndex].Id;
      li.parentId = arrayListOfTodo[createListIndex].ProjectId;
      li.appendChild(input)
      label.appendChild(li);
      this.todayTodosList.appendChild(label);
    }
  }
}
