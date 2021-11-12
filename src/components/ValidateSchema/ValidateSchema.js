import * as yup from 'yup';

// Управление формой логина
export const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
});

// Управление формой регистрации пользователя
export const registerSchema = yup.object({
    name: yup.string().min(2).max(30).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
});