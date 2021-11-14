import React from "react";
import { useFormWithValidation } from "../ValidationForm/ValidationForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const signupForm = useFormWithValidation();

    React.useEffect(() => {
        console.log(signupForm.errors);
    }, [signupForm.errors]);

    const handlerSignOut = () => {
        props.signOut();
    };

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
                            required
                        />
                        {signupForm.errors.email && <span className="form__input-error profile__input-error">{signupForm.errors.email || ''}</span>}
                    </div>
                    <div className="profile__navigation">
                        <p className="profile__link" onClick={handlerEditProfile}>Редактировать</p>
                        <p className="profile__link profile__link_red" onClick={handlerSignOut}>Выйти из аккаунта</p>
                    </div>
                </form>
                
            </div>
        </>
    );
}

export default Profile;
