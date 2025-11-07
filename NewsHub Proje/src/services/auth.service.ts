import { IUser } from '../models/User.model';
import User from '../models/User.model';
import jwt from 'jsonwebtoken';

// Kullanıcı kayıt servisi
export const registerUserService = async (userData: { username: string; email: string; password: string }): Promise<IUser> => {
    // E-posta veya kullanıcı adının zaten var olup olmadığını kontrol et
    const existingUser = await User.findOne({
        $or: [{ email: userData.email }, { username: userData.username }]
    });

    if (existingUser) {
        throw new Error("Bu e-posta veya kullanıcı adı zaten kullanılıyor.");
    }
    
    const user = new User(userData);
    await user.save();
    return user;
};
// YENİ FONKSİYON: Token üretir
export const generateTokenService = (user: IUser): string => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );
};
// Kullanıcı giriş servisi
export const loginUserService = async (email: string, password: string): Promise<{ user: IUser, token: string }> => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Geçersiz e-posta veya parola.");
        
    }

    // Modelde oluşturduğumuz metot ile parolayı karşılaştır
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error("Geçersiz e-posta veya parola.");
    }

    // JWT Oluşturma [cite: 51, 88]
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' } // Token'ın geçerlilik süresi
    );
// ... (Diğer importlar ve fonksiyonlar)


    return { user, token };
};export const getUserProfileService = async (userId: string) : Promise<IUser> => {
    // Parola hariç tüm kullanıcı bilgilerini getir
    const user = await User.findById(userId).select('-password');

    if (!user) {
        throw new Error("Kullanıcı bulunamadı.");
    }
    return user;
};

// Tüm kullanıcıları getir (Admin için)
export const getAllUsersService = async (): Promise<IUser[]> => {
    return User.find().select('-password');
};

// Kullanıcı silme (Admin için)
export const deleteUserService = async (userId: string): Promise<void> => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("Kullanıcı bulunamadı.");
    }
    await User.findByIdAndDelete(userId);
};