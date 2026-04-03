import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeButton from "../../assets/Likebutton.svg";
import likeButtonClicked from "../../assets/LikeButtonClicked.svg";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const likes = Array.isArray(item.likes) ? item.likes : [];

  const isLiked =
    currentUser?._id &&
    likes.some((like) =>
      typeof like === "string"
        ? like === currentUser._id
        : like?._id === currentUser._id
    );

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike(item);
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">{item.name}</h2>

        {isLoggedIn && (
          <button
            type="button"
            className="card__like-button"
            onClick={handleLike}
            aria-label={isLiked ? "Unlike item" : "Like item"}
          >
            <img
              src={isLiked ? likeButtonClicked : likeButton}
              alt="Like button"
              className="card__like-icon"
            />
          </button>
        )}
      </div>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;