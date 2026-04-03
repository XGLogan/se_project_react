import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({ clothingItems, onAddClick, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter((item) => {
    const ownerId =
      typeof item.owner === "string" ? item.owner : item.owner?._id;

    return ownerId === currentUser._id;
  });

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your items</p>
        <button type="button" className="clothes-section__add-btn" onClick={onAddClick}>
          + Add New
        </button>
      </div>

      <ul className="cards__list">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            isLoggedIn
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;