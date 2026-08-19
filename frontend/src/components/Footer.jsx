import React, { useState } from "react";

export default function Footer() {
  // State to track active tab ('home', 'movies', 'search', 'saved', 'profile')
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: "movies",
      label: "Movies",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>
      ),
    },
    {
      id: "search",
      label: "Search",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
    {
      id: "saved",
      label: "Saved",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      ),
    },
    {
      id: "profile",
      label: "Profile",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Footer Container with adjusted bottom padding on mobile */}
      <footer className="w-full border-t border-zinc-800 bg-zinc-950 text-white pb-16 md:pb-0">
        <div className="w-full px-4 sm:px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full">
            {/* Brand */}
            <div>
              <h2 className="text-2xl font-black text-white tracking-widest">
                MOVIARA
              </h2>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                Stream and download your favorite movies in HD, Full HD and 4K
                quality anytime, anywhere.
              </p>
            </div>

            {/* Movies */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Movies
              </h3>
              <ul className="space-y-2.5 text-sm text-zinc-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Action
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Adventure
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Comedy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Drama
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-2.5 text-sm text-zinc-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="#"
                  className="px-3.5 py-2 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="px-3.5 py-2 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="px-3.5 py-2 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="px-3.5 py-2 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="w-full mt-12 pt-6 border-t border-zinc-800 text-center text-xs text-zinc-500">
            © {new Date().getFullYear()} MOVIARA. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Compact Glassmorphic Floating Mobile Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden py-1.5 px-2 bg-zinc-950/70 backdrop-blur-md border-t border-white/10 shadow-xl">
        <div className="flex items-center justify-around max-w-sm mx-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-slate-100 bg-gradient-to-b from-slate-200/20 to-slate-400/10 border border-slate-300/30 shadow-[0_0_8px_rgba(203,213,225,0.2)]"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <div
                  className={
                    isActive
                      ? "drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]"
                      : ""
                  }
                >
                  {item.icon}
                </div>
                <span className="text-[9px] font-medium tracking-wide mt-0.5">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
