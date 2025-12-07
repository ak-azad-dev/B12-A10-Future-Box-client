import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Logo from "../../assets/logo.png"; // loading spinner

const MovieDetailsPage = () => {
  const { id } = useParams();
  console.log('id', id)
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/movies/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#06070a] via-[#071226] to-[#0b1020]">
        <img src={Logo} alt="Loading" className="animate-spin w-12 h-12" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-[#06070a] via-[#071226] to-[#0b1020] text-white">
        <p className="text-xl">{error || "Movie details not found"}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-[#1C75FF] rounded hover:bg-[#4DA1FF]"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#06070a] via-[#071226] to-[#0b1020] text-white px-4 py-20 md:px-20">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-[#1C75FF] rounded hover:bg-[#4DA1FF] font-semibold"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-10 bg-[#0b1020] p-6 md:p-10 rounded-2xl shadow-xl">
        {/* Poster */}
        <div className="md:w-1/3 flex justify-center">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="rounded-xl w-full object-cover shadow-lg"
          />
        </div>

        {/* Movie Info */}
        <div className="md:w-2/3 flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <span>
              <strong>Genre:</strong> {movie.genre}
            </span>
            <span>
              <strong>Release Year:</strong> {movie.releaseYear}
            </span>
            <span>
              <strong>Duration:</strong> {movie.duration} mins
            </span>
            <span>
              <strong>Language:</strong> {movie.language}
            </span>
            <span>
              <strong>Country:</strong> {movie.country}
            </span>
            <span>
              <strong>Rating:</strong> {movie.rating}/10
            </span>
            <span>
              <strong>Added By:</strong> {movie.addedBy}
            </span>
          </div>

          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Director</h2>
            <p className="text-gray-300">{movie.director}</p>
          </div>

          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Cast</h2>
            <p className="text-gray-300">{movie.cast.join(", ")}</p>
          </div>

          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Plot Summary</h2>
            <p className="text-gray-300">{movie.plotSummary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
