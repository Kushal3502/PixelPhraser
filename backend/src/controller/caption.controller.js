import { geminiResponse } from "../utils/gemini.js";
import fs from "fs";

export const generateCaptions = async (req, res) => {
  try {
    const image = req.file;
    const imageBuffer = fs.readFileSync(image.path);
    const base64Image = imageBuffer.toString("base64");

    const prompt = `Generate 5 creative captions for this image for social media with related hashtags using this JSON schema:
            Hashtags = Array<String>
            Caption = { "caption": string, "hashtags": Hashtags }
            Return: Array<Caption>`;

    const inlineData = {
      mimeType: image.mimetype,
      data: base64Image,
    };

    const captions = await geminiResponse(prompt, inlineData);

    // delete the image after successful response
    fs.unlinkSync(image.path);

    res.json({
      success: true,
      captions: captions,
    });
  } catch (error) {
    console.error("Caption generation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate captions",
    });
  }
};
