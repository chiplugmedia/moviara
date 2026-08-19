import React, { useState } from "react";

export default function TheMovieDetail() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="w-full text-white bg-black font-sans">
      {/* Desktop / Navigation Header */}
      <div className="mt-6 hidden md:block">
        <div className="hidden md:block w-full">
          <div className="flex items-center justify-start w-full px-3 md:px-0">
            <span className="text-white/60 text-sm font-normal leading-[22px] cursor-pointer hover:underline">
              Home
            </span>
            <svg
              className="w-4 h-4 mx-1"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.66699 3.33366L10.3337 8.00033L5.66699 12.667"
                stroke="white"
                strokeOpacity="0.6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-white text-sm font-normal leading-[22px]">
              Details
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Top Nav Bar */}
      <div className="md:hidden w-full h-12 py-0 pr-9 pl-3 flex items-center justify-start">
        <svg
          className="w-6 h-6 cursor-pointer"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5 19L8.5 12L15.5 5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2 className="flex-1 text-white text-center text-base font-semibold">
          Details
        </h2>
      </div>

      {/* Desktop Layout Container */}
      <div className="hidden md:block relative w-full mt-4 md:mt-6">
        {/* Video Player Box */}
        <div className="bg-black relative inline-block w-full overflow-hidden rounded-lg">
          <video
            loop
            muted={isMuted}
            autoPlay
            playsInline
            poster="https://pbcdnw.aoneroom.com/media/vone/2026/06/25/c2839c7c0415fbd070fd004d63ecb592.jpg"
            className="object-contain relative z-10 w-full h-[480px]"
            src="https://macdn.aoneroom.com/media/vone/2026/06/25/c2839c7c0415fbd070fd004d63ecb592-ld.mp4"
            title="Minions & Monsters - Official Trailer"
            aria-label="Watch the official trailer for Minions & Monsters"
          />
          {/* Mute Control */}
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-4 right-4 z-20 cursor-pointer p-2 rounded-full bg-black/40 hover:bg-black/60 transition"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {isMuted ? (
                <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.14-.58.53-.48.91.13.48.65.71 1.09.55.81-.31 1.56-.76 2.22-1.3l1.43 1.43a.996.996 0 101.41-1.41L5.04 3.63a.996.996 0 00-1.41 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.44-.17-.94.04-1.11.48-.17.44.04.94.48 1.11C17.37 6.35 19 9.01 19 12z" />
              ) : (
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              )}
            </svg>
          </button>
        </div>

        {/* Overlay Metadata */}
        <div className="absolute bottom-1 left-0 right-0 z-20">
          <div className="flex items-start justify-start p-6 bg-gradient-to-t from-black via-black/80 to-transparent rounded-b-lg">
            {/* Poster Card */}
            <div className="shrink-0 mr-6">
              <img
                src="https://pbcdnw.aoneroom.com/image/2026/06/25/bc3256b25dc95b0c9cd1b5e2e093b0bd.jpg?x-oss-process=image/resize%2Cw_250"
                alt="Minions & Monsters Poster"
                className="w-[140px] rounded-md shadow-lg"
              />
            </div>

            {/* Info Section */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white truncate">
                  Minions &amp; Monsters
                </h1>

                {/* Tags & Metadata Row */}
                <div className="flex items-center gap-2 mt-2 text-xs text-white/60 flex-wrap">
                  <span>2026</span>
                  <span>•</span>
                  <span>R</span>
                  <span>•</span>
                  <span>1 h 30 m</span>
                  <span>•</span>
                  <span>United States</span>
                  <span>•</span>
                  <span>Animation</span>
                  <span>•</span>
                  <span>Adventure</span>
                  <span>•</span>
                  <span>Comedy</span>
                </div>

                {/* Plot Overview */}
                <p className="mt-3 text-sm text-white/80 line-clamp-2 max-w-2xl">
                  Follows the Minions in 1920s Hollywood as they search for
                  frightening creatures for their monster movie, partner with a
                  green creature, and must save the planet after unleashing
                  monsters.
                </p>
              </div>

              {/* Actions & Rating */}
              <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  {/* Updated Watch Online Button to Silver */}
                  <button className="flex items-center justify-center gap-2 whitespace-nowrap py-3 px-5 rounded-xl text-sm font-semibold text-zinc-950 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 hover:opacity-90 transition-all duration-300 shadow-md">
                    <svg
                      className="w-4 h-4 fill-current flex-shrink-0"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>Watch Online</span>
                  </button>

                  <button className="flex items-center justify-center gap-2 whitespace-nowrap py-3 px-5 rounded-xl text-sm font-medium text-zinc-200 border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 transition-all duration-300">
                    <span>Watch in App</span>
                  </button>
                </div>

                {/* Rating Badge */}
                <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="text-slate-300 text-lg font-bold">
                    ★ 6.3
                  </span>
                  <span className="text-xs text-white/50">/10 (215)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout Container */}
      <div className="block md:hidden mt-4">
        {/* Mobile Player */}
        <div className="relative w-full aspect-video bg-black">
          <video
            loop
            muted={isMuted}
            autoPlay
            playsInline
            poster="https://pbcdnw.aoneroom.com/media/vone/2026/06/25/c2839c7c0415fbd070fd004d63ecb592.jpg"
            className="w-full h-full object-cover"
            src="https://macdn.aoneroom.com/media/vone/2026/06/25/c2839c7c0415fbd070fd004d63ecb592-ld.mp4"
          />
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white"
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>

        {/* Mobile Info Body */}
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-bold text-white">
            Minions &amp; Monsters
          </h2>

          <div className="flex items-start gap-3">
            <img
              src="https://pbcdnw.aoneroom.com/image/2026/06/25/bc3256b25dc95b0c9cd1b5e2e093b0bd.jpg?x-oss-process=image/resize%2Cw_250"
              alt="Poster"
              className="w-20 rounded shadow"
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-1 text-xs text-white/60 flex-wrap">
                <span>2026</span> | <span>R</span> | <span>1h 30m</span>
              </div>
              <p className="text-xs text-white/80 line-clamp-3">
                Follows the Minions in 1920s Hollywood as they search for
                frightening creatures for their monster movie.
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between border-t border-b border-white/10 py-2">
            <div className="flex items-center gap-1">
              <span className="text-slate-300 font-bold">★ 6.3</span>
              <span className="text-xs text-white/50">/10</span>
            </div>
            <span className="text-xs text-white/50">215 people rated</span>
          </div>

          {/* Mobile Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {/* Updated Mobile Watch Online Button to Silver */}
            <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-semibold text-zinc-950 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 hover:opacity-90 transition shadow-sm">
              Watch Online
            </button>
            <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-medium text-zinc-200 border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 transition">
              Watch in App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}