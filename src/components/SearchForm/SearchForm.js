import React from "react";
// import { Link, withRouter } from "react-router-dom";
import { ReactSVG } from "react-svg";
import SvgMagnifier from "../../images/magnifier.svg";

function SearchForm(props) {
    const handleLoading = () => {
        props.handleLoading();
    }

    return (
        <>
            <form className={`searchform ${props.class}`}>
                <div className="searchform__search">
                    <input className="searchform__input" type="text" placeholder="Фильм" id="searchform-input"></input>
                    <div className="searchform__btn" onClick={handleLoading}>
                        <ReactSVG src={SvgMagnifier} className="searchform__image" />
                    </div>
                </div>
            </form>
        </>
    );
}

export default SearchForm;
