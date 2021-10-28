import React from "react";
import { Link, withRouter } from "react-router-dom";
import Form from "../Form/Form";

function Register(props) {

    return (
        <>
            <Form name="register" title="Добро пожаловать!">
                <>
                    <label htmlFor="name" className="form__input-title">Имя</label>
                    <input type="text" name="name" placeholder="" id="name-input"
                        className="form__input"
                        minLength="2" maxLength="30" required />
                    <span className="form__input-error"></span>
                    <label htmlFor="email" className="form__input-title">E-mail</label>
                    <input type="email" name="email" placeholder="" id="email-input"
                        className="form__input" required />
                    <span className="form__input-error"></span>
                    <label htmlFor="password" className="form__input-title">Password</label>
                    <input type="password" name="password" placeholder="" id="password-input"
                        className="form__input" required />
                    <span className="form__input-error"></span>
                </>
            </Form>
        </>
    );
}

export default Register;