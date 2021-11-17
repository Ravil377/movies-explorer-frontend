import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SavedMovies(props) {
    const [isVisible, setIsVisible] = React.useState(6);
    const [search, setSearch] = React.useState("");
    const [shortFilm, setShortFilm] = React.useState(false);
    const [error, setError] = React.useState(false);
    
    React.useEffect(() => {
        props.getMovies();
    }, []);

    const handleSearch = () => {

    }
    const handleChangeSearch = () => {

    }
    const handleCheckbox = () => {
        setShortFilm((state) => !state);
    }
    return (
        <div className="movies content">
            <div className="movies__search-container">
                <form id="searchform" className='searchform movies__search' onSubmit={handleSearch} >
                <SearchForm 
                        isSearch={search}
                        isError={error}
                        onGetMovies={props.getMovies}
                        onChange={handleChangeSearch}
                    />
                </form>
                <FilterCheckbox 
                    class="movies__checkbox" 
                    onChange={handleCheckbox}
                    value={shortFilm}
                />
            </div>
            <div className="movies__line"></div>
            <MoviesCardList class="movies__container" movies={props.movies} />
            <button className="movies__more-btn">Ещё</button>
        </div>
    );
}

export default SavedMovies;
