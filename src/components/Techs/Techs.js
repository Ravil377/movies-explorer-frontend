import React from "react";

function techs() {
    return (
        <>
            <section className="techs">
                <h2 className="block-title techs__title">технологии</h2>
                <h3 className="techs__subtitle">7 технологий</h3>
                <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <div className="techs__container">
                    <ul className="techs__list">
                        <li className="techs__item">HTML</li>
                        <li className="techs__item">CSS</li>
                        <li className="techs__item">JS</li>
                        <li className="techs__item">React</li>
                        <li className="techs__item">Git</li>
                        <li className="techs__item">Express.js</li>
                        <li className="techs__item">mongoDB</li>
                    </ul>
                </div>
            </section>
        </>
    );
}

export default techs;