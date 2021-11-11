import React from "react";
// import { Link, withRouter } from "react-router-dom";
import { ReactSVG } from "react-svg";
import SvgMagnifier from "../../images/magnifier.svg";

function SearchForm(props) {
    const [search, setSearch] = React.useState("");
    
    const handleChangeSearch = (e) => setSearch(e.target.value);
    const handleSearch = (e) => {
        e.preventDefault();
        props.onGetMovies(search);
    }

    return (
        <>
            <form className={`searchform ${props.class}`} onSubmit={handleSearch} >
                <div className="searchform__search">
                    <input className="searchform__input" type="text" placeholder="Фильм" id="searchform-input" value={search} onChange={handleChangeSearch}></input>
                    <button type="submit" className="searchform__btn">
                        <ReactSVG src={SvgMagnifier} className="searchform__image" />
                    </button>
                </div>
            </form>
        </>
    );
}

export default SearchForm;
