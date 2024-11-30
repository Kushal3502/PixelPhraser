import { CaptionComponent, ImageComponent } from "@/components";
import { Button } from "@/components/ui/button";
import { Image, Text } from "lucide-react";
import React, { useState } from "react";

function Home() {
  const [activeTab, setActiveTab] = useState("image");

  return (
    <div className="flex h-full ">
      <div className="flex md:flex-row flex-col w-full mx-auto">
        <div className="mt-12 p-4 w-64">
          <div className="flex md:flex-col gap-4 w-full">
            <Button
              onClick={() => setActiveTab("image")}
              className={`w-full text-center px-4 py-2 rounded transition-colors duration-300 ${
                activeTab === "image"
                  ? "bg-gray-500 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Image />
              Generate Image
            </Button>
            <Button
              onClick={() => setActiveTab("caption")}
              className={`w-full px-4 py-2 rounded transition-colors duration-300 ${
                activeTab === "caption"
                  ? "bg-gray-500 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Text />
              Generate Caption
            </Button>
          </div>
        </div>
        <div className="flex-grow p-6 ">
          {activeTab === "image" && (
            <div className=" rounded-lg p-6 text-white overflow-hidden ">
              <ImageComponent />
            </div>
          )}
          {activeTab === "caption" && (
            <div className=" rounded-lg p-6 text-white">
              <CaptionComponent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
