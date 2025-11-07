import { Request, Response } from 'express';
import { registerUserService, loginUserService,getUserProfileService, } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
    // try...catch bloğu kaldırıldı!
    const user = await registerUserService(req.body);
    
    const userResponse = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    };
    res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu.", user: userResponse });
};

export const login = async (req: Request, res: Response) => {
    // try...catch bloğu kaldırıldı!
    const { email, password } = req.body;
    const { user, token } = await loginUserService(email, password);
    
    const userResponse = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
        
    };
  

    res.status(200).json({ message: "Giriş başarılı.", user: userResponse, token });
}; 
export const getProfile = async (req: Request, res: Response) => {
    // 'protect' middleware'i sayesinde req.user'a erişebiliyoruz.
    const user = await getUserProfileService(req.user.id);
    res.status(200).json(user);
};