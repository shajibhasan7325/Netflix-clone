import { match } from "assert";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Movie } from "../../type";
import { baseUrl } from "../../constanc/Movie";
import { FaPlay } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../../Atom/modalAtom";
interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 ">
      <div className=" absolute top-0 left-0 h-[95vh] w-screen -z-10">
        <Image
          objectFit="cover"
          layout="fill"
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt=""
        />
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl ">
        {movie?.overview}
      </p>

      <div className="flex space-x-3 ">
        <button className="text-black bg-white bannerButton">
          <FaPlay className="w-4 h-4 text-black md:w-8 md:h-8" /> Play
        </button>
        <button
          className="bannerButton bg-[gray]"
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true);
          }}
        >
          More Info{" "}
          <HiInformationCircle className="w-4 h-4 bg-[gray]  md:w-8 md:h-8" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
