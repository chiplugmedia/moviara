import React from "react";

export default function MovieCardSkeleton() {
  return (
    <div className="flex flex-col w-full animate-pulse">
      {/* Poster Skeleton with aspect ratio */}
      <div className="relative w-full h-0 pb-[142%] rounded-t-xl bg-zinc-800/80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      </div>

      {/* Info Skeleton */}
      <div className="flex flex-col gap-2 rounded-b-xl bg-zinc-900/60 p-3 border border-zinc-800/60 border-t-0">
        <div className="h-3.5 w-3/4 rounded bg-zinc-800" />
        <div className="flex items-center justify-between pt-1">
          <div className="h-3 w-1/3 rounded bg-zinc-800/80" />
          <div className="h-3 w-1/4 rounded bg-zinc-800/80" />
        </div>
      </div>
    </div>
  );
}
