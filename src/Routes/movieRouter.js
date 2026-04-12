import express from "express";
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
router.route("/:id").put(updateMovie).delete(deleteMovie);

export default router;
