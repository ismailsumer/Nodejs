import { Request, Response } from 'express';
import { registerUserService, loginUserService, getAllUsersService, deleteUserService } from '../services/auth.service';
import * as postService from '../services/post.service';
import * as commentService from '../services/comment.service';
import { IUser } from '../models/User.model';

// --- Sayfa Gösterme (GET) Fonksiyonları ---

// Ana sayfayı gösterir (Tüm postlar)
export const getHomePage = async (req: Request, res: Response) => {
    try {
        const posts = await postService.getPostsService();
        res.render('index', { 
            posts,
            user: req.session.user || null 
        });
    } catch (error: any) {
        res.render('index', { 
            posts: [], 
            user: req.session.user || null,
            error: error.message 
        });
    }
};

// /login sayfasını gösterir
export const getLoginPage = (req: Request, res: Response) => {
    // login.ejs dosyasını render et
    res.render('login', { error: null }); // 'error: null' ile EJS'e hata olmadığını bildir
};

// /register sayfasını gösterir
export const getRegisterPage = (req: Request, res: Response) => {
    try {
        console.log('GET /register - Session:', req.session); // Debug
        res.render('register', { error: null });
    } catch (error: any) {
        console.error('GET /register error:', error);
        res.status(500).send('Sayfa yüklenirken hata oluştu: ' + error.message);
    }
};

// /dashboard sayfasını gösterir
export const getDashboardPage = async (req: Request, res: Response) => {
    // Session'dan kullanıcı bilgisi al
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    
    try {
        // Kullanıcının kendi postlarını getir
        const posts = await postService.getPostsService();
        const userPosts = posts.filter(post => 
            post.author._id.toString() === user._id
        );
        
        res.render('dashboard', { user, posts: userPosts });
    } catch (error: any) {
        res.render('dashboard', { user, posts: [], error: error.message });
    }
};

// Post detay sayfasını gösterir
export const getPostDetailPage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await postService.getPostByIdService(id);
        
        if (!post) {
            return res.status(404).render('404', { message: 'Post bulunamadı' });
        }
        
        res.render('posts-detail', { 
            post,
            user: req.session.user || null 
        });
    } catch (error: any) {
        res.status(500).send('Bir hata oluştu: ' + error.message);
    }
};

// Yeni post oluşturma sayfasını gösterir
export const getNewPostPage = (req: Request, res: Response) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    res.render('posts-new', { user, error: null });
};

// Post düzenleme sayfasını gösterir
export const getEditPostPage = async (req: Request, res: Response) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    
    try {
        const { id } = req.params;
        const post = await postService.getPostByIdService(id);
        
        if (!post) {
            return res.status(404).send('Post bulunamadı');
        }
        
        // Sadece post sahibi veya admin düzenleyebilir
        if (post.author._id.toString() !== user._id && user.role !== 'Admin') {
            return res.status(403).send('Bu işlemi yapmaya yetkiniz yok');
        }
        
        res.render('posts-edit', { user, post, error: null });
    } catch (error: any) {
        res.status(500).send('Bir hata oluştu: ' + error.message);
    }
};

// Admin paneli sayfasını gösterir
export const getAdminPage = async (req: Request, res: Response) => {
    const user = req.session.user;
    if (!user || user.role !== 'Admin') {
        return res.status(403).send('Bu sayfaya erişim yetkiniz yok');
    }
    
    try {
        const allUsers = await getAllUsersService();
        const allPosts = await postService.getPostsService();
        res.render('admin', { user, allUsers, allPosts });
    } catch (error: any) {
        res.render('admin', { user, allUsers: [], allPosts: [], error: error.message });
    }
};

// Logout işlemi
export const logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Çıkış yapılırken bir hata oluştu');
        }
        res.redirect('/login');
    });
};

// --- Form İşleme (POST) Fonksiyonları ---

// /register formunu işler
export const postRegister = async (req: Request, res: Response) => {
    try {
        console.log('Register form data:', req.body); // Debug için
        
        // API'de kullandığımız register servisini burada da kullanabiliriz
        await registerUserService(req.body);
        
        // Kayıt başarılıysa, kullanıcıyı login sayfasına yönlendir
        res.redirect('/login');
    } catch (error: any) {
        console.error('Register error:', error); // Debug için
        // Hata olursa, register sayfasını tekrar render et ve hatayı göster
        res.render('register', { error: error.message || 'Kayıt sırasında bir hata oluştu' });
    }
};

// /login formunu işler (SESSION KULLANIMI)
export const postLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        console.log('Login attempt:', { email }); // Debug için
        
        // Login servisini kullan
        const { user } = await loginUserService(email, password);
        const typedUser = user as IUser;

        // Kullanıcıyı session'a kaydet
        req.session.user = {
            _id: typedUser._id.toString(),
            username: typedUser.username,
            email: typedUser.email,
            role: typedUser.role
        };

        res.redirect('/dashboard'); // Giriş başarılı, dashboard'a yönlendir

    } catch (error: any) {
        console.error('Login error:', error); // Debug için
        // Hata olursa, login sayfasını tekrar render et ve hatayı göster
        res.render('login', { error: error.message || 'Giriş sırasında bir hata oluştu' });
    }
};

// Yeni post oluşturma formunu işler
export const postCreatePost = async (req: Request, res: Response) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    
    try {
        const { title, content } = req.body;
        await postService.createPostService({ title, content }, user._id);
        res.redirect('/dashboard');
    } catch (error: any) {
        res.render('posts-new', { user, error: error.message });
    }
};

// Post güncelleme formunu işler
export const postUpdatePost = async (req: Request, res: Response) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        
        await postService.updatePostService(
            id, 
            { title, content },
            { id: user._id, role: user.role }
        );
        
        res.redirect('/dashboard');
    } catch (error: any) {
        const post = await postService.getPostByIdService(req.params.id);
        res.render('posts-edit', { user, post, error: error.message });
    }
};

// Post silme işlemi
export const postDeletePost = async (req: Request, res: Response) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    
    try {
        const { id } = req.params;
        await postService.deletePostService(
            id,
            { id: user._id, role: user.role }
        );
        res.redirect('/dashboard');
    } catch (error: any) {
        res.status(500).send('Post silinirken hata oluştu: ' + error.message);
    }
};

// Yorum oluşturma formunu işler
export const postCreateComment = async (req: Request, res: Response) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    
    try {
        const { postId } = req.params;
        const { text } = req.body;
        
        await commentService.addCommentToPostService(
            { text },
            postId,
            user._id
        );
        
        res.redirect(`/posts/${postId}`);
    } catch (error: any) {
        res.status(500).send('Yorum eklenirken hata oluştu: ' + error.message);
    }
};

// Yorum silme işlemi
export const postDeleteComment = async (req: Request, res: Response) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    
    try {
        const { postId, commentId } = req.params;
        
        await commentService.deleteCommentFromPostService(
            commentId,
            { id: user._id, role: user.role }
        );
        
        res.redirect(`/posts/${postId}`);
    } catch (error: any) {
        res.status(500).send('Yorum silinirken hata oluştu: ' + error.message);
    }
};

// Kullanıcı silme işlemi (Admin)
export const postDeleteUser = async (req: Request, res: Response) => {
    const user = req.session.user;
    if (!user || user.role !== 'Admin') {
        return res.status(403).send('Bu işlemi yapmaya yetkiniz yok');
    }
    
    try {
        const { userId } = req.params;
        await deleteUserService(userId);
        res.redirect('/admin');
    } catch (error: any) {
        res.status(500).send('Kullanıcı silinirken hata oluştu: ' + error.message);
    }
};