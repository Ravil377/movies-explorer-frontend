import React from "react";
import FormContainer from "../Form/Form";
import { loginSchema } from "../ValidateSchema/ValidateSchema";
import InputField from "../InputField/InputField";

function Login(props) {
    const handleSubmitLogin = (values) => {
        props.onLogin(values);
    }

    return (
            <FormContainer 
                initialValues={{ email: '', password: '' }}
                alidate={loginSchema}
                name="login" 
                title="Рады видеть!" 
                onSubmit={handleSubmitLogin} 
            >
                <InputField label="E-mail" name="email" type="email" />
                <InputField label="Password" name="password" type="password" />
            </FormContainer>
    );
}

export default Login;
