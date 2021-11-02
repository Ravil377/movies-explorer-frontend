import React from "react";

function Footer() {
    const currYear = () => {
        let d = new Date();
        return d.getFullYear();
    };

    return (
        <>
            <footer className="footer">
                <p className="footer__text footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="footer__container">
                    <ul className="footer__links">
                        <li className="footer__text footer__link">
                            <a href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">
                                Яндекс.Практикум
                            </a>
                        </li>
                        <li className="footer__text footer__link">
                            <a href="https://github.com/Ravil377" target="_blank" rel="noreferrer">
                                Github
                            </a>
                        </li>
                        <li className="footer__text footer__link">
                            <a href="https://www.linkedin.com/in/ravil-shamilov-2bb736205/" target="_blank" rel="noreferrer">
                                Linkedin
                            </a>
                        </li>
                    </ul>
                    <p className="footer__text footer__copyright">&copy;{currYear()}</p>
                </div>
            </footer>
        </>
    );
}

export default Footer;
