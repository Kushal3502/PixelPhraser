import Marquee from "./ui/marquee";
import { images } from "@/config/images";

const firstRow = images.slice(0, images.length / 2);
const secondRow = images.slice(images.length / 2);

function ImageCard({ url }) {
  return (
    <div className="md:w-96 md:h-80 w-80 h-64 mx-4">
      <img src={url} className="h-full w-full object-cover rounded-lg shadow-lg" />
    </div>
  );
}

function Slider() {
  return (
    <div className="absolute inset-0 z-0 opacity-15 top-4 lg:top-16">
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg shadow-xl">
        <Marquee className="[--duration:70s] mb-8 overflow-hidden">
          {firstRow.map((item, index) => (
            <ImageCard key={index} url={item} />
          ))}
        </Marquee>
        <Marquee reverse className="[--duration:70s]">
          {secondRow.map((item, index) => (
            <ImageCard key={index} url={item} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gray-950 dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gray-950 dark:from-background"></div>
      </div>
    </div>
  );
}

export default Slider;
