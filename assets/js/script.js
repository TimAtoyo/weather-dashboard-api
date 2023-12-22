var searchInput = document.querySelector("#search-input");
var searchButton = document.querySelector("#search-button");

var handleWeather = function (e) {};

searchButton.addEventListener("click", function (e) {
  e.preventDefault();

  var API_Key = "857f61713ca1c679c09b07553f7ca2e7";
  var city = searchInput.value;
  console.log(city);
  var base_URL = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${API_Key}`;
});
// 