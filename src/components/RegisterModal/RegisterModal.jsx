import { useEffect } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onLoginClick, 
  isLoading,
}) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen) {
      resetForm({
        name: "",
        avatar: "",
        email: "",
        password: "",
      });
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText={isLoading ? "Signing up..." : "Sign Up"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonClassName="register-modal__submit-btn"
      secondaryText="or"
      secondaryButtonText="Log In"
      onSecondaryClick={onLoginClick}
      secondaryButtonClassName="register-modal__switch-btn"
      secondaryTextClassName="register-modal__secondary-text"
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

      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;