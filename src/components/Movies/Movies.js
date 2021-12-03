import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";
import useWindowSize from "../../utils/utils";

function Movies(props) {
    const windowSize = useWindowSize();
    const sizeWindows = () => windowSize.width < 427 ? 4 : 6;
    const [isVisible, setIsVisible] = React.useState(sizeWindows());
    const [isShortFilm, setIsShortFilm] = React.useState(false);
    const [error, setError] = React.useState(false);
    const http = 'https://api.nomoreparties.co';

    const showedMovies = isShortFilm ? props.movies.filter((film) => film.duration < 40) : props.movies;

    React.useEffect(() => {
        setIsVisible(sizeWindows);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowSize.width]);

    React.useEffect(() => {
        error && props.setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    React.useEffect(() => {
        props.resetError();
        props.setSearch('');
        setError(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangeVisible = () => setIsVisible(isVisible + (sizeWindows()+1));

    const handleSearchClick = (e) => {
        e.preventDefault();
        props.setIsLoading(true);
        props.resetError();
        props.search ? props.onSearchClick(false) : setError(true);
        setIsVisible(sizeWindows());
    }
   
    const handleCheckbox = () => setIsShortFilm((state) => !state);

    const handleChangeSearch = (e) => {
        setError(false);
        props.resetError();
        props.setSearch(e.target.value);
    }

    return (
        <div className="movies content">
            <div className="movies__search-container">
                <form id="searchform" className='searchform movies__search' onSubmit={handleSearchClick} >
                    <SearchForm 
                        isSearch={props.search}
                        error={error}
                        onChange={handleChangeSearch}
                    />
                </form>
                <FilterCheckbox 
                    class="movies__checkbox" 
                    onChange={handleCheckbox}
                    value={isShortFilm}
                />
            </div>
            <div className="movies__line"></div>
            {props.isLoading ? <Preloader /> : 
            (props.movies) && (
                    <>
                        <MoviesCardList 
                            class="movies__container" 
                            movies={showedMovies} 
                            isVisible={isVisible} 
                            saveMovie={props.saveMovie} 
                            removeMovie={props.removeMovie}
                            findIdForRemove={props.findIdForRemove}
                            http={http} 
                        />
                        {(props.movies.length > sizeWindows() && props.movies.length > isVisible) 
                            && <button className="movies__more-btn" onClick={handleChangeVisible}>Ещё</button>}
                    </>)
            }
            {props.isError.error !== '' && <p className="movies__error">{props.isError.error}</p>}
        </div>
    );
}

export default Movies;
