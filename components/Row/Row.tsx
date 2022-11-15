import { Movie } from "../../type";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Thumbnail from "../Thumbnail/Thumbnail";
import { useRef, useState } from "react";

interface Props {
  title: string;
  movies: Movie[];
}
const Row = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };
  return (
    <div className=" h-40 space-y-0.5 md:space-y-2">
      <h2 className=" w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] hover:text-white md:text-2xl transition duration-200">
        {title}
      </h2>
      <div className="relative group md:-ml-2">
        <BiChevronLeft
          onClick={() => handleClick("left")}
          className={`absolute top-0 bottom-0 z-40 w-8 h-8 m-auto transition opacity-0 cursor-pointer left-2 group-hover:opacity-100 hover:scale-125 ${
            !isMoved && "hidden"
          }`}
        />
        <div
          ref={rowRef}
          className=" flex scrollbar-hide space-x-0.5 items-center overflow-x-scroll md:space-x-2.5 md:p-2"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <BiChevronRight
          onClick={() => handleClick("right")}
          className="absolute top-0 bottom-0 z-40 w-8 h-8 m-auto transition opacity-0 cursor-pointer right-2 group-hover:opacity-100 hover:scale-125"
        />
      </div>
    </div>
  );
};

export default Row;
