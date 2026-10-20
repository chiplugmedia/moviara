import React, { useState } from "react";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import { Film, SlidersHorizontal } from "lucide-react";

export default function MovieGrid({
  movies = [],
  title = "Explore Movies",
  isLoading = false,
  showFilters = false,
  activeGenre = "All",
  onSelectGenre,
  genres = [],
}) {
  const [sortBy, setSortBy] = useState("default");

  // Sorting logic
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sortBy === "year") return (b.year || 0) - (a.year || 0);
    if (sortBy === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <section className="w-full space-y-4 sm:space-y-5" aria-label={title || "Movie Catalog"}>
      {/* Grid Top Bar with Responsive Alignment */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-3 sm:pb-4">
        <div>
          {title && (
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="h-5 sm:h-6 w-1 rounded-full bg-gradient-to-b from-zinc-200 to-zinc-500" />
              {title}
            </h2>
          )}
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Showing {movies.length} {movies.length === 1 ? "title" : "titles"}
          </p>
        </div>

        {/* Sort Controls with Accessible Hit Target */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Sort by:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort movies"
            className="min-h-[42px] rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2 text-xs text-zinc-200 focus:border-zinc-500 focus:outline-none transition cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="rating">Highest Rated</option>
            <option value="year">Newest First</option>
            <option value="title">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Genre Filter Tabs (if enabled) with Smooth Touch Momentum */}
      {showFilters && genres.length > 0 && (
        <div
          className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {genres.map((genre) => {
            const isSelected = activeGenre === genre;
            return (
              <button
                key={genre}
                type="button"
                onClick={() => onSelectGenre && onSelectGenre(genre)}
                className={`min-h-[40px] whitespace-nowrap px-4 py-2 rounded-xl text-xs font-medium transition-all snap-start active:scale-95 flex items-center justify-center ${
                  isSelected
                    ? "bg-gradient-to-r from-zinc-100 via-white to-zinc-300 text-zinc-950 font-bold shadow-md"
                    : "bg-zinc-900/90 border border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800/80 active:bg-zinc-800"
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid Content: Mobile-First 2 cols (< 640px), 3 cols (sm), 4 cols (md), 5 cols (lg), 6 cols (xl) */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-2.5 xs:gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 lg:gap-5">
          {Array.from({ length: 12 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      ) : sortedMovies.length > 0 ? (
        <div className="grid grid-cols-2 gap-2.5 xs:gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 lg:gap-5">
          {sortedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 p-8 sm:p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800/80 text-zinc-500 mb-3">
            <Film className="h-7 w-7" />
          </div>
          <h3 className="text-base font-semibold text-white">No Movies Found</h3>
          <p className="mt-1 text-xs text-zinc-400 max-w-sm">
            We couldn't find any titles matching your filter criteria. Try selecting another category or resetting filters.
          </p>
          {onSelectGenre && (
            <button
              onClick={() => onSelectGenre("All")}
              className="mt-4 min-h-[44px] px-5 py-2.5 text-xs font-semibold rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white transition active:scale-95"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}
    </section>
  );
}
