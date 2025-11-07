import Joi from 'joi';

export const postSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .required()
        .messages({
            'string.base': 'Başlık metin olmalıdır.',
            'string.min': 'Başlık en az 3 karakter olmalıdır.',
            'any.required': 'Başlık alanı zorunludur.'
        }),
    content: Joi.string()
        .min(10)
        .required()
        .messages({
            'string.min': 'İçerik en az 10 karakter olmalıdır.',
            'any.required': 'İçerik alanı zorunludur.'
        })
});