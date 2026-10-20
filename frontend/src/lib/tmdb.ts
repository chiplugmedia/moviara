/**
 * Client TMDB Library
 * Routes all requests exclusively through the internal API proxy.
 * No direct calls to api.themoviedb.org, no exposed client tokens.
 */

const API_BASE = "http://localhost:5000/api/tmdb";

export interface TMDBResponse<T = any> {
  page?: number;
  results: T[];
  total_pages?: number;
  total_results?: number;
}

export interface TMDBMovie {
  id: number;
  title: string;
  original_title?: string;
  name?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  media_type?: "movie" | "tv";
}

export async function fetchFromTMDB<T = any>(
  path: string,
  params: Record<string, string | number | boolean | undefined> = {}
): Promise<T> {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null) {
      queryParams.append(key, String(val));
    }
  });

  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
  const proxyUrl = `${API_BASE}/${cleanPath}${queryString}`;

  const res = await fetch(proxyUrl, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(`TMDB Proxy error (${res.status}): ${errorBody}`);
  }

  return res.json();
}

export async function getTrending(
  mediaType: "movie" | "tv" | "all" = "movie",
  timeWindow: "day" | "week" = "week"
): Promise<TMDBResponse<TMDBMovie>> {
  return fetchFromTMDB(`trending/${mediaType}/${timeWindow}`);
}

export async function getPopularMovies(page = 1): Promise<TMDBResponse<TMDBMovie>> {
  return fetchFromTMDB("movie/popular", { page });
}

export async function getPopularTV(page = 1): Promise<TMDBResponse<TMDBMovie>> {
  return fetchFromTMDB("tv/popular", { page });
}

export async function searchTMDB(
  query: string,
  type: "movie" | "tv" | "multi" = "multi",
  page = 1
): Promise<TMDBResponse<TMDBMovie>> {
  return fetchFromTMDB(`search/${type}`, { query, page, include_adult: false });
}
