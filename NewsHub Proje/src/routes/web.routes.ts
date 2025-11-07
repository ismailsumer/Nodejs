import { Router } from 'express';
import * as webController from '../controllers/web.controller';
import { requireAuth, requireGuest } from '../middlewares/session.middleware';
const router = Router();

// Ana sayfa
router.get('/', webController.getHomePage);

// Kimlik doğrulama sayfaları (GET)
router.get('/login', requireGuest, webController.getLoginPage);
router.get('/register', requireGuest, webController.getRegisterPage);
router.get('/dashboard', requireAuth, webController.getDashboardPage);

// Post sayfaları (GET)
router.get('/posts/new', requireAuth, webController.getNewPostPage);
router.get('/posts/:id', webController.getPostDetailPage);
router.get('/posts/:id/edit', requireAuth, webController.getEditPostPage);

// Admin sayfası (GET)
router.get('/admin', requireAuth, webController.getAdminPage);

// Kimlik doğrulama formları (POST)
router.post('/login', webController.postLogin);
router.post('/register', webController.postRegister);
router.get('/logout', webController.logout);

// Post formları (POST)
router.post('/posts/new', requireAuth, webController.postCreatePost);
router.post('/posts/:id/edit', requireAuth, webController.postUpdatePost);
router.post('/posts/:id/delete', requireAuth, webController.postDeletePost);

// Yorum formları (POST)
router.post('/posts/:postId/comments', requireAuth, webController.postCreateComment);
router.post('/posts/:postId/comments/:commentId/delete', requireAuth, webController.postDeleteComment);

// Admin işlemleri (POST)
router.post('/admin/users/:userId/delete', requireAuth, webController.postDeleteUser);

export default router;