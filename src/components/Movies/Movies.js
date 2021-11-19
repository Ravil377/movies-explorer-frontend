import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";

function Movies(props) {
    const [isVisible, setIsVisible] = React.useState(6);
    const [search, setSearch] = React.useState("");
    const [shortFilm, setShortFilm] = React.useState(false);
    const [error, setError] = React.useState(false);
    const http = 'https://api.nomoreparties.co';

    React.useEffect(() => {
        props.resetMovies();
        setError(false);
    }, []);

    const handleChangeVisible = () => {
        setIsVisible(isVisible+7);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        props.resetMovies();
        search ? props.getMovies(search, shortFilm) : setError(true);
        setIsVisible(6);
    }
   
    const handleCheckbox = () => {
        setShortFilm((state) => !state);
    }

    const handleChangeSearch = (e) => {
        setError(false);
        setSearch(e.target.value);
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
            {props.isLoading && <Preloader />}               
            {(props.movies.length !== 0) && (
                    <>
                        <MoviesCardList 
                            class="movies__container" 
                            movies={props.movies} 
                            isVisible={isVisible} 
                            saveMovie={props.saveMovie} 
                            removeMovie={props.removeMovie}
                            http={http} 
                            isLike={props.isLike}
                        />
                        {(props.movies.length >= 7 && props.movies.length>= isVisible) 
                            && <button className="movies__more-btn" onClick={handleChangeVisible}>Ещё</button>}
                    </>)
            }
            {props.isError !== '' && <p className="movies__error">{props.isError}</p>}
        </div>
    );
}

export default Movies;
