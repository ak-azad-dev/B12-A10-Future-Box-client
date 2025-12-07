import React from "react";
import { Banner } from "../../Components/Banner/Banner";
import Footer from "../../Components/Footer/Footer";
import Statistics from "../../Components/Statistics/Statistics";
import { useState } from "react";
import { useEffect } from "react";
import TopRatedMovies from "../../Components/Movies/TopRatedMovies";
import RecentlyAddedMovies from "../../Components/Movies/RecentlyAddedMovies";
import { GenreSection } from "../../Components/GenreSection/GenreSection";
import { AboutPlatform } from "../../Components/About/AboutPlatform";

export const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);

  useEffect(() => {
      const fetchMovies = async () => {
        try {
          const res = await fetch(
            `http://localhost:3000/api/movies`
          );
          const data = await res.json();
          console.log("data", data);

          setMovies(data.data);
          setFeaturedMovies((data.data || []).slice(0, 3));
        } catch (err) {
          console.error("Failed to fetch:", err);
        }
      };

      fetchMovies();
    }, []);

  return (
    <div>
      <Banner featuredMovies={featuredMovies}></Banner>
      <Statistics movies={movies}></Statistics>
      <TopRatedMovies movies={movies}></TopRatedMovies>
      <RecentlyAddedMovies movies={movies}></RecentlyAddedMovies>
      <GenreSection></GenreSection>
      <AboutPlatform></AboutPlatform>
      <Footer></Footer>
    </div>
  );
};
