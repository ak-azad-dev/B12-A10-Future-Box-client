import React from 'react'
import { Link } from 'react-router';
import Error404 from "../../assets/404.png";
import { Undo2, Search } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0B0D17] px-5 md:px-10 py-20">
      <div className="flex flex-col md:flex-row items-center md:justify-between w-full max-w-[1440px] gap-10">
        {/* Left: Image */}
        <div className="shrink-0">
          <img
            src={Error404}
            alt="Error 404 Page Illustration"
            className="w-full max-w-[500px] h-auto"
          />
        </div>

        {/* Right: Text & Buttons */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start">
          <h1 className="text-[48px] md:text-[56px] font-bold leading-[60px] text-white">
            Oops! Page not found
          </h1>
          <p className="text-[20px] md:text-[22px] font-normal leading-8 text-[#627382] mt-3">
            Looks like you’ve wandered off the map. The page you’re looking for
            might have moved or never existed.
          </p>

          {/* Optional Tip */}
          <p className="text-[#A0B0C0] mt-2 text-sm md:text-base">
            Try going back home or visit our{" "}
            <Link to="/help" className="underline hover:text-white">
              Help Center
            </Link>
            .
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-6 flex-wrap justify-center md:justify-start">
            <Link to="/">
              <button className="flex items-center gap-2.5 px-5 py-3 rounded-lg bg-linear-to-r from-[#E63A3A] to-[#F25A3C] text-white font-semibold shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                <Undo2 className="w-5 h-5" />
                Go Back Home
              </button>
            </Link>
            <Link to="/search">
              <button className="flex items-center gap-2.5 px-5 py-3 rounded-lg bg-[#1C6DD0] text-white font-semibold shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                <Search className="w-5 h-5" />
                Search Movies
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
