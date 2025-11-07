import { Request, Response, NextFunction } from 'express';

// Giriş yapmış kullanıcıları korur (örn: Dashboard)
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) {
        // Giriş yapmamışsa, login sayfasına yönlendir
        return res.redirect('/login');
    }
    // Giriş yapmışsa, devam et
    next();
};

// Sadece giriş yapmamış kullanıcıların erişebilmesini sağlar (örn: Login sayfası)
export const requireGuest = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        // Zaten giriş yapmışsa, dashboard'a yönlendir
        return res.redirect('/dashboard');
    }
    // Giriş yapmamışsa, devam et
    next();
};