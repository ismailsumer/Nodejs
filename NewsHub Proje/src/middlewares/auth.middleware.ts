import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';

// 1. JWT'yi Doğrulama (Authentication)
export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;
    
    // Header'da 'Authorization' ve 'Bearer' token var mı kontrol et
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Token'ı header'dan al (örn: "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // Token'ı doğrula
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string };

            // Token'dan gelen id ve rol'ü req.user objesine ata
            // (express.d.ts sayesinde TypeScript hata vermeyecek)
            req.user = { id: decoded.id, role: decoded.role };

            next(); // Sonraki adıma geç
        } catch (error) {
            // Geçersiz token hatası
            res.status(401); // Yetkisiz
            throw new Error('Geçersiz token, erişim yetkiniz yok.');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Token bulunamadı, erişim yetkiniz yok.');
    }
};

// 2. Rol Bazlı Yetkilendirme (Authorization)
// Örn: authorize(['Admin']) -> Sadece Admin'ler geçebilir
export const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // 'protect' middleware'i çalıştırıldıktan sonra req.user.role'e erişebiliriz
        if (!roles.includes(req.user.role)) {
            res.status(403); // Yasak (Forbidden)
            throw new Error(`'${req.user.role}' rolü bu işlemi yapmak için yetkili değil.`);
        }
        next();
    };
};