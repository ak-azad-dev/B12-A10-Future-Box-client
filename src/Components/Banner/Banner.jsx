import React, { useCallback, useEffect, useState } from "react";

export const Banner = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/movies`
        );
        const data = await res.json();
        console.log("data", data);
        // Return only first 3 movies
        setMovies((data.data || []).slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };

    fetchMovies();
  }, []); // 🔄 Re-fetch whenever search changes

  // const slides = [
  //   {
  //     src: "https://4kwallpapers.com/images/walls/thumbs_3t/24207.jpg",
  //     alt: "War Fury Banner",
  //   },
  //   {
  //     src: "https://4kwallpapers.com/images/walls/thumbs_3t/22254.jpg",
  //     alt: "Fortnite Banner",
  //   },
  //   {
  //     src: "https://4kwallpapers.com/images/walls/thumbs_3t/24252.jpg",
  //     alt: "Minecraft Banner",
  //   },
  // ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const prev = useCallback(
    () => setCurrentSlide((p) => (p - 1 + movies.length) % movies.length),
    [movies.length]
  );
  const next = useCallback(
    () => setCurrentSlide((p) => (p + 1) % movies.length),
    [movies.length]
  );

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured movies"
    >
      <div className="w-full h-full md:h-[750px] relative">
        {movies.map((slide, idx) => {
          const active = idx === currentSlide;
          return (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out transform ${
                active
                  ? "opacity-100 z-20 scale-100"
                  : "opacity-0 z-10 scale-95 pointer-events-none"
              }`}
              aria-hidden={!active}
            >
              <img
                src={slide.posterUrl}
                alt={slide.title}
                className="w-full h-full object-cover object-center select-none"
                draggable={false}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
            </div>
          );
        })}

        <div className="absolute left-4 right-4 top-1/2 z-30 flex items-center justify-between -translate-y-2/2">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border-none text-white backdrop-blur-sm"
          >
            <span className="text-2xl leading-none select-none">‹</span>
          </button>

          <button
            onClick={next}
            aria-label="Next slide"
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border-none text-white backdrop-blur-sm"
          >
            <span className="text-2xl leading-none select-none">›</span>
          </button>
        </div>
      </div>
    </section>
  );
};
