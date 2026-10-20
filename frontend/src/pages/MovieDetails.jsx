import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TheMovieDetail from "../components/TheMovieDetail";
import { fetchMovieDetails, fetchPopularMovies } from "../services/movieApi";
import { AlertCircle, RefreshCw, Film } from "lucide-react";

export default function MovieDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const movieId = id || searchParams.get("id") || "tt0468569"; // Default to The Dark Knight
  const mediaTypeParam = searchParams.get("type");

  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch movie or TV details
      const movieData = await fetchMovieDetails(movieId, mediaTypeParam);
      setMovie(movieData);

      // Fetch popular movies for recommendations
      try {
        const popular = await fetchPopularMovies();
        setRelatedMovies(popular.filter((m) => m.id !== movieId).slice(0, 6));
      } catch (_) {
        setRelatedMovies([]);
      }
    } catch (err) {
      console.error("Error loading movie details:", err);
      setError(err.message || "Failed to load movie details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadData();
  }, [movieId, mediaTypeParam]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between">
      <Header />

      <main className="mx-auto w-full max-w-[1600px] px-3 pt-20 sm:pt-24 pb-24 md:pb-16 sm:px-6 xl:px-8 flex-1">
        {isLoading ? (
          /* Loading Skeleton */
          <div className="w-full space-y-6 animate-pulse">
            <div className="h-4 w-48 bg-zinc-800 rounded" />
            <div className="h-[420px] w-full bg-zinc-900 rounded-3xl border border-zinc-800 p-8 flex gap-8">
              <div className="w-56 h-full bg-zinc-800 rounded-2xl shrink-0" />
              <div className="flex-1 space-y-4 pt-4">
                <div className="h-8 w-2/3 bg-zinc-800 rounded" />
                <div className="h-4 w-1/3 bg-zinc-800/80 rounded" />
                <div className="h-24 w-full bg-zinc-800/60 rounded" />
                <div className="h-10 w-44 bg-zinc-800 rounded-xl" />
              </div>
            </div>
          </div>
        ) : error ? (
          /* Error State */
          <div className="w-full rounded-2xl border border-red-500/20 bg-red-950/20 p-12 text-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400 mx-auto">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Movie Details Unavailable</h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
                {error}
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={loadData}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 hover:opacity-90 transition shadow"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Retry</span>
              </button>
              <Link
                to="/movies"
                className="px-5 py-2.5 rounded-xl text-xs font-medium text-zinc-300 border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 transition"
              >
                Browse All Movies
              </Link>
            </div>
          </div>
        ) : (
          <TheMovieDetail movie={movie} relatedMovies={relatedMovies} />
        )}
      </main>

      <Footer />
    </div>
  );
}
