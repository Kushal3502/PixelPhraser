import Marquee from "./ui/marquee";
import { images } from "@/config/images";

const firstRow = images.slice(0, images.length / 2);
const secondRow = images.slice(images.length / 2);

function ImageCard({ url }) {
  return (
    <div className="relative flex-shrink-0 w-64 h-48 md:w-80 md:h-60 lg:w-96 lg:h-72 mx-4">
      <img
        src={url}
        alt="Card"
        className="h-full w-full object-cover rounded-lg "
      />
    </div>
  );
}

function Slider() {
  return (
    <div className="absolute inset-0 z-0 opacity-15 top-0 lg:top-0 flex items-center">
      <div className="relative flex h-full max-w-7xl flex-col items-center justify-center overflow-hidden rounded-lg shadow-xl mx-auto">
        <Marquee className="[--duration:70s] mb-8 flex gap-4">
          {firstRow.map((item, index) => (
            <ImageCard key={index} url={item} />
          ))}
        </Marquee>
        <Marquee reverse className="[--duration:70s] flex gap-4">
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
