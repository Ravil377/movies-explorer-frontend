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
    const [search, setSearch] = React.useState("");
    const [shortFilm, setShortFilm] = React.useState(false);
    const [error, setError] = React.useState(false);
    const http = 'https://api.nomoreparties.co';

    React.useEffect(() => {
        setIsVisible(sizeWindows);
    }, [windowSize.width]);

    React.useEffect(() => {
        props.reset();
        setError(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangeVisible = () => setIsVisible(isVisible + (sizeWindows()+1));

    const handleSearchClick = (e) => {
        e.preventDefault();
        props.reset();
        search ? props.getMovies(search, shortFilm, false) : setError(true);
        setIsVisible(sizeWindows());
    }
   
    const handleCheckbox = () => setShortFilm((state) => !state);

    const handleChangeSearch = (e) => {
        setError(false);
        props.reset();
        setSearch(e.target.value);
    }

    return (
        <div className="movies content">
            <div className="movies__search-container">
                <form id="searchform" className='searchform movies__search' onSubmit={handleSearchClick} >
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
            {props.isLoading ? <Preloader /> : 
            (props.movies.length !== 0) && (
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
                        {(props.movies.length > sizeWindows() && props.movies.length > isVisible) 
                            && <button className="movies__more-btn" onClick={handleChangeVisible}>Ещё</button>}
                    </>)
            }
            {props.isError !== '' && <p className="movies__error">{props.isError}</p>}
        </div>
    );
}

export default Movies;
