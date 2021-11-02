import React from "react";
import Form from "../Form/Form";

function Login(props) {

    return (
        <>
            <Form name="login" title="Рады видеть!">
                <>
                    <label htmlFor="email" className="form__input-title">
                        E-mail
                    </label>
                    <input type="email" name="email" placeholder="" id="email-input" className="form__input" required />
                    <span className="form__input-error"></span>
                    <label htmlFor="password" className="form__input-title">
                        Password
                    </label>
                    <input type="password" name="password" placeholder="" id="password-input" className="form__input" required />
                    <span className="form__input-error"></span>
                </>
            </Form>
        </>
    );
}

export default Login;
