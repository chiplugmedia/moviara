import Header from "../components/Header";
import Footer from "../components/Footer";
import TheMovieDetail from "../components/TheMovieDetail";

export default function MovieDetails() {
  return (
    <div className="min-h-screen bg-[#111319] text-white">
      <Header />
      <main className="mx-auto w-full max-w-[1600px] px-3 py-6 space-y-8 md:px-6 xl:px-8">
        <TheMovieDetail />
      </main>
      <Footer />
    </div>
  );
}
