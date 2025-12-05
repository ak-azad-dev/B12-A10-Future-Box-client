import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Logo from "../../assets/logo.png";
import Movie from '../Movie/Movie';

const RecentlyAddedMovies = ({ movies }) => {
  const [recentlyAddedMovies, setRecentlyAddedMovies] = useState(movies);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const latestSix = [...movies]
        .sort((a, b) => {
          const dateA = new Date(parseInt(a._id.substring(0, 8), 16) * 1000);
          const dateB = new Date(parseInt(b._id.substring(0, 8), 16) * 1000);
          return dateB - dateA; // newest first
        })
        .slice(0, 6); // take latest 6

      setRecentlyAddedMovies(latestSix);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [movies]);


  return (
    <div className="py-20 px-10 w-full md:max-w-[1440px] mx-auto items-center">
      <h1 className="text-center text-[48px] font-bold text-[#1C75FF]">
        Recently Added Movies
      </h1>
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
        <div className="card-section grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
          {recentlyAddedMovies.map((movie) => (
            <Movie key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyAddedMovies;
