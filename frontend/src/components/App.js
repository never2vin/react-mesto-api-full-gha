import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import { AppContext } from '../contexts/AppContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import { api } from "../utils/api.js";
import * as auth from "../auth";

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';

import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';

function App() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isInitialDataLoading, setIsInitialDataLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [tooltip, setTooltip] = useState({
    type: 'register',
    state: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    setToken(jwt);
  }, [])

  useEffect(() => {
    if (!token) {
      return;
    }

    auth.checkToken(token).then((data) => {
        setEmail(data.email);
      setIsLoggedIn(true);

      navigate('/', {replace: true})
    })
      .catch(console.error);
  }, [token, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      setIsInitialDataLoading(true);

      api.getAllInitialData().then(data => {
        const [userInfo, cardsData] = data;
        setCurrentUser(userInfo);
        setCards(cardsData);
      })
        .catch(console.error)
        .finally(() => {setIsInitialDataLoading(false)});
    }
  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardDeleteClick(data) {
    setCardToDelete(data);
    setIsConfirmPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
    setCardToDelete({});
  }

  function handleCardClick(data) {
    setSelectedCard(data);
  }

  function handleCardDelete() {
    setIsLoading(true);

    api.removeCard(cardToDelete._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
      setIsConfirmPopupOpen(false);
    })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false)
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(console.error);
  }

  function handleUpdateAvatar({ link }) {
    setIsLoading(true);

    api.updateUserAvatar(link).then(res => {
      setCurrentUser(res);
      closeAllPopups();
    })
      .catch(console.error)
      .finally(() => {setIsLoading(false)});
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true);

    api.updateUserInfo(userInfo).then(res => {
      setCurrentUser(res);
      closeAllPopups();
    })
      .catch(console.error)
      .finally(() => {setIsLoading(false)});
  }

  function handleAddPlace(data) {
    setIsLoading(true);

    api.addCard(data).then(res => {
      setCards([res, ...cards]);
      closeAllPopups();
    })
      .catch(console.error)
      .finally(() => {setIsLoading(false)});
  }

  function onRegister({ password, email }) {
    setIsLoading(true);

    auth.register(password, email)
      .then(() => {
        setTooltip({
          type: 'register',
          state: 'success'
        });

        setIsInfoTooltipOpen(true);

        navigate('/sign-in', {replace: true});
      })
        .catch(error => {
          console.log(error);

          setTooltip({
            type: 'register',
            state: 'error'
          });

          setIsInfoTooltipOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
  }

  function onLogin({ password, email }) {
    setIsLoading(true);

    auth.authorize(password, email)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setToken(res.token);
      })
        .catch(error => {
          console.log(error);

          setTooltip({
            type: 'login',
            state: 'error'
          });

          setIsInfoTooltipOpen(true);
        })
        .finally(() => {
          setIsLoading(false)
        });
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    setToken('');
    setEmail('');

    navigate('/sign-in', {replace: true});
  }

  return (
    <AppContext.Provider value={{ isLoading, onClose: closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>

        <Routes>
          <Route path="/"
            element={
              <>
                <Header isLoggedIn={isLoggedIn}>
                  <li>
                    <p className="header__email">{email}</p>
                  </li>
                  <li>
                    <button className="page__button header__auth-button" onClick={onSignOut}>Выйти</button>
                  </li>
                </Header>

                <ProtectedRoute element={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardDelete={handleCardDeleteClick}
                  onCardLike={handleCardLike}
                  isLoading={isInitialDataLoading}
                  isLoggedIn={isLoggedIn}
                />

                <Footer />
              </>
            }
          />

          <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
          <Route path="/sign-up" element={<Register onRegister={onRegister} />} />

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlace}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onCardDelete={handleCardDelete}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          data={tooltip}
        />

        <ImagePopup
          card={selectedCard}
        />

      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
