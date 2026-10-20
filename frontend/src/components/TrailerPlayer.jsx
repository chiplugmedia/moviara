import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from "lucide-react";

export default function TrailerPlayer({
  videoSrc,
  posterSrc,
  title = "Movie Trailer",
  autoPlay = true,
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const seekTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2500);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="relative w-full aspect-video max-h-[520px] overflow-hidden rounded-2xl bg-black border border-zinc-800 shadow-2xl group"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        autoPlay={autoPlay}
        muted={isMuted}
        playsInline
        loop
        className="h-full w-full object-cover cursor-pointer"
        onClick={togglePlay}
      />

      {/* Center Play Button when paused */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-opacity"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-zinc-100 via-white to-zinc-300 text-zinc-950 shadow-2xl hover:scale-110 active:scale-95 transition-transform">
            <Play className="h-7 w-7 fill-current ml-1" />
          </div>
        </div>
      )}

      {/* Video Controls Overlay */}
      <div
        className={`absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end p-4 bg-gradient-to-t from-black via-black/70 to-transparent transition-opacity duration-300 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Progress Seekbar */}
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          aria-label="Video seek bar"
          className="w-full h-1 bg-zinc-700/80 rounded-lg appearance-none cursor-pointer accent-white hover:h-1.5 transition-all"
        />

        {/* Control Buttons Bar */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause trailer" : "Play trailer"}
              className="text-white hover:text-zinc-300 transition"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
            </button>

            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute sound" : "Mute sound"}
              className="text-white hover:text-zinc-300 transition"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>

            <span className="text-xs font-medium text-zinc-300 hidden sm:inline truncate max-w-xs">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded bg-zinc-800/80 px-2 py-0.5 text-[10px] font-bold tracking-wider text-zinc-300 uppercase">
              Official HD Preview
            </span>
            <button
              onClick={toggleFullscreen}
              aria-label="Toggle fullscreen"
              className="text-white hover:text-zinc-300 transition"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
