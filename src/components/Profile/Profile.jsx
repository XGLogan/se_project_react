import "./Profile.css";
import SideBar from "./Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  onCardLike,
  onEditProfileClick,
  onSignOut,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onEditProfileClick={onEditProfileClick}
          onSignOut={onSignOut}
        />
      </section>

      <section className="profile__clothing">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onAddClick={onAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;