import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <>
            <header className="header">
                <div className="logo" />
                <div className="header__btns">
                    <Link to="signup" className="btn btn_nobg header__btn">Регистрация</Link>
                    <Link to="signin" className="btn header__btn">Войти</Link>
                </div>
            </header>
        </>
    );
}

export default Header;