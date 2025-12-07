import React from "react";

export const AboutPlatform = () => {
  return (
    <section className="w-full py-14 px-4 md:px-10 bg-linear-to-b from-black via-gray-900 to-black">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          About <span className="text-[#4DA1FF]">MovieMasterPro</span>
        </h2>

        <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
          MovieMasterPro is a modern movie discovery platform built for fans,
          binge-watchers, and collectors. Explore thousands of movies, build
          your own custom collections, track what you love, and dive deep into
          genres, actors, ratings, and more — all through a fast, intuitive, and
          beautifully designed interface.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <div className="p-6 rounded-lg bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm hover:scale-[1.03] transition">
            <h3 className="text-xl font-semibold text-[#4DA1FF] mb-2">
              Smart Search
            </h3>
            <p className="text-gray-300 text-sm">
              Quickly find any movie with our advanced search system powered by
              real-time results.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm hover:scale-[1.03] transition">
            <h3 className="text-xl font-semibold text-[#4DA1FF] mb-2">
              Custom Collections
            </h3>
            <p className="text-gray-300 text-sm">
              Save your favorites, build watchlists, and organize movies however
              you like.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm hover:scale-[1.03] transition">
            <h3 className="text-xl font-semibold text-[#4DA1FF] mb-2">
              Detailed Info
            </h3>
            <p className="text-gray-300 text-sm">
              View trailers, ratings, cast, genre breakdowns, and complete movie
              overviews.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm hover:scale-[1.03] transition">
            <h3 className="text-xl font-semibold text-[#4DA1FF] mb-2">
              Modern UI
            </h3>
            <p className="text-gray-300 text-sm">
              Enjoy a cinematic experience with a smooth, responsive, and
              visually stunning design.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm hover:scale-[1.03] transition">
            <h3 className="text-xl font-semibold text-[#4DA1FF] mb-2">
              Google Login
            </h3>
            <p className="text-gray-300 text-sm">
              Sign in with Google instantly to sync preferences and manage your
              collection.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm hover:scale-[1.03] transition">
            <h3 className="text-xl font-semibold text-[#4DA1FF] mb-2">
              Real-Time Updates
            </h3>
            <p className="text-gray-300 text-sm">
              Always stay updated with the latest releases and trending movies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
