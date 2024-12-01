import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";

function Caption() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCaptionGeneration = async (image) => {
    setLoader(true);
    console.log(image);
    try {
      const formData = new FormData();
      formData.append("image", image);

      const captionResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/caption/`,
        formData
      );

      console.log(captionResponse.data);
      setCaptions(captionResponse.data.captions);
    } catch (error) {
      console.error("Error generating captions:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 flex flex-col gap-16 justify-center">
      <h1 className="text-center text-2xl sm:text-3xl mt-10 sm:mt-20">
        Elevate your visuals with smart captions...
      </h1>
      <div className="px-4 sm:px-16 lg:px-32">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            type="file"
            accept="image/*"
            placeholder="Upload your image here..."
            className="bg-gray-200 text-black flex-1"
            onChange={handleImageUpload}
          />
          <Button
            className="bg-indigo-700 hover:bg-indigo-800"
            onClick={() => {
              handleCaptionGeneration(image);
            }}
            disabled={loader || !image}
          >
            {loader ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Please wait
              </>
            ) : (
              "Generate captions"
            )}
          </Button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start px-4 sm:px-16 lg:px-32 gap-8 mt-10">
        <div className="md:h-72 md:w-72 w-56 h-56 bg-zinc-950 rounded-lg overflow-hidden flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="Uploaded preview"
              className="object-cover h-full w-full"
            />
          ) : (
            <span className="text-gray-500">No image uploaded</span>
          )}
        </div>
        <div className="w-full lg:w-2/3 bg-zinc-950 rounded-lg p-6">
          <h2 className="text-gray-300 text-lg font-semibold mb-4">
            Generated Captions
          </h2>
          <p className="text-gray-400">
            {image
              ? "Your generated captions will appear here after processing."
              : "Please upload an image to generate captions."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Caption;
