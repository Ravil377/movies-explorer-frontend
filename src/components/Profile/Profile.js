import React from "react";
import { Link, withRouter } from "react-router-dom";

function Profile(props) {

    return (
        <>
            <div className="profile__container">
                <h2 className="profile__title">Привет, {props.name}!</h2>
                <p className="profile__text">Имя<span className="profile__name">{props.name}</span></p>
                <p className="profile__text">E-mail<span className="profile__name">{props.email}</span></p>
                <div className="profile__navigation">
                    <a className="profile__link">Редактировать</a>
                    <a className="profile__link profile__link_red">Выйти из аккаунта</a>
                </div>
            </div>
        </>
    );
}

export default Profile;