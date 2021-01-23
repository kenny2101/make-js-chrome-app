const WEATHER = document.querySelector(".js-weather");

const API_KEY = "3a1934422dc54fdc9c28df28436b7892";
const COORDS = "coords";

function getWeather(lat, long) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const placeweather = json.weather[0].main;
      const temperature_now = json.main.temp;
      const temperature_max = json.main.temp_max;
      const temperature_min = json.main.temp_min;
      const place = json.name;
      const country = json.sys.country;
      WEATHER.innerText = `@ ${country} : ${place}
      ${placeweather}
      now : ${temperature_now}℃
      max : ${temperature_max}℃
      min : ${temperature_min}℃`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
