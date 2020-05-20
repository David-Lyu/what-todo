class App {
  constructor(todoInfo,recommendations,todayList) {
    this.todoInfo = todoInfo;
    this.recommendations = recommendations;
    this.todayTodosList = todayList;

    this.bindHandSuccessGetRecommendation = this.handleSuccessGetRecommendation.bind(this);
  }


  handleSuccessGetRecommendation(data) {
    console.log(data);
    this.recommendationObject = data;
    this.defaultRecommendation = data.Similar.Results[0].Name;
  }

  // getRecommendation(queryKey) {
  //   $.ajax(
  //     {
  //       url: "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar",
  //       method: "GET",
  //       data: {
  //         "q": queryKey,
  //         "k": "360893-WhatToDO-OVXD1PAW"
  //       },
  //       success: this.bindHandSuccessGetRecommendation,
  //       error: console.error
  //     }
  //   )
  // }

  getTodos() {
    $ajax(
      {
        url: "https://api.todoist"
      }
    )
  }

}

// makeTodaysTodos() {
//   var arrayListOfTodo = this.todoInfo.listOfTodos;
//   var recommendationsHeading = document.createElement("h4");
//   recommendationsHeading.textContent = "Todays recommended music for shopping is " + this.recommendations.defaultRecommendation;
//   this.todayTodosList.appendChild(recommendationsHeading)
//   console.log(this.todoInfo.listOfTodos, arrayListOfTodo)
//   for (var createListIndex = 0; createListIndex < arrayListOfTodo.length; createListIndex++) {
//     var label = document.createElement("label")
//     var li = document.createElement("li");
//     var input = document.createElement("input")
//     input.setAttribute("type", "checkbox")
//     li.textContent = arrayListOfTodo[createListIndex].Content;
//     li.id = arrayListOfTodo[createListIndex].Id;
//     li.parentId = arrayListOfTodo[createListIndex].ProjectId;
//     li.appendChild(input)
//     li.addEventListener("click", this.deleteTodos)
//     label.appendChild(li);
//     this.todayTodosList.appendChild(label);
//   }
// }

// deleteTodos(event) {
//   console.log(event.target, event.currentTarget)
//   this.deleteTodosArray = [];
//   this.deleteTodosArray.push(event.currentTarget.id);
//   var delElement = document.createElement("del");
//   delElement.textContent = event.currentTarget.textContent
//   event.currentTarget.innerHTML = "";
//   event.currentTarget.appendChild(delElement)
// }