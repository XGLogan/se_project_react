import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const isChecked = currentTemperatureUnit === "C";

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        checked={isChecked}
        onChange={handleToggleSwitchChange}
      />
      <span className="toggle-switch__circle"></span>
      <span
        className={`toggle-switch__text toggle-switch__text_F ${
          currentTemperatureUnit === "F" ? "toggle-switch__text_active" : ""
        }`}
      >
        F
      </span>
      <span
        className={`toggle-switch__text toggle-switch__text_C ${
          currentTemperatureUnit === "C" ? "toggle-switch__text_active" : ""
        }`}
      >
        C
      </span>
    </label>
  );
}

export default ToggleSwitch;