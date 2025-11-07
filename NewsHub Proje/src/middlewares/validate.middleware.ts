import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

// Bu fonksiyon, bir Joi şeması alır ve bir Express middleware'i döndürür
const validate = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    // Sadece req.body'yi doğruluyoruz, query veya params için genişletilebilir
    const { error } = schema.validate(req.body);

    if (error) {
        // Doğrulama hatası varsa, hatayı global error handler'a göndermek yerine
        // doğrudan 400 Bad Request olarak cevaplıyoruz.
        // Hata detaylarını birleştirerek gönder
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        return res.status(400).json({
            status: 'validation_error',
            message: errorMessage
        });
    }

    // Doğrulama başarılıysa bir sonraki adıma (controller'a) geç
    next();
};

export default validate;