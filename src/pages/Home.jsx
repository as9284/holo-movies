import React, { useState } from "react";
import { SearchBox } from "../components/SearchBox";
import { MovieList } from "../components/MovieList";
import { MovieModal } from "../components/MovieModal";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchMovies = async () => {
    if (query.trim() === "") return;

    setMovies([]);
    setLoading(true);
    setHasSearched(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    setModalLoading(true);
    setModalOpen(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`
      );
      const data = await response.json();

      setSelectedMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className="max-w-7xl min-h-screen m-auto px-4 py-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-4xl text-neutral-800 font-bold mb-4">
        Holo Movies
      </h1>
      <SearchBox query={query} setQuery={setQuery} fetchMovies={fetchMovies} />
      <MovieList
        loading={loading}
        movies={movies}
        fetchMovieDetails={fetchMovieDetails}
        hasSearched={hasSearched}
      />
      <MovieModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalLoading={modalLoading}
        selectedMovie={selectedMovie}
      />
    </div>
  );
};
