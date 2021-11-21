import React from "react";
import { ReactSVG } from "react-svg";
import Heart from "../../images/heart.svg";
import { useLocation } from "react-router-dom";

function MoviesCard(props) {
    const location = useLocation();
    const likeButtonClassName = `moviecard__like ${props.isLike ? "" : "moviecard__like_unlike"}`;
    const handleLikeClick = () => props.isLike ? props.removeMovie(props.card.id) : props.saveMovie(props.card);
    const handleRemoveMovieClick = () => props.deleteMovie(props.card._id);
    
    return (
        <>
            <li className={`moviecard ${props.isVisible ? 'moviecard_visible' : ''}`}>
                <a href={props.card.trailerLink || props.card.trailer} target="_blank" rel="noopener noreferrer" className="moviecard__trailer">
                    <img src={`${props.http ? props.http : ''}${props.card.image.url ? props.card.image.url : props.card.image}`} className="moviecard__image" alt="logo" />
                </a>
                <div className="moviecard__container">
                    <p className="moviecard__title">
                        {props.card.nameRU}
                        <span>{props.card.duration}</span>
                    </p>
                    {location.pathname === ('/saved-movies') ? <button className="moviecard__saved" onClick={handleRemoveMovieClick}/> :
                        <ReactSVG src={Heart} className={likeButtonClassName} onClick={handleLikeClick}/>}
                </div>
            </li>
        </>
    );
}

export default MoviesCard;
