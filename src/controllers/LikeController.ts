import { Request, Response } from "express";
import { PostService } from "../services/PostService";
import { AuthService } from "../services/AuthService";
import { LikeService } from "../services/LikeService";


export async function like(req: Request, res: Response) {
  const { id } = req.params;
  const user = await AuthService.existsByEmail((req as any).user.email ?? "");

  if (!user) {
    return res.status(403).json({ message: "Something went wrong" });
  }

  const post = await PostService.getPostById(Number(id));

  if (!post) {
    return res.status(404).send({ message: "Post not found!" });
  }

  const checkIfLiked = await LikeService.getLikeByKey(post.id, user.id);

  if (checkIfLiked) {
    return res.status(200).json({ message: "Already liked this post." })
  }

  await LikeService.create(post.id, user.id);

  return res.status(200).json({ message: "Post Liked sucessfully!" });
}

export async function dislike(req: Request, res: Response) {
  const { id } = req.params;
  const user = await AuthService.existsByEmail((req as any).user.email ?? "");

  if (!user) {
    return res.status(403).json({ message: "Something went wrong" });
  }

  const post = await PostService.getPostById(Number(id));

  if (!post) {
    return res.status(404).send({ message: "Post not found!" });
  }

  const checkIfLiked = await LikeService.getLikeByKey(post.id, user.id);

  if (!checkIfLiked) {
    return res.status(200).json({ message: "Already disliked this post." })
  }

  await LikeService.delete(post.id, user.id);

  return res.status(200).json({ message: "Deleted" });
}