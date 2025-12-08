import React from "react";
import { useNavigate } from "react-router";
import { Star } from "lucide-react";

const Movie = ({ movie }) => {
  const navigate = useNavigate();
  const { _id, title, releaseYear, rating, posterUrl } = movie || {};

  const safeTitle = title || "Untitled movie";
  const detailsPath = `/movie/details/${_id}`;

  const handleCardActivate = (e) => {
    if (e.target.closest("button")) return;
    navigate(detailsPath);
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleCardActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleCardActivate(e);
      }}
      className="block cursor-pointer rounded-lg overflow-hidden bg-white shadow-sm transform transition duration-300 ease-out hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#1C75FF]/30"
      aria-label={`Open details for ${safeTitle}`}
    >
      {/* Poster area — keeps aspect ratio */}
      <div className="relative w-full aspect-2/3 bg-gray-100">
        <img
          src={posterUrl}
          alt={safeTitle}
          className="w-full h-full object-cover object-center select-none"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://via.placeholder.com/400x600?text=No+Image";
          }}
          draggable={false}
        />
        {/* subtle gradient at bottom of image for readability */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-black/50 to-transparent pointer-events-none" />
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="text-[18px] font-semibold text-[#001931] line-clamp-2">
          {safeTitle}
        </h3>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="inline-flex items-center gap-2 rounded px-2 py-1 text-sm font-semibold"
              aria-hidden
            >
              <span className="inline-flex items-center justify-center rounded bg-[#F1F5E8] text-[#00D390] px-2 py-1">
                <Star size={14} />
              </span>
              <span className="text-sm text-gray-700">{rating ?? "—"}</span>
            </div>

            <div className="inline-flex items-center rounded px-2 py-1 text-sm font-semibold bg-[#efe6df] text-[#F25A3C]">
              <span>{releaseYear ?? "—"}</span>
            </div>
          </div>

          {/* Details button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(detailsPath);
            }}
            className="ml-auto rounded-md bg-linear-to-r from-[#1C75FF] to-[#4DA1FF] px-3 py-1 text-sm font-semibold text-white shadow-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#1C75FF]/50"
            aria-label={`View details for ${safeTitle}`}
          >
            Details
          </button>
        </div>
      </div>
    </article>
  );
};

export default Movie;
