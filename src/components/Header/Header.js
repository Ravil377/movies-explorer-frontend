import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ isMenuOpen, onClose, onOpen, isLogged }) {
    const location = useLocation();
    const [isWhiteHeader, setIsWhiteHeader] = React.useState(false);

    React.useEffect(() => {
        location.pathname !== ("/") ? setIsWhiteHeader(true) : setIsWhiteHeader(false);
        const handleClosePopupOnEsc = (e) => {
            if (e.code === "Escape") onClose();
        };

        if (isMenuOpen) {
            document.addEventListener("keyup", handleClosePopupOnEsc);
        }

        return () => {
            document.removeEventListener("keyup", handleClosePopupOnEsc);
            setIsWhiteHeader(false);
        };
    }, [isMenuOpen, onClose, onOpen, location]);

    return (
        <>
            <header className={`header ${isWhiteHeader ? "header_white" : "figa"}`}>
                <Link to="/" className="header__logo-link">
                    <div className="logo" />
                </Link>
                <div className={`burger ${isLogged ? "header__burger_logged" : ""} header__burger ${isMenuOpen ? "burger_active" : ""}`} onClick={isMenuOpen ? onClose : onOpen}>
                    <span></span>
                </div>
                {isLogged && <Navigation isOpen={isMenuOpen} onClose={onClose} />}
                <div className={`header__btns ${isLogged ? "header__btns_logged" : ""}`}>
                    <Link to="signup" className="btn btn_nobg header__btn" onClick={onClose}>
                        Регистрация
                    </Link>
                    <Link to="signin" className="btn header__btn" onClick={onClose}>
                        Войти
                    </Link>
                </div>
            </header>
        </>
    );
}

export default Header;
