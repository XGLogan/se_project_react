import { checkResponse } from "./Api";

export const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then(checkResponse);
};

export const filterWeatherData = (data) => {
  const city = data.name;
  const tempF = Math.round(data.main.temp);
  const tempC = Math.round(((tempF - 32) * 5) / 9);

  let type = "";
  if (tempF >= 86) {
    type = "hot";
  } else if (tempF >= 66) {
    type = "warm";
  } else {
    type = "cold";
  }

  const currentTime = data.dt;
  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;
  const isDay = currentTime >= sunrise && currentTime < sunset;

  const condition = data.weather[0].main.toLowerCase();

  return {
    city,
    type,
    condition,
    isDay,
    temp: {
      F: tempF,
      C: tempC,
    },
  };
};