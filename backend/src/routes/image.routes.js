import { Router } from "express";
import { generateImage } from "../controller/image.controller.js";

const router = Router();

router.route("/").post(generateImage);

export default router;
