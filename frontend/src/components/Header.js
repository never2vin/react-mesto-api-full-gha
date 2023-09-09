import { useState } from 'react';

import logo from '../images/header-logo.svg'

function Header({ isLoggedIn, children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuClick() {
    setIsMenuOpen(state => !state);
  }

  return (
    <header className="header page__header">
      <div className={`header__menu-collapse ${isMenuOpen ? "header__menu-open" : ""}`}>
        <ul className="page__list header__menu">
          {children}
        </ul>
      </div>
      <div className="header header__bar">
        <img src={logo}
          alt="Логотип"
          className="header__logo"
        />
        {
          isLoggedIn
          ?
          <>
            <ul className="page__list header__auth">
              {children}
            </ul>
            <button
              type="button"
              className={`page__button header__menu-icon ${isMenuOpen ? "header__menu-icon_active" : ""}`}
              onClick={handleMenuClick}
              aria-label={`${isMenuOpen ? "Закрыть" : "Открыть"}`}
            ></button>
          </>
          :
          <ul className="page__list">
            {children}
          </ul>
        }
      </div>
    </header>
  )
}

export default Header;
