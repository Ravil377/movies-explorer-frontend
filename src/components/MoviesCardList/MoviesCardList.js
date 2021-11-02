import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    
    return (
        <ul className={`moviecards__list ${props.class}`}>
            {props.movies.map((movie, idx) => <MoviesCard key={idx} card={movie} />)}
        </ul>
    );
}

export default MoviesCardList;