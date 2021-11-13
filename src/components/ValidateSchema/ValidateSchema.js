import * as yup from 'yup';

// Управление формой логина
export const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
});

// Управление формой регистрации пользователя
export const registerSchema = yup.object().shape({
    name: yup
        .string()
        .min(2, 'Имя должно быть не менее чем 2 символа')
        .max(30, 'Имя должно быть не более чем 30 символов')
        .required('Требуется ввести ваше имя'),
    email: yup
        .string()
        .email('Введенный email не корректный')
        .required('Требуется ввести email'),
    password: yup
        .string()
        .min(8, 'Введенный пароль должен быть не короче 8 символов')
        .required('Требуется ввести пароль')
});