import Post, { IPost } from '../models/Post.model';
import { IUser } from '../models/User.model'; // IUser'u User modelinden alıyoruz
import Comment from '../models/Comment.model';
// Post oluşturma
export const createPostService = async (
    data: { title: string, content: string }, 
    userId: string
): Promise<IPost> => {
    const post = new Post({
        ...data,
        author: userId // Postun yazarını, token'dan gelen kullanıcı ID'si olarak ayarla
    });
    await post.save();
    return post;
};

// Tüm postları listeleme (author bilgisiyle birlikte)
export const getPostsService = async (): Promise<IPost[]> => {
    // populate('author', 'username email') -> author alanını User koleksiyonundan al
    // ve sadece username ile email alanlarını getir.
    return Post.find().populate('author', 'username email').sort({ createdAt: -1 });
};

// ID ile tek bir post getirme (author ve comment bilgileriyle)
export const getPostByIdService = async (postId: string): Promise<IPost | null> => {
    return Post.findById(postId)
        .populate('author', 'username email')
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: 'username email'
            }
        });
};

// Post güncelleme
export const updatePostService = async (
    postId: string, 
    data: { title?: string, content?: string },
    user: { id: string, role: string } // req.user objesi
): Promise<IPost | null> => {
    const post = await Post.findById(postId);

    if (!post) {
        throw new Error("Post bulunamadı.");
    }

    // Yetki kontrolü: Kullanıcı Admin değilse VE postun yazarı değilse, hata ver.
    if (user.role !== 'Admin' && post.author.toString() !== user.id) {
        throw new Error("Bu işlemi yapmaya yetkiniz yok."); // 403 Forbidden
    }

    // updateOne yerine findByIdAndUpdate kullanarak güncellenen dökümanı geri alabiliriz
    const updatedPost = await Post.findByIdAndUpdate(postId, data, { new: true });
    return updatedPost;
};

// Post silme
export const deletePostService = async (
    postId: string,
    user: { id: string, role: string }
): Promise<void> => {
    const post = await Post.findById(postId);

    if (!post) {
        throw new Error("Post bulunamadı.");
    }

    // Yetki kontrolü
    if (user.role !== 'Admin' && post.author.toString() !== user.id) {
        throw new Error("Bu işlemi yapmaya yetkiniz yok.");
    }

    // Post silinmeden önce, bu posta ait tüm yorumları sil
    await Comment.deleteMany({ post: postId });

    // Şimdi postu sil
    await Post.findByIdAndDelete(postId);
};