import React, { useState } from "react";
import {
  Download,
  Check,
  Sparkles,
  HardDrive,
  Wifi,
  Copy,
  X,
  FileVideo,
  Film,
  PlayCircle,
  Server,
} from "lucide-react";

export default function DownloadButtons({ movie, isOpen, onClose }) {
  const [selectedQuality, setSelectedQuality] = useState("1080p FHD");
  const [downloadCompleted, setDownloadCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !movie) return null;

  const downloadOptions = [
    { quality: "480p SD", size: "1.2 MB", format: "MP4", speed: "Ultra Fast", resolution: "854x480" },
    { quality: "720p HD", size: "1.2 MB", format: "MP4", speed: "Fast", resolution: "1280x720" },
    { quality: "1080p FHD", size: "6.2 MB", format: "MP4", speed: "High Speed", resolution: "1920x1080" },
    { quality: "4K UHD", size: "6.2 MB", format: "MP4", speed: "High Speed", resolution: "3840x2160" },
  ];

  const currentOption =
    downloadOptions.find((d) => d.quality === selectedQuality) || downloadOptions[2];

  const cleanTitle = (movie.title || "Movie").replace(/[^a-zA-Z0-9]/g, "_");
  const cleanQuality = currentOption.quality.replace(/[^a-zA-Z0-9]/g, "_");
  const fileName = `${cleanTitle}_${cleanQuality}.mp4`;
  const downloadUrl = `http://localhost:5000/api/movies/${movie.id}/download?quality=${encodeURIComponent(currentOption.quality)}`;

  const triggerVideoDownload = (option = currentOption) => {
    const qClean = option.quality.replace(/[^a-zA-Z0-9]/g, "_");
    const fName = `${cleanTitle}_${qClean}.mp4`;
    const dUrl = `http://localhost:5000/api/movies/${movie.id}/download?quality=${encodeURIComponent(option.quality)}`;

    const a = document.createElement("a");
    a.href = dUrl;
    a.setAttribute("download", fName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setDownloadCompleted(true);
  };

  const handleCopyMagnet = () => {
    const rawId = (movie.imdb_id || `tmdb${movie.id}`).replace(/[^a-zA-Z0-9]/g, "");
    const hash = (rawId + "a1b2c3d4e5f6789012345678901234567890").slice(0, 40);
    const magnetLink = `magnet:?xt=urn:btih:${hash}&dn=${encodeURIComponent(
      `${movie.title} (${movie.year || ""}) [${currentOption.quality}] [Moviara]`
    )}&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.opentrackr.org:1337/announce`;

    navigator.clipboard?.writeText(magnetLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 border border-zinc-700 text-white shadow-inner">
              <FileVideo className="h-5 w-5 text-zinc-200" />
            </div>
            <div>
              <h2 id="download-modal-title" className="text-lg font-bold text-white leading-tight">
                Download {movie.title} (.mp4)
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                {movie.year} • Playable Video File • Direct from Server
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close download modal"
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quality Options Grid */}
        <div className="my-5 space-y-2.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
            <span>Select Quality to Download</span>
            <span className="text-[11px] text-zinc-500 font-normal">Click card to select or download</span>
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {downloadOptions.map((item) => {
              const isSelected = selectedQuality === item.quality;
              return (
                <button
                  key={item.quality}
                  type="button"
                  onClick={() => {
                    setSelectedQuality(item.quality);
                    setDownloadCompleted(false);
                  }}
                  className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "border-zinc-300 bg-zinc-900 text-white shadow-md ring-1 ring-zinc-400"
                      : "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-bold flex items-center gap-1.5">
                      {item.quality}
                      {item.quality.includes("4K") && (
                        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      )}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                      {item.format}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-zinc-400">
                    <span className="flex items-center gap-1">
                      <HardDrive className="h-3 w-3" />
                      {item.size}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Wifi className="h-3 w-3" />
                      {item.speed}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Media Details Summary */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 text-xs text-zinc-300 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-zinc-500">File Type:</span>
            <span className="font-semibold text-zinc-200">Playable Video (.mp4 / H.264)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Source:</span>
            <span className="font-semibold text-emerald-400 flex items-center gap-1">
              <Server className="h-3 w-3" />
              Moviara Server Direct Stream
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Output Resolution:</span>
            <span className="font-semibold text-zinc-200">{currentOption.resolution}</span>
          </div>
        </div>

        {/* Success Status Banner */}
        {downloadCompleted && (
          <div className="mt-4 p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/30 flex items-center gap-2 text-xs text-emerald-400 font-medium animate-fade-in">
            <Check className="h-4 w-4 text-emerald-400 stroke-[3]" />
            <span>Movie file ({fileName}) download initiated from server! Check your browser downloads.</span>
          </div>
        )}

        {/* Action Buttons: Direct Server Download */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          {/* Main Action: Native anchor directly triggers server download */}
          <a
            href={downloadUrl}
            download={fileName}
            onClick={() => setDownloadCompleted(true)}
            className="flex-1 w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold text-zinc-950 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 hover:opacity-90 active:scale-[0.98] transition-all shadow-md text-center"
          >
            <Download className="h-4 w-4" />
            <span>Download {currentOption.quality} (.mp4)</span>
          </a>

          <button
            type="button"
            onClick={handleCopyMagnet}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-medium text-zinc-300 border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:text-white transition whitespace-nowrap"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? "Magnet Copied" : "Magnet"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
