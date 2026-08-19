import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const popularMovies = [
  {
    id: "1",
    title: "Spider-Man: Brand New Day",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/07/23/748fe71156424200b57a1c377661fe79.jpg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/spider-man-brand-new-day",
  },
  {
    id: "2",
    title: "Toy Story 5",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/06/16/503cde6da9515420e0e34a6ce16775fa.jpg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/toy-story-5",
  },
  {
    id: "3",
    title: "Minions & Monsters",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/06/25/bc3256b25dc95b0c9cd1b5e2e093b0bd.jpg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/minions-and-monsters",
  },
  {
    id: "4",
    title: "The Last House",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/08/14/e6202f59dc6fc69794e970fa29d874bf.jpg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/the-last-house",
  },
  {
    id: "5",
    title: "Evil Dead Burn",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/08/02/fac73c3dec80cde46022ebee52e92f38.jpg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/evil-dead-burn",
  },
  {
    id: "6",
    title: "The Devil's Mouth",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/08/15/520ce50bc1167f72a9ea8d2a17c199c8.jpg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/the-devils-mouth",
  },
  {
    id: "7",
    title: "Supergirl",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/08/18/95354380ab9664258ed9baaba175c05e.jpg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/supergirl",
  },
  {
    id: "8",
    title: "72 Hours",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/08/08/976254f604fd6244826ac091287ef929.jpg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/72-hours",
  },
  {
    id: "9",
    title: "Colony",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/08/17/433a77890341b17f770fc61c042642ef.jpg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/colony",
  },
  {
    id: "10",
    title: "Disclosure Day",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/07/16/bd4560586928581bfbc34c477c114025.jpg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/disclosure-day",
  },
  {
    id: "11",
    title: "The Death of Robin Hood",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/07/30/3dda6351b063ad22eaf9ef445ff5f1eb-s.jpg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/the-death-of-robin-hood",
  },
  {
    id: "12",
    title: "Star Wars: The Mandalorian and Grogu",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/07/15/bbff0b180c70fb78bb96785e6fa43374.jpg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/star-wars-the-mandalorian-and-grogu",
  },
  {
    id: "13",
    title: "The Bay",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/07/17/8cb94013a82c29405b5cfdc7b481dccc.jpg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/the-bay",
  },
  {
    id: "14",
    title: "Descendants: Wicked Wonderland",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/06/30/9a81bab0fa4d60ccaa2d666fd903f2b0.jpg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/descendants-wicked-wonderland",
  },
  {
    id: "15",
    title: "The Furious",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/07/23/b6af8e3269563c85828beb0a6a268c4c.jpg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/the-furious",
  },
  {
    id: "16",
    title: "Man of War",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/07/08/d6257f33bb7b09afa69d0875f08368ff.jpg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/man-of-war",
  },
  {
    id: "17",
    title: "Wings of Dread",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/07/13/6565b4f2af5a2c7c41f6be7e5b8fd5dd.jpeg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/wings-of-dread",
  },
  {
    id: "18",
    title: "Obsession",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/08/16/a69b52ec29a3c4373f2c1c6e1576894e.jpg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/obsession",
  },
  {
    id: "19",
    title: "Strung",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/08/12/3f64c67c9da243c84297138b1f9e8561.jpg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/strung",
  },
  {
    id: "20",
    title: "Enola Holmes 3",
    image:
      "https://pbcdnw.aoneroom.com/image/2026/08/15/d48480366c338d374b133f922ef6a4da.jpg?x-oss-process=image/resize%2Cw_250",
    url: "/moviedetail/enola-holmes-3",
  },
];

const MovieCardList = () => {
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

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold leading-none text-white md:text-xl">
          Popular Movie
        </h2>
        <a
          href="/ranking-list"
          className="group flex items-center gap-1 text-sm font-medium text-white/60 transition-colors hover:text-white"
        >
          <span>More</span>
          <ChevronRight className="h-4 w-4 text-white/60 transition-colors group-hover:text-white" />
        </a>
      </div>

      {/* Dynamic Horizontal Scroll Container */}
      <div className="group/carousel relative w-full">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
          className="absolute -left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover/carousel:opacity-100 hover:bg-black md:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Scrollable Container with Inline Hidden Scrollbar Utility */}
        <div
          ref={scrollContainerRef}
          className="flex w-full gap-2.5 overflow-x-auto scroll-smooth pb-2 md:gap-3.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {popularMovies.map((movie) => (
            <a
              key={movie.id}
              href={movie.url}
              title={movie.title}
              /* Calculates card widths to fit exact counts per row:
                 3 visible on mobile
                 4 visible on tablet (sm)
                 6 visible on desktop (lg)
                 8 visible on ultra-wide (2xl)
              */
              className="group flex w-[calc((100%-1.25rem)/3)] flex-shrink-0 flex-col sm:w-[calc((100%-2rem)/4)] lg:w-[calc((100%-3.5rem)/6)] 2xl:w-[calc((100%-5rem)/8)]"
            >
              {/* Poster Container */}
              <div className="relative h-0 w-full overflow-hidden rounded-t-md bg-[#2b2e39] pb-[140%]">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Movie Title Bar */}
              <div className="flex w-full flex-col items-start justify-center rounded-b-md bg-white/[6%] p-2">
                <p className="w-full truncate text-xs font-medium text-white/80 transition-colors group-hover:text-white md:text-sm">
                  {movie.title}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
          className="absolute -right-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover/carousel:opacity-100 hover:bg-black md:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default MovieCardList;
