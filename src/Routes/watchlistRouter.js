import express from "express";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../Controllers/watchlistController.js";

const router = express.Router();

router.route("/").get(getWatchlist).post(addToWatchlist);
router.route("/:id").delete(removeFromWatchlist);

export default router;
