import React from "react";
import { Link } from "react-router-dom";

function Form(props) {
    return (
        <>
            <div className="form__container">
                {!props.logoOff && (
                    <Link to="/" className="logo-link">
                        <div className="logo form__logo" />
                    </Link>
                )}
                <h2 className="form__title">{props.title}</h2>
                <form name={props.name} className={`form ${props.name}`}>
                    {props.children}
                </form>
                <button type="submit" className="btn form__submit-btn">
                    {props.name === "register" ? "Зарегистрироваться" : "Войти"}
                </button>
                <p className="form__description">
                    {props.name === "register" ? "Уже зарегистрированы?" : "Ещё не зарегистрированы?"}
                    <Link to={props.name === "register" ? "signin" : "signup"} className="form__link">
                        {props.name === "register" ? "Войти" : "Регистрация"}
                    </Link>
                </p>
            </div>
        </>
    );
}

export default Form;
