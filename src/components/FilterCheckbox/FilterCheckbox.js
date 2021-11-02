import React from "react";

function FilterCheckbox(props) {

    return (
        <>
            <div className={`filtercheckbox  ${props.class}`}>
                <label className="filtercheckbox__text">Короткометражки</label>
                <input form="searchform" id="shortfilm" type='checkbox' className="filtercheckbox__input"></input>
                <label htmlFor="shortfilm"></label>
            </div>
        </>
    );
}

export default FilterCheckbox;