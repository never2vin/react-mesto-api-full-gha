import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onCardDelete }) {
  const { isLoading } = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();

    onCardDelete();
  }

  return (
    <PopupWithForm
      type="confirm"
      title="Вы уверены?"
      buttonText={isLoading ? 'Удаление' : 'Да'}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    />
  )
}

export default ConfirmPopup;
