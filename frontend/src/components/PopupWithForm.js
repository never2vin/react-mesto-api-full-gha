import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

import usePopupClose from "../hooks/usePopupClose";

function PopupWithForm({ type, title, buttonText, isOpen, onSubmit, children }) {
  const { isLoading } = useContext(AppContext);
  const { onClose } = useContext(AppContext);

  usePopupClose(isOpen, onClose);

  const className = `popup ${isOpen && 'popup_is-opened'}`

  return (
    <div className={className}>
      <div className="popup__container">
        <button
          type="button"
          className="page__button popup__close-icon"
          onClick={onClose}
          aria-label="Закрыть"
        ></button>
        <form className={`form_type_${type}`} name={type} onSubmit={onSubmit} >
          <h2 className="form__heading">{title}</h2>
          {children}
          <button type="submit" className={`page__button form__submit ${isLoading && "form__submit_is-loading"}`}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
