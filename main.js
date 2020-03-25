$.ajax(
  {
    header: {
      "Authorization": make_base_auth
    },
    method:"get",
    url: "https://todo.ly/api/user.format",
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
