import React from "react";

function AboutProject(props) {

    return (
        <>
            <section className="aboutproject content">
                <h2 className="block-title aboutproject__title">О проекте</h2>
                <div className="aboutproject__content">
                    <div>
                        <p className="aboutproject__subtitle">Дипломный проект включал 5 этапов</p>
                        <p className="aboutproject__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div>
                        <p className="aboutproject__subtitle">На выполнение диплома ушло 5 недель</p>
                        <p className="aboutproject__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className="aboutproject__schedule">
                    <p className="aboutproject__shedule-item aboutproject__shedule-backend">1 неделя <span>Back-end</span></p>
                    <p className="aboutproject__shedule-item aboutproject__shedule-frontend">4 недели <span>Front-end</span></p>
                </div>
            </section>
        </>
    );
}

export default AboutProject;