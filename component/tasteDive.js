class TheRecommender {
  constructor() {
    this.bindHandSuccessGetRecommendation = this.handleSuccessGetRecommendation.bind(this);
  }

  handleSuccessGetRecommendation(data) {
    console.log(data);
    this.recommendationObject = data;
    this.defaultRecommendation = data.Similar.Results[0].Name;
  }
  getRecommendation(queryKey){
    $.ajax(
      {
        url: "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar",
        method: "GET",
        data: {
        },
        success: this.bindHandSuccessGetRecommendation,
        error: console.error
      }
    )
  }
}
