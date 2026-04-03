import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../utils/Context/CurrentTemperatureUnitContext";
import "./WeatherCard.css";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredOptions = weatherOptions.filter(
    (opt) =>
      opt.day === weatherData.isDay && opt.condition === weatherData.condition
  );
  const weatherOption =
    filteredOptions.length > 0
      ? filteredOptions[0]
      : defaultWeatherOptions[weatherData.isDay ? "day" : "night"];

  return (
    <section className="weather-card">
      <div className="weather-card__info">
        {currentTemperatureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}
        {currentTemperatureUnit}
      </div>
      <img
        src={weatherOption.url}
        alt={`${weatherData.isDay ? "Day" : "Night"} ${weatherOption.condition}`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
