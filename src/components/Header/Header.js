import React from "react";

function Header() {
    return (
        <>
            <header className="header">
                <div className="logo" />
                <div className="header__btns">
                    <button type="button" className="header__btn" id="signupBtn">Регистрация</button>
                    <button type="button" className="header__btn header__btn_blue" id="signinBtn">Войти</button>
                </div>
            </header>
        </>
    );
}

export default Header;