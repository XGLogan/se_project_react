import "./ModalWithForm.css";
import closeIcon from "../../assets/CloseButton.jpg";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  buttonClassName = "",
  secondaryText = "",
  secondaryButtonText = "",
  onSecondaryClick,
  secondaryButtonClassName = "",
  secondaryTextClassName = "",
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button type="button" className="modal__close" onClick={onClose}>
          <img
            className="modal__close-icon"
            src={closeIcon}
            alt="Close modal"
          />
        </button>

        <h2 className="modal__title">{title}</h2>

        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          <div className="modal__actions">
            <button
              type="submit"
              className={`modal__submit ${buttonClassName}`.trim()}
            >
              {buttonText}
            </button>

            {secondaryButtonText && (
              <div className="modal__secondary-action">
                {secondaryText && (
                  <span
                    className={`modal__secondary-text ${secondaryTextClassName}`.trim()}
                  >
                    {secondaryText}
                  </span>
                )}

                <button
                  type="button"
                  className={`modal__secondary-button ${secondaryButtonClassName}`.trim()}
                  onClick={onSecondaryClick}
                >
                  {secondaryButtonText}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;