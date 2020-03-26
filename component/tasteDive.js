class TheRecommender {
  getReccomendation(){
    $.ajax(
      {
        url: "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar",
        method: "GET",
        data: {
          "q":"Blink182",
          "type": "music",
          "k": "360893-WhatToDO-OVXD1PAW"
        },
        success: console.log,
        error: console.error
      }
    )
  }
}
