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
  console.log(hash,tok)
  return "Basic " + hash;
}
