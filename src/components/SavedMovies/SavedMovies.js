import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";
import useWindowSize from "../../utils/utils";

function SavedMovies(props) {
    const windowSize = useWindowSize();
    const sizeWindows = () => windowSize.width < 427 ? 4 : 6;
    const [isVisible, setIsVisible] = React.useState(sizeWindows());
    const [isShortFilm, setIsShortFilm] = React.useState(false);
    const [error, setError] = React.useState(false);
    
    const showedMovies = isShortFilm ? props.movies.filter((film) => film.duration < 40) : props.movies;

    React.useEffect(() => {
        setIsVisible(sizeWindows);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowSize.width]);

    React.useEffect(() => {
        props.resetError();
        props.resetFilter();
        props.setSearch('');
        setError(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangeVisible = () => setIsVisible(isVisible + (sizeWindows()+1));

    const handleSearchClick = (e) => {
        e.preventDefault();
        props.setIsLoading(true);
        props.resetFilter();
        props.resetError();
        props.search ? props.onSearchClick(true) : setError(true);
        setIsVisible(6);
    }

    const handleChangeSearch = (e) => {
        setError(false);
        props.setSearch(e.target.value);
    }

    const handleCheckbox = () => setIsShortFilm((state) => !state);

    return (
        <div className="movies content">
            <div className="movies__search-container">
                <form id="searchform" className='searchform movies__search' onSubmit={handleSearchClick} >
                <SearchForm 
                        isSearch={props.search}
                        error={error}
                        handleSearchClick={handleSearchClick}
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
            (props.movies !== null) && (
                    <>
                        <MoviesCardList 
                            class="movies__container" 
                            movies={showedMovies} 
                            isVisible={isVisible}
                            removeMovie={props.removeMovie}
                            isLike={props.isLike} 
                        />
                            {(props.movies.length > sizeWindows() && props.movies.length > isVisible) 
                                && <button className="movies__more-btn" onClick={handleChangeVisible}>Ещё</button>}
                    </>)
            }
            {props.isError.error !== '' && <p className="movies__error">{props.isError.error}</p>}
        </div>
    );
}

export default SavedMovies;
