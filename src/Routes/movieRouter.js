import express from "express";
import { prisma } from "../config/db";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
} from "../Controllers/movieController.js";
const router = express.Router();

router.use(authMiddleware);

router.route("/").get(getAllMovies).post(addMovie);
router.delete("/:id", deleteMovie);

export default router;
