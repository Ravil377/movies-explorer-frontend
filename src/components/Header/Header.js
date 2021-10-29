import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ isMenuOpen, onClose, onOpen, isLogged, signOut }) {


    React.useEffect(() => {
        const handleClosePopupOnEsc = (e) => {
            if (e.code === "Escape") onClose();
        }

        if (isMenuOpen) {
            document.addEventListener('keyup', handleClosePopupOnEsc);
        } 
        return () => {
            document.removeEventListener('keyup', handleClosePopupOnEsc);
        }
    }, [isMenuOpen, onClose, onOpen]);

    return (
        <>
            <header className="header">
                <Navigation isOpen={isMenuOpen} onClose={onClose} />
                <Link to="/" className="header__logo-link">
                    <div className="logo" />
                </Link>
                <div className={`burger ${isLogged ? "header__burger_logged" : ""} header__burger ${isMenuOpen ? "burger_active" : ''}`} onClick={isMenuOpen ? onClose : onOpen}>
                    <span></span>
                </div>
                <div className={`header__btns ${isLogged ? "header__btns_logged" : ""}`}>
                    <Link to="signup" className="btn btn_nobg header__btn">Регистрация</Link>
                    <Link to="signin" className="btn header__btn">Войти</Link>
                </div>
            </header>
        </>
    );
}

export default Header;