import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

import usePopupClose from "../hooks/usePopupClose";

function ImagePopup({ card }) {
  const { onClose } = useContext(AppContext);
  usePopupClose(card?.link, onClose);

  const className = `popup popup_type_image ${'link' in card && 'popup_is-opened'}`

  return (
    <div className={className}>
      <div className="popup__content">
        <button
          type="button"
          className="page__button popup__close-icon"
          onClick={onClose}
          aria-label="Закрыть"
        ></button>
        <img
          src={card.link}
          alt={card.name}
          className="popup__image"
        />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  );
};

export default ImagePopup;
