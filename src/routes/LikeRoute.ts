import { Router } from "express";
import { checkIfUserIsAuth } from "../middleware/checkIfUserIsAuth";
import { dislike, like } from "../controllers/LikeController";

const LikeRoutes = Router();

LikeRoutes.post("/post/like/:id", checkIfUserIsAuth, like);
LikeRoutes.post("/post/dislike/:id", checkIfUserIsAuth, dislike);

export { LikeRoutes };