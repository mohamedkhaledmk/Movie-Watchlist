import { config } from "dotenv";
config();

import express, { urlencoded } from "express";
import movieRouter from "./Routes/movieRouter.js";
import authRouter from "./Routes/authRouter.js";
import { connectDB, disconnectDB } from "./config/db.js";

const app = express();
const PORT = 8080;
connectDB();

//Body parsing middleware
app.use(express.json());
//parse HTML data sent from HTML forms & make it available in req.body
app.use(urlencoded({ extended: true }));

// handling API Routes
app.use("/movies", movieRouter);
app.use("/auth", authRouter);

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
