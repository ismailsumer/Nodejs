import Joi from 'joi';

// Register (Kayıt) şeması
export const registerSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'Kullanıcı adı metin olmalıdır.',
            'string.min': 'Kullanıcı adı en az 3 karakter olmalıdır.',
            'string.max': 'Kullanıcı adı en fazla 30 karakter olmalıdır.',
            'any.required': 'Kullanıcı adı zorunludur.'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Geçerli bir e-posta adresi giriniz.',
            'any.required': 'E-posta zorunludur.'
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.min': 'Parola en az 6 karakter olmalıdır.',
            'any.required': 'Parola zorunludur.'
        })
});

// Login (Giriş) şeması
export const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Geçerli bir e-posta adresi giriniz.',
            'any.required': 'E-posta zorunludur.'
        }),
    password: Joi.string()
        .required()
        .messages({
            'any.required': 'Parola zorunludur.'
        })
});