import React from "react";
import FormContainer from "../Form/Form";
import { registerSchema } from "../ValidateSchema/ValidateSchema";
import InputField from "../InputField/InputField";

function Register(props) {
    const handleSubmitRegister = (values) => {
        props.onRegister(values);
    }

    return (
            <FormContainer
                initialValues={{ name: '', email: '', password: '' }}
                validate={registerSchema}
                name="register" 
                title="Добро пожаловать!" 
                onSubmit={handleSubmitRegister} 
            >
                <InputField label="Имя" name="name" type="text" />
                <InputField label="E-mail" name="email" type="email" />
                <InputField label="Password" name="password" type="password" />
            </FormContainer>
    );
}

export default Register;
