document.addEventListener("DOMContentLoaded", function () {
    function fetchWeatherData(city) {
      var apiUrl =
        "https://api.weatherapi.com/v1/current.json?key=0c7bd89b971449f09a8134441232605&q=" +
        city +
        "&aqi=yes";
  
      fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          updateWeatherInfo(data);
        })
        .catch(function (error) {
          console.log("Error fetching weather data:", error);
        });
    }
  
    function updateWeatherInfo(weather) {
      var cityName = document.getElementById("city-name");
      var temperature = document.getElementById("temperature");
      var weatherIcon = document.getElementById("weather-icon-img");
      var weatherCondition = document.getElementById("weather-condition");
      var humidity = document.getElementById("humidity");
      var windSpeed = document.getElementById("wind-speed");
      var pressure = document.getElementById("pressure");
      var visibility = document.getElementById("visibility");
      var airQualityValue = document.getElementById("air-quality-value");
  
      cityName.textContent = weather.location.name;
      temperature.textContent = weather.current.temp_c + "°C";
      weatherCondition.textContent = weather.current.condition.text;
      humidity.textContent = "Humidity: " + weather.current.humidity + "%";
      windSpeed.textContent =
        "Wind Speed: " + weather.current.wind_kph + " km/h";
      pressure.textContent =
        "Pressure: " + weather.current.pressure_mb + " mb";
      visibility.textContent =
        "Visibility: " + weather.current.vis_km + " km";
      airQualityValue.textContent =
        "Air Quality: " + weather.current.air_quality["us-epa-index"];
  
      var weatherCode = weather.current.condition.code;
      var weatherIconPath = "Images/";
  
      if (weatherCode === 1000) {
        weatherIconPath += "Sunny.jpg";
      } else if (weatherCode === 1003 || weatherCode === 1006) {
        weatherIconPath += "cloudy.png";
      } else if (weatherCode === 1063 || weatherCode === 1180) {
        weatherIconPath += "rainy.jpeg";
      } else if (weatherCode === 1135 || weatherCode === 1147) {
        weatherIconPath += "Snow.jpg";
      } else if (weatherCode === 1168 || weatherCode === 1192) {
        weatherIconPath += "stormy.jpg";
      } else {
        weatherIconPath += "icon.png";
      }
  
      weatherIcon.src = weatherIconPath;
    }
  
    fetchWeatherData("Islamabad");
  
    var searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", function () {
      var searchInput = document.getElementById("search-input");
      var city = searchInput.value;
      fetchWeatherData(city);
    });
  });