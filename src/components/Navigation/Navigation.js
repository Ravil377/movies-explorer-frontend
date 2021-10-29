import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation({ isOpen, onClose }) {
    const handleOverlayMenuClose = (e) => {
        if (e.target === e.currentTarget) onClose();
    }

    return (
        <>
            <div className={`navigation ${isOpen ? "navigation_active" : ""}`} onClick={handleOverlayMenuClose}>
                <div className="navigation__container">
                    <Link to="/" className="navigation__link"><span>Главная</span></Link>
                    <Link to="/Movies" className="navigation__link navigation__link_active"><span>Фильмы</span></Link>
                    <Link to="/SavedMovies" className="navigation__link"><span>Сохранённые фильмы</span></Link>
                </div>
            </div>
        </>
    );
}

export default Navigation;