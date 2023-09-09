import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

import AuthForm from './AuthForm';
import Header from './Header';

function Login({ onLogin }) {
  const { isLoading } = useContext(AppContext);

  return (
    <>
      <Header>
        <li>
          <Link to="/sign-up" className="page__link header__link">
            Регистрация
          </Link>
        </li>
      </Header>

      <div className="login">
        <div className="login__container">
          <AuthForm
            title="Вход"
            buttonText={isLoading ? 'Вход' : 'Войти'}
            onSubmit={onLogin}
          />
        </div>
      </div>
    </>
  )
}

export default Login;
