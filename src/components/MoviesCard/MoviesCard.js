import React from "react";
import { ReactSVG } from "react-svg";
import Heart from "../../images/heart.svg";
import Saved from "../../images/saved.svg";
import { useLocation } from "react-router-dom";

function MoviesCard(props) {
    const location = useLocation();
    const likeButtonClassName = `moviecard__like ${props.card.isLike ? "" : "moviecard__like_unlike"}`;
    React.useEffect(() => {
        console.log(props.isVisible);
    }, []);
    return (
        <>
            <li className={`moviecard ${props.isVisible ? 'moviecard_visible' : ''}`}>
                <img src={`https://api.nomoreparties.co${props.card.image.url}`} className="moviecard__image" alt="logo" />
                <div className="moviecard__container">
                    <p className="moviecard__title">
                        {props.card.nameRU}
                        <span>{props.card.duration}</span>
                    </p>
                    {location.pathname === ("saved-movies" || "movies") ? <ReactSVG src={Saved} className="moviecard__saved" /> :
                        <ReactSVG src={Heart} className={likeButtonClassName} />}
                </div>
            </li>
        </>
    );
}

export default MoviesCard;
