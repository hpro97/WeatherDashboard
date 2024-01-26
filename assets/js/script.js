// ---------------------------------//
// functionality of app:
// ---------------------------------//
//functionality requirements:

//use local storage to store persistent data

//use 5 day weather forecast api

//search via city name

//display search history
    //when clicked on, access local storage and make current weather api call
        //display to current
        //display to 5 day forecast

//display date and time ✅
    //use dayjs for id date ✅

//display current weather
    //display weather icon based on weather description ✅
    //display temperature ✅
    //display humidity ✅
    //display wind speed ✅

//display 5 day forecast
    //display date and time
    //display weather icon based on weather description
    //display temperature
    //display humidity


//plan of attack:

// ---------------------------------//
// ---------------------------------//


// ---------------------------------//
//queryselectors for all//
// ---------------------------------//
let dateEl = $("#date");
let timeEl = $("#time");
let todayEl = $("#today");
let forecastEl = $("#forecast");

// ---------------------------------//
// ---------------------------------//

// ---------------------------------//
//define initial variables//
// ---------------------------------//

//move above usage
let city;

//this prevents other things working in page, turn off when fault finding
let APIKey = "447b3ffda308ccb841ddc7ea7984552e";
let currentqueryURL;


// ---------------------------------//
// ---------------------------------//

// ---------------------------------//
//convenience variables//
// ---------------------------------//
let currentDay = dayjs(); //using day js library to set current day with funciton


// ---------------------------------//
// ---------------------------------//

// ---------------------------------//
//functions i think i'll need
// ---------------------------------//
//set time and day to date id section
function setDateAndTime() {
dateEl.text(currentDay.format("dddd, MMMM D, YYYY"));
timeEl.text(currentDay.format("h:mm A"));
}

function getWeather(){
    currentqueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
    fetch(currentqueryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // console.log(data);
    displayCurrentWeather(data);
    
  });
}

function displayCurrentWeather(data) {
    // console.log(data);

    $("#today").empty();

    //accessing the icon property from obj
    let icon = data.weather[0].icon;
    let iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    // console.log("Icon URL:", iconURL);
    
    let temp = data.main.temp;
    let humidity = data.main.humidity;
    let wind = data.wind.speed;
    let tempC = (temp - 273.15).toFixed(2);

    //declare todayWeather using let
    let todayWeather = $("<div id='todayWeather'>");
    
    todayWeather.append("<div id='icon'><img src=" + iconURL + "></div>")
    todayWeather.append("<div id='temp'>Temperature: " + tempC + "°C</div>")
    todayWeather.append("<div id='humidity'>Humidity: " + humidity + "%</div>")
    todayWeather.append("<div id='wind'>Wind Speed: " + wind + "MPH</div>");

    // Append todayWeather to the element with id 'today'
    $("#today").append(todayWeather);
}

function getForecast(){

    forecastQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`

    fetch(forecastQueryURL)

  .then(function (response) {
    return response.json();
  })

  .then(function (data) {
    // console.log(data);
    displayForecast(data);
    
  });
}

function displayForecast(data) {

    console.log(data);
    
    $("#forecast").empty();

//arry[0] is now, and array[7] is 24 h in future


}


// ---------------------------------//
// ---------------------------------//

// ---------------------------------//
//click events & local storage
// ---------------------------------//

$("#search-button").on("click", function (event) {
    event.preventDefault();
    city = $("#search-input").val();
    localStorage.setItem("city", city);
    getWeather();
    getForecast();
});

// ---------------------------------//
// ---------------------------------//

setDateAndTime();