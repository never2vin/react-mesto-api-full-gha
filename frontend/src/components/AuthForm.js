import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

import useForm from "../hooks/useForm";

function AuthForm({ title, buttonText, onSubmit }) {
  const { isLoading } = useContext(AppContext);

  const { form, errors, handleChange, handleSubmit } = useForm({
    email: '',
    password: '',
  }, onSubmit);

  return (
    <form onSubmit={handleSubmit} className="form_type_auth">
      <h2 className="form__heading">{title}</h2>
      <input
        className={`page__input form__input ${errors.email && "form__input_type_error"}`}
        type="email"
        id="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        autoFocus
        required
      />
      <span className={`form__input-error ${errors.email && "form__input-error_visible"}`}>
        {errors.email}
      </span>
      <input
        className={`page__input form__input ${errors.password && "form__input_type_error"}`}
        type="password"
        id="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        minLength={3}
        placeholder="Пароль"
        required
      />
      <span className={`form__input-error ${errors.password && "form__input-error_visible"}`}>
        {errors.password}
      </span>
      <button type="submit" className={`page__button form__submit ${isLoading && "form__submit_is-loading"}`}>
        {buttonText}
      </button>
    </form>
  )
}

export default AuthForm;
