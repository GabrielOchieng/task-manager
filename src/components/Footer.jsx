import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedinIn } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { IoMdArrowDropupCircle } from "react-icons/io";

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="absolute right-5 top-[-20px]">
        <button
          className="text-gray-700 hover:text-cyan-500 focus:outline-none"
          onClick={handleScrollToTop}
        >
          <IoMdArrowDropupCircle className="text-5xl" />
        </button>
      </div>

      <div className="bg-cyan-200 flex flex-col items-center py-6 sm:py-4">
        <p className="text-sm">Copyright &copy; THEGABRIELSHOW 2024</p>
        <nav className="flex justify-center mt-2 space-x-4">
          <Link
            to="https://www.linkedin.com/in/gabrielochieng"
            target="_blank"
            className="text-gray-700 hover:text-cyan-500 "
          >
            <FaLinkedinIn />
          </Link>
          <Link
            to="https://x.com/TechieGabriel?t=D8iyVIeZnEVOlPdImbJ2HQ&s=09"
            target="_blank"
            className="text-gray-700 hover:text-cyan-500 "
          >
            <FaSquareXTwitter />
          </Link>
          <Link
            to="https://github.com/GabrielOchieng"
            target="_blank"
            className="text-gray-700 hover:text-cyan-500 "
          >
            <FaGithubSquare />
          </Link>
        </nav>
        <p className="text-xs mt-2">All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
