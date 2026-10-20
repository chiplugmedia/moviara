import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Play, Download, Star, Heart, Info, ArrowUpRight } from "lucide-react";
import DownloadButtons from "./DownloadButtons";

export default function MovieCard({ movie, onOpenDownload }) {
  const [imgError, setImgError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const navigate = useNavigate();

  if (!movie) return null;

  const fallbackPoster =
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80";

  const posterSrc = imgError || !movie.poster ? fallbackPoster : movie.poster;

  const handleDownloadClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onOpenDownload) {
      onOpenDownload(movie);
    } else {
      setShowDownloadModal(true);
    }
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };

  // Determine quality tag
  const is4K = (movie.voteCount && movie.voteCount > 500) || movie.rating >= 8.0;

  return (
    <>
      <div className="group relative flex flex-col w-full rounded-2xl overflow-hidden bg-zinc-900/90 border border-zinc-800/80 transition-all duration-300 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-1 active:scale-[0.98] touch-manipulation">
        {/* Poster Image Container with Strict Aspect Ratio (Prevents CLS) */}
        <Link
          to={`/details/${movie.id}`}
          className="relative w-full aspect-[2/3] overflow-hidden bg-zinc-950 block"
          aria-label={`View details for ${movie.title}`}
        >
          <img
            src={posterSrc}
            alt={movie.title}
            onError={() => setImgError(true)}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Dark Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-black/30 pointer-events-none" />

          {/* Top Badges: Rating & Quality */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10 pointer-events-none">
            {/* Rating Badge */}
            <div className="flex items-center gap-1 rounded-md bg-black/80 px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-amber-400 backdrop-blur-sm border border-white/10 shadow">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span>{movie.rating ? Number(movie.rating).toFixed(1) : "N/A"}</span>
            </div>

            {/* Quality Badge */}
            <span
              className={`rounded-md px-1.5 py-0.5 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide backdrop-blur-sm shadow border ${
                is4K
                  ? "bg-gradient-to-r from-amber-500/90 to-yellow-600/90 text-zinc-950 border-amber-400/40 font-black"
                  : "bg-black/75 text-zinc-300 border-white/10"
              }`}
            >
              {is4K ? "4K" : "HD"}
            </span>
          </div>

          {/* Mobile Play Badge Indicator (Visible on mobile/touch, hidden on desktop hover) */}
          <div className="md:hidden absolute bottom-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-950 shadow-md backdrop-blur-sm">
            <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
          </div>

          {/* Desktop Hover Overlay with Action Buttons */}
          <div className="hidden md:flex absolute inset-0 z-20 flex-col items-center justify-center bg-gradient-to-t from-black/95 via-black/60 to-black/30 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100 p-4">
            {/* Center Play Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/watch/${movie.id}`);
              }}
              aria-label={`Watch ${movie.title} now`}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-zinc-100 via-white to-zinc-300 text-zinc-950 shadow-xl shadow-black/80 transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              <Play className="h-5 w-5 fill-current ml-0.5" />
            </button>
            <span className="mt-2 text-xs font-bold text-white tracking-wide">
              Stream Now
            </span>

            {/* Bottom Quick Actions Bar */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-1.5">
              <a
                href={`http://localhost:5000/api/movies/${movie.id}/download?quality=1080p`}
                download={`${(movie.title || "Movie").replace(/[^a-zA-Z0-9]/g, "_")}_1080p.mp4`}
                onClick={(e) => e.stopPropagation()}
                title={`Download ${movie.title} (.mp4) from server`}
                aria-label={`Download ${movie.title}`}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 text-xs font-medium border border-zinc-700/80 transition hover:text-white"
              >
                <Download className="h-3.5 w-3.5 text-zinc-300" />
                <span>Download</span>
              </a>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleFavoriteClick}
                  title={isLiked ? "Remove from Favorites" : "Add to Favorites"}
                  aria-label="Add to Favorites"
                  className={`p-1.5 rounded-lg border transition ${
                    isLiked
                      ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                      : "bg-zinc-900/90 text-zinc-300 border-zinc-700/80 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <Heart
                    className={`h-3.5 w-3.5 ${
                      isLiked ? "fill-rose-500 text-rose-500" : ""
                    }`}
                  />
                </button>

                <div
                  title="View Details"
                  className="p-1.5 rounded-lg bg-zinc-900/90 text-zinc-300 border border-zinc-700/80 hover:bg-zinc-800 hover:text-white transition"
                >
                  <Info className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Card Details Bar with Accessible Touch Target */}
        <Link
          to={`/details/${movie.id}`}
          className="flex flex-col p-2.5 sm:p-3 bg-zinc-950/80 border-t border-zinc-800/80 hover:bg-zinc-900/80 transition flex-grow justify-between min-h-[58px]"
        >
          <div className="flex items-start justify-between gap-1">
            <h3
              className="w-full truncate text-xs sm:text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors"
              title={movie.title}
            >
              {movie.title}
            </h3>
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
          </div>

          <div className="mt-1 flex items-center justify-between text-[10px] sm:text-[11px] text-zinc-400">
            <span>{movie.year || "N/A"}</span>
            <div className="flex items-center gap-1.5 truncate">
              {movie.genres?.[0] && (
                <span className="rounded bg-zinc-800/90 px-1.5 py-0.5 text-[9px] sm:text-[10px] text-zinc-300 font-medium truncate max-w-[85px] sm:max-w-[100px]">
                  {movie.genres[0]}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>

      {/* Local Download Modal if triggered from this card */}
      {showDownloadModal && (
        <DownloadButtons
          movie={movie}
          isOpen={showDownloadModal}
          onClose={() => setShowDownloadModal(false)}
        />
      )}
    </>
  );
}
