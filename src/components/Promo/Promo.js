import React from "react";
import { ReactSVG } from 'react-svg'
import SvgEarth from '../../images/earth.svg';

function promo() {
    return (
        <>
            <section className="promo">
                <ReactSVG src={SvgEarth} className="promo__image" />
                <div className="promo__content">
                    <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                    <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                    <button className="promo__button">Узнать больше</button>
                </div>
            </section>
        </>
    );
}

export default promo;