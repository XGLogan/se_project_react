import { useContext } from "react";
import "./ItemModal.css";
import closeIcon from "../../assets/CloseButton.jpg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, card, onClose, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const ownerId =
    typeof card.owner === "string" ? card.owner : card.owner?._id;

  const isOwn = currentUser?._id && ownerId === currentUser._id;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img
            className="modal__close-icon"
            src={closeIcon}
            alt="Close modal"
          />
        </button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <div>
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          {isOwn && (
            <button
              type="button"
              onClick={() => onDelete(card)}
              className="modal__delete-button"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;