import { useEffect, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

import useForm from "../hooks/useForm";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
  const { isLoading } = useContext(AppContext);

  const { form, errors, handleChange, handleSubmit, setInitialState } = useForm({
    link: '',
  }, onUpdateAvatar);

  useEffect(() => {
    setInitialState();
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <PopupWithForm
      type="update"
      title="Обновить аватар"
      buttonText={isLoading ? 'Сохранение' : 'Сохранить'}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        className={`page__input form__input ${errors.link ? "form__input_type_error" : ''}`}
        type="url"
        id="avatar-link"
        name="link"
        value={form.link}
        onChange={handleChange}
        placeholder="https://somewebsite.com/someimage.jpg"
        autoFocus
        required
      />
      <span className={`form__input-error ${errors.link ? "form__input-error_visible" : ''}`}>
        {errors.link}
      </span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
