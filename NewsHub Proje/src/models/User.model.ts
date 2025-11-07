import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

// User dökümanının arayüzünü (interface) tanımla
export interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    role: 'User' | 'Admin';
    comparePassword(password: string): Promise<boolean>;
}

// Mongoose şemasını oluştur
const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['User', 'Admin'], // Rol sadece bu iki değerden biri olabilir
        default: 'User', // Varsayılan rol 'User'
    }
}, {
    timestamps: true // createdAt ve updatedAt alanlarını otomatik ekler
});

// Middleware: Kullanıcı kaydedilmeden (pre-save) önce parolayı hash'le
UserSchema.pre<IUser>('save', async function (next) {
    // Sadece parola alanı değiştirildiyse veya yeni bir kullanıcı ise çalışır
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        // Hata durumunda Mongoose'a hatayı bildir
        // TypeScript'in `error` tipini `any` olarak kabul etmesi için cast ediyoruz.
        next(error as Error);
    }
});

// Şemaya özel bir metot ekle: Parola karşılaştırma
UserSchema.methods.comparePassword = function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

// Modeli oluştur ve export et
const User = model<IUser>('User', UserSchema);
export default User;