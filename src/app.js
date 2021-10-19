function formatDate(timestamp) {
  //calculate the time
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTempreture(response) {
  let tempretureElement = document.querySelector("#tempreture");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  celcuiesTempreture = response.data.main.temp;
  tempretureElement.innerHTML = Math.round(celcuiesTempreture);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function search(city) {
  let apikey = "a710bd8bd76400c9658ef649d9e81728";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(apiUrl).then(displayTempreture);
}

function handelSubmit(event) {
  event.preventDefault();
  let inputCityElement = document.querySelector("#input-city");
  search(inputCityElement.value);
}

function showFahrenheitTempreture(event) {
  event.preventDefault();
  let tempretureElement = document.querySelector("#tempreture");
  celciusLinkElement.classList.remove("active");
  fahrenheitLinkElement.classList.add("active");
  let fahrenheitTempreture = (celcuiesTempreture * 9) / 5 + 32;
  tempretureElement.innerHTML = Math.round(fahrenheitTempreture);
}

function showCelciusTempreture(event) {
  event.preventDefault();
  fahrenheitLinkElement.classList.remove("active");
  celciusLinkElement.classList.add("active");
  let tempretureElement = document.querySelector("#tempreture");
  tempretureElement.innerHTML = Math.round(celcuiesTempreture);
}

function displayForcast() {
  let forcastElemnt = document.querySelector("#forcast");
  let forcastHTML = `<div class="row">`;
  let days = ["Fri", "SAT", "SUN", "MON"];
  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      `   <div class="col-2">
            <div class="weather-forcast-date">${day}</div>
              <img
                  src="http://openweathermap.org/img/wn/01n@2x.png"
                  alt=""
                  width="42"
             />
            <div class="weather-forcast-tempreture">
               <span class="weather-forcast-tempreture-max">18°</span>
               <span class="weather-forcast-tempreture-min">12°</span>
            </div>
          </div>`;
  });

  forcastHTML = forcastHTML + `</div>`;
  forcastElemnt.innerHTML = forcastHTML;
}
let celcuiesTempreture = null;
let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", handelSubmit);

let fahrenheitLinkElement = document.querySelector("#fahrenheit-link");
fahrenheitLinkElement.addEventListener("click", showFahrenheitTempreture);
let celciusLinkElement = document.querySelector("#celcius-link");
celciusLinkElement.addEventListener("click", showCelciusTempreture);
search("Tehran");
displayForcast();
