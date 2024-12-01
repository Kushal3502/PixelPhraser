import React, { useState } from "react";
import { Button } from "./ui/button";

function CaptionCard({ caption }) {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    if (caption?.caption) {
      navigator.clipboard.writeText(caption.caption).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="bg-gray-800 text-gray-300 mb-6 rounded-lg p-6 shadow-lg flex flex-col gap-4 sm:flex-row sm:justify-between">
      <div className="flex-1">
        <p className=" text-white mb-4 sm:mb-2 text-justify">
          {caption?.caption || "No caption available."}
        </p>
        {caption?.hashtags?.length > 0 && (
          <div>
            <p className="text-sm mb-2">Hashtags:</p>
            <div className="flex flex-wrap gap-2">
              {caption.hashtags.map((item, index) => (
                <span
                  key={index}
                  className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full"
                >
                  #{item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center sm:items-start">
        <Button
          onClick={handleCopyToClipboard}
          className="bg-indigo-600 text-white px-3 py-1 text-sm rounded-lg hover:bg-indigo-700 transition"
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
}

export default CaptionCard;
