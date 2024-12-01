import { Link, Outlet } from "react-router-dom";
import "./App.css";
import SparklesText from "./components/ui/sparkles-text";

function App() {
  return (
    <div className="h-screen flex flex-col ">
      <div className=" w-full px-6 py-4 h-16 flex items-center">
        <Link to={"/"}>
          <SparklesText
            text="PixelPhraser"
            className={"md:text-3xl text-xl "}
          />
        </Link>
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
