import React from "react";
import Form from "../Form/Form";
import { useFormWithValidation } from "../ValidationForm/ValidationForm";
import InputField from "../InputField/InputField";

function Login(props) {
    const signupForm = useFormWithValidation();

    React.useEffect(() => {
        props.resetError();
        signupForm.resetForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        props.resetError();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signupForm.values.email, signupForm.values.password]);

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        props.onLogin(signupForm.values);
    }

    let activeButton = props.sendForm ? !props.sendForm : signupForm.isValidity;

    return (
            <Form 
                name="login" 
                title="Рады видеть!" 
                onSubmit={handleSubmitLogin}
                isError={props.isError}
                buttonActive={activeButton} 
            >
                <InputField 
                    label="E-mail" 
                    name="email" 
                    type="email" 
                    onChange={signupForm.handleChange} 
                    value={signupForm.values.email}
                    error={signupForm.errors.email}
                    required={true} 
                    pattern="^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.+[a-zA-Z]{2,}$"
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
