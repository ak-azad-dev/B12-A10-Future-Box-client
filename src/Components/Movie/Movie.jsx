import React from "react";
import { Star } from "lucide-react";
import { NavLink } from "react-router";

const Movie = ({ movie }) => {
  const { _id, title, releaseYear, rating, posterUrl } = movie;

  return (
    <NavLink to={`/game/details/${_id}`} className="block">
      <div className="card bg-white shadow-sm rounded-sm transition duration-300 ease-out transform hover:scale-105">
        <figure className="p-4">
          <img
            src={posterUrl}
            alt={title || "Movie cover"}
            className="rounded-lg object-contain w-full"
            loading="lazy"
            height={350}
            width={400}
          />
        </figure>

        <div className="card-body pt-0 pb-4">
          <h3 className="text-[20px] font-medium text-[#001931]">{title}</h3>

          <div className="card-actions justify-between mt-4 items-center">
            <div className="badge bg-[#F1F5E8] border-none text-[#00D390] text-base font-medium rounded-sm px-2.5 py-2 flex items-center gap-2">
              <Star />
              <span>{rating}</span>
            </div>

            <div className="badge bg-[#efdeda] border-none text-[#F25A3C] text-base font-medium rounded-sm px-2.5 py-2 flex items-center gap-2">
              <span>{releaseYear}</span>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Movie;
