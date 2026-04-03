import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  onRegisterClick,
  onLoginClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const userInitial = currentUser?.name?.[0]?.toUpperCase() || "U";

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__spacer" />

      <ToggleSwitch />

      {isLoggedIn ? (
        <>
          <button
            type="button"
            onClick={handleAddClick}
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>

          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>

              {currentUser.avatar ? (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt={currentUser.name}
                />
              ) : (
                <div className="header__avatar-placeholder">{userInitial}</div>
              )}
            </div>
          </Link>
        </>
      ) : (
        <div className="header__auth-buttons">
          <button
            type="button"
            className="header__auth-button"
            onClick={onRegisterClick}
          >
            Sign Up
          </button>
          <button
            type="button"
            className="header__auth-button"
            onClick={onLoginClick}
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;