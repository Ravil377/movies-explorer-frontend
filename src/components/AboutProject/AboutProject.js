import React from "react";
import { ReactSVG } from 'react-svg'
import SvgEarth from '../../images/earth.svg';
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";

function AboutProject(props) {

    return (
        <>
            <section className="heading">
                <ReactSVG src={SvgEarth} className="heading__image" />
                <div className="heading__content">
                    <h1 className="heading__title">Учебный проект студента факультета Веб-разработки.</h1>
                    <p className="heading__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                    <button className="heading__button">Узнать больше</button>
                </div>
            </section>
            <Promo />
            <Techs />
            <AboutMe />
        </>
    );
}

export default AboutProject;
