import React, { useState, useContext } from 'react';
import noImagePath from '../images/place-no-image.png'

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ data, onCardClick, onCardDelete, onCardLike }) {
  const [isImageLoadError, setIsImageLoadError] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  const isOwn = data.owner === currentUser._id;
  const isLiked = data.likes.some(id => id === currentUser._id);
  const cardLikeIconClassName  = `page__button place__like-icon ${isLiked ? 'place__like-icon_active' : ''}`;

  function handleImageLoadError(e) {
    setIsImageLoadError(true);

    e.target.style = 'cursor: default';
  };

  function handleClick() {
    onCardClick(data);
  }

  function handleDeleteClick() {
    onCardDelete(data);
  }

  function handleLikeClick() {
    onCardLike(data);
  }


  return (
    <li className="place">
      {!isImageLoadError ? (
          <img
            src={data.link}
            alt={data.name}
            className="place__image"
            onClick={handleClick}
            onError={handleImageLoadError}
            width="282"
            height="282"
          />
        ) : (
          <img
            src={noImagePath}
            alt={data.name}
            className="place__image"
            width="282"
            height="282"
          />
        )
      }
      {isOwn &&
        <button
          type="button"
          className="page__button place__trash-icon"
          onClick={handleDeleteClick}
          aria-label="Удалить"
        ></button>
      }
      <div className="place__description">
        <h2 className="place__title">{data.name}</h2>
        <div className="place__like">
          <button
            type="button"
            className={cardLikeIconClassName}
            onClick={handleLikeClick}
            aria-label="Лайкнуть"
          ></button>
          <span className="place__like-count">{data.likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;
