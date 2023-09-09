import { useEffect, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import useForm from "../hooks/useForm";
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onUpdateUser }) {
  const { isLoading } = useContext(AppContext);
  const { name, about } = useContext(CurrentUserContext);

  useEffect(() => {
    setInitialState();
    // eslint-disable-next-line
  }, [isOpen]);

  const { form, errors, handleChange, handleSubmit, setInitialState } = useForm({
    name,
    about
  }, onUpdateUser);

  return (
    <PopupWithForm
      type="edit"
      title="Редактировать профиль"
      buttonText={isLoading ? 'Сохранение' : 'Сохранить'}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        className={`page__input form__input ${errors.name && "form__input_type_error"}`}
        type="text"
        id="user-name"
        name="name"
        value={form.name ?? ''}
        onChange={handleChange}
        placeholder="Имя"
        autoFocus
        minLength={2}
        maxLength={40}
        required
      />
      <span className={`form__input-error ${errors.name && "form__input-error_visible"}`}>
        {errors.name}
      </span>
      <input
        className={`page__input form__input ${errors.about && "form__input_type_error"}`}
        type="text"
        id="about"
        name="about"
        value={form.about ?? ''}
        onChange={handleChange}
        placeholder="О себе"
        minLength={2}
        maxLength={200}
        required
      />
      <span className={`form__input-error ${errors.about && "form__input-error_visible"}`}>
        {errors.about}
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
