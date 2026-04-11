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
export const removeFromWatchlist = async (req, res) => {};
