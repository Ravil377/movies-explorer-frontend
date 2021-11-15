import React from "react";
// import { Link, withRouter } from "react-router-dom";
import { ReactSVG } from "react-svg";
import SvgMagnifier from "../../images/magnifier.svg";

function SearchForm(props) {
    const [search, setSearch] = React.useState("");
    const [error, setError] = React.useState(false);
    
    const handleChangeSearch = (e) => {
        setError(false);
        setSearch(e.target.value);
    }
    const handleSearch = (e) => {
        e.preventDefault();
        search ? props.onGetMovies(search) : setError(true);
    }

    return (
        <>
            <form className={`searchform ${props.class}`} onSubmit={handleSearch} >
                <div className="searchform__search">
                    <input className="searchform__input" type="text" placeholder="Фильм" id="searchform-input" value={search} onChange={handleChangeSearch}></input>
                    <button type="submit" className="searchform__btn">
                        <ReactSVG src={SvgMagnifier} className="searchform__image" />
                    </button>
                    {error && <span className="searchform__search-error">Нужно ввести ключевое слово</span>}
                </div>
            </form>
        </>
    );
}

export default SearchForm;
