import { GoogleGenerativeAI } from "@google/generative-ai";

export const geminiResponse = async (
  prompt = "Generate a random prompt for image generation",
  inlineData = {}
) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const parts = [{ text: prompt }];

  // if inlinedata is provided -->
  if (inlineData && Object.keys(inlineData).length > 0) {
    parts.push({ inlineData });
  }

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts,
      },
    ],
  });

  return JSON.parse(result.response.candidates[0].content.parts[0].text);
};
