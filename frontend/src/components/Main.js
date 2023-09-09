import React, { useContext } from 'react';
import Card from './Card.js';
import Spinner from './Spinner.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardDelete, onCardLike, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      {isLoading
        ? <Spinner />
        : <>
          <section className="profile content__profile">
            <div className="profile__avatar"
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
              onClick={onEditAvatar}
            ></div>
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__job">{currentUser.about}</p>
              <button
                type="button"
                className="page__button profile__edit-button"
                onClick={onEditProfile}
                aria-label="Редактировать профиль"
              ></button>
            </div>
            <button
              type="button"
              className="page__button profile__add-button"
              onClick={onAddPlace}
              aria-label="Добавить"
            ></button>
          </section>

          <section aria-label="Карточки красивых мест">
            <ul className="places page__list">
              {cards.map((card) => (
                <Card key={card._id}
                  data={card}
                  onCardClick={onCardClick}
                  onCardDelete={onCardDelete}
                  onCardLike={onCardLike}
                />))
              }
            </ul>
          </section>
        </>
      }
    </main>
  )
}

export default Main;
