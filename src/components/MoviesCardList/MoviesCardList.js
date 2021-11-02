import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import initialMovies from "../../utils/movies";

function MoviesCardList(props) {
    
    return (
        <ul className={`moviecards__list ${props.class}`}>
            {initialMovies.map((movie) => <MoviesCard card={movie} />)}
        </ul>
    );
}

export default MoviesCardList;