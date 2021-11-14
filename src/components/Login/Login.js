import React from "react";
import Form from "../Form/Form";
import { useFormWithValidation } from "../ValidationForm/ValidationForm";
import InputField from "../InputField/InputField";

function Login(props) {
    const signupForm = useFormWithValidation();
    const handleSubmitLogin = (e) => {
        e.preventDefault();
        props.onLogin(signupForm.values);
    }

    return (
            <Form 
                name="login" 
                title="Рады видеть!" 
                onSubmit={handleSubmitLogin}
                buttonActive={signupForm.isValidity} 
            >
                <InputField 
                    label="E-mail" 
                    name="email" 
                    type="email" 
                    onChange={signupForm.handleChange} 
                    value={signupForm.values.email}
                    error={signupForm.errors.email}
                    required={true} 
                />
                <InputField 
                    label="Password" 
                    name="password" 
                    type="password" 
                    onChange={signupForm.handleChange} 
                    value={signupForm.values.password}
                    error={signupForm.errors.password}
                    minLength="8" 
                    required={true}
                />
            </Form>
    );
}

export default Login;
