import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from 'formik';

function FormContainer(props) {
    return (
        <>
            <div className="form__container">
                {!props.logoOff && (
                    <Link to="/" className="logo-link">
                        <div className="logo form__logo" />
                    </Link>
                )}
                <h2 className="form__title">{props.title}</h2>
                <Formik 
                    initialValues={props.initialValues}
                    validationSchema={props.validate}
                    onSubmit={value => props.onSubmit(value)}
                >
                    {formik => (
                        <Form>
                            {props.children}
                            <button type="submit" className="btn form__submit-btn" disabled={!(formik.isValid && formik.dirty)}>
                                {props.name === "register" ? "Зарегистрироваться" : "Войти"}
                            </button>
                        </Form>
                    )}
                </Formik>
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

export default FormContainer;
