import React, { useEffect, useState } from "react";
import {
  motion as Motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import Logo from "../../assets/logo.png";
import Movie from "../Movie/Movie";

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function TopRatedMovies({ movies = [] }) {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      const topFive = [...(movies || [])]
        .sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0))
        .slice(0, 5);

      setTopRatedMovies(topFive);
      setLoading(false);
    }, 1200); // shorter wait — still feels smooth

    return () => clearTimeout(timer);
  }, [movies]);

  return (
    <section className="w-full py-14 px-4 md:px-10 bg-linear-to-b from-black via-gray-900 to-black">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Top Rated <span className="text-[#4DA1FF]">Movies</span>
        </h2>
        <p className="text-center text-[18px] text-gray-300 leading-7 mt-2 max-w-2xl mx-auto">
          Explore the highest-rated movies curated from our collection.
        </p>

        {loading ? (
          <div className="flex justify-center items-center mt-8">
            <Motion.img
              src={Logo}
              alt="Loading"
              width={48}
              height={48}
              // respect prefers-reduced-motion
              animate={reduce ? {} : { rotate: 360 }}
              transition={
                reduce
                  ? {}
                  : { repeat: Infinity, duration: 1.2, ease: "linear" }
              }
              className=""
            />
          </div>
        ) : (
          <Motion.div
            className="card-section grid grid-cols-1 md:grid-cols-5 gap-6 mt-10"
            variants={listVariants}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence>
              {topRatedMovies.map((movie) => (
                <Motion.div
                  key={movie._id || movie.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, y: 10, transition: { duration: 0.35 } }}
                  whileHover={reduce ? {} : { y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 160, damping: 22 }}
                  className="rounded-lg"
                >
                  {/*
                    Keep using your existing Movie component to render the card content.
                    If Movie expects a specific layout, it will still receive the same `movie` prop.
                  */}
                  <Movie key={movie._id || movie.id} movie={movie} />
                </Motion.div>
              ))}
            </AnimatePresence>
          </Motion.div>
        )}
      </div>
    </section>
  );
}
