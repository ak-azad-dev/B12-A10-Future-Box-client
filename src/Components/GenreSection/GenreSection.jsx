import React from "react";
import { Link } from "react-router";

const genres = [
  "Action",
  "Drama",
  "Comedy",
  "Adventure",
  "Sci-Fi",
  "Romance",
  "Horror",
  "Thriller",
  "Animation",
  "Fantasy",
  "Mystery",
  "Documentary",
];

export const GenreSection = () => {
  return (
    <section className="w-full py-10 px-4 md:px-10 bg-linear-to-b from-[#06070a] via-[#071226] to-[#0b1020]">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 mx-auto text-center">
        Browse by <span className="text-[#4DA1FF]">Genre</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {genres.map((genre, index) => (
          <Link
            key={index}
            to={`/genre/${genre.toLowerCase()}`}
            className="rounded-lg bg-linear-to-r from-[#1C75FF] to-[#4DA1FF]
                       text-white py-3 text-center font-semibold
                       transition-transform duration-300 hover:scale-105
                       cursor-pointer shadow-lg shadow-black/20"
          >
            {genre}
          </Link>
        ))}
      </div>
    </section>
  );
};
