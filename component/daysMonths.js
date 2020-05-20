var monthNames = ["January","February","March","April","May","June","July","August",
              "September","October","November","December"]
var days = [];
var date = new Date();
var today = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
var numberOfDays;

function getDays(month,year) {
  if((month % 2 != 0 && month <= 7 )||(month%2 === 0 && month >= 8)){
    numberOfDays = 31;
  }else if(month === 2) {
    if(year % 4 != 0){
      numberOfDays = 29;
    }else {
      numberOfDays = 28;
    }
  }else {
    numberOfDays = 30
  }
  for(var getDaysIndex = 1; getDaysIndex <= numberOfDays; getDaysIndex++) {
    days.push(getDaysIndex)
  }
  console.log(days)
}
