import { useEffect } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onRegisterClick,
  isLoading,
}) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen) {
      resetForm({
        email: "",
        password: "",
      });
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText={isLoading ? "Logging in..." : "Log In"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonClassName="login-modal__submit-btn"
      secondaryText="or"
      secondaryButtonText="Sign Up"
      onSecondaryClick={onRegisterClick}
      secondaryButtonClassName="login-modal__switch-btn"
      secondaryTextClassName="login-modal__secondary-text"
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;