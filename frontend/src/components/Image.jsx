import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";

function Image() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loader, setLoader] = useState(false);

  const handleImageGeneration = async (prompt) => {
    console.log(prompt);
    setLoader(true);

    try {
      const imageResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/image/`,
        { prompt }
      );

      console.log(imageResponse.data);
      setImageUrl(imageResponse.data.image);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoader(false); // Remove the timeout for immediate effect
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 flex flex-col gap-16 justify-center ">
      <h1 className="text-center text-3xl mt-20">
        Transform words into stunning images...
      </h1>
      <div>
        <div className="flex gap-4 mx-32">
          <Input
            placeholder="Enter your prompt here..."
            className="bg-gray-200 text-black"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            className="bg-indigo-700 hover:bg-indigo-800"
            onClick={() => handleImageGeneration(prompt)}
            disabled={loader}
          >
            Generate image
          </Button>
        </div>
      </div>
      <div className="h-96 w-96 bg-zinc-950 rounded-lg flex justify-center items-center mx-auto mb-12 overflow-hidden">
        {loader ? (
          <img
            src="/loader.gif"
            className="h-full w-full"
            alt="Generating image..."
          />
        ) : imageUrl ? (
          <img
            src={imageUrl}
            className="object-cover h-full w-full"
            alt="Generated image"
          />
        ) : (
          <p className="text-gray-500 text-center">Here is your image</p>
        )}
      </div>
    </div>
  );
}

export default Image;
