import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;
// const corsOptions = [process.env.CORS || "http://localhost:5173"];

// initialize app
const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  })
);

app.use(express.json());

app.use(express.static("public"));

app.listen(port, () => console.log(`Server is running on PORT :: ${port}`));

// route imports
import captionRouter from "./routes/caption.routes.js";
import imageRouter from "./routes/image.routes.js";

// routes
app.use("/api/v1/caption", captionRouter);
app.use("/api/v1/image", imageRouter);
