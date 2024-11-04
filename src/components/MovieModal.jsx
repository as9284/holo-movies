import React from "react";

export const MovieModal = ({
  modalOpen,
  setModalOpen,
  modalLoading,
  selectedMovie,
}) => {
  if (!modalOpen) return null;
  return (
    <>
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
    </>
  );
};
