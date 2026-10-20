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
  Star,
  Play,
  ArrowRight,
} from "lucide-react";
import { searchMovies } from "../services/movieApi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchContainerRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "TV Shows", href: "/tv-shows", icon: Tv },
    { label: "Movies", href: "/movies", icon: Film },
    { label: "Genres", href: "/genres", icon: Clapperboard },
    { label: "Search", href: "/search", icon: Search },
  ];

  // Close sidebar and mobile search on route change
  useEffect(() => {
    setIsOpen(false);
    setMobileSearchOpen(false);
    setShowSuggestions(false);
  }, [location.pathname]);

  // Focus mobile input when opened
  useEffect(() => {
    if (mobileSearchOpen && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [mobileSearchOpen]);

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
      setMobileSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleSelectMovie = (id) => {
    setShowSuggestions(false);
    setMobileSearchOpen(false);
    setSearchTerm("");
    navigate(`/details/${id}`);
  };

  return (
    <>
      {/* Fixed Top Header with Safe Blur & Fluid Padding */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 transition-all">
        {/* Left: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl text-zinc-300 hover:text-white bg-zinc-900/90 border border-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-zinc-500 active:scale-95 transition flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            <Menu size={20} />
          </button>
          <Link
            to="/"
            className="text-lg sm:text-xl font-black text-white tracking-widest flex items-center gap-1.5 focus:outline-none group"
          >
            <span className="text-white group-hover:text-zinc-200 transition-colors">MOVIARA</span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 group-hover:scale-125 transition-transform" />
          </Link>
        </div>

        {/* Center: Live Search Bar (Desktop & Tablet) */}
        <div
          ref={searchContainerRef}
          className="relative hidden sm:block flex-1 max-w-xl mx-2 sm:mx-4"
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
              placeholder="Search movies, TV shows, genres..."
              className="w-full h-10 pl-10 pr-9 bg-zinc-900/90 border border-zinc-800/90 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white p-1"
                aria-label="Clear search input"
              >
                <X size={14} />
              </button>
            )}
          </form>

          {/* Autocomplete Suggestions Dropdown (Desktop) */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-12 z-50 rounded-2xl border border-zinc-800 bg-zinc-950/98 p-2 shadow-2xl backdrop-blur-md animate-fade-in">
              <div className="p-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-900">
                Quick Results
              </div>
              <div className="space-y-1 py-1">
                {suggestions.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleSelectMovie(m.id)}
                    className="flex items-center gap-3 w-full p-2 rounded-xl text-left hover:bg-zinc-900 transition group min-h-[44px]"
                  >
                    <img
                      src={m.poster}
                      alt={m.title}
                      className="h-12 w-9 rounded object-cover border border-zinc-800 shrink-0"
                      loading="lazy"
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
                className="w-full text-center py-2.5 text-xs font-semibold text-zinc-300 hover:text-white border-t border-zinc-900 transition min-h-[44px] flex items-center justify-center"
              >
                View all results for "{searchTerm}"
              </button>
            </div>
          )}
        </div>

        {/* Right: Quick Links, Mobile Search Icon & CTA */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Mobile Search Toggle Button (< 640px) */}
          <button
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            className="sm:hidden min-h-[44px] min-w-[44px] p-2.5 rounded-xl text-zinc-300 hover:text-white bg-zinc-900/90 border border-zinc-800/80 flex items-center justify-center transition active:scale-95"
            aria-label={mobileSearchOpen ? "Close search bar" : "Open search bar"}
          >
            {mobileSearchOpen ? <X size={18} /> : <Search size={18} />}
          </button>

          <Link
            to="/tv-shows"
            className="hidden sm:inline-flex px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition"
          >
            TV Shows
          </Link>

          <Link
            to="/movies"
            className="hidden sm:inline-flex px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition"
          >
            Movies
          </Link>

          <Link
            to="/genres"
            className="hidden md:inline-flex px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition"
          >
            Genres
          </Link>

          {/* Explore CTA: Compact on small screens, full on desktop */}
          <Link
            to="/movies"
            className="min-h-[40px] px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold text-zinc-950 bg-gradient-to-r from-zinc-100 via-white to-zinc-300 hover:opacity-95 active:scale-95 transition shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-zinc-900 hidden xs:inline" />
            <span className="hidden xs:inline">Explore</span>
            <span className="xs:hidden">Explore</span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-900 hidden sm:inline" />
          </Link>
        </div>
      </header>

      {/* Mobile Expandable Search Bar Drawer (< 640px) */}
      {mobileSearchOpen && (
        <div className="sm:hidden fixed top-16 left-0 right-0 z-40 bg-zinc-950/98 border-b border-zinc-800 p-3 shadow-2xl backdrop-blur-md animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
            />
            <input
              ref={mobileSearchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              placeholder="Search movies, TV shows, actors..."
              className="w-full h-11 pl-10 pr-10 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </form>

          {/* Autocomplete Suggestions Dropdown (Mobile) */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="mt-2 rounded-xl border border-zinc-800 bg-zinc-900/90 p-2 space-y-1">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Top Suggestions
              </div>
              {suggestions.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleSelectMovie(m.id)}
                  className="flex items-center gap-3 w-full p-2 rounded-lg text-left hover:bg-zinc-800/80 active:bg-zinc-800 transition min-h-[44px]"
                >
                  <img
                    src={m.poster}
                    alt={m.title}
                    className="h-11 w-8 rounded object-cover border border-zinc-800 shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-zinc-200 truncate">
                      {m.title}
                    </p>
                    <p className="text-[11px] text-zinc-400 truncate">
                      {m.year} • ★ {m.rating} • {m.genres?.[0]}
                    </p>
                  </div>
                  <Play className="h-4 w-4 text-zinc-400 shrink-0" />
                </button>
              ))}
              <button
                onClick={handleSearchSubmit}
                className="w-full text-center py-2 text-xs font-semibold text-zinc-300 hover:text-white border-t border-zinc-800/80 transition min-h-[44px] flex items-center justify-center"
              >
                Search all for "{searchTerm}"
              </button>
            </div>
          )}
        </div>
      )}

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

      {/* Slide-out Navigation Drawer (Mobile-First Accessible Drawer) */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-[82vw] max-w-xs bg-zinc-950 border-r border-zinc-800 p-5 sm:p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Navigation Sidebar"
      >
        <div>
          {/* Top Bar with Brand and Accessible Close Button */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800/90">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-base font-black text-white tracking-widest flex items-center gap-1.5"
            >
              <span>MOVIARA</span>
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="min-h-[44px] min-w-[44px] p-2 text-zinc-400 hover:text-white rounded-xl bg-zinc-900 border border-zinc-800 transition active:scale-95 flex items-center justify-center"
              aria-label="Close navigation"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links with min 48px Touch Target */}
          <nav className="flex flex-col gap-1.5 mt-5" aria-label="Mobile Navigation">
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
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition min-h-[48px] ${
                    isActive
                      ? "bg-gradient-to-r from-zinc-100 via-white to-zinc-300 text-zinc-950 font-bold shadow-md"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-900/90 active:bg-zinc-900"
                  }`}
                >
                  <Icon
                    size={20}
                    className={isActive ? "text-zinc-950" : "text-zinc-400"}
                  />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Drawer Bottom Info & Quick CTA */}
        <div className="pt-5 border-t border-zinc-800/90 space-y-3 pb-[calc(1rem+var(--safe-bottom))]">
          <Link
            to="/movies"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full min-h-[48px] py-3 rounded-xl text-xs font-semibold text-zinc-950 bg-gradient-to-r from-zinc-100 via-white to-zinc-300 hover:opacity-95 active:scale-98 transition shadow-sm"
          >
            <Sparkles className="h-4 w-4 text-zinc-950" />
            <span>Explore All Movies</span>
          </Link>
          <p className="text-[11px] text-zinc-500 text-center">
            Powered by TMDB &amp; OMDb APIs
          </p>
        </div>
      </aside>
    </>
  );
}
