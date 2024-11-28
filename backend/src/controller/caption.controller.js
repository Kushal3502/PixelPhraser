import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

export const generateCaptions = async (req, res) => {
  try {
    const image = req.file;
    // Read file as base64
    const imageBuffer = fs.readFileSync(image.path);
    const base64Image = imageBuffer.toString("base64");

    // setup gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `Generate 5 creative captions for this image for social media with related hashtags using this JSON schema:
            Hashtags = Array<String>
            Caption = { "caption": string, "hashtags": Hashtags }
            Return: Array<Caption>`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: image.mimetype,
                data: base64Image,
              },
            },
          ],
        },
      ],
    });

    // delete the image after successful response
    fs.unlinkSync(image.path);

    // convert the response to JSON
    const captions = JSON.parse(
      result.response.candidates[0].content.parts[0].text
    );

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
