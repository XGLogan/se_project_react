import "./ConfirmDeleteModal.css";
import closeIcon from "../../assets/CloseButton.jpg";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_confirm-delete">
        <button type="button" className="modal__close" onClick={onClose}>
          <img
            className="modal__close-icon"
            src={closeIcon}
            alt="Close modal"
          />
        </button>

        <p className="modal__confirm-text">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </p>

        <button
          type="button"
          className="modal__delete-confirm-btn"
          onClick={onConfirm}
        >
          Yes, delete item
        </button>

        <button
          type="button"
          className="modal__cancel-btn"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;