import React, { useRef, useEffect } from "react";
import { TbSearch } from "react-icons/tb";

export const SearchBox = ({
  query,
  setQuery,
  category,
  setCategory,
  fetchMovies,
  suggestions,
  setSuggestions,
  debouncedFetchSuggestions,
}) => {
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedFetchSuggestions(newQuery);
  };

  const handleInputFocus = () => {
    if (query.trim() && suggestions.length === 0) {
      debouncedFetchSuggestions(query);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSuggestions]);

  return (
    <div className="w-full max-w-md flex flex-row justify-center items-center mb-8 relative">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a movie..."
        className="w-3/5 h-12 indent-4 bg-neutral-900 rounded-l-md outline-none drop-shadow-md text-neutral-200 placeholder-neutral-400 hover:bg-neutral-600 duration-200"
        value={query}
        onFocus={handleInputFocus}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === "Enter" && fetchMovies()}
      />
      <select
        className="custom-dropdown custom-scrollbar"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="movie">Movie</option>
        <option value="series">Series</option>
      </select>
      <button
        className="w-12 h-12 flex justify-center items-center drop-shadow-md bg-neutral-900 text-white rounded-r-md hover:bg-neutral-600 duration-200"
        onClick={fetchMovies}
      >
        <TbSearch className="text-2xl" />
      </button>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-14 w-full bg-neutral-900 text-neutral-200 shadow-lg rounded-md custom-scrollbar max-h-48 overflow-y-auto z-30"
        >
          {suggestions.map((movie) => (
            <div
              key={movie.imdbID}
              className="px-4 py-4 text-wrap cursor-pointer hover:bg-neutral-600"
              onClick={() => {
                setQuery(movie.Title);
                setSuggestions([]);
                fetchMovies(movie.Title);
              }}
            >
              {movie.Title} (
              {movie.Year.endsWith("–") ? movie.Year.slice(0, -1) : movie.Year})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
