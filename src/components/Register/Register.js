import React from "react";
import Form from "../Form/Form";
import { useFormWithValidation } from "../ValidationForm/ValidationForm";
import InputField from "../InputField/InputField";

function Register(props) {
    const signupForm = useFormWithValidation();
    const handleSubmitRegister = (e) => {
        e.preventDefault();
        console.log('hello');
        props.onRegister(signupForm.values);
    }

    return (
            <Form
                name="register" 
                title="Добро пожаловать!" 
                onSubmit={handleSubmitRegister}
                buttonActive={signupForm.isValidity} 
            >
                <InputField 
                    label="Имя" 
                    name="name" 
                    type="text" 
                    onChange={signupForm.handleChange} 
                    value={signupForm.values.name}
                    error={signupForm.errors.name}
                    minLength="2" 
                    maxLength="30"
                    required={true}
                    pattern='^[А-Яа-яЁёA-Za-z]+[\s\-]?[А-Яа-яЁёA-Za-z]+$'
                />
                <InputField 
                    label="E-mail" 
                    name="email" 
                    type="email" 
                    onChange={signupForm.handleChange} 
                    value={signupForm.values.email}
                    error={signupForm.errors.email}
                    required={true}
                    pattern="^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
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

export default Register;
