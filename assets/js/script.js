var searchInput = document.querySelector("#search-input");
var searchButton = document.querySelector("#search-button");
var todayWeatherEl = document.querySelector(".today");

var handleWeather = function (e) {};

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  todayWeatherEl.textContent = '';

  var API_Key = "857f61713ca1c679c09b07553f7ca2e7";
  if (searchInput.value.trim() === "") {
  } else if (searchInput.value.trim()) {
    var city = searchInput.value.trim();
    // console.log(city);
    var base_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_Key}`;

    fetch(base_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        var lat = data[0].lat;
        var lon = data[0].lon;


        // The temperature
        // The humidity
        // The wind speed

        var base_URL2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_Key}`;
        fetch(base_URL2)
          .then((response) => response.json())
          .then((data2) => {
            console.log(data2.list);

            // The city name
            var city = document.createElement("h3");
            // city.style.display = "inline";
            // city.setAttribute("class", "me-4");
            city.textContent = data[0].name;
            var weatherInfo2 = data2.list;

            // The Date
            var date = document.createElement('p');
            date.textContent = weatherInfo2[0].dt_txt;

        // An icon representation of weather conditions
            var weatherConditionCode = '';
            var weatherCondition = weatherInfo2[0].weather[0].main;
            var weatherIconConditionEl = document.createElement('img');
            var weatherConditionEl = document.createElement('h5');
            weatherConditionEl.textContent = weatherInfo2[0].weather[0].main;
            console.log(weatherInfo2[0].weather[0].main);

            if(weatherCondition === 'Thunderstorm'){
              weatherConditionCode = '11d';
            } 
            else if( weatherCondition === 'Drizzle'){
              weatherConditionCode = '09d';
            }
            else if( weatherCondition === 'Snow'){
              weatherConditionCode = '13d';
            }
            else if( weatherCondition === 'Clear'){
              weatherConditionCode = '01d';
            }
            else if( weatherCondition === 'Clouds'){
              weatherConditionCode = '04d';
            }
            else if( weatherCondition === ('Mist' || 'Smoke' || 'Haze' || 'Dust' || 'Fog' || 'Sand' || 'Dust' || 'Ash' || 'Squall' || 'Tornado') ){
              weatherConditionCode = '50d';
            }
            
            weatherIconConditionEl.src = `https://openweathermap.org/img/wn/${weatherConditionCode}@2x.png`

            var country = document.createElement("h5");

            todayWeatherEl.append(city);
            todayWeatherEl.append(date);
            todayWeatherEl.append(weatherIconConditionEl);
            todayWeatherEl.append(weatherConditionEl);

            // for (let j = 0; j < data2.list.length; j++) {

            // }
            // The date
            var date = document.createElement("span");
            city.textContent = data[1].name;
            // An icon representation of weather conditions
            // The temperature
            // The humidity
            // The wind speed
            var i = 1;
            while (i < data.length) {
              // Country and city
              var country = document.createElement("h5");
              var city = document.createElement("h6");
              city.textContent = data[i].name;
              console.log(city);
              // date
              var date = document.createElement("h3");
              data;

              todayWeatherEl.append();
              i++;
            }
          });
      });
  }
});
//
