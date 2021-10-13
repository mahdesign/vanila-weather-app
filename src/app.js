function displayTempreture(response) {
  console.log(response.data);
  let tempretureElement = document.querySelector("#tempreture");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  tempretureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}
let apikey = "a710bd8bd76400c9658ef649d9e81728";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apikey}&units=metric`;
axios.get(apiUrl).then(displayTempreture);
