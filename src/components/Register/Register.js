import React from "react";
import Form from "../Form/Form";
import { useFormWithValidation } from "../ValidationForm/ValidationForm";
import { registerSchema } from "../ValidateSchema/ValidateSchema";

function Register(props) {
    const signupForm = useFormWithValidation(registerSchema);

    // React.useEffect(() => {
    //     setName("");
    //     setEmail("");
    //     setPassword("");
    // }, [props]);

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        console.log(signupForm.values);
        props.onRegister(signupForm.values);
    }

    return (
        <>
            <Form name="register" title="Добро пожаловать!" onSubmit={handleSubmitRegister} buttonActive={signupForm.isValidity} >
                <>
                    <label htmlFor="name" className="form__input-title">
                        Имя
                    </label>
                    <div className="form__input-container">
                        <input type="text" name="name" value={signupForm.values.name} onChange={signupForm.handleChange} placeholder="" id="name-input" className="form__input" minLength="2" maxLength="30" required />
                        <span className="form__error">Что-то пошло не так...</span>
                    </div>
                    <label htmlFor="email" className="form__input-title">
                        E-mail
                    </label>
                    <div className="form__input-container">
                        <input type="email" name="email" value={signupForm.values.email} onChange={signupForm.handleChange} placeholder="" id="email-input" className="form__input" required />
                        <span className="form__error">Что-то пошло не так...</span>
                    </div>
                    <label htmlFor="password" className="form__input-title">
                        Password
                    </label>
                    <div className="form__input-container">
                        <input type="password" name="password" value={signupForm.values.password} onChange={signupForm.handleChange} placeholder="" id="password-input" className="form__input" required />
                        <span className="form__error">Что-то пошло не так...</span>
                    </div>
                </>
            </Form>
        </>
    );
}

export default Register;
