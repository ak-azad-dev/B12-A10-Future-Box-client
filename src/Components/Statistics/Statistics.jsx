import React from "react";
import { motion as Motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Statistics = ({ movies }) => {

  const usersCount = new Set(movies.map((m) => m.addedBy)).size;

  return (
    <div className="w-full flex justify-center py-10 bg-linear-to-b from-[#06070a] via-[#071226] to-[#0b1020]">
      <Motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="stats stats-vertical sm:stats-horizontal text-center p-4 sm:scale-110 gap-10"
      >

        <Motion.div
          variants={item}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="stat p-8 shadow-md rounded-2xl bg-white hover:shadow-xl"
        >
          <div className="stat-figure text-[#1C75FF]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-12 w-12 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h18M3 6l3.5-3L10 6l3.5-3L17 6l3.5-3L21 6M5 10v10h14V10"
              />
            </svg>
          </div>

          <div className="stat-title text-gray-700 text-xl">Movies</div>
          <div className="stat-value text-black text-4xl font-bold">
            {movies.length}
          </div>
        </Motion.div>


        <Motion.div
          variants={item}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="stat p-8 shadow-md rounded-2xl bg-white hover:shadow-xl"
        >
          <div className="stat-figure text-[#F25A3C]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-12 w-12 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2m18 0v-2a4 4 0 00-3-3.87M15 7a4 4 0 11-8 0 4 4 0 018 0zm6 4a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>

          <div className="stat-title text-gray-700 text-xl">Users</div>
          <div className="stat-value text-black text-4xl font-bold">
            {usersCount}
          </div>
        </Motion.div>
      </Motion.div>
    </div>
  );
};

export default Statistics;
