import { Router } from 'express';
import * as commentController from '../controllers/comment.controller';
import { protect } from '../middlewares/auth.middleware';
import validate from '../middlewares/validate.middleware';
import { commentSchema } from '../validations/comment.validation';

const router = Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: Postlara yorum ekleme ve silme
 */

/**
 * @swagger
 * /posts/{postId}/comments:
 *   post:
 *     summary: Bir posta yeni bir yorum ekler
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: Yorum yapılacak postun ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: Bu harika bir yazı!
 *     responses:
 *       '201':
 *         description: Yorum başarıyla oluşturuldu.
 *       '401':
 *         description: Yetkisiz.
 *       '404':
 *         description: Post bulunamadı.
 */
router.post(
    '/', 
    protect, 
    validate(commentSchema), 
    commentController.createComment
);

/**
 * @swagger
 * /posts/{postId}/comments/{commentId}:
 *   delete:
 *     summary: Bir yorumu siler
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: Postun ID'si
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: Silinecek yorumun ID'si
 *     responses:
 *       '200':
 *         description: Yorum başarıyla silindi.
 *       '401':
 *         description: Yetkisiz.
 *       '403':
 *         description: Bu yorumu silmeye yetkiniz yok.
 *       '404':
 *         description: Yorum bulunamadı.
 */
router.delete(
    '/:commentId', 
    protect, 
    commentController.deleteComment
);

export default router;