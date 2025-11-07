import { Router } from 'express';
import { register, login, getProfile } from '../controllers/auth.controller';
import validate from '../middlewares/validate.middleware';
import { registerSchema, loginSchema } from '../validations/auth.validation';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Kullanıcı kayıt, giriş ve profil işlemleri
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Yeni kullanıcı kaydı oluşturur
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: testuser
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123
 *     responses:
 *       '201':
 *         description: Kullanıcı başarıyla oluşturuldu.
 *       '400':
 *         description: Geçersiz veri veya mevcut kullanıcı.
 */
router.post('/register', validate(registerSchema), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Kullanıcı girişi yapar ve JWT üretir
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123
 *     responses:
 *       '200':
 *         description: Giriş başarılı, JWT token döndürür.
 *       '401':
 *         description: Geçersiz e-posta veya parola.
 */
router.post('/login', validate(loginSchema), login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Giriş yapan kullanıcının bilgilerini getirir
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Kullanıcı profili bilgileri.
 *       '401':
 *         description: Yetkisiz (Token yok veya geçersiz).
 */
router.get('/profile', protect, getProfile);

export default router;