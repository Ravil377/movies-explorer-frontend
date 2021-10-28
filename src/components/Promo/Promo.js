import React from "react";

function promo() {
    return (
        <>
            <section className="promo">
                <h2 className="block-title promo__title">О проекте</h2>
                <div className="promo__content">
                    <div>
                        <p className="promo__subtitle">Дипломный проект включал 5 этапов</p>
                        <p className="promo__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div>
                        <p className="promo__subtitle">На выполнение диплома ушло 5 недель</p>
                        <p className="promo__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className="promo__schedule">
                    <p className="promo__shedule-item promo__shedule-backend">1 неделя <span>Back-end</span></p>
                    <p className="promo__shedule-item promo__shedule-frontend">4 недели <span>Front-end</span></p>
                </div>
            </section>
        </>
    );
}

export default promo;