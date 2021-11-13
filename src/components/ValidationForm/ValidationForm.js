import React, { useCallback } from "react";
import * as yup from 'yup';

//хук управления формой и валидации формы
export function useFormWithValidation(schema) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValidity, setIsValidity] = React.useState(false);
  const [errorContainer, setErrorContainer] = React.useState({});
  
  React.useEffect(() => {
    console.log(errors);
    // async function validityForm() {
    //   return await shema.isValid(values);
    // }
    // validityForm().then(result => setIsValidity(result));
  }, [values]);

  const handleChange = (event) => {
    const target = event.target;
    // const errorContainer = event.target.nextSibling;
    const name = target.name;
    const value = target.value;
    // setErrorContainer({...errorContainer, [name]: errorContainer.innerText });
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
  };

  const validityForm = () => {
    
  }

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


// //хук управления формой
// export function useForm() {
//   const [values, setValues] = React.useState({});

//   const handleChange = (event) => {
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;
//     setValues({...values, [name]: value});
//   };

//   return {values, handleChange, setValues};
// }