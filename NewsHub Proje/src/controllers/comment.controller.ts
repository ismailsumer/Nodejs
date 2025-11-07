import { Request, Response } from 'express';
import * as commentService from '../services/comment.service';

export const createComment = async (req: Request, res: Response) => {
    const comment = await commentService.addCommentToPostService(
        req.body,
        req.params.postId, // URL'den gelen post ID'si
        req.user.id        // Token'dan gelen kullanıcı ID'si
    );
    res.status(201).json(comment);
};

export const deleteComment = async (req: Request, res: Response) => {
    await commentService.deleteCommentFromPostService(
        req.params.commentId, // URL'den gelen yorum ID'si
        req.user
    );
    res.status(200).json({ message: "Yorum başarıyla silindi." });
};