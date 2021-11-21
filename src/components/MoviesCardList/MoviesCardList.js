import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    const isLike = (id) => props.isLike(id);

    return (
        <ul className={`moviecards__list ${props.class}`}>
            {props.movies.map((movie, idx) => (
                    <MoviesCard 
                        isVisible={idx <= props.isVisible} 
                        key={movie.id || movie._id} 
                        card={movie} 
                        saveMovie={props.saveMovie} 
                        removeMovie={props.removeMovie}
                        http={props.http} 
                        isLike={isLike(movie.id)}
                        deleteMovie={props.deleteMovie}
                    />
            ))}
        </ul>
    );
}

export default MoviesCardList;
