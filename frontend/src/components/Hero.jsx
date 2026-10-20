import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    movieId: "tt0468569",
    title: "The Dark Knight",
    year: "2008",
    genre: "Action, Crime, Drama",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice.",
    bgGradient:
      "linear-gradient(180deg, #4e4649 0%, #4e4649CC 50.12%, #4e464999 75.47%, #4e464900 100%)",
    fullImg:
      "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=1920&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    movieId: "tt1375666",
    title: "Inception",
    year: "2010",
    genre: "Action, Adventure, Sci-Fi",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    bgGradient:
      "linear-gradient(180deg, #665a4e 0%, #665a4eCC 50.12%, #665a4e99 75.47%, #665a4e00 100%)",
    fullImg:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    movieId: "tt0816692",
    title: "Interstellar",
    year: "2014",
    genre: "Adventure, Drama, Sci-Fi",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth faces catastrophic famine.",
    bgGradient:
      "linear-gradient(rgb(61, 71, 61) 0%, rgba(61, 71, 61, 0.8) 50.12%, rgba(61, 71, 61, 0.6) 75.47%, rgba(61, 71, 61, 0) 100%)",
    fullImg:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    movieId: "tt15239678",
    title: "Dune: Part Two",
    year: "2024",
    genre: "Action, Adventure, Drama",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    bgGradient:
      "linear-gradient(rgb(74, 47, 59) 0%, rgba(74, 47, 59, 0.8) 50.12%, rgba(74, 47, 59, 0.6) 75.47%, rgba(74, 47, 59, 0) 100%)",
    fullImg:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=80",
  },
];

const AUTO_SLIDE_DURATION = 6000;

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe Left -> Next Slide
        setActiveSlide((prev) => (prev + 1) % SLIDES.length);
      } else {
        // Swipe Right -> Prev Slide
        setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
      }
    }
  };

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section
      className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl border border-zinc-800 shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Featured Movies Carousel"
    >
      <article className="relative h-[68dvh] min-h-[460px] sm:min-h-[500px] md:h-[75dvh] md:min-h-[560px] w-full">
        {/* Carousel Wrapper */}
        <div
          className="flex h-full w-full transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(-${activeSlide * 100}%)`,
          }}
        >
          {SLIDES.map((slide) => (
            <div
              key={slide.id}
              className="relative h-full w-full flex-shrink-0 min-w-full"
            >
              {/* Background Image Container */}
              <div className="absolute inset-0 h-full w-full">
                <img
                  src={slide.fullImg}
                  alt={slide.title}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />

                {/* Dark Vignette & Dynamic Gradients */}
                <div className="absolute inset-0 bg-black/40" />
                <div
                  className="absolute inset-0"
                  style={{ background: slide.bgGradient }}
                />
                <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-transparent" />
              </div>

              {/* Text & Content Overlay with Fluid Typography & Safe Spacing */}
              <div className="absolute inset-x-0 bottom-14 sm:bottom-16 z-20 flex flex-col justify-end p-4 sm:p-8 md:p-12 lg:p-16">
                <div className="max-w-2xl space-y-2.5 sm:space-y-3.5">
                  {/* Badge */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-200 backdrop-blur-md">
                      Featured Premiere
                    </span>
                    <span className="rounded bg-white/20 px-2.5 py-0.5 text-[11px] sm:text-xs font-bold text-white backdrop-blur-md">
                      {slide.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white drop-shadow-md">
                    {slide.title}
                  </h1>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-300">
                    <span className="text-zinc-300">{slide.genre}</span>
                  </div>

                  {/* Description */}
                  <p className="line-clamp-2 sm:line-clamp-3 text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-xl">
                    {slide.description}
                  </p>

                  {/* Action Buttons: Responsive Wrap on mobile with >=44px height */}
                  <div className="pt-2 flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-3 max-w-md xs:max-w-none">
                    <Link
                      to={`/watch/${slide.movieId}`}
                      className="flex items-center justify-center gap-2.5 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-zinc-950 transition-all hover:bg-zinc-200 active:scale-95 shadow-lg min-h-[44px]"
                    >
                      <FaPlay size={12} />
                      <span>Watch Stream Now</span>
                    </Link>

                    <Link
                      to={`/details/${slide.movieId}`}
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 min-h-[44px]"
                    >
                      <FaInfoCircle size={14} />
                      <span>Movie Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Desktop Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous featured movie"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 h-11 w-11 items-center justify-center rounded-full bg-zinc-950/70 border border-zinc-700/80 text-white backdrop-blur-md hover:bg-zinc-900 transition active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next featured movie"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 h-11 w-11 items-center justify-center rounded-full bg-zinc-950/70 border border-zinc-700/80 text-white backdrop-blur-md hover:bg-zinc-900 transition active:scale-95"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Slide Progress Indicators (Accessible >=44px Tap Zone) */}
        <div className="absolute bottom-3 sm:bottom-6 inset-x-4 sm:inset-x-6 z-30 mx-auto flex max-w-xl gap-2 md:bottom-8">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="group relative flex-1 py-3 cursor-pointer focus:outline-none"
            >
              <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/20 group-hover:bg-white/40 transition-colors">
                <div
                  className={`absolute left-0 top-0 h-full rounded-full transition-all ${
                    activeSlide === index
                      ? "w-full bg-white shadow-sm"
                      : "w-0 bg-transparent"
                  }`}
                  style={{
                    transitionDuration:
                      activeSlide === index && !isPaused
                        ? `${AUTO_SLIDE_DURATION}ms`
                        : "300ms",
                    transitionTimingFunction:
                      activeSlide === index && !isPaused ? "linear" : "ease-out",
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      </article>
    </section>
  );
}
