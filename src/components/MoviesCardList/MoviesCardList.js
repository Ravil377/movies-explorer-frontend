import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    return (
        <ul className={`moviecards__list ${props.class}`}>
            {props.movies.map((movie, idx) => (
                // let isLiked = movie.some(i => i._id === currentUser._id);
                <MoviesCard isVisible={idx <= props.isVisible} key={movie.id} card={movie} />
            ))}
        </ul>
    );
}

export default MoviesCardList;
