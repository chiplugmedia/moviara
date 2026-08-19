import Header from "../components/Header";
import Hero from "../components/Hero";
import PopularMovies from "../components/PopularMovies";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111319] text-white">
      <Header />
      <main className="mx-auto w-full max-w-[1600px] px-3 py-6 space-y-8 md:px-6 xl:px-8">
        <Hero />
        <PopularMovies />
      </main>
      <Footer />
    </div>
  );
}
