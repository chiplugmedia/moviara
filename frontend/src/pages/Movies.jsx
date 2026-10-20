import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieGrid from "../components/MovieGrid";
import {
  fetchPopularMovies,
  searchMovies,
  fetchMoviesByCategory,
  GENRES_LIST,
} from "../services/movieApi";
import { Search, Sparkles, AlertCircle, RefreshCw } from "lucide-react";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [activeGenre, setActiveGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load initial popular movies or search query
  const loadMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (searchQuery.trim()) {
        const res = await searchMovies(searchQuery.trim());
        setMovies(res.movies || []);
      } else if (activeGenre !== "All") {
        const res = await fetchMoviesByCategory(activeGenre);
        setMovies(res);
      } else {
        const res = await fetchPopularMovies();
        setMovies(res);
      }
    } catch (err) {
      console.error("Error in Movies page:", err);
      setError(err.message || "Failed to fetch movies from API server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadMovies();
  }, [activeGenre]);

  // Handle Search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadMovies();
  };

  const handleGenreChange = (genre) => {
    setActiveGenre(genre);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between">
      <Header />

      <main className="mx-auto w-full max-w-[1600px] px-3 pt-20 sm:pt-24 pb-24 md:pb-16 sm:px-6 xl:px-8 flex-1 space-y-6 sm:space-y-8">
        {/* Page Banner Header */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 p-5 sm:p-8 lg:p-10 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-xs font-semibold text-zinc-300">
              <Sparkles className="h-3.5 w-3.5 text-zinc-300" />
              <span>Verified TMDB &amp; OMDb Data</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Discover Movies
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-zinc-400 leading-relaxed">
              Explore thousands of titles with verified ratings, synopsis, and cast powered by TMDB and OMDb.
            </p>

            {/* Live Search Form */}
            <form onSubmit={handleSearchSubmit} className="pt-2 max-w-md">
              <div className="relative w-full">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies (e.g. Inception, Avatar)..."
                  className="w-full h-11 pl-10 pr-20 bg-zinc-900/90 border border-zinc-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition min-h-[34px]"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Background Ambient Glow */}
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-72 w-72 rounded-full bg-zinc-700/10 blur-3xl pointer-events-none" />
        </div>

        {/* Error Notification if backend is unreachable */}
        {error ? (
          <div className="w-full rounded-2xl border border-red-500/20 bg-red-950/20 p-8 text-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400 mx-auto">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">API Connection Error</h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
                {error}
              </p>
            </div>
            <button
              onClick={loadMovies}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 hover:opacity-90 transition shadow"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Retry</span>
            </button>
          </div>
        ) : (
          /* Movie Grid */
          <MovieGrid
            movies={movies}
            title={
              searchQuery
                ? `Search Results for "${searchQuery}"`
                : activeGenre === "All"
                ? "Popular Titles"
                : `${activeGenre} Titles`
            }
            isLoading={isLoading}
            showFilters={true}
            activeGenre={activeGenre}
            onSelectGenre={handleGenreChange}
            genres={GENRES_LIST}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
