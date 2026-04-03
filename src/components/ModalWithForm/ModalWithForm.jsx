import "./ModalWithForm.css";
import closeIcon from "../../assets/CloseButton.jpg";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit, // <-- make sure we actually use this
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>

        <button onClick={onClose} type="button" className="modal__close">
          <img className="modal__close-icon" src={closeIcon} alt="Close" />
        </button>

        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
