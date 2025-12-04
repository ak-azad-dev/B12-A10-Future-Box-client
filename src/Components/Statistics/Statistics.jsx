import React from "react";

const Statistics = ({ movies }) => {
  return (
    <div className="w-full flex justify-center py-10 bg-white">
      <div className="stats stats-vertical sm:stats-horizontal text-center p-4 sm:scale-110">
        {/* Box 1 */}
        <div className="stat p-8">
          <div className="stat-figure text-red-500">
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
        </div>

        {/* Box 2 */}
        <div className="stat p-8">
          <div className="stat-figure text-red-500">
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
          <div className="stat-value text-black text-4xl font-bold">4,200</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
