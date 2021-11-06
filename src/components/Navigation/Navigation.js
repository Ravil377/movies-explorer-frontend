import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navigation({ isOpen, onClose }) {
    const handleOverlayMenuClose = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <>
            <div className={`navigation ${isOpen ? "navigation_active" : ""}`} onClick={handleOverlayMenuClose}>
                <div className="navigation__container">
                    <NavLink exact to="/" activeClassName="navigation__link_active" className="navigation__link navigation__link_nopc" onClick={onClose}>
                        <span>Главная</span>
                    </NavLink>
                    <NavLink to="/movies" activeClassName="navigation__link_active" className="navigation__link" onClick={onClose}>
                        <span>Фильмы</span>
                    </NavLink>
                    <NavLink to="/saved-movies" activeClassName="navigation__link_active" className="navigation__link" onClick={onClose}>
                        <span>Сохранённые фильмы</span>
                    </NavLink>
                    <Link to="/profile" className="navigation__link-profile" onClick={onClose}>
                        Аккаунт
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Navigation;
