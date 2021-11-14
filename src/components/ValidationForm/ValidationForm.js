import React, { useCallback } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const currentUser = React.useContext(CurrentUserContext);
  const [values, setValues] = React.useState({name: currentUser.name || '', email: currentUser.email || '', password:''});
  const [errors, setErrors] = React.useState({});
  const [isValidity, setIsValidity] = React.useState(false);
  
  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const pattern = target.pattern;
    const error = target.validationMessage;
    setValues({...values, [name]: value.trim()});
    setErrors({...errors, [name]: target.validationMessage});
    setIsValidity(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {name:'', email:'', password:''}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValidity(newIsValid);
    },
    [setValues, setErrors, setIsValidity]
  );

  return { values, setValues, handleChange, errors, isValidity, resetForm };
}