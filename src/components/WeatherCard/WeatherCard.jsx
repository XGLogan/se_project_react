import { useContext } from "react";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredOptions = weatherOptions.filter(
    (option) =>
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
  );

  const weatherOption =
    filteredOptions.length > 0
      ? filteredOptions[0]
      : defaultWeatherOptions[weatherData.isDay ? "day" : "night"];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}°{currentTemperatureUnit}
      </p>
      <img
        className="weather-card__image"
        src={weatherOption.url}
        alt={`${weatherData.isDay ? "Day" : "Night"} ${weatherData.condition}`}
      />
    </section>
  );
}

export default WeatherCard;