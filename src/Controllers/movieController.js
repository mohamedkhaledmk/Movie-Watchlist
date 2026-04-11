const getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.status(200).json({ status: "success", data: movies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

const addMovie = async (req, res) => {
  const { title, releaseYear, genre } = req.body;
  try {
    const newMovie = await prisma.movie.create({
      data: {
        title,
        releaseYear,
        genre,
      },
    });
    res.status(201).json({ status: "success", data: newMovie });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, releaseYear, genre } = req.body;
  const userId = req.user?.id;

  try {
    const movieExists = await prisma.movie.findUnique({ where: { id } });
    if (!movieExists) {
      return res
        .status(404)
        .json({ status: "error", message: "Movie not found" });
    }

    if (movieExists.userId !== userId) {
      return res.status(403).json({
        status: "error",
        message: "Forbidden: You don't have permission to update this movie",
      });
    }

    const updatedMovie = await prisma.movie.update({
      where: { id },
      data: {
        title,
        releaseYear,
        genre,
      },
    });

    res.status(200).json({ status: "success", data: updatedMovie });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const movieExists = await prisma.movie.findUnique({ where: { id } });
    if (!movieExists) {
      return res
        .status(404)
        .json({ status: "error", message: "Movie not found" });
    }
    if (movieExists.userId !== userId) {
      return res.status(403).json({
        status: "error",
        message: "Forbidden: You don't have permission to delete this movie",
      });
    }
    const deletedMovie = await prisma.movie.delete({ where: { id } });

    res.status(200).json({
      status: "success",
      message: "Movie deleted successfully",
      data: deletedMovie,
    });
  } catch (err) {
    console.error("Delete Movie Error:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export { getAllMovies, addMovie, updateMovie, deleteMovie };
