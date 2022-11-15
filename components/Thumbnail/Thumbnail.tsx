import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../../Atom/modalAtom";
const Thumbnail = ({ movie }: any) => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  return (
    <div
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
      className=" relative cursor-pointer h-28 min-w-[180px] transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="object-cover rounded-sm md:rounded"
        layout="fill"
        alt=""
      />
    </div>
  );
};

export default Thumbnail;
