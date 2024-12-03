import { geminiResponse } from "../utils/gemini.js";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    const seed = Math.floor(Math.random() * 10000000);
    const model = "flux";
    const nologo = true;

    const modifiedPrompt = await geminiResponse(
      `${prompt} improve this prompt for image generation`
    );

    console.log(modifiedPrompt);

    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(
      modifiedPrompt.prompt
    )}?seed=${seed}&model=${model}&nologo=${nologo}`;

    await axios.get(imageUrl);
    // const base64Image = Buffer.from(response.data, "binary").toString("base64");

    // console.log(base64Image);

    res.json({
      success: true,
      image: imageUrl,
    });
  } catch (error) {
    console.error("Image generation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate image",
    });
  }
};
