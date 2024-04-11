import { Request, Response, Router } from "express";
import { createPost, deletePost, getPosts, updatePost } from "../controllers/PostController";
import { checkIfUserIsAuth } from "../middleware/checkIfUserIsAuth";

const PostRoutes = Router();

PostRoutes.post("/post", checkIfUserIsAuth, createPost);
PostRoutes.get("/posts", getPosts);
PostRoutes.put("/post/:id", checkIfUserIsAuth, updatePost);
PostRoutes.delete("/post/:id", checkIfUserIsAuth, deletePost);

export { PostRoutes };