import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Film, Tv, Search, Clapperboard, Heart } from "lucide-react";

export default function Footer() {
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home", href: "/", icon: Home },
    { id: "tv-shows", label: "TV Shows", href: "/tv-shows", icon: Tv },
    { id: "movies", label: "Movies", href: "/movies", icon: Film },
    { id: "genres", label: "Genres", href: "/genres", icon: Clapperboard },
    { id: "search", label: "Search", href: "/search", icon: Search },
  ];

  return (
    <>
      {/* Footer Container with bottom padding for mobile bar */}
      <footer className="w-full border-t border-zinc-800 bg-zinc-950 text-white pb-20 md:pb-0">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full">
            {/* Brand */}
            <div className="space-y-3">
              <Link
                to="/"
                className="text-2xl font-black text-white tracking-widest flex items-center gap-1.5"
              >
                <span>MOVIARA</span>
                <span className="h-2 w-2 rounded-full bg-zinc-300" />
              </Link>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Discover comprehensive movie metadata, synopsis, cast profiles,
                and verified critic ratings powered by TMDB and OMDb.
              </p>
              <div className="flex items-center gap-2 text-xs text-zinc-500 pt-1">
                <span className="rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5">
                  TMDB Metadata
                </span>
                <span className="rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5">
                  Verified Ratings
                </span>
              </div>
            </div>

            {/* Popular Genres */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Popular Genres
              </h3>
              <ul className="space-y-2.5 text-sm text-zinc-400">
                <li>
                  <Link
                    to="/genres?genre=Action"
                    className="hover:text-white transition"
                  >
                    Action &amp; Adventure
                  </Link>
                </li>
                <li>
                  <Link
                    to="/genres?genre=Sci-Fi"
                    className="hover:text-white transition"
                  >
                    Sci-Fi &amp; Fantasy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/genres?genre=Comedy"
                    className="hover:text-white transition"
                  >
                    Comedy &amp; Family
                  </Link>
                </li>
                <li>
                  <Link
                    to="/genres?genre=Horror"
                    className="hover:text-white transition"
                  >
                    Horror &amp; Thriller
                  </Link>
                </li>
              </ul>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Navigation
              </h3>
              <ul className="space-y-2.5 text-sm text-zinc-400">
                <li>
                  <Link to="/" className="hover:text-white transition">
                    Featured Releases
                  </Link>
                </li>
                <li>
                  <Link to="/tv-shows" className="hover:text-white transition">
                    Popular TV Shows
                  </Link>
                </li>
                <li>
                  <Link to="/movies" className="hover:text-white transition">
                    All Movies Library
                  </Link>
                </li>
                <li>
                  <Link to="/genres" className="hover:text-white transition">
                    Browse by Category
                  </Link>
                </li>
                <li>
                  <Link to="/search" className="hover:text-white transition">
                    Advanced Search
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community & Legal */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Community
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1.5 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                  Discord
                </span>
                <span className="px-3 py-1.5 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                  Telegram
                </span>
                <span className="px-3 py-1.5 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                  Twitter / X
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Notice: Moviara is a movie discovery and information platform powered by
                the TMDB and OMDb APIs. It does not provide video streaming or media downloads.
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="w-full mt-12 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <span>© {new Date().getFullYear()} MOVIARA. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <span className="hover:text-zinc-300 cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-zinc-300 cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-zinc-300 cursor-pointer">DMCA</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Compact Glassmorphic Floating Mobile Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden py-1.5 px-3 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800 shadow-2xl">
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
                className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-zinc-950 bg-gradient-to-r from-zinc-200 via-white to-zinc-300 font-bold shadow-md"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Icon size={18} />
                <span className="text-[10px] font-medium tracking-wide mt-0.5">
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
