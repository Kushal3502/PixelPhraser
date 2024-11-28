import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import { generateCaptions } from "../controller/caption.controller.js";

const router = Router();

router.route("/").post(upload.single("image"), generateCaptions);

export default router;
