import app from './app';
import connectDB from './config/db'; // connectDB'yi import et

const PORT = process.env.PORT || 3000;

// Sunucuyu başlatmadan önce veritabanına bağlan
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor...`);
    });
});