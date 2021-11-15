import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";

function Movies(props) {
    const [isVisible, setIsVisible] = React.useState(7);

    const handleChangeVisible = () => {
        setIsVisible(isVisible+7);
        console.log(isVisible);
    }

    React.useEffect(() => {

    }, []);

    return (
        <div className="movies content">
            <div className="movies__search-container">
                <SearchForm class="movies__search" onGetMovies={props.getMovies} />
                <FilterCheckbox class="movies__checkbox" />
            </div>
            <div className="movies__line"></div>
            {props.isLoading && <Preloader />}               
            {(props.movies.length !== 0) && (
                    <>
                        <MoviesCardList class="movies__container" movies={props.movies} isVisible={isVisible}/>
                        {(props.movies.length >= 7) && <button className="movies__more-btn" onClick={handleChangeVisible}>Ещё</button>}
                    </>)
            }
            {props.isError !== '' && <p className="movies__error">{props.isError}</p>}
        </div>
    );
}

export default Movies;
