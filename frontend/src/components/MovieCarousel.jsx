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
    <div className="w-full space-y-3.5">
      {/* Header Section */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="h-5 w-1 rounded-full bg-gradient-to-b from-zinc-200 to-zinc-500" />
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-zinc-400 mt-0.5">{subtitle}</p>
          )}
        </div>

        <Link
          to={viewAllLink}
          className="group flex items-center gap-1 text-xs sm:text-sm font-medium text-zinc-400 transition-colors hover:text-white"
        >
          <span>View All</span>
          <ChevronRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
        </Link>
      </div>

      {/* Horizontal Carousel Container */}
      <div className="group/carousel relative w-full">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="absolute -left-3 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950/80 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover/carousel:opacity-100 hover:bg-zinc-900 md:flex shadow-xl"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Scrollable Row */}
        <div
          ref={scrollContainerRef}
          className="flex w-full gap-3 sm:gap-4 overflow-x-auto scroll-smooth pb-3 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="w-[calc((100%-1.5rem)/2)] sm:w-[calc((100%-3rem)/3)] md:w-[calc((100%-4rem)/4)] lg:w-[calc((100%-5rem)/5)] xl:w-[calc((100%-6rem)/6)] shrink-0"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="absolute -right-3 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950/80 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover/carousel:opacity-100 hover:bg-zinc-900 md:flex shadow-xl"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
