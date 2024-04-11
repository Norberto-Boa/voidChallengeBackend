import { Request, Response } from "express";
import { postValidator } from "../validator/Post/PostValidator";
import { CustomRequest } from "../middleware/checkIfUserIsAuth";
import { AuthService } from "../services/AuthService";
import { PostService } from "../services/PostService";


export async function createPost(req: Request, res: Response) {
  const { caption, image } = postValidator.parse(req.body);

  if (!caption && !image) {
    return res.status(400).json({ message: "Cannot create an post without both caption and image" });
  }

  const userExists = await AuthService.existsByEmail((req as any).user.email ?? "");

  if (!userExists) {
    return res.status(403).json({ message: "Something went wrong" });
  }

  const post = await PostService.create(userExists.id,
    { caption }
  );

  return res.status(201).json({
    message: "Post created successfully",
    post
  });
}

export async function getPosts(req: Request, res: Response) {
  const posts = await PostService.getPosts();

  return res.status(200).json(posts);
}

export async function getSinglePost(req: Request, res: Response) {
  const { id } = req.params;

  const post = await PostService.getPostById(Number(id));

  if (!post) {
    return res.status(404).json({ message: "Post not found." });
  }

  return res.status(200).json(post);
}

export async function updatePost(req: Request, res: Response) {
  const { id } = req.params;
  const email = (req as any).user.email;
  const { caption } = postValidator.parse(req.body);

  const post = await PostService.getPostById(Number(id));

  if (!post) {
    return res.json(404).json({ message: "Post not found" });
  }

  if (post.author.email !== email) {
    return res.json(400).json({ message: "Cannot update other user's post" });
  }

  await PostService.update(post.id, { caption });

  return res.status(200).json({ message: "Updated Sucessfully" });
}

export async function deletePost(req: Request, res: Response) {
  const { id } = req.params;
  const email = (req as any).user.email;

  const post = await PostService.getPostById(Number(id));

  if (!post) {
    return res.json(404).json({ message: "Post not found" });
  }

  if (post.author.email !== email) {
    return res.json(400).json({ message: "Cannot delete other user's post" });
  }

  await PostService.delete(post.id);

  return res.json(200).json({ message: "Post deleted successfully!" });
}