import { prisma } from "../config/db.js";
export const getWatchlist = async (req, res) => {
  const watchlist = await prisma.user.findMany();
};

export const addToWatchlist = async (req, res) => {
  //   const { id } = req.query;
  const { movieId, status, rating, notes } = req.body;
  const userId = req.user?.id;
  const movie = await prisma.movie.findUnique({ where: { id: movieId } });
  if (!movie) return res.status(404).json({ error: "Movie not found" });

  const isExistingWatchlist = await prisma.watchlistItem.findUnique({
    where: { userId_movieId: { userId, movieId } },
  });
  if (isExistingWatchlist)
    return res.status(400).json({ error: "Movie already in watchlist" });

  const watchlistItem = await prisma.watchlistItem.create({
    data: { userId, movieId, status: status || "PLANNED", rating, notes },
  });

  res.status(201).json({ status: "success", data: { watchlistItem } });
};

export const updateWatchlist = async (req, res) => {
  const { status, rating, notes } = req.body;

  // Find watchlist item and verify ownership
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }

  // Ensure only owner can update
  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this watchlist item" });
  }

  // Build update data
  const updateData = {};
  if (status !== undefined) updateData.status = status.toUpperCase();
  if (rating !== undefined) updateData.rating = rating;
  if (notes !== undefined) updateData.notes = notes;

  // Update watchlist item
  const updatedItem = await prisma.watchlistItem.update({
    where: { id: req.params.id },
    data: updateData,
  });

  res.status(200).json({
    status: "success",
    data: {
      watchlistItem: updatedItem,
    },
  });
};

export const removeFromWatchlist = async (req, res) => {};
