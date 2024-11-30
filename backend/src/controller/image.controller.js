import { geminiResponse } from "../utils/gemini.js";

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
