import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { Download, Loader2 } from "lucide-react";

function Image() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loader, setLoader] = useState(false);

  const handleImageGeneration = async (prompt) => {
    setLoader(true);
    setImageUrl("");

    try {
      const imageResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/image/`,
        { prompt },
        { withCredentials: true }
      );

      // console.log(imageResponse.data);
      setImageUrl(imageResponse.data.image);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.target = "_blank";
      link.download = "generated-image.jpg";
      link.click();
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 flex flex-col gap-16 justify-center">
      <h1 className="text-center text-2xl sm:text-3xl mt-10 sm:mt-20">
        Transform words into stunning images...
      </h1>
      <div className="px-4 sm:px-16 lg:px-32">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            value={prompt}
            placeholder="Enter your prompt here..."
            className="bg-gray-200 text-black flex-1"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            className="bg-indigo-700 hover:bg-indigo-800"
            onClick={() => handleImageGeneration(prompt)}
            disabled={loader || !prompt?.trim()}
          >
            {loader ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Please wait
              </>
            ) : (
              "Generate image"
            )}
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="h-72 sm:h-96 w-full max-w-xs sm:max-w-md bg-zinc-950 rounded-lg flex justify-center items-center overflow-hidden">
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
        {imageUrl && (
          <Button
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 flex items-center px-4 py-2 rounded"
            onClick={handleDownload}
          >
            <Download className="mr-2" />
            Download Image
          </Button>
        )}
      </div>
    </div>
  );
}

export default Image;
