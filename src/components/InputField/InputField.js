import React from "react";
import { ErrorMessage, useField } from "formik";

function InputField({ label, ...props }) {
    const [field, setField] = useField(props);
    return (
        <div className="form__input-container">
            <label htmlFor={field.name} className="form__input-title">{label}</label>
            <input 
                className="form__input"
                {...field} {...props}
            />
            <ErrorMessage component="span" name={field.name} className="form__input-error"/>
        </div>
    )
}

export default InputField;