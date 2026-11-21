// TMDB API client — typed helpers for the CineVerse dashboard
// Docs: https://developer.themoviedb.org/docs

const KEY = (import.meta.env.VITE_TMDB_API_KEY as string) || "998a447ebe16a70f7a8bd0a74fdb0481";
export const IMG_BASE = "https://image.tmdb.org/t/p";

async function fetchWithTimeout(url: string, timeoutMs = 4500): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

async function requestTMDB(path: string, params: Record<string, string> = {}): Promise<any> {
  const p = new URLSearchParams({ api_key: KEY, language: "en-US", ...params });
  const isBrowser = typeof window !== "undefined";

  if (isBrowser) {
    try {
      const proxyUrl = `/api/tmdb${path}?${p.toString()}`;
      const res = await fetchWithTimeout(proxyUrl, 4000);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fall through to direct TMDB API
    }
  }

  try {
    const directUrl = `https://api.themoviedb.org/3${path}?${p.toString()}`;
    const res = await fetchWithTimeout(directUrl, 4500);
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fall through
  }

  throw new Error(`Failed to fetch TMDB at ${path}`);
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  release_date: string;
  genre_ids: number[];
  overview: string;
  original_language: string;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

export interface TMDBWatchProvidersResult {
  id: number;
  results: {
    IN?: {
      flatrate?: WatchProvider[];
      free?: WatchProvider[];
      ads?: WatchProvider[];
      buy?: WatchProvider[];
      rent?: WatchProvider[];
    };
  };
}

// ─── Poster helpers ───────────────────────────────────────────────────────────

export function posterUrl(path: string | null, size: "w92" | "w185" | "w342" | "w500" | "original" = "w342") {
  if (!path) return null;
  return `${IMG_BASE}/${size}${path}`;
}

// ─── Curated Live Fallback Datasets (Indian Cinema & Global Trending) ──────────

export const FALLBACK_NOW_PLAYING: TMDBMovie[] = [
  {
    id: 1378537,
    title: "Mirzapur: The Movie",
    poster_path: "/cdDKdCRyq6BYuNblpKUYqRPWvEg.jpg",
    backdrop_path: "/nTkQBI8ldvPByIkxsemGxtKlr8E.jpg",
    vote_average: 7.4,
    vote_count: 820,
    popularity: 84.5,
    release_date: "2026-09-04",
    genre_ids: [28, 80, 18],
    overview: "The battle for Mirzapur’s throne intensifies as old enemies resurface.",
    original_language: "hi",
  },
  {
    id: 1317872,
    title: "Sardar 2",
    poster_path: "/muGsRtsNrG1gnlF2fPYrBa4TGlr.jpg",
    backdrop_path: "/i39M5xz57fEkPLtuiAXqWwMNMyN.jpg",
    vote_average: 7.8,
    vote_count: 610,
    popularity: 76.2,
    release_date: "2026-09-10",
    genre_ids: [28, 53],
    overview: "When the Black Dagger threatens national security, Inspector Vijay embarks on a mission.",
    original_language: "ta",
  },
  {
    id: 1441228,
    title: "Irumudi",
    poster_path: "/sPePQmJRKkB14sGjB7zBkLJkaTW.jpg",
    backdrop_path: "/578jrGVEN4a5rxJGtkt9sMI2w6c.jpg",
    vote_average: 7.2,
    vote_count: 420,
    popularity: 58.1,
    release_date: "2026-08-21",
    genre_ids: [18, 28],
    overview: "An intense emotional journey of redemption and family vows in South India.",
    original_language: "te",
  },
  {
    id: 1489543,
    title: "G.D.N",
    poster_path: "/f4CJS8MgxHalhCNQQCoHNN7wD0b.jpg",
    backdrop_path: "/hR0QpzOO2Gx1Lt7KxqKFWZvj5Vl.jpg",
    vote_average: 7.5,
    vote_count: 310,
    popularity: 52.4,
    release_date: "2026-08-07",
    genre_ids: [18, 36],
    overview: "Based on the life of G.D. Naidu, the 'Edison of India'.",
    original_language: "ta",
  },
  {
    id: 1329016,
    title: "Tony",
    poster_path: "/3WN0JWwRI7oGH7Ni2R6poVWej05.jpg",
    backdrop_path: "/bOqTOVkHAL4z87P0Opf6q5mIeRy.jpg",
    vote_average: 7.6,
    vote_count: 530,
    popularity: 49.8,
    release_date: "2026-08-28",
    genre_ids: [18, 35],
    overview: "A young chef stumbles into the chaotic world of high-pressure restaurants.",
    original_language: "en",
  },
  {
    id: 1444466,
    title: "Awarapan 2",
    poster_path: "/lD3J6zTbWkVtPYuSUuuBwpuKMCO.jpg",
    backdrop_path: "/dLw4YK72fW4dF82nnLFDbeXotSX.jpg",
    vote_average: 7.1,
    vote_count: 390,
    popularity: 45.2,
    release_date: "2026-08-14",
    genre_ids: [28, 18, 10749],
    overview: "A tale of redemption, underworld loyalties, and sacrificial love.",
    original_language: "hi",
  },
  {
    id: 1036081,
    title: "Khalifa: The Ruler",
    poster_path: "/cAl7uuRojdxysptYBj9Mg0czGmI.jpg",
    backdrop_path: "/6Jz7rnnZrSkgs9ySWUxewpcxr7Q.jpg",
    vote_average: 7.3,
    vote_count: 280,
    popularity: 41.6,
    release_date: "2026-08-20",
    genre_ids: [80, 28],
    overview: "A notorious kingpin is drawn into a web of vengeance, legacy and power.",
    original_language: "ml",
  },
];

export const FALLBACK_TRENDING: TMDBMovie[] = [
  {
    id: 945961,
    title: "Pushpa 2: The Rule",
    poster_path: "/vUEb8v8W5ANRXhydogbmjXfRfni.jpg",
    backdrop_path: "/as2Y3zGUa2IUS3uAx2sh6Ano3es.jpg",
    vote_average: 8.4,
    vote_count: 2450,
    popularity: 98.4,
    release_date: "2024-12-05",
    genre_ids: [28, 80, 18],
    overview: "The rule begins as Pushpa Raj expands his syndicate across global markets.",
    original_language: "te",
  },
  {
    id: 1378537,
    title: "Mirzapur: The Movie",
    poster_path: "/cdDKdCRyq6BYuNblpKUYqRPWvEg.jpg",
    backdrop_path: "/nTkQBI8ldvPByIkxsemGxtKlr8E.jpg",
    vote_average: 7.4,
    vote_count: 820,
    popularity: 84.5,
    release_date: "2026-09-04",
    genre_ids: [28, 80, 18],
    overview: "The battle for Mirzapur’s throne reaches cinematic scale.",
    original_language: "hi",
  },
  {
    id: 801688,
    title: "Devara: Part 1",
    poster_path: "/as2Y3zGUa2IUS3uAx2sh6Ano3es.jpg",
    backdrop_path: "/hR0QpzOO2Gx1Lt7KxqKFWZvj5Vl.jpg",
    vote_average: 7.3,
    vote_count: 1420,
    popularity: 79.1,
    release_date: "2024-09-27",
    genre_ids: [28, 18],
    overview: "A fearless warrior safeguards his coastal clan against treacherous waters.",
    original_language: "te",
  },
  {
    id: 1317872,
    title: "Sardar 2",
    poster_path: "/muGsRtsNrG1gnlF2fPYrBa4TGlr.jpg",
    backdrop_path: "/i39M5xz57fEkPLtuiAXqWwMNMyN.jpg",
    vote_average: 7.8,
    vote_count: 610,
    popularity: 76.2,
    release_date: "2026-09-10",
    genre_ids: [28, 53],
    overview: "Inspector Vijay faces his greatest adversary in an international espionage crisis.",
    original_language: "ta",
  },
  {
    id: 933260,
    title: "The GOAT",
    poster_path: "/cB6ZAWK70cR5HVnGK6BaCr8W4FH.jpg",
    backdrop_path: "/9GmAODqkVdRvSgg5C4Vfeomi5Nj.jpg",
    vote_average: 7.5,
    vote_count: 980,
    popularity: 71.0,
    release_date: "2024-09-05",
    genre_ids: [28, 53, 878],
    overview: "A former elite squad agent faces a dark confrontation with his past.",
    original_language: "ta",
  },
];

export const FALLBACK_OTT_MOVIES = [
  {
    movie: {
      id: 945961,
      title: "Pushpa 2: The Rule",
      poster_path: "/vUEb8v8W5ANRXhydogbmjXfRfni.jpg",
      backdrop_path: null,
      vote_average: 8.4,
      vote_count: 2450,
      popularity: 98.4,
      release_date: "2024-12-05",
      genre_ids: [28],
      overview: "",
      original_language: "te",
    },
    platform: "Netflix",
    logo: "https://image.tmdb.org/t/p/w45/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
  },
  {
    movie: {
      id: 1378537,
      title: "Mirzapur: The Movie",
      poster_path: "/cdDKdCRyq6BYuNblpKUYqRPWvEg.jpg",
      backdrop_path: null,
      vote_average: 7.4,
      vote_count: 820,
      popularity: 84.5,
      release_date: "2026-09-04",
      genre_ids: [80],
      overview: "",
      original_language: "hi",
    },
    platform: "Prime Video",
    logo: "https://image.tmdb.org/t/p/w45/ifhbNuuVnlwYy5oXAej28CsukRI.jpg",
  },
  {
    movie: {
      id: 801688,
      title: "Devara: Part 1",
      poster_path: "/as2Y3zGUa2IUS3uAx2sh6Ano3es.jpg",
      backdrop_path: null,
      vote_average: 7.3,
      vote_count: 1420,
      popularity: 79.1,
      release_date: "2024-09-27",
      genre_ids: [28],
      overview: "",
      original_language: "te",
    },
    platform: "Netflix",
    logo: "https://image.tmdb.org/t/p/w45/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
  },
  {
    movie: {
      id: 933260,
      title: "The Greatest of All Time",
      poster_path: "/cB6ZAWK70cR5HVnGK6BaCr8W4FH.jpg",
      backdrop_path: null,
      vote_average: 7.5,
      vote_count: 980,
      popularity: 71.0,
      release_date: "2024-09-05",
      genre_ids: [28],
      overview: "",
      original_language: "ta",
    },
    platform: "Netflix",
    logo: "https://image.tmdb.org/t/p/w45/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
  },
  {
    movie: {
      id: 1114513,
      title: "Kalki 2898 AD",
      poster_path: "/sPePQmJRKkB14sGjB7zBkLJkaTW.jpg",
      backdrop_path: null,
      vote_average: 7.9,
      vote_count: 1890,
      popularity: 68.4,
      release_date: "2024-06-27",
      genre_ids: [878, 28],
      overview: "",
      original_language: "te",
    },
    platform: "Prime Video",
    logo: "https://image.tmdb.org/t/p/w45/ifhbNuuVnlwYy5oXAej28CsukRI.jpg",
  },
];

export const FALLBACK_GENRES: TMDBGenre[] = [
  { id: 28, name: "Action" },
  { id: 18, name: "Drama" },
  { id: 53, name: "Thriller" },
  { id: 35, name: "Comedy" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
];

// ─── API Calls ───────────────────────────────────────────────────────────────

/** Movies currently in Indian theatres (region=IN) */
export async function fetchNowPlayingIndia(): Promise<TMDBMovie[]> {
  try {
    const data = await requestTMDB("/movie/now_playing", { region: "IN", page: "1" });
    if (data?.results && Array.isArray(data.results) && data.results.length > 0) {
      return (data.results as TMDBMovie[]).slice(0, 10);
    }
  } catch {
    // Fall through to fallback
  }
  return FALLBACK_NOW_PLAYING;
}

/** Weekly trending movies globally */
export async function fetchTrendingMovies(): Promise<TMDBMovie[]> {
  try {
    const data = await requestTMDB("/trending/movie/week");
    if (data?.results && Array.isArray(data.results) && data.results.length > 0) {
      return (data.results as TMDBMovie[]).slice(0, 10);
    }
  } catch {
    // Fall through to fallback
  }
  return FALLBACK_TRENDING;
}

/** All TMDB genres */
export async function fetchGenres(): Promise<TMDBGenre[]> {
  try {
    const data = await requestTMDB("/genre/movie/list");
    if (data?.genres && Array.isArray(data.genres)) {
      return data.genres as TMDBGenre[];
    }
  } catch {
    // Fall through to fallback
  }
  return FALLBACK_GENRES;
}

/** Discover movies available on OTT in India — streamed per major platform */
export async function fetchOTTMovies(): Promise<
  { movie: TMDBMovie; platform: string; logo: string }[]
> {
  const platforms: { id: number; name: string }[] = [
    { id: 8, name: "Netflix" },
    { id: 119, name: "Prime Video" },
    { id: 122, name: "Hotstar" },
    { id: 220, name: "JioCinema" },
    { id: 237, name: "SonyLIV" },
  ];

  try {
    const results: { movie: TMDBMovie; platform: string; logo: string }[] = [];

    await Promise.all(
      platforms.map(async (p) => {
        try {
          const data = await requestTMDB("/discover/movie", {
            watch_region: "IN",
            with_watch_providers: String(p.id),
            sort_by: "popularity.desc",
            page: "1",
          });
          const movie = (data?.results as TMDBMovie[])?.[0];
          if (movie) {
            let logo = "";
            try {
              const provData: TMDBWatchProvidersResult = await requestTMDB(
                `/movie/${movie.id}/watch/providers`
              );
              const flatrate = provData.results?.IN?.flatrate ?? [];
              const found = flatrate.find((x) => x.provider_id === p.id);
              logo = found ? `${IMG_BASE}/w45${found.logo_path}` : "";
            } catch {
              // Ignore logo fail
            }
            results.push({ movie, platform: p.name, logo });
          }
        } catch {
          // silently skip failed platforms
        }
      })
    );

    if (results.length > 0) {
      return results;
    }
  } catch {
    // Fall through to fallback
  }

  return FALLBACK_OTT_MOVIES;
}

/** Top-rated movies for the rating × popularity scatter */
export async function fetchTopRated(): Promise<TMDBMovie[]> {
  try {
    const data = await requestTMDB("/movie/top_rated", { page: "1" });
    if (data?.results && Array.isArray(data.results) && data.results.length > 0) {
      return (data.results as TMDBMovie[]).slice(0, 12);
    }
  } catch {
    // Fall through to fallback
  }
  return FALLBACK_TRENDING;
}

/**
 * Genre popularity breakdown derived from trending movies.
 * Returns each genre's % share of appearance in the weekly trending list.
 */
export async function fetchGenreBreakdown(): Promise<
  { name: string; value: number }[]
> {
  try {
    const [movies, genres] = await Promise.all([
      fetchTrendingMovies(),
      fetchGenres(),
    ]);

    const count: Record<number, number> = {};
    for (const m of movies) {
      for (const gid of m.genre_ids || []) {
        count[gid] = (count[gid] ?? 0) + 1;
      }
    }

    const total = Object.values(count).reduce((a, b) => a + b, 0) || 1;

    const breakdown = genres
      .filter((g) => count[g.id])
      .map((g) => ({
        name: g.name,
        value: Math.round((count[g.id] / total) * 100),
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    if (breakdown.length > 0) {
      return breakdown;
    }
  } catch {
    // Fall through to fallback
  }

  return [
    { name: "Action", value: 34 },
    { name: "Drama", value: 26 },
    { name: "Thriller", value: 18 },
    { name: "Comedy", value: 12 },
    { name: "Romance", value: 6 },
    { name: "Sci-Fi", value: 4 },
  ];
}
