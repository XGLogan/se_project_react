import { checkResponse } from "./Api";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
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

  return {
    city,
    type,
    temp: {
      F: tempF,
      C: tempC,
    },
  };
};
