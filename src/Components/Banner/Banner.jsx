import React, { useCallback, useEffect, useState } from "react";
import {
  motion as Motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

export const Banner = ({ featuredMovies = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const prev = useCallback(
    () =>
      setCurrentSlide((p) =>
        featuredMovies.length
          ? (p - 1 + featuredMovies.length) % featuredMovies.length
          : 0
      ),
    [featuredMovies.length]
  );

  const next = useCallback(
    () =>
      setCurrentSlide((p) =>
        featuredMovies.length ? (p + 1) % featuredMovies.length : 0
      ),
    [featuredMovies.length]
  );

  // Auto-advance but respectful of prefers-reduced-motion
  useEffect(() => {
    if (shouldReduceMotion) return; // don't auto-advance if user prefers reduced motion
    if (!featuredMovies.length) return;

    const t = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % featuredMovies.length);
    }, 8000); // slow, soothing timing

    return () => clearInterval(t);
  }, [featuredMovies.length, shouldReduceMotion]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  if (!featuredMovies || featuredMovies.length === 0) return null;

  // Animation variants
  const containerVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const imageMotion = shouldReduceMotion
    ? {}
    : {
        // Ken Burns gently: slow scale + vertical micro-pan
        animate: {
          scale: [1, 1.06, 1],
          y: [0, -12, 0],
        },
        transition: {
          duration: 18,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        },
      };

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured movies"
    >
      <div className="w-full h-full md:h-[650px] relative">
        <AnimatePresence initial={false} exitBeforeEnter>
          {featuredMovies.map((slide, idx) => {
            const active = idx === currentSlide;
            if (!active) return null;

            return (
              <Motion.div
                key={slide.id || idx}
                className="absolute inset-0 z-10"
                variants={containerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8 }}
                aria-hidden={!active}
              >
                <Motion.img
                  src={slide.posterUrl}
                  alt={slide.title}
                  draggable={false}
                  loading="eager"
                  className="w-full h-full object-cover object-center select-none"
                  {...imageMotion}
                />

                {/* soft gradient overlay to improve contrast */}
                <Motion.div
                  className="absolute inset-0 pointer-events-none"
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.65) 100%)",
                  }}
                />

                {/* gentle caption area (example) */}
                <Motion.div
                  className="absolute left-6 bottom-12 max-w-2xl text-white z-20"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25 }}
                >
                  <h3 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
                    {slide.title}
                  </h3>
                  {slide.tagline && (
                    <p className="mt-2 text-sm md:text-base text-gray-200 max-w-xl">
                      {slide.tagline}
                    </p>
                  )}
                </Motion.div>
              </Motion.div>
            );
          })}
        </AnimatePresence>

        {/* controls */}
        <div className="absolute left-4 right-4 top-1/2 z-30 flex items-center justify-between -translate-y-2/2">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border-none text-white backdrop-blur-sm transition-opacity"
          >
            <span className="text-2xl leading-none select-none">‹</span>
          </button>

          <button
            onClick={next}
            aria-label="Next slide"
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border-none text-white backdrop-blur-sm transition-opacity"
          >
            <span className="text-2xl leading-none select-none">›</span>
          </button>
        </div>

        {/* small indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2">
          {featuredMovies.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentSlide ? "bg-white scale-125" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
