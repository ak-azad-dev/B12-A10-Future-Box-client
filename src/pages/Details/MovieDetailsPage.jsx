import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import Logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { ChevronLeft, PencilOff, Trash } from "lucide-react";

const API_BASE = "http://localhost:3000/api/movies";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, getToken } = useAuth();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Fetch movie
  useEffect(() => {
    let mounted = true;
    const fetchMovie = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/${id}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || "Failed to fetch movie details");
        }
        const data = await res.json();
        if (mounted) setMovie(data);
      } catch (err) {
        if (mounted) setError(err.message || "Failed to load movie");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchMovie();
    return () => {
      mounted = false;
    };
  }, [id]);

  const isOwner = user?.email === movie?.addedBy;

  // Delete handler
  const handleDelete = useCallback(async () => {
    if (!movie) return;
    const ok = window.confirm(
      `Delete "${movie.title}"? This cannot be undone.`
    );
    if (!ok) return;

    try {
      setDeleting(true);

      const headers = { "Content-Type": "application/json" };
      if (typeof getToken === "function") {
        const token = await getToken(); 
        if (token) headers.Authorization = `Bearer ${token}`;
      } else if (user?.accessToken) {
        headers.Authorization = `Bearer ${user.accessToken}`;
      }

      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to delete movie");
      }

      toast.success("Movie deleted");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Delete failed", err);
      toast.error(err.message || "Could not delete movie");
    } finally {
      setDeleting(false);
    }
  }, [id, movie, navigate, getToken, user]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <img src={Logo} alt="Loading" className="animate-spin w-12 h-12" />
      </div>
    );
  }

  // Error / not found
  if (error || !movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-[#06070a] px-4">
        <p className="text-xl">{error || "Movie not found"}</p>
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 rounded"
          >
            Go Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-700 rounded"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  // Render details
  return (
    <div className="min-h-screen bg-[#06070a] text-white px-4 py-20 md:px-20">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-2 bg-blue-600 rounded font-semibold flex items-center gap-2"
        >
          <ChevronLeft />
          Back
        </button>

        {isOwner ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                navigate(`/movie/edit/${movie._id}`, { state: { movie } })
              }
              className="px-3 py-2 rounded bg-yellow-500 text-white font-semibold flex items-center gap-2"
            >
              <PencilOff />
              Edit
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-3 py-2 rounded bg-linear-to-r from-[#E63A3A] to-[#F25A3C] text-white font-semibold disabled:opacity-50 flex items-center gap-2"
            >
              <Trash />
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        ) : (
          <div />
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-10 bg-[#0b1020] p-6 md:p-10 rounded-2xl shadow-xl">
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
              <strong>Year:</strong> {movie.releaseYear}
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
              <strong>Rating:</strong> {movie.rating}
            </span>
            <span>
              <strong>Added By:</strong> {movie.addedBy}
            </span>
          </div>

          <h2 className="text-2xl font-semibold">Director</h2>
          <p className="text-gray-300">{movie.director}</p>

          <h2 className="text-2xl font-semibold mt-4">Cast</h2>
          <p className="text-gray-300">
            {Array.isArray(movie.cast) ? movie.cast.join(", ") : movie.cast}
          </p>

          <h2 className="text-2xl font-semibold mt-4">Plot Summary</h2>
          <p className="text-gray-300">{movie.plotSummary}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
