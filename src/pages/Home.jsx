import React, { useState } from "react";
import { TbSearch } from "react-icons/tb";

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

      {/* Search Box */}
      <div className="w-full max-w-md flex items-center justify-center mb-8">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="w-3/5 h-12 indent-4 bg-neutral-900 rounded-l-md outline-none drop-shadow-md text-neutral-200 placeholder-neutral-400 hover:bg-neutral-600 duration-200"
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
      <div className="w-full max-w-7xl flex flex-wrap justify-center items-center gap-4">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="w-72 h-96 bg-neutral-800 rounded-md flex flex-col animate-pulse overflow-hidden"
              ></div>
            ))
          : movies.map((movie) => (
              <div
                key={movie.imdbID}
                onClick={() => fetchMovieDetails(movie.imdbID)}
                className="w-72 h-96 relative drop-shadow-md overflow-hidden rounded-md cursor-pointer bg-neutral-800 text-neutral-100 group hover:scale-105 duration-200"
              >
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-end p-4 text-center group-hover:backdrop-blur-xl group-hover:bg-opacity-70 duration-200">
                  <h2 className="text-lg font-semibold group-hover:text-2xl group-hover:-translate-y-36 duration-200">
                    {movie.Title}
                  </h2>
                  <p className="text-sm text-neutral-400 group-hover:-translate-y-36 duration-200">
                    {movie.Year.endsWith("–")
                      ? movie.Year.slice(0, -1)
                      : movie.Year}
                  </p>
                </div>
              </div>
            ))}
        {!loading && hasSearched && movies.length === 0 && (
          <p className="text-center text-neutral-400">
            No results found, please try another search.
          </p>
        )}
      </div>

      {/* Modal for Movie Details */}
      {modalOpen && (
        <div
          className="fixed px-4 inset-0 bg-black bg-opacity-70 backdrop-blur-xl flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-md relative h-80 bg-neutral-800 text-neutral-100 overflow-y-auto rounded-lg px-8 py-6 custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-4 text-2xl text-white"
            >
              &times;
            </button>
            {modalLoading ? (
              <div className="animate-pulse">
                <div className="h-10 bg-neutral-700 rounded w-3/4 mb-2"></div>
                <div className="h-16 bg-neutral-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-neutral-700 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-neutral-700 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-neutral-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-neutral-700 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-neutral-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-neutral-700 rounded w-5/6 mb-2"></div>
              </div>
            ) : (
              selectedMovie && (
                <>
                  <h2 className="text-2xl font-bold mb-4">
                    {selectedMovie.Title}
                  </h2>
                  <p className="mb-4">{selectedMovie.Plot}</p>
                  <p>
                    <strong>Year:</strong>{" "}
                    {selectedMovie.Year.endsWith("–")
                      ? selectedMovie.Year.slice(0, -1)
                      : selectedMovie.Year}
                  </p>
                  <p>
                    <strong>Genre:</strong> {selectedMovie.Genre}
                  </p>
                  <p>
                    <strong>Director:</strong> {selectedMovie.Director}
                  </p>
                  <p>
                    <strong>Actors:</strong> {selectedMovie.Actors}
                  </p>
                </>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
