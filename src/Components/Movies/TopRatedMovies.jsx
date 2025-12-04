import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Logo from "../../assets/logo.png";
import Movie from '../Movie/Movie';

const TopRatedMovies = ({ movies }) => {
  const [topRatedMovies, setTopRatedMovies] = useState(movies);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const topFive = [...movies]
        .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
        .slice(0, 5);

      setTopRatedMovies(topFive);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [movies]);


  return (
    <div className="py-20 px-10 w-full md:max-w-[1440px] mx-auto items-center">
      <h1 className="text-center text-[48px] font-bold text-[#1C75FF]">
        Top Rated Movies
      </h1>
      <p className="text-center text-[20px] font-normal text-[#FFFFFF] leading-8 mt-5">
        Explore All Top Rated Movies on the market.
      </p>
      {loading ? (
        <div className="flex justify-center text-3xl text-black font-bold mt-5">
          <img
            src={Logo}
            alt="Loading Image"
            className="animate-spin"
            height={45}
            width={45}
          />
        </div>
      ) : (
        <div className="card-section grid grid-cols-1 md:grid-cols-5 gap-6 mt-10">
          {topRatedMovies.map((movie) => (
            <Movie key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopRatedMovies;
