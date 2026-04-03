import { useContext } from "react";
import "./Sidebar.css";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function SideBar({ onEditProfileClick, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const userInitial = currentUser?.name?.[0]?.toUpperCase() || "U";

  return (
    <section className="profile__sidebar-content">
      <div className="profile__user-row">
        {currentUser.avatar ? (
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
        ) : (
          <div className="profile__avatar profile__avatar-placeholder">
            {userInitial}
          </div>
        )}

        <p className="profile__name">{currentUser.name}</p>
      </div>

      <button
        type="button"
        className="profile__button"
        onClick={onEditProfileClick}
      >
        Change profile data
      </button>

      <button type="button" className="profile__button" onClick={onSignOut}>
        Log out
      </button>
    </section>
  );
}

export default SideBar;