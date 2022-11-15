import React, { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../Atom/modalAtom";
import { AiOutlineClose, AiOutlinePlusCircle } from "react-icons/ai";
import { Element, Genre, Movie } from "../type";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";
import { BsVolumeDown, BsVolumeMute } from "react-icons/bs";

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);
  const [addedToList, setAddedToList] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err.massage));
      if (data.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  return (
    <MuiModal
      className="fixed left-0 right-0 w-full max-w-5xl mx-auto overflow-hidden overflow-y-scroll rounded-md top-7 scrollbar-hide"
      open={showModal}
      onClose={handleClose}
    >
      <>
        <button
          className="modalButton absolute top-5 right-5 !z-40 h-9 w-9 border-none bg-[#181818]"
          onClick={handleClose}
        >
          <AiOutlineClose className="w-8 h-8 " />
        </button>
        <div className=" relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div className="absolute flex items-center justify-between w-full px-10 bottom-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="text-black h-7 w-7" />
                Play
              </button>
              <button className="modalButton">
                {addedToList ? (
                  <AiOutlineCheckCircle className="h-7 w-7" />
                ) : (
                  <AiOutlinePlusCircle className="h-7 w-7" />
                )}
              </button>
              <button className="modalButton">
                <FiThumbsUp className="w-6 h-6" />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <BsVolumeDown className="w-6 h-6" />
              ) : (
                <BsVolumeMute className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        <div className=" bg-[#181818] rounded-b-md px-10 py-8 space-x-16 flex">
          <div className="space-y-6 text-lg ">
            <div className="flex items-end space-x-2 text-sm ">
              <p className="font-semibold text-green-400 ">
                {movie?.vote_average * 10}%match
              </p>
              <p className="font-light ">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex items-center justify-center h-4 text-sm border rounded  border-white/40 px-1.5">
                HD
              </div>
            </div>
            <div className="flex flex-col font-light  gap-x-10 gap-y-4 md:flex-row">
              <p className="w-5/6 ">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm ">
                <div>
                  <span className=" text-[gray]">Genres:</span>
                  {genres.map((genre) => genre.name).join(", ")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
