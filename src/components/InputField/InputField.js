import React from "react";

function InputField(props) {

    return (
        <div className="form__input-container">
            <label htmlFor={props.name} className="form__input-title">{props.label}</label>
            <input 
                className="form__input"
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                minLength={props.minLength}
                maxLength={props.maxLength}
                required={props.required}
                pattern={props.pattern}
            />
            {props.error && <span className="form__input-error">{props.error}</span>}
        </div>
    )
}

export default InputField;