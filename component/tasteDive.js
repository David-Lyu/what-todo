class TheRecommender {
  getReccomendation(queryKey){
    $.ajax(
      {
        url: "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar",
        method: "GET",
        data: {
          "q":"Blink-182,Pulp Fiction",
          "k": "360893-WhatToDO-OVXD1PAW"
        },
        success: console.log,
        error: console.error
      }
    )
  }
}
