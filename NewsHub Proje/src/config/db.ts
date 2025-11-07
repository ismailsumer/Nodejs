import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    // .env dosyasından MongoDB URI'sini al
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
        console.error("Hata: MONGODB_URI ortam değişkeni tanımlanmamış.");
        process.exit(1); // Değişken yoksa uygulamayı sonlandır
    }

    try {
        // Mongoose ile veritabanına bağlanmayı dene
        await mongoose.connect(mongoURI);
        console.log("MongoDB bağlantısı başarılı.");
    } catch (error) {
        console.error("MongoDB bağlantı hatası:", error);
        // Bağlantı başarısız olursa uygulamayı sonlandır
        process.exit(1);
    }
};

export default connectDB;