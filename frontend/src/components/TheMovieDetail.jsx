import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Play,
  Download,
  Star,
  Clock,
  Calendar,
  Share2,
  Bookmark,
  ChevronRight,
  ArrowLeft,
  Check,
  Award,
  Film,
  Tv,
  Info,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import MovieCard from "./MovieCard";
import DownloadButtons from "./DownloadButtons";

export default function TheMovieDetail({ movie, relatedMovies = [] }) {
  const navigate = useNavigate();
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!movie) {
    return (
      <div className="w-full text-center py-20 text-zinc-400">
        <Film className="h-10 w-10 mx-auto text-zinc-600 mb-2" />
        <p>No movie details available.</p>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full text-white space-y-8 animate-fade-in">
      {/* Breadcrumb Navigation Bar */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-400">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
          <Link to="/movies" className="hover:text-white transition">
            Movies
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
          <span className="text-zinc-200 font-medium truncate max-w-[200px] sm:max-w-md">
            {movie.title}
          </span>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back</span>
        </button>
      </div>

      {/* Cinematic Hero Backdrop & Detail Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        {/* Backdrop Background Image with Gradients */}
        <div className="absolute inset-0 h-full w-full">
          <img
            src={movie.backdrop || movie.poster}
            alt={`${movie.title} backdrop`}
            className="h-full w-full object-cover opacity-20 filter blur-[2px] transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col md:flex-row gap-6 lg:gap-10 p-5 sm:p-8 lg:p-10">
          {/* Movie Poster Card */}
          <div className="shrink-0 w-44 sm:w-56 lg:w-64 mx-auto md:mx-0">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl border border-zinc-700/80 shadow-2xl shadow-black/80">
              <img
                src={movie.poster}
                alt={movie.title}
                className="h-full w-full object-cover"
              />
              <span className="absolute top-2.5 right-2.5 rounded-lg bg-black/85 px-2 py-0.5 text-xs font-black uppercase text-amber-400 border border-amber-400/30 backdrop-blur-sm">
                IMDb {movie.imdbRating || movie.rating || "N/A"}
              </span>
            </div>
          </div>

          {/* Metadata & Information */}
          <div className="flex-1 flex flex-col justify-between space-y-5">
            <div>
              {/* Genre Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {movie.genres?.map((genre) => (
                  <Link
                    key={genre}
                    to={`/genres?genre=${encodeURIComponent(genre)}`}
                    className="rounded-full bg-zinc-800/90 border border-zinc-700/60 px-3 py-1 text-xs font-medium text-zinc-300 hover:border-zinc-500 hover:text-white transition"
                  >
                    {genre}
                  </Link>
                ))}
              </div>

              {/* Title & Tagline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-xs sm:text-sm italic text-zinc-400 mt-1 font-serif">
                  "{movie.tagline}"
                </p>
              )}

              {/* Meta Specs Row */}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-300">
                {/* Rating Badge */}
                <div className="flex items-center gap-1.5 font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-lg">
                  <Star className="h-4 w-4 fill-amber-400" />
                  <span>
                    {movie.imdbRating
                      ? movie.imdbRating
                      : movie.rating
                      ? Number(movie.rating).toFixed(1)
                      : "N/A"}
                  </span>
                  {movie.imdbVotes && (
                    <span className="text-[11px] text-zinc-400 font-normal">
                      ({movie.imdbVotes} votes)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-zinc-400">
                  <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                  <span>{movie.year || "N/A"}</span>
                </div>

                <div className="flex items-center gap-1 text-zinc-400">
                  <Clock className="h-3.5 w-3.5 text-zinc-500" />
                  <span>{movie.duration || "N/A"}</span>
                </div>

                {movie.rated && movie.rated !== "N/A" && (
                  <span className="rounded bg-zinc-800 px-2 py-0.5 text-xs font-bold text-zinc-300 border border-zinc-700">
                    {movie.rated}
                  </span>
                )}

                {movie.status && (
                  <span className="text-xs text-zinc-400 hidden sm:inline">
                    • {movie.status}
                  </span>
                )}
              </div>

              {/* Synopsis */}
              <div className="mt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Plot Overview
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
                  {movie.synopsis}
                </p>
              </div>

              {/* Director & Production Details Grid */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-t border-zinc-800/80 pt-4">
                <div>
                  <span className="text-zinc-500 block">Director</span>
                  <span className="text-zinc-200 font-medium">
                    {movie.director || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Release Date</span>
                  <span className="text-zinc-200 font-medium">
                    {movie.releaseDate || movie.year || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block">TMDB ID</span>
                  <span className="text-zinc-200 font-mono text-[11px]">
                    {movie.id}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block">IMDb ID</span>
                  <span className="text-zinc-200 font-mono text-[11px]">
                    {movie.imdb_id || "N/A"}
                  </span>
                </div>
              </div>

              {/* Awards Banner if present */}
              {movie.awards && movie.awards !== "N/A" && (
                <div className="mt-3 flex items-center gap-2 text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg max-w-xl">
                  <Award className="h-4 w-4 shrink-0 text-amber-400" />
                  <span className="truncate">{movie.awards}</span>
                </div>
              )}
            </div>

            {/* Action Bar: Watch Stream Now & Download */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
              <div className="flex flex-col xs:flex-row gap-2.5 sm:gap-3 flex-1">
                <Link
                  to={`/watch/${movie.id}${movie.media_type === "tv" ? "?type=tv" : ""}`}
                  className="flex-1 min-h-[48px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-zinc-950 bg-gradient-to-r from-zinc-100 via-white to-zinc-300 hover:opacity-95 active:scale-[0.98] transition-all shadow-lg shadow-white/10"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>Watch Stream Now</span>
                </Link>

                {/* Direct Server Download Button */}
                <a
                  href={`http://localhost:5000/api/movies/${movie.id}/download?quality=1080p`}
                  download={`${(movie.title || "Movie").replace(/[^a-zA-Z0-9]/g, "_")}_1080p.mp4`}
                  className="flex-1 min-h-[48px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-zinc-950 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 hover:opacity-95 active:scale-[0.98] transition-all shadow-md"
                  title="Download full video file directly from server"
                >
                  <Download className="h-4 w-4" />
                  <span>{movie.media_type === "tv" ? "Download (.mp4)" : "Download (.mp4)"}</span>
                </a>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setShowDownloadModal(true)}
                  className="flex-1 sm:flex-initial min-h-[44px] flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl font-semibold text-xs text-zinc-300 border border-zinc-700/80 bg-zinc-900 hover:bg-zinc-800 hover:text-white transition-all shadow-sm active:scale-95"
                  title="Choose quality (4K / 720p / 480p)"
                >
                  <span>Options</span>
                </button>

                {/* Add to Watchlist */}
                <button
                  type="button"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  title="Add to Watchlist"
                  className={`flex-1 sm:flex-initial min-h-[44px] flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all active:scale-95 ${
                    isBookmarked
                      ? "bg-zinc-800 border-zinc-500 text-white"
                      : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800"
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                  <span>{isBookmarked ? "Saved" : "Watchlist"}</span>
                </button>

                {/* Share Button */}
                <button
                  type="button"
                  onClick={handleShare}
                  title="Share link"
                  className="flex-1 sm:flex-initial min-h-[44px] flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Where to Watch Section */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <Tv className="h-5 w-5 text-zinc-300" />
            <h3 className="text-base font-bold text-white">Where to Watch</h3>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Streaming Ready
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-zinc-200">
              High-Speed Multi-Server Streaming Available
            </h4>
            <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
              Watch {movie.title} instantly in HD with multi-language audio across 4 high-speed streaming servers or download for offline viewing.
            </p>
          </div>

          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 w-full sm:w-auto">
            <Link
              to={`/watch/${movie.id}${movie.media_type === "tv" ? "?type=tv" : ""}`}
              className="min-h-[44px] flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 hover:opacity-95 transition shadow-sm whitespace-nowrap active:scale-95 text-center"
            >
              Launch Player
            </Link>
            <a
              href={`http://localhost:5000/api/movies/${movie.id}/download?quality=1080p`}
              download={`${(movie.title || "Movie").replace(/[^a-zA-Z0-9]/g, "_")}_1080p.mp4`}
              className="min-h-[44px] flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-300 border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 hover:text-white transition whitespace-nowrap gap-1.5 active:scale-95 text-center"
              title="Download movie file from server"
            >
              <Download className="h-3.5 w-3.5 text-zinc-400" />
              <span>Download .mp4</span>
            </a>
          </div>
        </div>
      </section>

      {/* Critic Scores & Verified Ratings from TMDB & OMDb */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
          <span>Critical Scores &amp; Ratings</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* IMDb Score */}
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 flex flex-col justify-between">
            <span className="text-xs text-zinc-400 font-medium">IMDb Rating</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-black text-amber-400">
                {movie.imdbRating || "N/A"}
              </span>
              <span className="text-xs text-zinc-500">/ 10</span>
            </div>
            <span className="text-[11px] text-zinc-500 mt-1 truncate">
              {movie.imdbVotes ? `${movie.imdbVotes} votes` : "Verified database"}
            </span>
          </div>

          {/* Rotten Tomatoes */}
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 flex flex-col justify-between">
            <span className="text-xs text-zinc-400 font-medium">Rotten Tomatoes</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-black text-rose-400">
                {movie.rottenTomatoes || "N/A"}
              </span>
            </div>
            <span className="text-[11px] text-zinc-500 mt-1">Tomatometer Score</span>
          </div>

          {/* Metacritic */}
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 flex flex-col justify-between">
            <span className="text-xs text-zinc-400 font-medium">Metascore</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-black text-emerald-400">
                {movie.metacritic || "N/A"}
              </span>
            </div>
            <span className="text-[11px] text-zinc-500 mt-1">Metacritic consensus</span>
          </div>

          {/* TMDB Score */}
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 flex flex-col justify-between">
            <span className="text-xs text-zinc-400 font-medium">TMDB User Score</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-black text-blue-400">
                {movie.rating ? Number(movie.rating).toFixed(1) : "N/A"}
              </span>
              <span className="text-xs text-zinc-500">/ 10</span>
            </div>
            <span className="text-[11px] text-zinc-500 mt-1">
              {movie.voteCount ? `${movie.voteCount.toLocaleString()} votes` : "Audience rating"}
            </span>
          </div>
        </div>
      </section>

      {/* Official YouTube Trailer Embed */}
      {movie.trailerKey && (
        <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2">
            <FaYoutube className="h-5 w-5 text-red-500" />
            <h3 className="text-base font-bold text-white">Official Movie Trailer</h3>
          </div>
          <div className="relative w-full aspect-video max-h-[550px] rounded-2xl overflow-hidden border border-zinc-800 bg-black shadow-inner">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${movie.trailerKey}`}
              title={`${movie.title} - Official Trailer`}
              className="w-full h-full border-0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </section>
      )}

      {/* Cast & Crew Section */}
      {movie.cast && movie.cast.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span className="h-5 w-1 rounded-full bg-zinc-400" />
            Top Cast &amp; Performers
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
            {movie.cast.map((actor) => (
              <div
                key={actor.id || actor.name}
                className="flex items-center gap-3 p-3 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 transition"
              >
                <img
                  src={actor.avatar}
                  alt={actor.name}
                  className="h-11 w-11 rounded-full object-cover border border-zinc-700 shrink-0"
                  loading="lazy"
                />
                <div className="truncate">
                  <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                    {actor.name}
                  </h4>
                  <p className="text-[11px] text-zinc-400 truncate">
                    {actor.character || "Cast"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* More Recommended Movies */}
      {relatedMovies.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-zinc-400" />
              More Popular Titles
            </h2>
            <Link
              to="/movies"
              className="text-xs font-medium text-zinc-400 hover:text-white transition flex items-center gap-1"
            >
              <span>Explore All</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {relatedMovies.map((relMovie) => (
              <MovieCard key={relMovie.id} movie={relMovie} />
            ))}
          </div>
        </section>
      )}

      {/* Download Modal */}
      {showDownloadModal && (
        <DownloadButtons
          movie={movie}
          isOpen={showDownloadModal}
          onClose={() => setShowDownloadModal(false)}
        />
      )}
    </div>
  );
}