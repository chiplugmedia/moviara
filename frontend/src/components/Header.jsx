import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  Home,
  Film,
  Tv,
  Clapperboard,
  Sparkles,
  LogIn,
  UserPlus,
  Star,
  Play,
} from "lucide-react";
import { searchMovies } from "../services/movieApi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchContainerRef = useRef(null);

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "TV Shows", href: "/tv-shows", icon: Tv },
    { label: "Movies", href: "/movies", icon: Film },
    { label: "Genres", href: "/genres", icon: Clapperboard },
    { label: "Search", href: "/search", icon: Search },
  ];

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
    setShowSuggestions(false);
  }, [location.pathname]);

  // Click outside search suggestions container to dismiss
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced API search for top suggestions
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsSearching(true);
        const res = await searchMovies(searchTerm.trim(), 1);
        setSuggestions((res.movies || []).slice(0, 5));
      } catch (err) {
        console.error("Header search error:", err);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleSelectMovie = (id) => {
    setShowSuggestions(false);
    setSearchTerm("");
    navigate(`/details/${id}`);
  };

  return (
    <>
      {/* Fixed Top Header */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Menu Toggle Button & Brand Logo */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-2 rounded-lg text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-600 transition"
            aria-label="Toggle Navigation Menu"
          >
            <Menu size={20} />
          </button>
          <Link
            to="/"
            className="text-xl font-black text-white tracking-widest flex items-center gap-1.5 focus:outline-none"
          >
            <span className="text-white">MOVIARA</span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
          </Link>
        </div>

        {/* Center: Live Search Bar with Instant Autocomplete Dropdown */}
        <div
          ref={searchContainerRef}
          className="relative flex-1 max-w-xl mx-2 sm:mx-4"
        >
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search movies, genres, actors..."
              className="w-full h-10 pl-10 pr-9 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </form>

          {/* Autocomplete Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-12 z-50 rounded-2xl border border-zinc-800 bg-zinc-950/98 p-2 shadow-2xl backdrop-blur-md">
              <div className="p-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-900">
                Quick Results
              </div>
              <div className="space-y-1 py-1">
                {suggestions.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleSelectMovie(m.id)}
                    className="flex items-center gap-3 w-full p-2 rounded-xl text-left hover:bg-zinc-900 transition group"
                  >
                    <img
                      src={m.poster}
                      alt={m.title}
                      className="h-12 w-9 rounded object-cover border border-zinc-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white truncate">
                        {m.title}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                        <span>{m.year}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                          <Star className="h-2.5 w-2.5 fill-amber-400" />
                          {m.rating}
                        </span>
                        <span>•</span>
                        <span className="truncate">{m.genres?.[0]}</span>
                      </div>
                    </div>
                    <Play className="h-4 w-4 text-zinc-500 group-hover:text-white mr-1 shrink-0" />
                  </button>
                ))}
              </div>
              <button
                onClick={handleSearchSubmit}
                className="w-full text-center py-2 text-xs font-semibold text-zinc-300 hover:text-white border-t border-zinc-900 transition"
              >
                View all results for "{searchTerm}"
              </button>
            </div>
          )}
        </div>

        {/* Right: Quick Links & Explore CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            to="/tv-shows"
            className="hidden sm:inline-flex px-3.5 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition"
          >
            TV Shows
          </Link>

          <Link
            to="/movies"
            className="hidden sm:inline-flex px-3.5 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition"
          >
            Movies
          </Link>

          <Link
            to="/genres"
            className="hidden md:inline-flex px-3.5 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition"
          >
            Genres
          </Link>

          <Link
            to="/movies"
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-zinc-950 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 hover:opacity-90 transition shadow-sm"
          >
            Explore Library
          </Link>
        </div>
      </header>

      {/* Dark Backdrop Overlay when Drawer is Open */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Slide-out Navigation Drawer */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Navigation Sidebar"
      >
        <div>
          {/* Top Bar with Brand and Close */}
          <div className="flex items-center justify-between pb-5 border-b border-zinc-800">
            <span className="text-base font-black text-white tracking-widest">
              MOVIARA
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-900 border border-zinc-800 transition"
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-2 mt-6">
            {navLinks.map(({ label, href, icon: Icon }) => {
              const isActive =
                location.pathname === href ||
                (href === "/tv-shows" &&
                  (location.pathname === "/series" ||
                    location.pathname === "/tv" ||
                    location.pathname.startsWith("/tv/")));
              return (
                <Link
                  key={label}
                  to={href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-gradient-to-r from-zinc-200 via-white to-zinc-300 text-zinc-950 font-bold shadow-md"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <Icon
                    size={19}
                    className={isActive ? "text-zinc-950" : "text-zinc-400"}
                  />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Drawer Bottom Info */}
        <div className="pt-6 border-t border-zinc-800 space-y-3">
          <Link
            to="/movies"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 hover:opacity-90 transition shadow-sm"
          >
            <span>Explore Library</span>
          </Link>
          <p className="text-[11px] text-zinc-500 text-center">
            Verified TMDB &amp; OMDb Movie Data
          </p>
        </div>
      </aside>
    </>
  );
}
