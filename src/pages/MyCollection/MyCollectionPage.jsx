import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import Logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { PencilOff, Trash } from "lucide-react";

const API_BASE = "http://localhost:3000/api/movies";

export default function MyCollectionPage() {
  const { user, getToken } = useAuth();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Fetch user's collection using your backend endpoint
  useEffect(() => {
    let mounted = true;
    const fetchCollection = async () => {
      if (!user?.email) {
        setMovies([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      try {
        console.log('user.email', user.email)
        const res = await fetch(
          `${API_BASE}/my-collection/${encodeURIComponent(user.email)}`
        );
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || "Failed to load collection");
        }
        const data = await res.json();
        if (mounted) setMovies(Array.isArray(data) ? data : []);
      } catch (err) {
        if (mounted) setError(err.message || "Could not load collection");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCollection();
    return () => {
      mounted = false;
    };
  }, [user?.email]);

  // Delete handler (calls protected DELETE /api/movies/:id)
  const handleDelete = useCallback(
    async (id, title) => {
      const ok = window.confirm(`Delete "${title}"? This cannot be undone.`);
      if (!ok) return;

      try {
        setDeletingId(id);

        const headers = { "Content-Type": "application/json" };
        if (typeof getToken === "function") {
          const token = await getToken();
          if (token) headers.Authorization = `Bearer ${token}`;
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
        setMovies((prev) => prev.filter((m) => m._id !== id));
      } catch (err) {
        toast.error(err.message || "Could not delete movie");
      } finally {
        setDeletingId(null);
      }
    },
    [getToken]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <img src={Logo} alt="Loading" className="animate-spin w-12 h-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black px-4">
        <p className="text-xl">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-20 md:px-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">My Collection</h1>

      {movies.length === 0 ? (
        <p className="text-gray-400">You have no movies in your collection.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => {
            const isOwner = user?.email === movie?.addedBy;
            return (
              <div
                key={movie._id}
                className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg group"
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-lg font-semibold">{movie.title}</h2>
                  <p className="text-gray-400 text-sm">
                    Genre:{" "}
                    {movie.genre || (movie.genres && movie.genres.join(", "))} |
                    Rating: {movie.rating}
                  </p>
                </div>

                {isOwner && (
                  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() =>
                        navigate(`/movie/edit/${movie._id}`, {
                          state: { movie },
                        })
                      }
                      className="px-2 py-1 text-sm bg-blue-600 rounded hover:bg-blue-700 flex items-center gap-1"
                    >
                      <PencilOff size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(movie._id, movie.title)}
                      disabled={deletingId === movie._id}
                      className="px-2 py-1 text-sm bg-red-600 rounded hover:bg-red-700 flex items-center gap-1 disabled:opacity-50"
                    >
                      <Trash size={14} />
                      {deletingId === movie._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
