import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

export default function MovieCarousel({
  title = "Popular Movies",
  subtitle,
  movies = [],
  viewAllLink = "/movies",
}) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      {/* Header Section with Accessible Touch Target */}
      <div className="flex items-end justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="h-5 w-1 rounded-full bg-gradient-to-b from-zinc-200 to-zinc-500" />
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{subtitle}</p>
          )}
        </div>

        <Link
          to={viewAllLink}
          className="group flex items-center gap-1 text-xs sm:text-sm font-medium text-zinc-400 hover:text-white transition-colors min-h-[44px] min-w-[44px] justify-end"
          aria-label={`View all ${title}`}
        >
          <span>View All</span>
          <ChevronRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-white" />
        </Link>
      </div>

      {/* Horizontal Carousel Container with Snap Scrolling */}
      <div className="group/carousel relative w-full">
        {/* Left Arrow Button (Desktop) */}
        <button
          onClick={() => scroll("left")}
          aria-label={`Scroll ${title} left`}
          className="absolute -left-3 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950/85 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover/carousel:opacity-100 hover:bg-zinc-900 md:flex shadow-xl active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Scrollable Row with Native Momentum and Snap Alignment */}
        <div
          ref={scrollContainerRef}
          className="flex w-full gap-3 sm:gap-4 overflow-x-auto scroll-smooth pb-3 pt-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="w-[145px] xs:w-[165px] sm:w-[185px] md:w-[calc((100%-3rem)/4)] lg:w-[calc((100%-4rem)/5)] xl:w-[calc((100%-5rem)/6)] shrink-0 snap-start"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Right Arrow Button (Desktop) */}
        <button
          onClick={() => scroll("right")}
          aria-label={`Scroll ${title} right`}
          className="absolute -right-3 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950/85 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover/carousel:opacity-100 hover:bg-zinc-900 md:flex shadow-xl active:scale-95"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
