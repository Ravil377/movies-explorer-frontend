import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    const handleChangeName = (e) => setName(e.target.value);
    const handleChangeEmail = (e) => setEmail(e.target.value);

    React.useEffect(() => {
        props.handleFooter(false);
        setName(currentUser.name);
        setEmail(currentUser.email);
        props.handleHeader(true);
        props.handleWhiteHeader(true);
        
    }, [props, currentUser]);

const handlerSignOut = () => {
    props.signOut();
}

const handlerEditProfile = (e) => {
    e.preventDefault();
    props.onUpdateUser(name, email);
}

    return (
        <>
            <div className="profile__container content">
                <form name="editProfile" className="profile__form">
                    <h2 className="profile__title">Привет, {name}!</h2>
                    <div className="profile__input-container">
                        <label className="profile__text" htmlFor="name">Имя</label>
                        <input className="profile__input" name="name" onChange={handleChangeName} value={name} />
                    </div>
                    <div className="profile__input-container">
                        <label className="profile__text" htmlFor="email">E-mail</label>
                        <input className="profile__input" name="email" onChange={handleChangeEmail} value={email} />
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