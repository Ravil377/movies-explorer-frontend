import React from "react";

function portfolio() {
    return (
        <>
            <div className="portfolio__container content">
                <p className="portfolio__title">Портфолио</p>
                <a href="https://ravil377.github.io/russian-travel/" className="portfolio__link" target="_blank" rel="noreferrer">
                    Статичный сайт
                </a>
                <a href="https://ravil377.github.io/warmhouse/" className="portfolio__link" target="_blank" rel="noreferrer">
                    Адаптивный сайт
                </a>
                <a href="https://ravil377.github.io/react-weather-api/" target="_blank" className="portfolio__link" rel="noreferrer">
                    Одностраничное приложение
                </a>
            </div>
        </>
    );
}

export default portfolio;
