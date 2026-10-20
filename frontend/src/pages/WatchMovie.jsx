import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DownloadButtons from "../components/DownloadButtons";
import MovieCard from "../components/MovieCard";
import { fetchMovieDetails, fetchPopularMovies } from "../services/movieApi";
import {
  Server,
  Download,
  Star,
  ChevronRight,
  ArrowLeft,
  Film,
  Play,
  AlertCircle,
  Tv,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";

export default function WatchMovie() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const movieId = id || "155"; // Default: The Dark Knight
  const mediaTypeParam = searchParams.get("type");

  const [movie, setMovie] = useState(null);
  const [related, setRelated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active server: default to Server 1 (VidLink Cloud)
  const [activeServerId, setActiveServerId] = useState("vidlink");
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // TV Series Seasons & Episodes
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchMovieDetails(movieId, mediaTypeParam);
      setMovie(data);

      if (data.seasons && data.seasons.length > 0) {
        const firstSeason = data.seasons[0];
        setSelectedSeason(firstSeason.season_number || 1);
        setSelectedEpisode(1);
      }

      try {
        const pop = await fetchPopularMovies(1);
        setRelated(pop.filter((m) => String(m.id) !== String(movieId)).slice(0, 6));
      } catch (_) {
        setRelated([]);
      }
    } catch (err) {
      console.error("Error loading movie stream page:", err);
      setError(err.message || "Failed to load stream details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadData();
  }, [movieId, mediaTypeParam]);

  const isTv = movie?.media_type === "tv" || (movie?.seasons && movie.seasons.length > 0);
  const targetId = movie?.id || movieId;

  // Cloud streaming embed servers (Direct Stream removed as requested)
  const servers = [
    {
      id: "vidlink",
      name: "Server 1 (VidLink Cloud)",
      type: "embed",
      url: isTv
        ? `https://vidlink.pro/tv/${targetId}/${selectedSeason}/${selectedEpisode}`
        : `https://vidlink.pro/movie/${targetId}`,
      badge: "Multi-Audio",
      speed: "Fast CDN",
      desc: "Multi-language audio & global cloud mirrors",
    },
    {
      id: "multiembed",
      name: "Server 2 (MultiEmbed)",
      type: "embed",
      url: isTv
        ? `https://multiembed.mov/?video_id=${targetId}&tmdb=1&s=${selectedSeason}&e=${selectedEpisode}`
        : `https://multiembed.mov/?video_id=${targetId}&tmdb=1`,
      badge: "1080p Ultra",
      speed: "Global",
      desc: "High-definition multi-subtitle stream",
    },
    {
      id: "vidsrc",
      name: "Server 3 (VidSrc Mirror)",
      type: "embed",
      url: isTv
        ? `https://vidsrc.xyz/embed/tv?tmdb=${targetId}&season=${selectedSeason}&episode=${selectedEpisode}`
        : `https://vidsrc.xyz/embed/movie?tmdb=${targetId}`,
      badge: "HD Mirror",
      speed: "Cloud",
      desc: "Alternative video distribution server",
    },
    {
      id: "autoembed",
      name: "Server 4 (AutoEmbed)",
      type: "embed",
      url: isTv
        ? `https://player.autoembed.cc/embed/tv/${targetId}/${selectedSeason}/${selectedEpisode}`
        : `https://player.autoembed.cc/embed/movie/${targetId}`,
      badge: "Auto CDN",
      speed: "Adaptive",
      desc: "Adaptive dynamic streaming source",
    },
  ];

  if (movie?.trailerKey) {
    servers.push({
      id: "trailer",
      name: "Server 5 (Official Trailer 4K)",
      type: "embed",
      url: `https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&rel=0`,
      badge: "YouTube 4K",
      speed: "Official",
      desc: "Official theatrical studio trailer",
    });
  }

  const currentServer = servers.find((s) => s.id === activeServerId) || servers[0];

  // Active season episode count
  const currentSeasonObj = (movie?.seasons || []).find((s) => s.season_number === selectedSeason);
  const totalEpisodesInSeason = currentSeasonObj?.episode_count || 10;

  const cleanTitle = (movie?.title || "Movie").replace(/[^a-zA-Z0-9]/g, "_");
  const serverDownloadUrl = `http://localhost:5000/api/movies/${movie?.id || movieId}/download?quality=1080p`;
  const serverDownloadFilename = `${cleanTitle}_1080p.mp4`;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between">
      <Header />

      <main className="mx-auto w-full max-w-[1600px] px-3 pt-24 pb-16 sm:px-6 xl:px-8 flex-1 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-400">
          <div className="flex items-center gap-1.5 truncate">
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
            {isTv && (
              <>
                <Link to="/tv-shows" className="hover:text-white transition">
                  TV Shows
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
              </>
            )}
            <Link
              to={`/details/${movie?.id || movieId}`}
              className="hover:text-white transition truncate"
            >
              {movie?.title || "Details"}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
            <span className="text-zinc-200 font-medium">
              {isTv ? `S${selectedSeason} E${selectedEpisode} Stream` : "Watch Stream"}
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

        {isLoading ? (
          /* Loading Placeholder */
          <div className="w-full aspect-video max-h-[660px] rounded-3xl bg-zinc-900 border border-zinc-800 animate-pulse flex flex-col items-center justify-center gap-3">
            <Film className="h-12 w-12 text-zinc-600 animate-spin" />
            <span className="text-xs font-semibold text-zinc-400">Loading Stream Player...</span>
          </div>
        ) : error ? (
          /* Error State */
          <div className="w-full rounded-2xl border border-red-500/20 bg-red-950/20 p-12 text-center space-y-4">
            <AlertCircle className="h-10 w-10 text-red-400 mx-auto" />
            <h2 className="text-lg font-bold text-white">Stream Loading Error</h2>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">{error}</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={loadData}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 hover:opacity-90 transition"
              >
                Retry Loading
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Server Status Header Chip */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-zinc-200 font-medium">
                  {currentServer.name} Active
                </span>
                <span className="text-zinc-600 hidden md:inline">•</span>
                <span className="hidden md:inline text-zinc-400">
                  {currentServer.desc}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                <span>Select a streaming server below or download video file directly from server.</span>
              </div>
            </div>

            {/* Video Player Container */}
            <div className="relative w-full aspect-video max-h-[660px] rounded-3xl overflow-hidden bg-black border border-zinc-800 shadow-2xl flex flex-col justify-center">
              <iframe
                key={`${currentServer.id}-${selectedSeason}-${selectedEpisode}`}
                src={currentServer.url}
                title={`${movie.title} - Stream`}
                className="w-full h-full border-0 bg-black"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>

            {/* Server Switcher Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-zinc-800 bg-zinc-950">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-zinc-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Select Streaming Server:
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {servers.map((server) => {
                  const isActive = activeServerId === server.id;
                  return (
                    <button
                      key={server.id}
                      onClick={() => setActiveServerId(server.id)}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                        isActive
                          ? "bg-gradient-to-r from-zinc-200 via-white to-zinc-300 text-zinc-950 shadow-md font-bold"
                          : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isActive ? "bg-emerald-600 animate-pulse" : "bg-emerald-500"
                        }`}
                      />
                      <span>{server.name}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded ${
                          isActive
                            ? "bg-zinc-900 text-white font-normal"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {server.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TV Series Episode & Season Selector (Rendered if TV series) */}
            {isTv && (
              <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <Tv className="h-4 w-4 text-amber-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Seasons &amp; Episodes
                    </h3>
                  </div>

                  {/* Season Dropdown or Buttons */}
                  {movie.seasons && movie.seasons.length > 0 && (
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                      <span className="text-xs text-zinc-400 shrink-0">Season:</span>
                      {movie.seasons.map((s) => (
                        <button
                          key={s.id || s.season_number}
                          onClick={() => {
                            setSelectedSeason(s.season_number);
                            setSelectedEpisode(1);
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition shrink-0 ${
                            selectedSeason === s.season_number
                              ? "bg-white text-zinc-950 shadow font-bold"
                              : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
                          }`}
                        >
                          Season {s.season_number}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Episodes Grid */}
                <div className="space-y-2">
                  <div className="text-xs text-zinc-400 flex items-center justify-between">
                    <span>Select Episode:</span>
                    <span className="text-zinc-500">
                      Now streaming: Season {selectedSeason}, Episode {selectedEpisode}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
                    {Array.from({ length: totalEpisodesInSeason }).map((_, idx) => {
                      const epNum = idx + 1;
                      const isCurrent = selectedEpisode === epNum;
                      return (
                        <button
                          key={epNum}
                          onClick={() => setSelectedEpisode(epNum)}
                          className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-semibold transition ${
                            isCurrent
                              ? "bg-gradient-to-r from-zinc-200 via-white to-zinc-300 text-zinc-950 shadow-md font-bold scale-105"
                              : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                          }`}
                        >
                          <span className="text-[10px] text-zinc-400 font-normal">EP</span>
                          <span className="text-sm">{epNum}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Movie Info & Actions Bar */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 p-6 rounded-2xl border border-zinc-800 bg-zinc-950">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/20 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400" />
                    {movie.imdbRating || movie.rating}
                  </span>
                  <span className="text-zinc-400">• {movie.year}</span>
                  <span className="text-zinc-400">• {movie.duration}</span>
                  <span className="text-zinc-400">• {movie.rated || "TV-MA / PG-13"}</span>
                  {movie.genres?.map((g) => (
                    <span
                      key={g}
                      className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px]"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {movie.title}
                  {isTv && (
                    <span className="text-zinc-400 text-lg font-normal ml-2">
                      (Season {selectedSeason}, Episode {selectedEpisode})
                    </span>
                  )}
                </h1>
                <p className="text-sm text-zinc-400 leading-relaxed">{movie.synopsis}</p>
              </div>

              {/* Download & Details Action Buttons */}
              <div className="flex flex-col gap-2.5 w-full md:w-auto shrink-0">
                {/* Real Server Download Button: Downloads actual .mp4 file directly from server */}
                <a
                  href={serverDownloadUrl}
                  download={serverDownloadFilename}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs text-zinc-950 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 hover:opacity-90 active:scale-[0.98] transition shadow-md"
                  title="Download actual playable .mp4 video file from server"
                >
                  <Download className="h-4 w-4" />
                  <span>Download {isTv ? "Episode" : "Movie"} (.mp4)</span>
                </a>

                {/* More Qualities / Modal */}
                <button
                  type="button"
                  onClick={() => setShowDownloadModal(true)}
                  className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-medium text-xs text-zinc-300 border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:text-white transition"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>Select Other Qualities (480p / 720p / 4K)</span>
                </button>

                <Link
                  to={`/details/${movie.id}`}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs text-zinc-400 hover:text-zinc-200 transition text-center"
                >
                  <span>Full Details &amp; Cast</span>
                </Link>
              </div>
            </div>

            {/* Recommended Titles Section */}
            {related.length > 0 && (
              <section className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span className="h-5 w-1 rounded-full bg-zinc-400" />
                    Recommended Next
                  </h2>
                  <Link
                    to={isTv ? "/tv-shows" : "/movies"}
                    className="text-xs font-medium text-zinc-400 hover:text-white transition"
                  >
                    Browse All Titles
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                  {related.map((item) => (
                    <MovieCard key={item.id} movie={item} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* Download Modal */}
      {showDownloadModal && (
        <DownloadButtons
          movie={movie}
          isOpen={showDownloadModal}
          onClose={() => setShowDownloadModal(false)}
        />
      )}

      <Footer />
    </div>
  );
}
