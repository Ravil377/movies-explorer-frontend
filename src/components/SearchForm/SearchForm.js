import React from "react";
import { ReactSVG } from "react-svg";
import SvgMagnifier from "../../images/magnifier.svg";

function SearchForm(props) {
    return (            
        <div className="searchform__search">
            <input className="searchform__input" type="text" placeholder="Фильм" id="searchform-input" value={props.isSearch} onChange={props.onChange}></input>
            <button type="submit" className="searchform__btn">
                <ReactSVG src={SvgMagnifier} className="searchform__image" />
            </button>
            {props.isError && <span className="searchform__search-error">Нужно ввести ключевое слово</span>}
        </div>
    );
}

export default SearchForm;
