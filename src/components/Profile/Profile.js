import React from "react";
import { useFormWithValidation } from "../ValidationForm/ValidationForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const signupForm = useFormWithValidation();

    const handlerSignOut = () => {
        props.signOut();
    };

    React.useEffect(() => {
        props.resetError();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signupForm.values.name, signupForm.values.email]);

    React.useEffect(() => {
        props.resetError();
        props.checkToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handlerEditProfile = (e) => {
        e.preventDefault();
        props.onUpdateUser(signupForm.values);
    };

    return (
        <>
            <div className="profile__container">
                <form name="editProfile" className="profile__form">
                    <h2 className="profile__title">Привет, {currentUser.name}!</h2>
                    <div className="profile__input-container">
                        <label className="profile__text" htmlFor="name">Имя</label>
                        <input 
                            type="text"
                            className="profile__input" 
                            name="name" 
                            minLength="2"
                            maxLength="30"
                            onChange={signupForm.handleChange} 
                            value={signupForm.values.name}
                            pattern='^[А-Яа-яЁёA-Za-z]+[\s\-]?[А-Яа-яЁёA-Za-z]+$'
                            required
                        />
                        {signupForm.errors.name && <span className="form__input-error profile__input-error">{signupForm.errors.name}</span>}
                    </div>
                    <div className="profile__input-container">
                        <label className="profile__text" htmlFor="email">E-mail</label>
                        <input 
                            type="email"
                            className="profile__input" 
                            name="email" 
                            onChange={signupForm.handleChange} 
                            value={signupForm.values.email} 
                            pattern="^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.+[a-zA-Z]{2,}$"
                            required
                        />
                        {signupForm.errors.email && <span className="form__input-error profile__input-error">{signupForm.errors.email || ''}</span>}
                    </div>
                    {<span className={`form__error ${props.isError.error && 'form__error_active'} ${props.isError.success && 'form__error_success'}`}>{props.isError.error}{props.isError.success}</span>}
                    <div className="profile__navigation">
                        <button type="submit" className="profile__link" onClick={handlerEditProfile} disabled={props.sendForm ? props.sendForm : !signupForm.isValidity}>Редактировать</button>
                        <p className="profile__link profile__link_red" onClick={handlerSignOut}>Выйти из аккаунта</p>
                    </div>
                </form>
                
            </div>
        </>
    );
}

export default Profile;
