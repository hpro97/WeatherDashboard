// for commits
// git add . && git commit -m "MESSAGE" && git push

// ---------------------------------//
// functionality of app:
// ---------------------------------//

//functionality requirements:

//use local storage to store persistent data ✅

//use 5 day weather forecast api ✅

//search via city name ✅

//display search history
//when clicked on, access local storage and make current weather api call for that city ✅
//display to current weather ✅
//display to 5 day forecast ✅

//display date and time ✅
//use dayjs for id date ✅

//display current weather ✅
//display weather icon based on weather description ✅
//display temperature ✅
//display humidity ✅
//display wind speed ✅

//display 5 day forecast ✅
//display date and time ✅
//display weather icon based on weather description ✅
//display temperature ✅
//display humidity ✅

// ---------------------------------//
// ---------------------------------//

// ---------------------------------//
//queryselectors for all//
// ---------------------------------//
let dateEl = $("#date"); //assigns id date to dateEl
let timeEl = $("#time"); //assigns id time to timeEl
let todayEl = $("#today"); //assigns id today to todayEl
let forecastEl = $("#forecast"); //assigns id forecast to forecastEl
let historyEl = $("#history"); //assigns id history to historyEl

// ---------------------------------//
// ---------------------------------//

// ---------------------------------//
//define initial variables//
// ---------------------------------//

//move above usage
let city; //defining city

//this prevents other things working in page, turn off when fault finding
let APIKey = "447b3ffda308ccb841ddc7ea7984552e"; //api key
let currentqueryURL; //url for current weather

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
  //sets date and time
  dateEl.text(currentDay.format("dddd, MMMM D, YYYY")); //formats date
  timeEl.text(currentDay.format("h:mm A")); //formats time
}

function getWeather() {
  //gets weather
  currentqueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`; //url with tmeplate literal
  fetch(currentqueryURL) //fetches url
    .then(function (response) {
      //returns response
      return response.json(); //returns json
    })
    .then(function (data) {
      //data is json
      // console.log(data);
      displayCurrentWeather(data); //calls function
    });
}

function displayCurrentWeather(data) {
  //displays current weather
  // console.log(data);

  $("#today").empty(); //empties div

  //accessing the icon property from obj
  let icon = data.weather[0].icon; //sets icon through data obj
  let iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`; //sets url for icon referencin obj all links same structure with changed value for icon

  // console.log("Icon URL:", iconURL); //wind icon not working, remmeber to debug if time and find why

  let temp = data.main.temp; //sets temp through data obj
  let humidity = data.main.humidity; //sets humidity through data obj
  let wind = data.wind.speed; //sets wind through data obj
  let tempC = (temp - 273.15).toFixed(2); //sets tempC to temp - 273.15 from kelvin to celcius and rounds to 2 decimal

  //declare todayWeather using let
  let todayWeather = $("<div id='todayWeather'>"); //creates div

  todayWeather.append("<h2 id='city'>" + city + "</h2>"); //appends
  todayWeather.append(
    "<div id='date'>" + currentDay.format("dddd, MMMM D, YYYY") + "</div>"
  ); //appends
  todayWeather.append("<div id='icon'><img src=" + iconURL + "></div>"); //appends
  todayWeather.append("<div id='temp'>Temperature: " + tempC + "°C</div>"); //appends
  todayWeather.append("<div id='humidity'>Humidity: " + humidity + "%</div>"); //appends
  todayWeather.append("<div id='wind'>Wind Speed: " + wind + "MPH</div>"); //appends

  // Append todayWeather to the element with id 'today'
  $("#today").append(todayWeather);
}

function getForecast() {
  //gets forecast
  forecastQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`; //url

  fetch(forecastQueryURL) //fetch
    .then(function (response) {
      //returns response
      return response.json(); //returns json data
    })

    .then(function (data) {
      //data is json
      // console.log(data);
      displayForecast(data); //calls function
    });
}

function displayForecast(data) {
  //displays forecast
  console.log(data);

  $("#forecast").empty(); //empties
  let forecast = $("<div id='forecast'>"); //creates div for forecast

  for (let i = 7; i <= 39; i += 8) {
    //loops through data obj
    let date = data.list[i].dt_txt; //sets date through data obj using i index in data obj refering to current
    let icon = data.list[i].weather[0].icon; //sets icon through data obj using i index in data obj refering to current
    let iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`; //sets url for icon referencin obj all links same structure with changed value for icon
    let temp = (data.list[i].main.temp - 273.15).toFixed(2); //sets temp through data obj using i index in data obj refering to current - 273.15 from kelvin to celcius and rounds to 2 decimal
    let humidity = data.list[i].main.humidity; //sets humidity through data obj using i index in data obj refering to current

    let forecastDay = $("<div class='forecastDay'>"); //creates div for forecast day
    forecastDay.append(`<div class='date'>${date}</div>`); //appends date to div forecastDay and displays previous let where needed
    forecastDay.append(`<div class='icon'><img src=${iconURL}></div>`); //appends icon to div forecastDay and displays previous let where needed
    forecastDay.append(`<div class='temp'>Temperature: ${temp}°C</div>`); //appends temp to div forecastDay and displays previous let where needed
    forecastDay.append(`<div class='humidity'>Humidity: ${humidity}%</div>`); //appends humidity to div forecastDay and displays previous let where needed

    forecast.append(forecastDay); //appends forecastDay to forecast
  }

  $("#forecast").append(forecast); //appends forecast to forecast ID section in html

  //arry[0] is now, and array[7] is 24 h in future
}

function displayHistory() {
  //displays history function
  let history = JSON.parse(localStorage.getItem("cities")) || []; //sets history to local storage or an empty array if not present. uses parse to convert to array or an empty array
  $("#history").empty(); //empties the history section

  for (let i = 0; i < history.length; i++) {
    //loops through history
    let historyButton = $("<button class='historyButton'>"); //creates button for history section with class historyButton
    historyButton.text(history[i]); //sets button text to history array at index i (uses currently used city from local storage to set text of button)
    $("#history").append(historyButton); //appends button to history section in html through ID
  }
}

// ---------------------------------//
// ---------------------------------//

// ---------------------------------//
//click events & local storage
// ---------------------------------//

$("#search-button").on("click", function (event) {
  //search button on click event
  event.preventDefault(); //prevents default from submitting data refreshing page
  city = $("#search-input").val(); //sets city to search input value
  let history = JSON.parse(localStorage.getItem("cities")) || []; //sets history to local storage or an empty array if not present. uses parse to convert to array or an empty array
  if (!history.includes(city)) {
    //if city not in history
    history.push(city); //adds city to history, menaing already submitted don't make more buttons or save to local twice
    localStorage.setItem("cities", JSON.stringify(history)); //sets history to local storage
  }

  displayHistory(); //displays history

  getWeather(); //gets weather
  getForecast(); //gets forecast
});

$("#history").on("click", ".historyButton", function (event) {
  //history button on click event with class historyButton, menaing only activates if target has class of historyButton
  event.preventDefault(); //prevents default from submitting data refreshing page
  city = $(event.target).text(); //sets city to button text
  getWeather(); //gets weather
  getForecast(); //gets forecast
});

// ---------------------------------//
// ---------------------------------//

setDateAndTime(); //sets date and time
displayHistory(); //displays history
