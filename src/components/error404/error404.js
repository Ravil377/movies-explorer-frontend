import React from "react";
import { useHistory } from "react-router-dom";

function Error404(props) {
    const history = useHistory();

    return (
        <>
            <div className="error content">
                <div className="error__container">
                    <p className="error__title">404</p>
                    <p className="error__description">Страница не найдена</p>
                </div>
                <button onClick={history.goBack} className="error__btn">Назад</button>
            </div>
        </>
    );
}

export default Error404;
