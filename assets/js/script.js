var searchInput = document.querySelector("#search-input");
var searchButton = document.querySelector("#search-button");
var todayLeftWeatherEl = document.querySelector(".today-left");
var todayRightWeatherEl = document.querySelector(".today-right");
var forcastRow = document.querySelector(".forcast-row");
var quickBtn = document.querySelector(".quick-btn");

var handleWeather = function (e) {};

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  todayLeftWeatherEl.textContent = "";
  todayRightWeatherEl.textContent = "";
  forcastRow.textContent = "";
  quickBtn.textContent = "";
  var citiesBtnArr = [];

  var API_Key = "857f61713ca1c679c09b07553f7ca2e7";
  if (searchInput.value.trim() === "") {
  } else if (searchInput.value.trim()) {
    var city = searchInput.value.trim();
    citiesBtnArr.push(city);

    if (
      getCities === undefined ||
      getCities.length === 0 ||
      getCities === null
    ) {
      localStorage.setItem("Cities", JSON.stringify(citiesBtnArr));
    }

    var getCities = JSON.parse(localStorage.getItem("Cities"));

    console.log(getCities);
    for (var i = 0; i < citiesBtnArr.length; i++) {
      var recentSearchButton = document.createElement("button");
      recentSearchButton.dataset.search = citiesBtnArr[i];
      recentSearchButton.textContent = citiesBtnArr[i];
      recentSearchButton.classList.add("d-flex");
      recentSearchButton.classList.add("city");
      recentSearchButton.classList.add("btn");
      recentSearchButton.classList.add("btn-secondary");
      recentSearchButton.classList.add("flex-grow-1");
      quickBtn.append(recentSearchButton);
    }

    var base_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_Key}`;
    fetch(base_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        var lat = data[0].lat;
        var lon = data[0].lon;

        // The temperature

        // The wind speed

        var base_URL2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_Key}`;
        fetch(base_URL2)
          .then((response) => response.json())
          .then((data2) => {
            console.log(data2.list);

            var weatherInfo2 = data2.list;

            // The city name
            var city = document.createElement("h3");
            var country = document.createElement("h5");
            city.style.display = "inline";
            country.style.display = "inline";
            city.setAttribute("class", "me-4");
            city.textContent = data[0].name;
            country.textContent = data[0].country;

            console.log(data2);
            // The Date
            var date = document.createElement("p");
            date.textContent = weatherInfo2[0].dt_txt;

            // An icon representation of weather conditions
            var weatherConditionCode = "";
            var weatherCondition = weatherInfo2[0].weather[0].main;
            var weatherIconConditionEl = document.createElement("img");
            var weatherConditionEl = document.createElement("h5");
            weatherConditionEl.style.display = "inline";
            weatherConditionEl.textContent = weatherInfo2[0].weather[0].main;
            // console.log(weatherInfo2[0].weather[0].main);

            if (weatherCondition === "Thunderstorm") {
              weatherConditionCode = "11d";
            } else if (weatherCondition === "Drizzle") {
              weatherConditionCode = "09d";
            } else if (weatherCondition === "Snow") {
              weatherConditionCode = "13d";
            } else if (weatherCondition === "Clear") {
              weatherConditionCode = "01d";
            } else if (weatherCondition === "Rain") {
              weatherConditionCode = "10d";
            } else if (weatherCondition === "Clouds") {
              weatherConditionCode = "04d";
            } else if (
              weatherCondition ===
              ("Mist" ||
                "Smoke" ||
                "Haze" ||
                "Dust" ||
                "Fog" ||
                "Sand" ||
                "Dust" ||
                "Ash" ||
                "Squall" ||
                "Tornado")
            ) {
              weatherConditionCode = "50d";
            }

            weatherIconConditionEl.src = `https://openweathermap.org/img/wn/${weatherConditionCode}@2x.png`;

            // The temperature
            var tempEl = document.createElement("h6");
            var temp = (weatherInfo2[0].main.temp - 273.15).toFixed(1);
            tempEl.textContent = `${temp} C`;
            var weatherInfo2 = data2.list;
            // console.log(temp);

            // The humidity
            var humidityEl = document.createElement("h6");
            var humidity = weatherInfo2[0].main.humidity;
            humidityEl.textContent = `${humidity} %`;

            // The wind speed
            var windSpeedEl = document.createElement("h6");
            var windSpeed = weatherInfo2[0].wind.speed;
            windSpeedEl.textContent = `${windSpeed} KM/H`;

            todayLeftWeatherEl.append(country);
            todayLeftWeatherEl.append(city);
            todayLeftWeatherEl.append(date);
            todayRightWeatherEl.append(weatherConditionEl);
            todayRightWeatherEl.append(tempEl);
            todayRightWeatherEl.append(humidityEl);
            todayRightWeatherEl.append(windSpeedEl);
            todayRightWeatherEl.append(weatherIconConditionEl);

            for (let i = 0; i < 38; i += 8) {
              var col2Element = document.createElement("div");
              col2Element.textContent = "";
              col2Element.setAttribute("class", "col");
              col2Element.style.backgroundColor = "#9bedff";
              forcastRow.append(col2Element);

              // The city name
              var city = document.createElement("h3");
              var country = document.createElement("h5");
              city.style.display = "inline";
              country.style.display = "inline";
              city.setAttribute("class", "me-4");
              city.textContent = data[0].name;
              country.textContent = data[0].country;
              col2Element.append(city);
              col2Element.append(country);

              // The Date
              var date = document.createElement("p");
              date.textContent = weatherInfo2[i].dt_txt;
              col2Element.append(date);

              // An icon representation of weather conditions
              var weatherConditionCode = "";
              var weatherCondition = weatherInfo2[i].weather[0].main;
              var weatherIconConditionEl = document.createElement("img");
              var weatherConditionEl = document.createElement("h5");
              weatherConditionEl.style.display = "inline";
              weatherConditionEl.textContent = weatherInfo2[i].weather[0].main;
              col2Element.append(weatherConditionEl);

              // console.log(weatherInfo2[0].weather[0].main);

              if (weatherCondition === "Thunderstorm") {
                weatherConditionCode = "11d";
              } else if (weatherCondition === "Drizzle") {
                weatherConditionCode = "09d";
              } else if (weatherCondition === "Snow") {
                weatherConditionCode = "13d";
              } else if (weatherCondition === "Clear") {
                weatherConditionCode = "01d";
              } else if (weatherCondition === "Rain") {
                weatherConditionCode = "10d";
              } else if (weatherCondition === "Clouds") {
                weatherConditionCode = "04d";
              } else if (
                weatherCondition ===
                ("Mist" ||
                  "Smoke" ||
                  "Haze" ||
                  "Dust" ||
                  "Fog" ||
                  "Sand" ||
                  "Dust" ||
                  "Ash" ||
                  "Squall" ||
                  "Tornado")
              ) {
                weatherConditionCode = "50d";
              }

              weatherIconConditionEl.src = `https://openweathermap.org/img/wn/${weatherConditionCode}@2x.png`;
              col2Element.append(weatherIconConditionEl);

              // The temperature
              var tempEl = document.createElement("h6");
              var temp = (weatherInfo2[i].main.temp - 273.15).toFixed(1);
              tempEl.textContent = `${temp} C`;
              col2Element.append(tempEl);

              // The wind speed
              var windSpeedEl = document.createElement("h6");
              var windSpeed = weatherInfo2[i].wind.speed;
              windSpeedEl.textContent = `${windSpeed} KM/H`;
              col2Element.append(windSpeedEl);

              // The humidity
              var humidityEl = document.createElement("h6");
              var humidity = weatherInfo2[0].main.humidity;
              humidityEl.textContent = `${humidity} %`;
              col2Element.append(humidityEl);
            }
          });
      });
  }
});
//
