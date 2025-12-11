import React, { useEffect, useState, useRef } from "react";
import Logo from "../../assets/logo.png";
import Movie from "../../Components/Movie/Movie";

const AVAILABLE_GENRES = [
  "Action",
  "Animation",
  "Drama",
  "Crime",
  "Sci-Fi",
  "Thriller",
  "Biography",
  "Fantasy",
];

export default function AllMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // filter states
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");

  const debounceRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    async function fetchMovies(queryString = "") {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `http://localhost:3000/api/movies${queryString}`
        );
        if (!res.ok) throw new Error("Failed to load movies");
        const data = await res.json();
        if (mounted) {
          setMovies(Array.isArray(data.data) ? data.data : []);
        }
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message || "Something went wrong");
      } finally {
        if (mounted) setLoading(false);
      }
    }


    function buildQueryString() {
      const params = new URLSearchParams();
      if (selectedGenres.length) {
        params.set("genres", selectedGenres.join(","));
      }
      if (minRating !== "") params.set("minRating", minRating);
      if (maxRating !== "") params.set("maxRating", maxRating);
      const q = params.toString();
      return q ? `?${q}` : "";
    }


    const qs = buildQueryString();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchMovies(qs);
    }, 300);

    return () => {
      mounted = false;
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [selectedGenres, minRating, maxRating]);

  function toggleGenre(genre) {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  }

  function clearFilters() {
    setSelectedGenres([]);
    setMinRating("");
    setMaxRating("");
  }

  return (
    <main className="w-full py-20 px-4 md:px-10 bg-linear-to-b from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">All Movies</h1>

        {/* Filters */}
        <div className="mb-6 p-4 bg-gray-900 rounded-lg">
          <div className="mb-3">
            <h3 className="font-semibold mb-2 text-gray-200">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_GENRES.map((g) => (
                <label
                  key={g}
                  className={`cursor-pointer px-3 py-1 rounded-full border ${
                    selectedGenres.includes(g)
                      ? "bg-gray-200 text-black border-gray-200"
                      : "text-gray-300 border-gray-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedGenres.includes(g)}
                    onChange={() => toggleGenre(g)}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <h3 className="font-semibold mb-2 text-gray-200">Rating range</h3>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                placeholder="Min (e.g. 6)"
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="px-3 py-1 rounded border bg-gray-800 text-gray-200"
              />
              <span className="text-gray-400">—</span>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                placeholder="Max (e.g. 9)"
                value={maxRating}
                onChange={(e) => setMaxRating(e.target.value)}
                className="px-3 py-1 rounded border bg-gray-800 text-gray-200"
              />
              <button
                onClick={clearFilters}
                className="ml-4 px-3 py-1 rounded bg-red-600 text-white"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <img src={Logo} alt="Loading" className="w-12 h-12 animate-spin" />
          </div>
        ) : error ? (
          <div className="py-8 text-center text-red-400">{error}</div>
        ) : movies.length === 0 ? (
          <div className="py-8 text-center text-gray-300">
            No movies available.
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <Movie key={movie._id || movie.id} movie={movie} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
