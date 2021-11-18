import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {
    const [isVisible, setIsVisible] = React.useState(6);
    const [search, setSearch] = React.useState("");
    const [shortFilm, setShortFilm] = React.useState(false);
    const [error, setError] = React.useState(false);
    
    React.useEffect(() => {
        // props.getMovies();
        props.resetMovies();
    }, []);

    const handleChangeVisible = () => {
        setIsVisible(isVisible+7);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        props.resetMovies();
        search ? props.getFilterMovies(props.saveMovies, search, shortFilm) : setError(true);
        setIsVisible(6);
    }
    const handleChangeSearch = (e) => {
        setError(false);
        setSearch(e.target.value);
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
                        onGetMovies={handleSearch}
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
            {props.isLoading && <Preloader />}               
            {(props.movies.length !== 0) && (
                    <>
                    <MoviesCardList 
                        class="movies__container" 
                        movies={props.movies} 
                        isVisible={isVisible}
                        removeMovie={props.removeMovie}
                        isLike={props.isLike} 
                        deleteMovie={props.deleteMovie}
                    />
                        {(props.movies.length >= 7 && props.movies.length>= isVisible) 
                            && <button className="movies__more-btn" onClick={handleChangeVisible}>Ещё</button>}
                    </>)
            }
            {props.isError !== '' && <p className="movies__error">{props.isError}</p>}
        </div>
    );
}

export default SavedMovies;
