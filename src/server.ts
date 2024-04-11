import express from "express";
import cors from "cors";
import { AuthRoutes } from "./routes/AuthRoutes";
import { PostRoutes } from "./routes/PostRoutes";
import { LikeRoutes } from "./routes/LikeRoute";

const app = express();

app.use(cors({
  origin: true,
}));

app.use(express.json());
app.use(AuthRoutes);
app.use(PostRoutes);
app.use(LikeRoutes);

const PORT: number = Number(process.env.PORT) || 3333;

app.listen(PORT);