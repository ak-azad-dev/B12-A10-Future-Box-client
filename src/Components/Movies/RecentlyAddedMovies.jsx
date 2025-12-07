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
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const RecentlyAddedMovies = ({ movies = [] }) => {
  const [recentlyAddedMovies, setRecentlyAddedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      const latestSix = [...movies]
        .sort((a, b) => {
          const dateA = new Date(parseInt(a._id.substring(0, 8), 16) * 1000);
          const dateB = new Date(parseInt(b._id.substring(0, 8), 16) * 1000);
          return dateB - dateA;
        })
        .slice(0, 6);

      setRecentlyAddedMovies(latestSix);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [movies]);

  return (
    <section className="py-20 px-6 w-full md:max-w-[1440px] mx-auto bg-[linear-gradient(180deg,#06070a_0%,#071226_50%,#0b1020_100%)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Recently Added <span className="text-[#4DA1FF]">Movies</span>
        </h2>

        {loading ? (
          <div className="flex justify-center items-center mt-8">
            <Motion.img
              src={Logo}
              alt="Loading"
              width={48}
              height={48}
              animate={reduce ? {} : { rotate: 360 }}
              transition={
                reduce
                  ? {}
                  : { repeat: Infinity, duration: 1.2, ease: "linear" }
              }
            />
          </div>
        ) : (
          <Motion.div
            className="card-section grid grid-cols-1 md:grid-cols-4 gap-6 mt-10"
            variants={listVariants}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence>
              {recentlyAddedMovies.map((movie) => (
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
                  <Movie movie={movie} />
                </Motion.div>
              ))}
            </AnimatePresence>
          </Motion.div>
        )}
      </div>
    </section>
  );
};

export default RecentlyAddedMovies;
