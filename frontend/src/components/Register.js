import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

import AuthForm from './AuthForm';
import Header from './Header';

function Register({ onRegister }) {
  const { isLoading } = useContext(AppContext);

  return (
    <>
      <Header>
        <li>
          <Link to="/sign-in" className="page__link header__link">
            Войти
          </Link>
        </li>
      </Header>

      <div className="register">
        <div className="register__container">
          <AuthForm
            title="Регистрация"
            buttonText={isLoading ? 'Регистрация' : 'Зарегистрироваться'}
            onSubmit={onRegister}
          />
          <div className="register__signin">
            <p className="register__signin-text">Уже зарегистрированы?</p>
            <Link to="/login" className="page__link register__login-link">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register;
