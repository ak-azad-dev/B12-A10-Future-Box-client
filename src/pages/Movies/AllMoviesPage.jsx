import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import Movie from "../../Components/Movie/Movie";

export default function AllMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function fetchMovies() {
      try {
        const res = await fetch(`http://localhost:3000/api/movies`);
        if (!res.ok) throw new Error("Failed to load movies");
        const data = await res.json();

        if (mounted) {
          // expect data to be an array
          setMovies(data.data);
        }
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message || "Something went wrong");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchMovies();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="w-full py-20 px-4 md:px-10 bg-linear-to-b from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">All Movies</h1>

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
