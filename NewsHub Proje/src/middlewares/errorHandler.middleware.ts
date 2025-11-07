import { Request, Response, NextFunction } from 'express';

const errorHandlerMiddleware = (
    err: any, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    // Hatanın bir HTTP durum kodu varsa onu kullan, yoksa 500 (Sunucu Hatası) kullan
    const statusCode = err.statusCode || 500;
    
    // Hata mesajını al
    const message = err.message || "Sunucuda beklenmeyen bir hata oluştu.";

    // Daha detaylı loglama
    console.error('=== HATA YAKALANDI ===');
    console.error('URL:', req.originalUrl);
    console.error('Method:', req.method);
    console.error('Status:', statusCode);
    console.error('Message:', message);
    console.error('Stack:', err.stack);
    console.error('=====================');

    // İstemciye standart bir JSON hata formatı gönder
    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: message,
    });
};

export default errorHandlerMiddleware;