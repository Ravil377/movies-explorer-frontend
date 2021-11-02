import React from "react";
// import { Link } from "react-router-dom";

function Footer() {
    const currYear = () => {
        let d = new Date();
        return d.getFullYear();
    }

    return (
        <>
            <footer className="footer content">
                <p className="footer__text footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="footer__container">
                    <ul className="footer__links">
                        <li className="footer__text footer__link">Яндекс.Практикум</li>
                        <li className="footer__text footer__link">Github</li>
                        <li className="footer__text footer__link">Facebook</li>
                    </ul>
                    <p className="footer__text footer__copyright">&copy;{currYear()}</p>
                </div>
            </footer>
        </>
    );
}

export default Footer;