import React from "react";
import Foto from "../../images/foto.jpg";
import Portfolio from "../Portfolio/Portfolio";

function aboutme() {
    return (
        <>
            <section className="aboutme">
                <h2 className="block-title aboutme__title">Студент</h2>
                <div className="aboutme__container">
                    <img src={Foto} alt="Фотография" className="aboutme__foto" />
                    <div className="aboutme__info">
                        <p className="aboutme__info-title">Равиль</p>
                        <p className="aboutme__info-subtitle">Фронтенд-разработчик, 40 лет</p>
                        <p className="aboutme__info-description">Я родился и живу в Уфе, закончил Санкт-Петербургский Технический университет, 
                            факультет информационные технологии в экономике и бизнесе. У меня есть жена и две дочери. 
                            Я люблю слушать музыку, увлекаюсь автомобилем.
                            С 2020 года начал кодить вместе с Яндекс Практикум и в данный момент уже работаю в компании Фронтенд разработчиком. 
                            Активно набираю опыт в коммерческих проектах.
                        </p>
                        <ul className="aboutme__links">
                            <li className="aboutme__item">Github</li>
                            <li className="aboutme__item">Email</li>
                            <li className="aboutme__item">Linkedin</li>
                        </ul>
                    </div>
                </div>
                <Portfolio />
            </section>
        </>
    );
}

export default aboutme;