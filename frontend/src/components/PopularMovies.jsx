import React, { useState, useEffect } from "react";
import MovieCarousel from "./MovieCarousel";
import MovieGrid from "./MovieGrid";
import MovieCardSkeleton from "./MovieCardSkeleton";
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchPopularSeries,
  fetchAdultAnimation,
  GENRES_LIST,
} from "../services/movieApi";
import { AlertCircle, RefreshCw, Flame, Tv, Film, Sparkles, Zap } from "lucide-react";

export default function PopularMovies() {
  const [trendingNow, setTrendingNow] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [adultAnimation, setAdultAnimation] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("All");

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [trending, series, movies, animation] = await Promise.all([
        fetchTrendingMovies().catch(() => []),
        fetchPopularSeries(1).catch(() => []),
        fetchPopularMovies(1).catch(() => []),
        fetchAdultAnimation().catch(() => []),
      ]);

      setTrendingNow(trending);
      setPopularSeries(series);
      setPopularMovies(movies);
      setAdultAnimation(animation);
    } catch (err) {
      console.error("Failed to load home page sections:", err);
      setError(err.message || "Failed to load content from backend.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter popular movies by genre if selected
  const filteredMovies =
    selectedGenre === "All"
      ? popularMovies
      : popularMovies.filter(
          (m) =>
            m.genres &&
            m.genres.some((g) => g.toLowerCase() === selectedGenre.toLowerCase())
        );

  // Error Banner State
  if (error) {
    return (
      <div className="w-full rounded-2xl border border-red-500/20 bg-red-950/20 p-8 text-center space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400 mx-auto">
          <AlertCircle className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">Unable to Connect to Backend</h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">{error}</p>
        </div>
        <button
          onClick={loadData}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 hover:opacity-90 transition shadow"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Retry Connection</span>
        </button>
      </div>
    );
  }

  // Loading Skeleton State
  if (isLoading) {
    return (
      <div className="w-full space-y-12">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-4">
            <div className="h-6 w-52 bg-zinc-800 rounded animate-pulse" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {Array.from({ length: 6 }).map((_, j) => (
                <MovieCardSkeleton key={j} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full space-y-14">
      {/* SECTION 1: Trending Now */}
      {trendingNow.length > 0 && (
        <section className="space-y-4">
          <MovieCarousel
            title="Trending Now"
            subtitle="Most watched releases & hot titles worldwide this week"
            movies={trendingNow.slice(0, 12)}
            viewAllLink="/movies"
          />
        </section>
      )}

      {/* SECTION 2: Popular Series */}
      {popularSeries.length > 0 && (
        <section className="space-y-4">
          <MovieCarousel
            title="Popular TV Shows"
            subtitle="Top rated television shows, episodic dramas & streaming hits"
            movies={popularSeries.slice(0, 12)}
            viewAllLink="/tv-shows"
          />
        </section>
      )}

      {/* SECTION 3: Popular Movies (with Interactive Genre Filters) */}
      {popularMovies.length > 0 && (
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between pb-1">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-gradient-to-b from-zinc-200 to-zinc-500" />
                Popular Movies
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Blockbusters, cinematic masterworks & box office champions
              </p>
            </div>
          </div>

          <MovieGrid
            title=""
            movies={filteredMovies}
            showFilters={true}
            activeGenre={selectedGenre}
            onSelectGenre={(g) => setSelectedGenre(g)}
            genres={GENRES_LIST}
          />
        </section>
      )}

      {/* SECTION 4: Adult Animation */}
      {adultAnimation.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-zinc-900/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30">
                18+ TV-MA
              </span>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span className="h-5 w-1 rounded-full bg-rose-500" />
                  Adult Animation
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Cult anime, provocative dark comedies & mature animated epics
                </p>
              </div>
            </div>
          </div>

          <MovieCarousel
            title=""
            subtitle=""
            movies={adultAnimation.slice(0, 14)}
            viewAllLink="/genres?genre=Animation"
          />
        </section>
      )}
    </div>
  );
}
