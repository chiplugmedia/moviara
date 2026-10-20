import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Film, Tv, Search, Clapperboard, Heart, Sparkles, ArrowUp } from "lucide-react";

export default function Footer() {
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home", href: "/", icon: Home },
    { id: "tv-shows", label: "TV Shows", href: "/tv-shows", icon: Tv },
    { id: "movies", label: "Movies", href: "/movies", icon: Film },
    { id: "genres", label: "Genres", href: "/genres", icon: Clapperboard },
    { id: "search", label: "Search", href: "/search", icon: Search },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Footer Container with safe-area bottom clearance for mobile bar */}
      <footer className="w-full border-t border-zinc-800 bg-zinc-950 text-white pb-28 md:pb-0">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full">
            {/* Brand */}
            <div className="space-y-3">
              <Link
                to="/"
                className="text-2xl font-black text-white tracking-widest flex items-center gap-1.5 group"
              >
                <span>MOVIARA</span>
                <span className="h-2 w-2 rounded-full bg-zinc-300 group-hover:scale-125 transition-transform" />
              </Link>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Discover comprehensive movie metadata, synopsis, cast profiles,
                and verified critic ratings powered by TMDB and OMDb.
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 pt-1">
                <span className="rounded-lg bg-zinc-900 border border-zinc-800/80 px-2.5 py-1 text-[11px]">
                  TMDB Metadata
                </span>
                <span className="rounded-lg bg-zinc-900 border border-zinc-800/80 px-2.5 py-1 text-[11px]">
                  Verified Ratings
                </span>
              </div>
            </div>

            {/* Popular Genres */}
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4">
                Popular Genres
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
                <li>
                  <Link
                    to="/genres?genre=Action"
                    className="hover:text-white transition inline-block py-0.5"
                  >
                    Action &amp; Adventure
                  </Link>
                </li>
                <li>
                  <Link
                    to="/genres?genre=Sci-Fi"
                    className="hover:text-white transition inline-block py-0.5"
                  >
                    Sci-Fi &amp; Fantasy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/genres?genre=Comedy"
                    className="hover:text-white transition inline-block py-0.5"
                  >
                    Comedy &amp; Family
                  </Link>
                </li>
                <li>
                  <Link
                    to="/genres?genre=Horror"
                    className="hover:text-white transition inline-block py-0.5"
                  >
                    Horror &amp; Thriller
                  </Link>
                </li>
              </ul>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4">
                Navigation
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
                <li>
                  <Link to="/" className="hover:text-white transition inline-block py-0.5">
                    Featured Releases
                  </Link>
                </li>
                <li>
                  <Link to="/tv-shows" className="hover:text-white transition inline-block py-0.5">
                    Popular TV Shows
                  </Link>
                </li>
                <li>
                  <Link to="/movies" className="hover:text-white transition inline-block py-0.5">
                    All Movies Library
                  </Link>
                </li>
                <li>
                  <Link to="/genres" className="hover:text-white transition inline-block py-0.5">
                    Browse by Category
                  </Link>
                </li>
                <li>
                  <Link to="/search" className="hover:text-white transition inline-block py-0.5">
                    Advanced Search
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community & Legal */}
            <div className="space-y-3">
              <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Community
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
                  Discord
                </span>
                <span className="px-3 py-1.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
                  Telegram
                </span>
                <span className="px-3 py-1.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
                  Twitter / X
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Notice: Moviara is a movie discovery and information platform powered by
                the TMDB and OMDb APIs. It does not provide video streaming or media downloads.
              </p>
            </div>
          </div>

          {/* Bottom Bar with Responsive Flex */}
          <div className="w-full mt-10 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 text-center sm:text-left">
            <span>© {new Date().getFullYear()} MOVIARA. All rights reserved.</span>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="hover:text-zinc-300 cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-zinc-300 cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-zinc-300 cursor-pointer">DMCA</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Compact Glassmorphic Floating Mobile Navigation Bar with Safe Area Support */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-zinc-950/92 backdrop-blur-xl border-t border-zinc-800/80 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.7)] px-2 pt-1 pb-[calc(0.4rem+env(safe-area-inset-bottom,0px))]"
        aria-label="Mobile Bottom Navigation"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.href ||
              (item.href === "/tv-shows" &&
                (location.pathname === "/series" ||
                  location.pathname === "/tv" ||
                  location.pathname.startsWith("/tv/")));
            return (
              <Link
                key={item.id}
                to={item.href}
                className={`min-h-[48px] min-w-[52px] flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 active:scale-95 ${
                  isActive
                    ? "text-zinc-950 bg-gradient-to-r from-zinc-100 via-white to-zinc-300 font-bold shadow-md"
                    : "text-zinc-400 hover:text-zinc-200 active:text-white"
                }`}
                aria-label={item.label}
              >
                <Icon size={19} className={isActive ? "stroke-[2.5]" : "stroke-[1.75]"} />
                <span className="text-[10px] font-semibold tracking-tight mt-0.5">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
