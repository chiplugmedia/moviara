/**
 * Movie & Series API Service for Moviara
 * 
 * Proxies TMDB API (v3) for metadata, posters, backdrops, cast, seasons & trailers,
 * enriched with OMDb API for verified IMDb, Rotten Tomatoes & Metacritic critic scores.
 */

const API_SERVER_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

/**
 * Generic API request helper with error handling
 */
async function apiRequest(endpoint) {
  try {
    const res = await fetch(`${API_SERVER_URL}${endpoint}`);

    if (!res.ok) {
      let errorMessage = `Server responded with ${res.status}`;
      try {
        const errorData = await res.json();
        if (errorData.error) errorMessage = errorData.error;
      } catch (_) {}
      throw new Error(errorMessage);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    if (err.name === "TypeError" && err.message.includes("fetch")) {
      throw new Error(
        "Cannot connect to the Moviara backend on http://localhost:5000. Please ensure the backend server is running."
      );
    }
    throw err;
  }
}

/**
 * Direct call through the internal /api/tmdb/* proxy
 */
export async function fetchTMDBProxy(path, params = {}) {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const query = new URLSearchParams(params).toString();
  const qStr = query ? `?${query}` : "";
  return apiRequest(`/tmdb/${cleanPath}${qStr}`);
}

/**
 * Fetch weekly trending movies from TMDB
 */
export async function fetchTrendingMovies() {
  const data = await apiRequest("/movies/trending");
  return data.movies || [];
}

/**
 * Fetch popular movies from TMDB
 * @param {number} page
 */
export async function fetchPopularMovies(page = 1) {
  const data = await apiRequest(`/movies/popular?page=${page}`);
  return data.movies || [];
}

/**
 * Fetch weekly trending TV series from TMDB
 */
export async function fetchTrendingSeries() {
  const data = await apiRequest("/series/trending");
  return data.series || [];
}

/**
 * Fetch popular TV series from TMDB
 * @param {number} page
 */
export async function fetchPopularSeries(page = 1) {
  const data = await apiRequest(`/series/popular?page=${page}`);
  return data.series || [];
}

/**
 * Fetch top rated TV series from TMDB
 * @param {number} page
 */
export async function fetchTopRatedSeries(page = 1) {
  const data = await apiRequest(`/series/top-rated?page=${page}`);
  return data.series || [];
}

/**
 * Fetch curated adult animation (critically acclaimed anime & adult animated series/movies)
 */
export async function fetchAdultAnimation() {
  const data = await apiRequest("/movies/adult-animation");
  return data.titles || [];
}

/**
 * Search movies & series by keyword and optional page
 * @param {string} query
 * @param {number} page
 */
export async function searchMovies(query, page = 1) {
  if (!query || !query.trim()) return { movies: [], totalResults: 0 };
  const data = await apiRequest(
    `/movies/search?q=${encodeURIComponent(query.trim())}&page=${page}`
  );
  return {
    movies: data.movies || [],
    totalResults: data.totalResults || 0,
    page: data.page || page,
    totalPages: data.totalPages || 1,
  };
}

/**
 * Fetch full movie or series metadata (TMDB details + credits + enriched OMDb ratings)
 * @param {string|number} id TMDB numeric ID or IMDb string ID (e.g. 155 or tt0468569)
 * @param {string} type Optional media type ("movie" or "tv")
 */
export async function fetchMovieDetails(id, type = null) {
  if (!id) throw new Error("Media ID is required.");
  const queryParam = type ? `?type=${type}` : "";
  const data = await apiRequest(`/movies/${encodeURIComponent(id)}${queryParam}`);
  const result = data.movie || data.media;
  if (!result) {
    throw new Error(data.error || "Media details not found.");
  }
  return result;
}

/**
 * Fetch full series details
 * @param {string|number} id
 */
export async function fetchSeriesDetails(id) {
  if (!id) throw new Error("Series ID is required.");
  const data = await apiRequest(`/series/${encodeURIComponent(id)}`);
  const result = data.movie || data.media;
  if (!result) {
    throw new Error(data.error || "Series details not found.");
  }
  return result;
}

/**
 * Fetch verified critic ratings (IMDb, Rotten Tomatoes, Metacritic) from OMDb
 * @param {string|number} id TMDB ID or IMDb ID
 */
export async function fetchMovieRatings(id) {
  if (!id) return null;
  try {
    const data = await apiRequest(`/movies/${encodeURIComponent(id)}/rating`);
    return data;
  } catch (err) {
    console.warn("Could not fetch extra ratings:", err.message);
    return null;
  }
}

/**
 * Fetch movies filtered by category/genre
 * @param {string} genre Category name (e.g. Action, Drama, Horror)
 */
export async function fetchMoviesByCategory(genre) {
  if (!genre || genre === "All") {
    return fetchPopularMovies();
  }

  const [popular, trending] = await Promise.all([
    fetchPopularMovies().catch(() => []),
    fetchTrendingMovies().catch(() => []),
  ]);

  const combined = [...popular, ...trending];
  const uniqueMap = new Map();
  combined.forEach((m) => {
    if (m && m.id && !uniqueMap.has(m.id)) uniqueMap.set(m.id, m);
  });
  const allMovies = Array.from(uniqueMap.values());

  const matched = allMovies.filter(
    (m) =>
      m.genres &&
      m.genres.some((g) => g.toLowerCase() === genre.toLowerCase())
  );

  if (matched.length >= 6) {
    return matched;
  }

  try {
    const searchRes = await searchMovies(genre, 1);
    const searchMoviesList = searchRes.movies || [];
    const merged = [...matched, ...searchMoviesList];
    const finalMap = new Map();
    merged.forEach((m) => {
      if (m && m.id && !finalMap.has(m.id)) finalMap.set(m.id, m);
    });
    return Array.from(finalMap.values());
  } catch (_) {
    return matched;
  }
}

export const GENRES_LIST = [
  "All",
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
  "War",
  "Western",
];
