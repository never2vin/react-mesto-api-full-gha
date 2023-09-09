import { useContext, useEffect }  from 'react';
import { AppContext } from '../contexts/AppContext';

import useForm from "../hooks/useForm";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onAddPlace }) {
  const { isLoading } = useContext(AppContext);

  const { form, errors, handleChange, handleSubmit, setInitialState } = useForm({
    name: '',
    link: '',
  }, onAddPlace);

  useEffect(() => {
    setInitialState();
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <PopupWithForm
      type="add"
      title="Новое место"
      buttonText={isLoading ? 'Создание' : 'Создать'}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        className={`page__input form__input ${errors.name && "form__input_type_error"}`}
        type="text"
        id="name"
        name="name"
        value={form.name ?? ''}
        onChange={handleChange}
        placeholder="Название"
        autoFocus
        minLength={2}
        maxLength={30}
        required
      />
      <span className={`form__input-error ${errors.name && "form__input-error_visible"}`}>
        {errors.name}
      </span>
      <input
        className={`page__input form__input ${errors.link && "form__input_type_error"}`}
        type="url"
        id="link"
        name="link"
        value={form.link ?? ''}
        onChange={handleChange}
        placeholder="Ссылка на картинку"
        required
      />
      <span className={`form__input-error ${errors.link && "form__input-error_visible"}`}>
        {errors.link}
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
