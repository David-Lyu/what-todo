var stuff = $.ajax(
  {
    header: {
      "Authoriation": "Token f2cc74b059e3b1d6c7e03a4a3d77585954bfd8b1"
    },
    url: "https://wger.de/api/v2/",
    method: "get",
    success: success,
    error: console.error
  }
)

function success(data) {
  console.log(data,data.workout,data.workoutlog);
}
