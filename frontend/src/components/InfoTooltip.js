import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

import successIcon from '../images/tooltip-success.svg';
import errorIcon from '../images/tooltip-error.svg';

function InfoTooltip({ isOpen, data}) {
  const { onClose } = useContext(AppContext);
  const { type, state } = data;

  const tooltipText = {
    login: {
      error: 'Неверные данные для входа! Попробуйте ещё раз.',
      success: 'Вы успешно авторизовались!'
    },
    register: {
      error: 'Что-то пошло не так! Попробуйте ещё раз.',
      success: 'Вы успешно зарегистрировались!'
    }
  };

  const tooltipIcon = {
    error: errorIcon,
    success: successIcon
  };

  return (
    <div className={`popup ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__container">
        <button
          type="button"
          className="page__button popup__close-icon"
          onClick={onClose}
          aria-label="Закрыть"
        ></button>
        <div className="popup__tooltip-icon"
          style={{ backgroundImage: `url(${tooltipIcon[state]})` }}
        ></div>
        <p className="popup__tooltip">{tooltipText[type][state]}</p>
      </div>
    </div>
  );
};

export default InfoTooltip;
