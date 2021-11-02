import React from "react";
import { ReactSVG } from "react-svg";
import Heart from "../../images/heart.svg";

function MoviesCard(props) {
    const likeButtonClassName = `moviecard__like ${props.card.isLike ? "" : "moviecard__like_unlike"}`;

    return (
        <>
            <li className="moviecard">
                <img src={process.env.PUBLIC_URL + `${props.card.image}`} className="moviecard__image" alt="logo" />
                <div className="moviecard__container">
                    <p className="moviecard__title">
                        {props.card.name}
                        <span>{props.card.duration}</span>
                    </p>
                    <ReactSVG src={Heart} className={likeButtonClassName} />
                </div>
            </li>
        </>
    );
}

export default MoviesCard;
