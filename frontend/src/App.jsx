import { Link, Outlet } from "react-router-dom";
import "./App.css";
import SparklesText from "./components/ui/sparkles-text";

function App() {
  return (
    <div className="h-screen">
      <div className=" w-full px-6 py-4">
        <Link to={"/"}>
          <SparklesText text="PixelPhraser" className={"md:text-4xl text-xl "}/>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
