import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieGrid from "../components/MovieGrid";
import {
  fetchPopularSeries,
  fetchTrendingSeries,
  fetchTopRatedSeries,
  fetchAdultAnimation,
  searchMovies,
} from "../services/movieApi";
import { Search, Sparkles, AlertCircle, RefreshCw, Tv, Star, Flame, Award, Film, Play } from "lucide-react";

const TV_SHOW_TABS = [
  "All TV Shows",
  "Trending This Week",
  "Top Rated",
  "Adult Animation",
  "Sci-Fi & Fantasy",
  "Drama & Crime",
  "Action & Adventure",
  "Comedy",
];

export default function TVShows() {
  const [showsList, setShowsList] = useState([]);
  const [activeTab, setActiveTab] = useState("All TV Shows");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadShows = async (pageNum = 1) => {
    try {
      setIsLoading(true);
      setError(null);

      if (searchQuery.trim()) {
        const res = await searchMovies(searchQuery.trim(), pageNum);
        setShowsList(res.movies || []);
      } else if (activeTab === "Trending This Week") {
        const res = await fetchTrendingSeries();
        setShowsList(res);
      } else if (activeTab === "Top Rated") {
        const res = await fetchTopRatedSeries(pageNum);
        setShowsList(res);
      } else if (activeTab === "Adult Animation") {
        const res = await fetchAdultAnimation();
        const tvAnimation = res.filter(
          (item) => item.media_type === "tv" || item.genres?.includes("Animation")
        );
        setShowsList(tvAnimation.length > 0 ? tvAnimation : res);
      } else if (activeTab === "Sci-Fi & Fantasy") {
        const res = await fetchPopularSeries(pageNum);
        const filtered = res.filter(
          (s) =>
            s.genres &&
            (s.genres.includes("Sci-Fi & Fantasy") ||
              s.genres.includes("Science Fiction") ||
              s.genres.includes("Fantasy") ||
              s.genres.includes("Action & Adventure"))
        );
        setShowsList(filtered.length > 0 ? filtered : res);
      } else if (activeTab === "Drama & Crime") {
        const res = await fetchPopularSeries(pageNum);
        const filtered = res.filter(
          (s) =>
            s.genres &&
            (s.genres.includes("Drama") || s.genres.includes("Crime") || s.genres.includes("Mystery"))
        );
        setShowsList(filtered.length > 0 ? filtered : res);
      } else if (activeTab === "Action & Adventure") {
        const res = await fetchPopularSeries(pageNum);
        const filtered = res.filter(
          (s) =>
            s.genres &&
            (s.genres.includes("Action") ||
              s.genres.includes("Adventure") ||
              s.genres.includes("Action & Adventure"))
        );
        setShowsList(filtered.length > 0 ? filtered : res);
      } else if (activeTab === "Comedy") {
        const res = await fetchPopularSeries(pageNum);
        const filtered = res.filter(
          (s) => s.genres && s.genres.includes("Comedy")
        );
        setShowsList(filtered.length > 0 ? filtered : res);
      } else {
        // "All TV Shows"
        const res = await fetchPopularSeries(pageNum);
        setShowsList(res);
      }
    } catch (err) {
      console.error("Error loading TV Shows page:", err);
      setError(err.message || "Failed to fetch TV Shows library.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(1);
    loadShows(1);
  }, [activeTab]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    loadShows(1);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery("");
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    try {
      let more = [];
      if (activeTab === "Top Rated") {
        more = await fetchTopRatedSeries(nextPage);
      } else {
        more = await fetchPopularSeries(nextPage);
      }
      if (more.length > 0) {
        setShowsList((prev) => {
          const map = new Map();
          prev.forEach((item) => map.set(item.id, item));
          more.forEach((item) => map.set(item.id, item));
          return Array.from(map.values());
        });
      }
    } catch (err) {
      console.error("Error loading more TV shows:", err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between">
      <Header />

      <main className="mx-auto w-full max-w-[1600px] px-3 pt-24 pb-16 sm:px-6 xl:px-8 flex-1 space-y-8">
        {/* TV Shows Page Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 p-6 sm:p-10 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
              <Tv className="h-3.5 w-3.5 text-amber-400" />
              <span>TV Shows &amp; Series Hub</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Discover Popular TV Shows
            </h1>
            <p className="text-sm sm:text-base text-zinc-400">
              Stream and binge full seasons of world-class TV dramas, comedy series, adult animation, and sci-fi hits with complete episode playlists.
            </p>

            {/* Live TV Show Search Form */}
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
                  placeholder="Search TV shows (e.g. Breaking Bad, Arcane, Succession)..."
                  className="w-full h-11 pl-10 pr-20 bg-zinc-900/90 border border-zinc-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Background Ambient Glow */}
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {TV_SHOW_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-zinc-200 via-white to-zinc-300 text-zinc-950 font-bold shadow-lg"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Error Notification */}
        {error ? (
          <div className="w-full rounded-2xl border border-red-500/20 bg-red-950/20 p-8 text-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400 mx-auto">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">TV Shows Connection Error</h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">{error}</p>
            </div>
            <button
              onClick={() => loadShows(page)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 hover:opacity-90 transition shadow"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Retry</span>
            </button>
          </div>
        ) : (
          /* TV Shows Grid */
          <div className="space-y-8">
            <MovieGrid
              movies={showsList}
              title={
                searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : activeTab
              }
              isLoading={isLoading}
              showFilters={false}
            />

            {/* Load More Button */}
            {!isLoading && showsList.length > 0 && !searchQuery && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-3 rounded-xl text-xs font-semibold text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition shadow"
                >
                  Load More TV Shows
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
