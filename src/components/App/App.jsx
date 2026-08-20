import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import {
  getItems,
  addItem,
  removeItem,
  addCardLike,
  removeCardLike,
  updateUserInfo,
} from "../../utils/Api";
import { register, authorize, checkToken } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    type: "",
    temp: { F: 999, C: 999 },
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setIsConfirmDeleteOpen(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    closeActiveModal();
    setIsConfirmDeleteOpen(true);
  };

  const handleRequest = (request, onSuccess) => {
    setIsLoading(true);

    return request()
      .then(onSuccess)
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");

    return handleRequest(
      () => addItem({ name, imageUrl, weather }, token),
      (newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      }
    );
  };

  const handleDeleteItem = (item) => {
    if (!item) return;

    const token = localStorage.getItem("jwt");

    return handleRequest(
      () => removeItem(item._id, token),
      () => {
        setClothingItems((prevItems) =>
          prevItems.filter((card) => card._id !== item._id)
        );
        setIsConfirmDeleteOpen(false);
        setItemToDelete(null);
      }
    );
  };

  const handleCardLike = ({ _id, likes = [] }) => {
    const token = localStorage.getItem("jwt");

    const isLiked = likes.some((like) =>
      typeof like === "string"
        ? like === currentUser._id
        : like?._id === currentUser._id
    );

    const likeRequest = isLiked
      ? removeCardLike(_id, token)
      : addCardLike(_id, token);

    likeRequest
      .then((updatedCard) => {
        setClothingItems((prevItems) =>
          prevItems.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch((err) => console.error(err));
  };

  const handleLogin = ({ email, password }) => {
    return handleRequest(
      () =>
        authorize({ email, password }).then((data) => {
          localStorage.setItem("jwt", data.token);
          return checkToken(data.token);
        }),
      (userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeActiveModal();
      }
    );
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    return handleRequest(
      () =>
        register({ name, avatar, email, password })
          .then(() => authorize({ email, password }))
          .then((data) => {
            localStorage.setItem("jwt", data.token);
            return checkToken(data.token);
          }),
      (userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeActiveModal();
      }
    );
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");

    return handleRequest(
      () => updateUserInfo({ name, avatar }, token),
      (updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      }
    );
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    setActiveModal("");
    setIsConfirmDeleteOpen(false);
    setItemToDelete(null);
    setSelectedCard({});
    // The items effect below clears the gallery to a blank slate
    // whenever isLoggedIn flips to false.
  };

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    if (!activeModal && !isConfirmDeleteOpen) {
      return undefined;
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal, isConfirmDeleteOpen]);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    // Only logged-in users see clothing items; logging out clears
    // the gallery to a blank slate so nothing lingers.
    if (!isLoggedIn) {
      setClothingItems([]);
      return;
    }

    getItems()
      .then((items) => setClothingItems(items))
      .catch((err) => console.error(err));
  }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setIsAppReady(true);
      return;
    }

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
      })
      .finally(() => setIsAppReady(true));
  }, []);

  // Don't render until the stored token has been checked, so a
  // logged-in refresh never flashes the logged-out UI first.
  if (!isAppReady) {
    return null;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              weatherData={weatherData}
              handleAddClick={handleAddClick}
              onRegisterClick={handleRegisterClick}
              onLoginClick={handleLoginClick}
              isLoggedIn={isLoggedIn}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onAddClick={handleAddClick}
                      onCardLike={handleCardLike}
                      onEditProfileClick={handleEditProfileClick}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItem={handleAddItemModalSubmit}
              isLoading={isLoading}
            />

            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              onDelete={handleDeleteClick}
            />

            <ConfirmDeleteModal
              isOpen={isConfirmDeleteOpen}
              onClose={() => {
                setIsConfirmDeleteOpen(false);
                setItemToDelete(null);
              }}
              onConfirm={() => handleDeleteItem(itemToDelete)}
              isLoading={isLoading}
            />

            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              onRegister={handleRegister}
              onLoginClick={handleLoginClick}
              isLoading={isLoading}
            />

            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onLogin={handleLogin}
              onRegisterClick={handleRegisterClick}
              isLoading={isLoading}
            />

            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              onUpdateProfile={handleUpdateProfile}
              isLoading={isLoading}
            />

            <Footer />
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;