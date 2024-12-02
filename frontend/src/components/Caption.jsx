import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { CaptionCard } from ".";
import { Skeleton } from "./ui/skeleton";

function Caption() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCaptionGeneration = async (image) => {
    setLoader(true);
    try {
      setCaptions([]);
      const formData = new FormData();
      formData.append("image", image);

      const captionResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/caption/`,
        formData,
        { withCredentials: true }
      );

      setCaptions(captionResponse.data.captions);
    } catch (error) {
      console.error("Error generating captions:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 sm:p-6 flex flex-col gap-12 md:gap-12 justify-center">
      <h1 className="text-center text-xl sm:text-2xl md:text-3xl text-white mt-6 sm:mt-10">
        Elevate your visuals with smart captions...
      </h1>
      <div className="px-4 md:px-20 lg:px-32">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            type="file"
            accept="image/*"
            placeholder="Upload your image here..."
            className="bg-gray-200 text-black flex-1"
            onChange={handleImageUpload}
          />
          <Button
            className={`bg-indigo-700 hover:bg-indigo-800 ${
              loader || !image ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handleCaptionGeneration(image)}
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
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 px-4 sm:px-8 md:px-16 lg:px-32 mt-8 sm:mt-10">
        <div className="max-w-full md:max-w-md w-full lg:w-1/3 bg-zinc-950 rounded-lg overflow-hidden flex items-center justify-center aspect-square">
          {preview ? (
            <img
              src={preview}
              alt="Uploaded preview"
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-gray-500 text-center">No image uploaded</span>
          )}
        </div>
        <div className="w-full lg:w-2/3 bg-zinc-950 rounded-lg p-4 md:p-6">
          <h2 className="text-gray-300 text-base md:text-lg font-semibold mb-4">
            Generated Captions
          </h2>
          {captions.length > 0 &&
            captions.map((item, index) => (
              <CaptionCard key={index} caption={item} />
            ))}
          {loader ? (
            <div className="bg-gray-800 text-gray-300 mb-6 rounded-lg p-6 shadow-lg flex flex-col gap-4 sm:flex-row sm:justify-between">
              <div className="flex-1 space-y-4">
                <Skeleton className="h-5 w-full sm:w-3/4 bg-gray-600 rounded" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20 bg-gray-600 rounded" />
                  <div className="flex flex-wrap gap-2">
                    {Array(3)
                      .fill("")
                      .map((_, index) => (
                        <Skeleton
                          key={index}
                          className="h-6 w-16 bg-gray-600 rounded-full"
                        />
                      ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center sm:items-start">
                <Skeleton className="h-8 w-24 bg-indigo-600 rounded-lg" />
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No captions generated yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Caption;
