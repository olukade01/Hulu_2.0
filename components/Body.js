import Thumbnail from "../components/Thumbnail";
import FlipMove from "react-flip-move";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Body({ results }) {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const scrolls = [
    "fade-right",
    "fade-left",
    "fade-up",
    "fade-down",
    "flip-right",
    "flip-left",
    "flip-up",
    "flip-down",
    "zoom-in-up",
    "zoom-in-right",
    "zoom-in-left",
    "zoom-out-up",
    "zoom-out-right",
    "zoom-out-left",
    "zoom-in-down",
    "zoom-out-down",
  ];
  const random = () => scrolls[Math.floor(Math.random() * scrolls.length)];
  return (
    <FlipMove className="px-5 mb-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
      {results.map((result) => (
        <div
          key={result.id}
          data-aos={random()}
          data-aos-easing="linear"
          data-aos-duration="1500"
          className="hover:z-50"
        >
          {(result.backdrop_path || result.poster_path) && (
            <Thumbnail result={result} />
          )}
        </div>
      ))}
    </FlipMove>
  );
}
export default Body;
