import express from "express";
import movieRouter from "./Routes/movieRouter.js";
import { config } from "dotenv";
import { connectDB, disconnectDB, prisma } from "../config/db.js";
const app = express();
const PORT = 8080;

config();
connectDB();

app.use("/movies", movieRouter);

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
