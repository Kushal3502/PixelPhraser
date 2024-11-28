import express from "express";
import cors from "cors";

// initialize app
const app = express();

// middlewares
app.use(
  cors({
    origin: [process.env.CORS || "http://localhost:5173"],
    credentials: true,
  })
);
