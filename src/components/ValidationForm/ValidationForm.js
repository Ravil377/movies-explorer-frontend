import React, { useCallback } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const currentUser = React.useContext(CurrentUserContext);
  const [values, setValues] = React.useState({name: currentUser.name || '', email: currentUser.email || '', password:''});
  const [errors, setErrors] = React.useState({});
  const [isValidity, setIsValidity] = React.useState(false);

  React.useEffect(() => {
    setValues({name: currentUser.name, email: currentUser.email})
  }, [currentUser]);
  
  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
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