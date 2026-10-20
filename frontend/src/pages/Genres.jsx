import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieGrid from "../components/MovieGrid";
import { fetchMoviesByCategory, GENRES_LIST } from "../services/movieApi";
import { Clapperboard, AlertCircle, RefreshCw } from "lucide-react";

export default function Genres() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialGenre = searchParams.get("genre") || "Action";
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadGenreMovies = async (genre) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchMoviesByCategory(genre);
      setMovies(data);
    } catch (err) {
      console.error("Failed to load genre movies:", err);
      setError(err.message || "Failed to load movies for this category.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const qGenre = searchParams.get("genre") || "Action";
    setSelectedGenre(qGenre);
    loadGenreMovies(qGenre);
  }, [searchParams]);

  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);
    setSearchParams({ genre });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between">
      <Header />

      <main className="mx-auto w-full max-w-[1600px] px-3 pt-24 pb-16 sm:px-6 xl:px-8 flex-1 space-y-8">
        {/* Genre Browser Top Bar */}
        <div className="border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-2.5 text-zinc-400 mb-2">
            <Clapperboard className="h-5 w-5 text-zinc-300" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Browse Categories
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Genres &amp; Collections
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Explore titles organized by TMDB movie genres with verified metadata.
          </p>

          {/* Genre Badges / Buttons Bar */}
          <div className="mt-6 flex flex-wrap gap-2">
            {GENRES_LIST.map((genre) => {
              const isActive = selectedGenre === genre;
              return (
                <button
                  key={genre}
                  onClick={() => handleSelectGenre(genre)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    isActive
                      ? "bg-gradient-to-r from-zinc-200 via-white to-zinc-300 text-zinc-950 shadow-md"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                >
                  <span>{genre}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Error State */}
        {error ? (
          <div className="w-full rounded-2xl border border-red-500/20 bg-red-950/20 p-8 text-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400 mx-auto">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Category Loading Error</h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">{error}</p>
            </div>
            <button
              onClick={() => loadGenreMovies(selectedGenre)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 hover:opacity-90 transition shadow"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Retry</span>
            </button>
          </div>
        ) : (
          /* Filtered Movie Grid */
          <MovieGrid
            movies={movies}
            title={`${selectedGenre} Cinema Collection`}
            isLoading={isLoading}
            showFilters={false}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
