import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../../Hooks/useAuth";

export default function AddMoviePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState(""); // comma-separated input
  const [rating, setRating] = useState("");
  const [duration, setDuration] = useState("");
  const [plotSummary, setPlotSummary] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Basic validation
  const validate = () => {
    if (!title.trim()) return "Title is required.";
    if (!genre.trim()) return "Genre is required.";
    if (!releaseYear || isNaN(Number(releaseYear)))
      return "Release year is required and must be a number.";
    if (!director.trim()) return "Director is required.";
    if (!cast.trim()) return "Cast is required (comma-separated).";
    if (!rating || isNaN(Number(rating)))
      return "Rating is required and must be a number.";
    if (!duration || isNaN(Number(duration)))
      return "Duration is required and must be a number (minutes).";
    if (!plotSummary.trim()) return "Plot summary is required.";
    if (!posterUrl.trim()) return "Poster URL is required.";
    if (!language.trim()) return "Language is required.";
    if (!country.trim()) return "Country is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const err = validate();
    if (err) {
      setFormError(err);
      return;
    }

    const moviePayload = {
      title: title.trim(),
      genre: genre.trim(),
      releaseYear: Number(releaseYear),
      director: director.trim(),
      cast: cast
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      rating: Number(rating),
      duration: Number(duration),
      plotSummary: plotSummary.trim(),
      posterUrl: posterUrl.trim(),
      language: language.trim(),
      country: country.trim(),
      addedBy: user?.email
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/movies/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(moviePayload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to create movie");
      }

      const created = await res.json();
      console.log('created', created)
      toast.success("Movie added successfully!");
      navigate("/my-collection");
    } catch (err) {
      console.error("Add movie error:", err);
      toast.error(err.message || "Could not add movie");
      setFormError(err.message || "Could not add movie");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setGenre("");
    setReleaseYear("");
    setDirector("");
    setCast("");
    setRating("");
    setDuration("");
    setPlotSummary("");
    setPosterUrl("");
    setLanguage("");
    setCountry("");
    setFormError("");
  };

  return (
    <main className="w-full py-20 px-4 md:px-10 bg-linear-to-b from-black via-gray-900 to-black">
      <div className="max-w-3xl mx-auto bg-[#0b1220] rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold mb-4">Add Movie</h1>
        <p className="text-sm text-gray-300 mb-6">
          Add a new movie to MovieMasterPro. All fields are required.
        </p>

        {formError && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/10 p-3 rounded">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/5"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Genre
              </label>
              <input
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Release Year
              </label>
              <input
                value={releaseYear}
                onChange={(e) => setReleaseYear(e.target.value)}
                type="number"
                className="mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/5"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Director
              </label>
              <input
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Cast (comma separated)
              </label>
              <input
                value={cast}
                onChange={(e) => setCast(e.target.value)}
                placeholder="Leonardo DiCaprio, Joseph Gordon-Levitt, ..."
                className="mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/5"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Rating
              </label>
              <input
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                type="number"
                step="0.1"
                min="0"
                max="10"
                className="mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Duration (mins)
              </label>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                type="number"
                className="mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Language
              </label>
              <input
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Country
            </label>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Poster URL
            </label>
            <input
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
              placeholder="https://..."
              className="mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Plot Summary
            </label>
            <textarea
              value={plotSummary}
              onChange={(e) => setPlotSummary(e.target.value)}
              rows={4}
              className="mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/5"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-linear-to-r from-[#E63A3A] to-[#F25A3C] text-white font-semibold disabled:opacity-60"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  Submitting...
                </span>
              ) : (
                "Add Movie"
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded bg-white/5 text-white"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="ml-auto px-4 py-2 rounded bg-white/10 text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
