import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import TVShows from "./pages/TVShows";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import MovieDetails from "./pages/MovieDetails";
import WatchMovie from "./pages/WatchMovie";
import Genres from "./pages/Genres";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/tv-shows/:id" element={<MovieDetails />} />
        <Route path="/tv" element={<TVShows />} />
        <Route path="/tv/:id" element={<MovieDetails />} />
        <Route path="/series" element={<TVShows />} />
        <Route path="/series/:id" element={<MovieDetails />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/details" element={<MovieDetails />} />
        <Route path="/details/:id" element={<MovieDetails />} />
        <Route path="/watch" element={<WatchMovie />} />
        <Route path="/watch/:id" element={<WatchMovie />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/search" element={<Search />} />
        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
