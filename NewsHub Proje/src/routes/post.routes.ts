import { Router } from 'express';
import * as postController from '../controllers/post.controller';
import { protect } from '../middlewares/auth.middleware';
import validate from '../middlewares/validate.middleware';
import { postSchema } from '../validations/post.validation';
import commentRouter from './comment.routes';

const router = Router();

// Yorum rotalarını /:postId/comments altına bağla
router.use('/:postId/comments', commentRouter);

/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Post (haber/blog) yönetimi
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Tüm postları listeler
 *     tags: [Posts]
 *     responses:
 *       '200':
 *         description: Post listesi başarıyla alındı.
 */
router.get('/', postController.getPosts);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Yeni bir post oluşturur
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: İlk Post Başlığım
 *               content:
 *                 type: string
 *                 example: Bu benim ilk post içeriğim...
 *     responses:
 *       '201':
 *         description: Post başarıyla oluşturuldu.
 *       '400':
 *         description: Doğrulama hatası (eksik başlık/içerik).
 *       '401':
 *         description: Yetkisiz (Token gerekli).
 */
router.post('/', protect, validate(postSchema), postController.createPost);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: ID ile tek bir postu getirir
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID'si
 *     responses:
 *       '200':
 *         description: Post detayları.
 *       '404':
 *         description: Post bulunamadı.
 */
router.get('/:id', postController.getPostById);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Bir postu günceller
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Güncellenmiş Başlık
 *               content:
 *                 type: string
 *                 example: Güncellenmiş içerik
 *     responses:
 *       '200':
 *         description: Post güncellendi.
 *       '401':
 *         description: Yetkisiz.
 *       '403':
 *         description: Yetkiniz yok.
 */
router.put('/:id', protect, validate(postSchema), postController.updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Bir postu siler
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID'si
 *     responses:
 *       '200':
 *         description: Post silindi.
 *       '401':
 *         description: Yetkisiz.
 *       '403':
 *         description: Yetkiniz yok.
 */
router.delete('/:id', protect, postController.deletePost);

export default router;