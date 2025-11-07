import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';
import commentRoutes from './routes/comment.routes';
import webRoutes from './routes/web.routes';
import errorHandlerMiddleware from './middlewares/errorHandler.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.config';

// .env dosyasındaki değişkenleri yükler
dotenv.config();

const app: Application = express();

// --- VIEW ENGINE ---
app.set('view engine', 'ejs');
// Development modunda src/views, production'da dist/views kullan
const viewsPath = process.env.NODE_ENV === 'production' 
    ? path.join(__dirname, 'views') 
    : path.join(__dirname, '../src/views');
app.set('views', viewsPath);

console.log('Views directory:', viewsPath); // Debug için

// --- STATIC DOSYALAR ---
// Public klasöründeki dosyaları (CSS, JS, resimler) servis et
app.use(express.static(path.join(__dirname, '../public')));

// --- MIDDLEWARELER ---
// JSON body'lerini parse etmek için middleware
app.use(express.json());

// URL-encoded body'lerini parse etmek için (form verileri için)
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24 saat
    },
  })
);

// === SWAGGER API DOKÜMANTASYONU ===
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- ROTALAR ---
// Web Routes (EJS sayfaları)
app.use('/', webRoutes);

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/posts/:postId/comments', commentRoutes);

// Ana sayfa için rota 
app.get('/api', (req: Request, res: Response) => {
    res.json({ message: 'NewsHub API Çalışıyor!' });
});

// --- HATA YÖNETİMİ ---
// Global Error Handler
app.use(errorHandlerMiddleware);

export default app;