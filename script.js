const apiKey = `dd5ad60f2303dc90c6f8b876b9a9041d`;
// const city = "kolkata";
const defaultCity = "Delhi";

async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Unable to fetch weather data");
    }

    const data = await response.json();
    console.log(data);

    updateWeatherUI(data);
  } catch (error) {
    console.error(error);
    displayErrorMessage();
  }
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");

const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description i");

function updateWeatherUI(data) {
  cityElement.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  windSpeed.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
  humidity.textContent = `${data.main.humidity}%`;
  visibility.textContent = `${data.visibility / 1000} km`;

  descriptionText.textContent = data.weather[0].description;

  const currentDate = new Date();
  date.textContent = currentDate.toDateString();

  const weatherIconName = getWeatherIconName(data.weather[0].main);
  descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
}

window.addEventListener("load", () => {
  fetchWeatherData(defaultCity); // Fetch default city weather
});

function displayErrorMessage() {
  cityElement.textContent = "City not found";
  temperature.textContent = "--";

  date.textContent = "--";
  windSpeed.textContent = "--";
  humidity.textContent = "--";
  visibility.textContent = "--";
  descriptionText.textContent = "Error";

  descriptionIcon.textContent = "help";
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("submit", function (e) {
  e.preventDefault();

  const city = inputElement.value;
  if (city !== "") {
    fetchWeatherData(city);
    inputElement.value = "";
  }
});

function getWeatherIconName(weatherCondition) {
  const iconMap = {
    Clear: "wb_sunny", // Sunny weather
    Clouds: "wb_cloudy", // Cloudy weather
    Rain: "umbrella", // Rain
    Thunderstorm: "flash_on", // Thunderstorm
    Drizzle: "grain", // Light rain/drizzle
    Snow: "ac_unit", // Snow
    Mist: "cloud", // Mist or light fog
    Smoke: "cloud", // Smoke, often used for pollution
    Haze: "cloud", // Haze, low visibility
    Fog: "cloud", // Fog
    Dust: "terrain", // Dust
    Sand: "terrain", // Sandstorm
    Ash: "cloud", // Volcanic ash
    Squall: "air", // Sudden strong wind
    Tornado: "warning", // Tornado
  };
  return iconMap[weatherCondition] || "help";
}
