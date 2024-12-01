import BlurIn from "@/components/ui/blur-in";
import { RainbowButton } from "@/components/ui/rainbow-button";
import SparklesText from "@/components/ui/sparkles-text";
import TypingAnimation from "@/components/ui/typing-animation";
import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="h-full my-auto flex flex-col justify-center items-center text-center px-4 py-16 ">
      <div className="max-w-4xl mx-auto space-y-6">
        <SparklesText
          text="PixelPhraser"
          className="text-3xl md:text-5xl font-bold"
        />
        <TypingAnimation
          text="Your Complete Visual Content Toolkit"
          duration={50}
          className="text-2xl md:text-4xl font-semibold text-gray-500 mb-4"
        />
        <div className="max-w-2xl mx-auto">
          <BlurIn
            word="Why settle for just an image when you can have a fully realized creative concept? Our AI generates stunning visuals and crafts engaging captions, taking your content creation to the next level."
            className="text-gray-400 mb-8 font-normal text-base md:text-lg"
          />
        </div>
        <RainbowButton
          onClick={() => {
            navigate("/home");
          }}
        >
          Get Started
        </RainbowButton>
      </div>
    </div>
  );
}

export default Landing;
