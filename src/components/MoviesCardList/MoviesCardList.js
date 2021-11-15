import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    React.useEffect(() => {
        console.log(props.isVisible);
    }, []);
    return (
        <ul className={`moviecards__list ${props.class}`}>
            {props.movies.map((movie, idx) => (
                <MoviesCard isVisible={idx <= props.isVisible} key={idx} card={movie} />
            ))}
        </ul>
    );
}

export default MoviesCardList;
