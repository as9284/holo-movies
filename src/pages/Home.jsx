import React from "react";
import { TbSearch } from "react-icons/tb";

export const Home = () => {
  return (
    <>
      <div className="max-w-7xl min-h-screen m-auto p-4 flex flex-col items-center justify-center">
        <h1 className="text-3xl text-neutral-800 font-bold mb-4">
          Holo Movies
        </h1>

        <div className="w-full max-w-md flex items-center justify-center">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="w-full h-12 indent-4 bg-neutral-800 rounded-l-md drop-shadow-md text-neutral-200 placeholder-neutral-400"
          />
          <button className="w-16 h-12 flex justify-center items-center drop-shadow-md bg-neutral-900 text-white rounded-r-md hover:bg-neutral-600 duration-200">
            <TbSearch className="text-2xl" />
          </button>
        </div>
      </div>
    </>
  );
};
