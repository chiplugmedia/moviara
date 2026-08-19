"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Menu,
  X,
  Home,
  Film,
  Tv,
  Clapperboard,
  Newspaper,
  LogIn,
  UserPlus,
} from "lucide-react";

export default function SidebarLayout() {
  // Sidebar starts active/open by default
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Home");

  const navLinks = [
    { label: "Home", href: "#", icon: Home },
    { label: "Movies", href: "#", icon: Film },
    { label: "Series", href: "#", icon: Tv },
    { label: "Genres", href: "#", icon: Clapperboard },
    { label: "Blog", href: "#", icon: Newspaper },
  ];

  // Prevent background scrolling on smaller screens when sidebar drawer is open
  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="">
      {/* Top Header with Completely Solid Colors (No blur/glassmorphism) */}
      <header className="fixed top-0 left-0 right-0 z-30 h-16 bg-zinc-950 border-b border-zinc-800 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Menu Toggle Button & Brand Logo */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-2 rounded-lg text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-600 transition"
            aria-label="Toggle Navigation Menu"
          >
            <Menu size={20} />
          </button>
          <a
            href="#"
            className="text-xl font-black text-white tracking-widest focus:outline-none rounded-md"
          >
            MOVIARA
          </a>
        </div>

        {/* Center: Full Desktop Search Bar */}
        <div className="flex-1 max-w-2xl mx-2 sm:mx-4">
          <div className="relative w-full">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              placeholder="Search movies, series, genres..."
              className="w-full h-10 pl-10 pr-4 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition"
            />
          </div>
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="px-4 py-2 rounded-lg text-xs font-medium text-zinc-200 border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-600 transition">
            Login
          </button>

          <button className="px-4 py-2 rounded-lg text-xs font-semibold text-zinc-950 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-zinc-600 transition shadow-sm">
            Sign Up
          </button>
        </div>
      </header>

      {/* Solid Dark Overlay for Mobile Screen Dismissal */}
      <div
        onClick={() => setIsOpen(false)}
        className={`lg:hidden fixed inset-0 z-40 bg-black/80 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Side Menu Drawer (Increased size to w-72, solid background with no blur) */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Navigation Sidebar"
      >
        <div>
          {/* Sidebar Top Header & Dedicated Close Bar */}
          <div className="flex items-center justify-between pb-5 border-b border-zinc-800">
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-900 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-600 transition"
              aria-label="Close Navigation Menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 mt-6">
            {navLinks.map(({ label, href, icon: Icon }) => {
              const isActive = activeTab === label;

              return (
                <a
                  key={label}
                  href={href}
                  onClick={() => setActiveTab(label)}
                  className={`relative flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-zinc-600 ${
                    isActive
                      ? "bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-300 text-zinc-950 font-semibold shadow-md"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  {/* Active Highlight Accent Bar */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-zinc-500 rounded-r-md" />
                  )}

                  <Icon
                    size={20}
                    className={isActive ? "text-zinc-950" : "text-zinc-400"}
                  />
                  <span>{label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Auth Options */}
        <div className="flex flex-col gap-3 pt-6 border-t border-zinc-800">
          <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-medium text-zinc-200 border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 transition">
            <LogIn size={16} />
            <span>Login</span>
          </button>

          <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-semibold text-zinc-950 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 hover:opacity-90 transition shadow-sm">
            <UserPlus size={16} />
            <span>Sign Up</span>
          </button>
        </div>
      </aside>

    
    </div>
    
  );
}
