import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import useForm from "../../hooks/useForm";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItem,
  isLoading,
}) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: "",
        imageUrl: "",
        weather: "",
      });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weather,
    });
  };

  return (
    <ModalWithForm
      title="New garment"
      name="add-garment"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Adding..." : "Add garment"}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          required
          value={values.name || ""}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Image URL
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          placeholder="Image URL"
          required
          value={values.imageUrl || ""}
          onChange={handleChange}
        />
      </label>

      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            value="hot"
            className="modal__radio-input"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />
          <span>Hot</span>
        </label>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            value="warm"
            className="modal__radio-input"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          <span>Warm</span>
        </label>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            value="cold"
            className="modal__radio-input"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}