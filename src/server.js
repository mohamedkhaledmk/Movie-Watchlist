import { config } from "dotenv";
config();

import express from "express";
import movieRouter from "./Routes/movieRouter.js";
import authRouter from "./Routes/authRouter.js";
import watchlistRouter from "./Routes/watchlistRouter.js";
import { connectDB, disconnectDB } from "./config/db.js";
import morgan from "morgan";
const app = express();
const PORT = 8080;
connectDB();
// console.log(process.env.DATABASE_URL);
//Body parsing middleware
app.use(morgan("dev"));
app.use(express.json());
//parse HTML data sent from HTML forms & make it available in req.body
app.use(express.urlencoded({ extended: true }));

// handling API Routes
app.use("/movies", movieRouter);
app.use("/auth", authRouter);
app.use("/watchlist", watchlistRouter);
const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

//handle erros leading to resources leakage.
process.on("unhandledRejection", async (err) => {
  console.log(`Unhandled Rejection:`, err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});
process.on("uncaughtException", async (err) => {
  console.log(`Uncaught Exception:`, err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});
process.on("SIGTERM", async () => {
  console.log(`SIGTERM Recieved. Shutting DOWN server...`);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});
