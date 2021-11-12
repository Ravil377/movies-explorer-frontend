import React, { useCallback } from "react";
import * as yup from 'yup';

//хук управления формой
export function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({...values, [name]: value});
  };

  return {values, handleChange, setValues};
}

//хук управления формой и валидации формы
export function useFormWithValidation(shema) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValidity, setIsValidity] = React.useState(false);

  React.useEffect(() => {
    async function validityForm() {
      return await shema.isValid(values);
    }
    validityForm().then(result => setIsValidity(result));
  }, [values, shema]);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValidity(newIsValid);
    },
    [setValues, setErrors, setIsValidity]
  );

  return { values, handleChange, errors, isValidity, resetForm };
}