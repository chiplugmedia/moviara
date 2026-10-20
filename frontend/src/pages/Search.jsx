import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieGrid from "../components/MovieGrid";
import {
  searchMovies,
  fetchMoviesByCategory,
  GENRES_LIST,
} from "../services/movieApi";
import { Search as SearchIcon, X, AlertCircle, RefreshCw } from "lucide-react";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const performSearch = async (query, genre) => {
    try {
      setIsLoading(true);
      setError(null);

      if (query.trim()) {
        const res = await searchMovies(query.trim(), 1);
        setMovies(res.movies || []);
      } else if (genre !== "All") {
        const res = await fetchMoviesByCategory(genre);
        setMovies(res || []);
      } else {
        const res = await searchMovies("Batman", 1); // default rich initial results
        setMovies(res.movies || []);
      }
    } catch (err) {
      console.error("Search failed:", err);
      setError(err.message || "Failed to search movies from API.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setSearchTerm(q);
    performSearch(q, selectedGenre);
  }, [searchParams, selectedGenre]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between">
      <Header />

      <main className="mx-auto w-full max-w-[1600px] px-3 pt-20 sm:pt-24 pb-24 md:pb-16 sm:px-6 xl:px-8 flex-1 space-y-6 sm:space-y-8">
        {/* Search Input Hero Section */}
        <div className="rounded-2xl sm:rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-8 space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Search Movie Database
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Search across thousands of movie titles, franchises, and genres via TMDB.
          </p>

          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3 pt-1 sm:pt-2">
            {/* Input Bar */}
            <div className="relative flex-1 w-full">
              <SearchIcon
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type movie title (e.g. Inception, Marvel)..."
                className="w-full h-12 pl-11 pr-24 bg-zinc-950 border border-zinc-700/80 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="min-h-[36px] min-w-[36px] flex items-center justify-center absolute right-14 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
                  aria-label="Clear search text"
                >
                  <X size={16} />
                </button>
              )}
              <button
                type="submit"
                className="min-h-[36px] absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition active:scale-95"
              >
                Find
              </button>
            </div>

            {/* Genre Filter Dropdown */}
            <div className="w-full sm:w-auto shrink-0 flex items-center gap-2">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                aria-label="Filter by genre"
                className="h-12 w-full sm:w-44 px-3.5 bg-zinc-950 border border-zinc-700/80 rounded-xl text-xs sm:text-sm text-zinc-300 focus:border-zinc-400 focus:outline-none cursor-pointer"
              >
                {GENRES_LIST.map((g) => (
                  <option key={g} value={g}>
                    {g === "All" ? "All Categories" : g}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        {/* Error Notification */}
        {error ? (
          <div className="w-full rounded-2xl border border-red-500/20 bg-red-950/20 p-8 text-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400 mx-auto">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Search Error</h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">{error}</p>
            </div>
            <button
              onClick={() => performSearch(searchTerm, selectedGenre)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 hover:opacity-90 transition shadow"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Retry Search</span>
            </button>
          </div>
        ) : (
          /* Results Grid */
          <MovieGrid
            movies={movies}
            title={
              searchTerm
                ? `Results for "${searchTerm}"`
                : selectedGenre !== "All"
                ? `${selectedGenre} Titles`
                : "Top Movies"
            }
            isLoading={isLoading}
            showFilters={false}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
