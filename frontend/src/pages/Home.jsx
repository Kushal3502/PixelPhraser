import { CaptionComponent, ImageComponent } from "@/components";
import { Button } from "@/components/ui/button";
import { Image, Text } from "lucide-react";
import React, { useState } from "react";

function Home() {
  const [activeTab, setActiveTab] = useState("image");

  return (
    <div className="h-full">
      <div className="flex flex-col md:flex-row w-full mx-auto">
        <div className="p-4 w-full md:w-64 ">
          <div className="flex md:flex-col flex-row gap-4 w-full">
            <Button
              onClick={() => setActiveTab("image")}
              className={`flex items-center justify-center gap-2 w-full px-4 py-2 rounded transition-colors duration-300 ${
                activeTab === "image"
                  ? "bg-gray-200 text-black"
                  : "text-gray-400 hover:bg-gray-600 hover:text-white"
              }`}
            >
              <Image className="w-5 h-5" />
              <span>Generate Image</span>
            </Button>
            <Button
              onClick={() => setActiveTab("caption")}
              className={`flex items-center justify-center gap-2 w-full px-4 py-2 rounded transition-colors duration-300 ${
                activeTab === "caption"
                  ? "bg-gray-200 text-black"
                  : "text-gray-400 hover:bg-gray-600 hover:text-white"
              }`}
            >
              <Text className="w-5 h-5" />
              <span>Generate Caption</span>
            </Button>
          </div>
        </div>
        <div className="flex-grow p-4 md:p-6">
          {activeTab === "image" && (
            <div className="rounded-lg p-2 md:p-6 text-white">
              <ImageComponent />
            </div>
          )}
          {activeTab === "caption" && (
            <div className="rounded-lg p-2 md:p-6 text-white">
              <CaptionComponent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
