import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Logo from "../../assets/logo.png";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";

export default function UpdateMoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // form state
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState("");
  const [rating, setRating] = useState("");
  const [duration, setDuration] = useState("");
  const [plotSummary, setPlotSummary] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [addedBy, setAddedBy] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [fetchError, setFetchError] = useState("");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);

        const res = await axiosSecure.get(`/api/movies/${id}`);
        const movie = res.data?.data || res.data;

        if (!mounted) return;

        setTitle(movie.title || "");
        setGenre(movie.genre || "");
        setReleaseYear(movie.releaseYear ?? "");
        setDirector(movie.director || "");
        setCast(
          Array.isArray(movie.cast) ? movie.cast.join(", ") : movie.cast || ""
        );
        setRating(movie.rating ?? "");
        setDuration(movie.duration ?? "");
        setPlotSummary(movie.plotSummary || "");
        setPosterUrl(movie.posterUrl || "");
        setLanguage(movie.language || "");
        setCountry(movie.country || "");
        setAddedBy(movie.addedBy || "");
      } catch (err) {
        console.error("Load movie error", err);
        if (mounted)
          setFetchError(
            err.response?.data?.message || err.message || "Failed to load movie"
          );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [axiosSecure, id]);


  function validate() {
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const err = validate();
    if (err) {
      setFormError(err);
      return;
    }

    const payload = {
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
      addedBy: addedBy,
    };

    try {
      setSubmitting(true);
      console.log("id", id);
      const res = await axiosSecure.put(`/api/movies/update/${id}`, payload);
      const updated = res.data?.data || res.data;

      console.log("updated", updated);
      toast.success("Movie updated successfully!");
      navigate(`/movie/details/${id}`);

      return updated;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Could not update movie";

      console.error("Update error", err);
      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(180deg,#06070a_0%,#071226_50%,#0b1020_100%)] text-white">
        <img src={Logo} alt="Loading" className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[linear-gradient(180deg,#06070a_0%,#071226_50%,#0b1020_100%)] text-white px-4">
        <p className="text-lg text-red-400 mb-4">{fetchError}</p>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded bg-white/5"
          >
            Back
          </button>
          <button
            onClick={() => navigate("/movies")}
            className="px-4 py-2 rounded bg-[#4DA1FF]"
          >
            All Movies
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full py-20 px-4 md:px-10 bg-linear-to-b from-black via-gray-900 to-black">
      <div className="max-w-3xl mx-auto bg-[#0b1220] rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold mb-4">Edit Movie</h1>
        <p className="text-sm text-gray-300 mb-6">
          Update movie details. <strong>Added By</strong> is not editable.
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
                placeholder="Name 1, Name 2, ..."
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
            {posterUrl && (
              <div className="mt-2">
                <img
                  src={posterUrl}
                  alt="poster preview"
                  className="w-40 h-auto rounded shadow"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://via.placeholder.com/160x240?text=No+Image";
                  }}
                />
              </div>
            )}
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

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Added By (cannot edit)
            </label>
            <input
              value={addedBy}
              disabled
              className="mt-1 w-full px-3 py-2 rounded bg-white/7 border border-white/10 text-gray-300"
            />
            <div className="text-xs text-gray-400 mt-1">
              This field is read-only and shows the original contributor.
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded bg-linear-to-r from-[#E63A3A] to-[#F25A3C] text-white font-semibold disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded bg-white/5 text-white"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={async () => {
                setFormError("");
                setLoading(true);
                try {
                  const res = await axiosSecure.get(`/api/movies/${id}`);
                  const m = res.data?.data || res.data;

                  setTitle(m.title || "");
                  setGenre(m.genre || "");
                  setReleaseYear(m.releaseYear ?? "");
                  setDirector(m.director || "");
                  setCast(
                    Array.isArray(m.cast) ? m.cast.join(", ") : m.cast || ""
                  );
                  setRating(m.rating ?? "");
                  setDuration(m.duration ?? "");
                  setPlotSummary(m.plotSummary || "");
                  setPosterUrl(m.posterUrl || "");
                  setLanguage(m.language || "");
                  setCountry(m.country || "");
                  setAddedBy(m.addedBy || "");
                } catch (err) {
                  console.error("Reset movie error:", err);
                  setFormError(
                    err.response?.data?.message ||
                      err.message ||
                      "Failed to reset movie"
                  );
                } finally {
                  setLoading(false);
                }
              }}
              className="ml-auto px-3 py-2 rounded bg-white/7 text-white"
            >
              Reset to original
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
