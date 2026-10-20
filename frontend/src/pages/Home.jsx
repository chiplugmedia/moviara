import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import PopularMovies from "../components/PopularMovies";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between">
      <Header />
      <main className="mx-auto w-full max-w-[1600px] px-3 pt-20 pb-16 space-y-12 sm:px-6 xl:px-8 flex-1">
        <Hero />
        <PopularMovies />
      </main>
      <Footer />
    </div>
  );
}
