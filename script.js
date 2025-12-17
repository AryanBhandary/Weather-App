const API_KEY = "e155d31fa00e0f3962e9beb9b2be0d19";

const CITY = "Bhaktapur,NP";

async function showWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`
  );

  const data = await response.json();

  // City name
  document.getElementById("city").innerText = data.name;

  // Temperature in Celsius
  document.getElementById("temp").innerText = `${Math.round(data.main.temp)}°C`;

  // Weather description (e.g., "clear sky")
  document.getElementById("condition").innerText = data.weather[0].description;

  // Feels like temperature
  document.getElementById("feels").innerText = `${Math.round(data.main.feels_like)}°C`;

  // Wind speed
  document.getElementById("wind").innerText = `${data.wind.speed} m/s`;

  // Humidity
  document.getElementById("humidity").innerText = `${data.main.humidity}%`;

  // Pressure
  document.getElementById("pressure").innerText = `${data.main.pressure} hPa`;


  // Show a simple icon for the weather
  const main = data.weather[0].main;
  document.getElementById("icon").innerText =
    main === "Clear" ? "☀️" :
    main === "Clouds" ? "☁️" :
    main === "Rain" ? "🌧️" : "⛅";

  // OpenWeatherMap gives timezone offset in seconds from UTC
  const timezoneOffset = data.timezone;

  // Current UTC time in milliseconds
  const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;

  // Add city timezone to get local city time
  const cityTime = new Date(utc + timezoneOffset * 1000);

  // Show date
  document.getElementById("date").innerText = cityTime.toDateString();

  // Show time
  document.getElementById("time").innerText = cityTime.toLocaleTimeString();
}

// When the button is clicked, get the latest weather again
document.getElementById("refreshBtn").addEventListener("click", showWeather);

// Show weather immediately when the page loads
showWeather();
