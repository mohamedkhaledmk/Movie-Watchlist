import { z } from "zod";

const addToWatchlistSchema = z.object({
  movieId: z.uuid(),
  status: z
    .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
      error: () => ({
        message:
          "Invalid status value.. Allowed values are PLANNED, WATCHING, COMPLETED, DROPPED",
      }),
    })
    .optional(),
  rating: z.coerce
    .number("rating must be a number")
    .int("rating must be an integer")
    .min(0, "Rating must be larger than or equal 0")
    .max(10, "Rating must be smaller than or equal 10")
    .optional(),
  notes: z.string().optional(),
});

export { addToWatchlistSchema };
