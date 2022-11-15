import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineBell, AiOutlineSearch } from "react-icons/ai";
import useAuth from "../../Hooks/useAuth";

const Header = () => {
  const { logout } = useAuth();
  const [isScroll, setIsScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScroll && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="object-contain cursor-pointer"
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="navLink">Home</li>
          <li className="navLink">Tv Shows</li>
          <li className="navLink">Movies</li>
          <li className="navLink">New & Popular</li>
          <li className="navLink">My List</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light text-white">
        <AiOutlineSearch className="hidden w-8 h-8 sm:inline" />
        <p className="hidden lg:inline">kids</p>
        <AiOutlineBell className="w-8 h-8 " />
        {/* <Link href="/account"> */}
        <img
          src="https://rb.gy/g1pwyx"
          alt=""
          className="rounded cursor-pointer"
          onClick={logout}
        />
        {/* </Link> */}
      </div>
    </header>
  );
};

export default Header;
