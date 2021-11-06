import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SavedMovies(props) {

    return (
        <div className="movies content">
            <div className="movies__search-container">
                <SearchForm class="movies__search" />
                <FilterCheckbox class="movies__checkbox" />
            </div>
            <div className="movies__line"></div>
            <MoviesCardList class="movies__container" movies={props.movies} />
            <button className="movies__more-btn">Ещё</button>
        </div>
    );
}

export default SavedMovies;
