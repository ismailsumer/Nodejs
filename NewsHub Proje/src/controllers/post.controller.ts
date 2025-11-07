import { Request, Response } from 'express';
import * as postService from '../services/post.service';

// Post oluşturma
export const createPost = async (req: Request, res: Response) => {
    // req.user.id, 'protect' middleware'inden geliyor
    const post = await postService.createPostService(req.body, req.user.id);
    res.status(201).json(post);
};

// Tüm postları getirme
export const getPosts = async (req: Request, res: Response) => {
    const posts = await postService.getPostsService();
    res.status(200).json(posts);
};

// ID ile tek post getirme
export const getPostById = async (req: Request, res: Response) => {
    const post = await postService.getPostByIdService(req.params.id);
    if (!post) {
        throw new Error("Post bulunamadı."); // Bu hata global handler'a gidecek
    }
    res.status(200).json(post);
};

// Post güncelleme
export const updatePost = async (req: Request, res: Response) => {
    const updatedPost = await postService.updatePostService(req.params.id, req.body, req.user);
    if (!updatedPost) {
        throw new Error("Post bulunamadı.");
    }
    res.status(200).json(updatedPost);
};

// Post silme
export const deletePost = async (req: Request, res: Response) => {
    await postService.deletePostService(req.params.id, req.user);
    res.status(200).json({ message: "Post başarıyla silindi." });
};