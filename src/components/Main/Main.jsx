import { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  onCardLike,
  isLoggedIn,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentUser = useContext(CurrentUserContext);

  // Only the current user's own items, matched to today's weather.
  const filteredCards = clothingItems.filter((item) => {
    const ownerId =
      typeof item.owner === "string" ? item.owner : item.owner?._id;

    return item.weather === weatherData.type && ownerId === currentUser._id;
  });

  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      {isLoggedIn && (
        <section className="cards">
          <p className="card__text">
            Today is {weatherData.temp[currentTemperatureUnit]}°
            {currentTemperatureUnit} / You may want to wear:
          </p>

          <ul className="cards__list">
            {filteredCards.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default Main;