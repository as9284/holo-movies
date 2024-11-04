import React from "react";
import { TbSearch } from "react-icons/tb";

export const SearchBox = ({ query, setQuery, fetchMovies }) => {
  return (
    <>
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
    </>
  );
};
