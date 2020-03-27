class ToDoApp {
  constructor(user,password){
    this.user = user;
    this.pasword = password
  }


  getUserTodos(){
    $.ajax(
      {
        method:"get",
        url: "https://cors-anywhere.herokuapp.com/https://todo.ly/api/user.json",
        beforeSend : function(req) {
          req.setRequestHeader("Authorization",make_base_auth())
        },
        success: console.log,
        error: console.error
      }
    )
    function make_base_auth(user, password) {
      var tok = "lyu.david@yahoo.com" + ":" + "S42c3Bk!!6Fye!E";
      var hash = btoa(tok);
      return "Basic " + hash;
    }
  }

  getTypeOfTodos() {
    $.ajax(
      {
        method: "get",
        url: "https://cors-anywhere.herokuapp.com/https://todo.ly/api/projects.json",
        beforeSend: function (req) {
          req.setRequestHeader("Authorization", make_base_auth())
        },
        success: console.log,
        error: console.error
      }
    )
    function make_base_auth(user, password) {
      var tok = "lyu.david@yahoo.com" + ":" + "S42c3Bk!!6Fye!E";
      var hash = btoa(tok);
      return "Basic " + hash;
    }
  }

  getListOfTodos() {
    $.ajax(
      {
        method: "get",
        url: "https://cors-anywhere.herokuapp.com/https://todo.ly/api/items.json",
        beforeSend: function (req) {
          req.setRequestHeader("Authorization", make_base_auth())
        },
        success: console.log,
        error: console.error
      }
    )
    function make_base_auth(user, password) {
      var tok = "lyu.david@yahoo.com" + ":" + "S42c3Bk!!6Fye!E";
      var hash = btoa(tok);
      return "Basic " + hash;
    }
  }
}
