import express from "express";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
  updateWatchlist,
} from "../Controllers/watchlistController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { addToWatchlistSchema } from "../middlewares/watchlistValidators.js";

const router = express.Router();

// Apply authentication middleware to all routes in this router
router.use(authMiddleware);

router
  .route("/")
  .get(getWatchlist)
  .post(validateRequest(addToWatchlistSchema), addToWatchlist);

router.route("/:id").put(updateWatchlist).delete(removeFromWatchlist);

export default router;
