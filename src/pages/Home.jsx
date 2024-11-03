import React, { useState } from "react";
import { TbSearch } from "react-icons/tb";

const API_KEY = "94178d88";

export const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    if (query.trim() === "") return;

    setMovies([]);
    setLoading(true);

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

  return (
    <div className="max-w-7xl min-h-screen m-auto px-4 py-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-4xl text-neutral-800 font-bold mb-4">
        Holo Movies
      </h1>

      {/* Search Box */}
      <div className="w-full max-w-md flex items-center justify-center mb-8">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="w-full h-12 indent-4 bg-neutral-800 rounded-l-md drop-shadow-md text-neutral-200 placeholder-neutral-400 hover:bg-neutral-600 duration-200"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchMovies()}
        />
        <button
          className="w-16 h-12 flex justify-center items-center drop-shadow-md bg-neutral-900 text-white rounded-r-md hover:bg-neutral-600 duration-200"
          onClick={fetchMovies}
        >
          <TbSearch className="text-2xl" />
        </button>
      </div>

      {/* Skeleton Loading Effect */}
      <div className="w-full max-w-7xl grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-neutral-800 text-neutral-100 rounded-lg p-4 flex flex-col items-center animate-pulse"
              >
                <div className="w-full h-64 bg-neutral-700 rounded-md mb-4"></div>
                <div className="h-6 bg-neutral-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
              </div>
            ))
          : movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="bg-neutral-800 text-neutral-100 rounded-lg p-4 flex flex-col items-center"
              >
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold">{movie.Title}</h2>
                <p className="text-sm text-neutral-400">
                  {movie.Year.endsWith("–")
                    ? movie.Year.slice(0, -1)
                    : movie.Year}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};
