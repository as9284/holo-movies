import React from "react";

export const MovieList = ({
  loading,
  movies,
  fetchMovieDetails,
  hasSearched,
}) => {
  return (
    <>
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
    </>
  );
};
