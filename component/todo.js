class GetToDos {
  constructor(user,password){
    this.user = user;
    this.pasword = password
    this.bindHandleSuccessGetUser = this.handleSuccessGetUser.bind(this);
    this.bindHandleSuccessTypeOfTodo = this.handleSuccessTypeOfTodo.bind(this);
    this.bindHandleSuccessListOfTodos = this.handleSuccessListOfTodos.bind(this);
  }
  handleSuccessGetUser(userInfo) {
    this.fullName = userInfo.FullName;
  }

  getUserTodos(){
    $.ajax(
      {
        method:"get",
        url: "https://cors-anywhere.herokuapp.com/https://todo.ly/api/user.json",
        beforeSend : function(req) {
          req.setRequestHeader("Authorization",make_base_auth())
        },
        success: this.bindHandleSuccessGetUser,
        error: console.error
      }
    )
    function make_base_auth(user, password) {
      var tok = "lyu.david@yahoo.com" + ":" + "S42c3Bk!!6Fye!E";
      var hash = btoa(tok);
      return "Basic " + hash;
    }
  }

  handleSuccessTypeOfTodo(data) {
    console.log(data)
    this.projects = data;
    this.workProject = data[0];
    this.personalProject = data[3];
    this.shoppingList = data[4];
  }

  getTypeOfTodos() {
    $.ajax(
      {
        method: "get",
        url: "https://cors-anywhere.herokuapp.com/https://todo.ly/api/projects.json",
        beforeSend: function (req) {
          req.setRequestHeader("Authorization", make_base_auth())
        },
        success: this.bindHandleSuccessTypeOfTodo,
        error: console.error
      }
    )
    function make_base_auth(user, password) {
      var tok = "lyu.david@yahoo.com" + ":" + "S42c3Bk!!6Fye!E";
      var hash = btoa(tok);
      return "Basic " + hash;
    }
  }

  handleSuccessListOfTodos(data) {
    this.listOfTodos = data;
  }
  getListOfTodos() {
    $.ajax(
      {
        method: "get",
        url: "https://cors-anywhere.herokuapp.com/https://todo.ly/api/items.json",
        beforeSend: function (req) {
          req.setRequestHeader("Authorization", make_base_auth())
        },
        success: this.bindHandleSuccessListOfTodos,
        error: console.error
      }
    )
    function make_base_auth(user, password) {
      var tok =
      var hash = btoa(tok);
      return "Basic " + hash;
    }
  }

  getCreateTodos() {
    $.ajax(
      {
        method: "post",
        url: "https://cors-anywhere.herokuapp.com/https://todo.ly/api/items.json",
        data: JSON.stringify({
          ItemObject: {
            Content: "New Item",
            ProjectId: 3841898
          }
        }),
        beforeSend: function (req) {
          req.setRequestHeader("Authorization", make_base_auth())
        },
        success: console.log,
        error: console.error,
        dataType: "json"
      }
    )
    function make_base_auth(user, password) {
      var tok =
      var hash = btoa(tok);
      return "Basic " + hash;
    }
  }
}
