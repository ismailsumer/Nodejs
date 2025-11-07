import Comment, { IComment } from '../models/Comment.model';
import Post from '../models/Post.model';

// Bir posta yeni yorum ekleme
export const addCommentToPostService = async (
    data: { text: string },
    postId: string,
    userId: string
): Promise<IComment> => {
    // 1. Post'un var olup olmadığını kontrol et
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error("Yorum yapılacak post bulunamadı.");
    }

    // 2. Yorumu oluştur
    const comment = new Comment({
        text: data.text,
        post: postId,
        author: userId,
    });
    await comment.save();

    // 3. Post'un 'comments' dizisine yeni yorumun ID'sini ekle
    await Post.findByIdAndUpdate(comment.post._id, { $push: { comments: comment._id } });
    await post.save();

    return comment;
};

// Bir posttan yorum silme
export const deleteCommentFromPostService = async (
    commentId: string,
    user: { id: string, role: string }
): Promise<void> => {
    // 1. Yorumu ve ait olduğu postun yazarını getir
    const comment = await Comment.findById(commentId).populate({
        path: 'post',
        select: 'author'
    });
    
    if (!comment) {
        throw new Error("Yorum bulunamadı.");
    }

    // 'post' alanının populate edildiğinden ve 'author' içerdiğinden emin ol
    const postAuthorId = (comment.post as any)?.author;
    if (!postAuthorId) {
        throw new Error("İlişkili post bulunamadı veya yazar bilgisi eksik.");
    }

    // 2. Yetki kontrolü 
    // Kullanıcı Admin DEĞİLSE, yorumun sahibi DEĞİLSE ve postun sahibi DEĞİLSE, hata ver.
    const isCommentAuthor = comment.author.toString() === user.id;
    const isPostAuthor = postAuthorId.toString() === user.id;

    if (user.role !== 'Admin' && !isCommentAuthor && !isPostAuthor) {
        throw new Error("Bu yorumu silme yetkiniz yok.");
    }

    // 3. Yorumu sil
    await Comment.findByIdAndDelete(commentId);

    // 4. Post'un 'comments' dizisinden bu yorumun ID'sini kaldır
    await Post.findByIdAndUpdate(comment.post, { $pull: { comments: commentId } });
};