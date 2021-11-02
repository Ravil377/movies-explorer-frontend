import React from "react";
import { Link } from "react-router-dom";

function Navigation({ isOpen, onClose }) {
    const handleOverlayMenuClose = (e) => {
        if (e.target === e.currentTarget) onClose();
    }

    return (
        <>
            <div className={`navigation ${isOpen ? "navigation_active" : ""}`} onClick={handleOverlayMenuClose}>
                <div className="navigation__container">
                    <Link to="/" className="navigation__link navigation__link_nopc" onClick={onClose}><span>Главная</span></Link>
                    <Link to="/movies" className="navigation__link" onClick={onClose}><span>Фильмы</span></Link>
                    <Link to="/saved-movies" className="navigation__link" onClick={onClose}><span>Сохранённые фильмы</span></Link>
                    <Link to="/profile" className="navigation__link-profile" onClick={onClose}>Аккаунт</Link>
                </div>
            </div>
        </>
    );
}

export default Navigation;