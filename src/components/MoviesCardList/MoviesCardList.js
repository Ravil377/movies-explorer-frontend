import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
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
                        findIdForRemove={props.findIdForRemove}
                    />
            ))}
        </ul>
    );
}

export default MoviesCardList;
