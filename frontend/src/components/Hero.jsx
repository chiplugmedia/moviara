import React, { useState, useEffect } from "react";
import { FaPlay, FaInfoCircle } from "react-icons/fa";

// Updated images to high-resolution (w_1920) for full-width displays
const SLIDES = [
  {
    id: 1,
    title: "What Happened At WWE SummerSlam 2026 Night",
    year: "2026",
    genre: "Wrestling",
    bgGradient:
      "linear-gradient(180deg, #4e4649 0%, #4e4649CC 50.12%, #4e464999 75.47%, #4e464900 100%)",
    fullImg:
      "https://pbcdnw.aoneroom.com/image/2026/08/04/c692ea0e7f7904b799a93bb1535e55c3.jpg?x-oss-process=image/resize%2Cw_1920",
  },
  {
    id: 2,
    title: "Toy Story 5",
    year: "2026",
    genre: "Animation, Adventure, Comedy",
    bgGradient:
      "linear-gradient(180deg, #665a4e 0%, #665a4eCC 50.12%, #665a4e99 75.47%, #665a4e00 100%)",
    fullImg:
      "https://pbcdnw.aoneroom.com/image/2026/08/18/6974ee3d7a66f38efc6f9716c1c8e243.webp?x-oss-process=image/resize%2Cw_1920",
  },
  {
    id: 3,
    title: "Lanterns",
    year: "2026",
    genre: "Action, Adventure, Crime",
    bgGradient:
      "linear-gradient(rgb(61, 71, 61) 0%, rgba(61, 71, 61, 0.8) 50.12%, rgba(61, 71, 61, 0.6) 75.47%, rgba(61, 71, 61, 0) 100%)",
    fullImg:
      "https://pbcdnw.aoneroom.com/image/2026/08/17/54644d0c2c3709671a35bd0b366915e6.webp?x-oss-process=image/resize%2Cw_1920",
  },
  {
    id: 4,
    title: "Reacher Season 4",
    year: "2022",
    genre: "Action, Crime, Drama",
    bgGradient:
      "linear-gradient(rgb(74, 47, 59) 0%, rgba(74, 47, 59, 0.8) 50.12%, rgba(74, 47, 59, 0.6) 75.47%, rgba(74, 47, 59, 0) 100%)",
    fullImg:
      "https://pbcdnw.aoneroom.com/image/2026/08/12/327f286fab2ce911b726969035482723.png?x-oss-process=image/resize%2Cw_1920",
  },
];

const AUTO_SLIDE_DURATION = 5000;

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="w-full overflow-hidden rounded-xl md:rounded-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <article className="relative h-[65vh] w-full min-h-[480px] md:h-[75vh] md:min-h-[550px]">
        {/* Carousel Wrapper */}
        <div
          className="flex h-full w-full transition-transform duration-700 ease-in-out"
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
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#111319] via-[#111319]/70 to-transparent" />
              </div>

              {/* Text & Content Overlay */}
              <div className="absolute inset-x-0 bottom-16 z-20 flex flex-col justify-end p-6 md:p-12 lg:p-16">
                <div className="max-w-2xl">
                  {/* Badge */}
                  <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-200 backdrop-blur-md">
                    Featured
                  </span>

                  {/* Title */}
                  <h1 className="mt-3 text-2xl font-extrabold leading-tight text-white drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>

                  {/* Metadata */}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-medium text-zinc-300 md:text-sm">
                    <span className="rounded bg-white/20 px-2 py-0.5 font-bold text-white">
                      {slide.year}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                    <span>{slide.genre}</span>
                  </div>

                  {/* Counter */}
                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold tracking-wider text-zinc-400">
                    <span className="text-white">
                      {String(activeSlide + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px w-8 bg-zinc-500" />
                    <span>{String(SLIDES.length).padStart(2, "0")}</span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 line-clamp-2 max-w-xl text-xs text-zinc-300 sm:line-clamp-3 md:text-sm lg:text-base">
                    Watch the latest blockbuster content in stunning quality.
                    Stream instantly with premium entertainment anytime,
                    anywhere.
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-xs font-bold text-black transition-transform hover:scale-105 active:scale-95 md:px-6 md:py-3 md:text-sm">
                      <FaPlay size={12} />
                      Watch Now
                    </button>

                    <button className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20 active:scale-95 md:px-6 md:py-3 md:text-sm">
                      <FaInfoCircle size={14} />
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Progress Indicators */}
        <div className="absolute bottom-6 inset-x-6 z-30 mx-auto flex max-w-xl gap-2 md:bottom-8">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/20 transition-all"
            >
              <div
                className={`absolute left-0 top-0 h-full rounded-full transition-all ${
                  activeSlide === index
                    ? "w-full bg-white"
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
            </button>
          ))}
        </div>
      </article>
    </section>
  );
};

export default Hero;
