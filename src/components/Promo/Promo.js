import React from "react";
import { ReactSVG } from "react-svg";
import SvgEarth from "../../images/earth.svg";

function promo() {
    return (
        <>
            <section className="promo content">
                <ReactSVG src={SvgEarth} className="promo__image" />
                <div className="promo__content">
                    <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                    <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                    <a href="https://practicum.yandex.ru/" target="_blank" className="promo__button" rel="noreferrer">
                        Узнать больше
                    </a>
                </div>
            </section>
        </>
    );
}

export default promo;
