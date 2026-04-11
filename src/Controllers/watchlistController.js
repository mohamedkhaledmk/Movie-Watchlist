import { prisma } from "../config/db.js";
export const getWatchlist = async (req, res) => {
  const watchlist = await prisma.user.findMany();
};

export const addToWatchlist = async (req, res) => {
  //   const { id } = req.query;
  const { movieId, status, rating, notes, userId } = req.body;

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

export const updateWatchlistItem = async (req, res) => {
  const { id } = req.params;
  const { status, rating, notes } = req.body;
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: parseInt(id) },
  });
  if (!watchlistItem)
    return res.status(404).json({ error: "Watchlist item not found" });
  const updatedWatchlistItem = await prisma.watchlistItem.update({
    where: { id: parseInt(id) },
    data: { status, rating, notes },
  });
  res
    .status(200)
    .json({ status: "success", data: { watchlistItem: updatedWatchlistItem } });
};

export const removeFromWatchlist = async (req, res) => {};
