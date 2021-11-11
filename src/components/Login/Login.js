import React from "react";
import Form from "../Form/Form";
import { useForm, useFormWithValidation } from "../ValidationForm/ValidationForm";

function Login(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    // const handleChangeEmail = (e) => useForm.s(e.target.value);
    // const handleChangePassword = (e) => setPassword(e.target.value);

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        props.onLogin(email, password);
    }

    return (
        <>
            <Form name="login" title="Рады видеть!" onSubmit={handleSubmitLogin}>
                <>
                    <label htmlFor="email" className="form__input-title">
                        E-mail
                    </label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="" 
                        id="email-input" 
                        onChange={useForm.handleChange} 
                        value={useForm.values}
                        className="form__input" 
                        required />
                    <span className="form__input-error"></span>
                    <label htmlFor="password" className="form__input-title">
                        Password
                    </label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="" 
                        id="password-input" 
                        onChange={useForm.handleChange} 
                        value={useForm.values}
                        className="form__input" 
                        required />
                    <span className="form__input-error"></span>
                </>
            </Form>
        </>
    );
}

export default Login;
