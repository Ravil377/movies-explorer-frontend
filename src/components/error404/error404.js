import React from "react";
import { Link } from "react-router-dom";

function Error404(props) {

    return (
        <>
            <div className="error content">
                <div className="error__container">
                    <p className="error__title">404</p>
                    <p className="error__description">Страница не найдена</p>
                </div>
                <Link to="/" className="error__btn">Назад</Link>
            </div>
        </>
    );
}

export default Error404;
