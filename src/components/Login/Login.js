import React, { useCallback, useEffect } from "react";
import Form from "../Form/Form";
import { useFormWithValidation } from "../ValidationForm/ValidationForm";

function Login(props) {
    const useForm = useFormWithValidation();
  
    React.useEffect(() => {
        console.log(useForm.values, useForm.isValid);
    }, [useForm.values]);

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        props.onLogin(useForm.values);
    }

    return (
        <>
            <Form name="login" title="Рады видеть!" onSubmit={handleSubmitLogin} buttonActive={useForm.isValid} >
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
                        value={useForm.values.email}
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
                        value={useForm.values.password}
                        className="form__input" 
                        required />
                    <span className="form__input-error"></span>
                </>
            </Form>
        </>
    );
}

export default Login;
