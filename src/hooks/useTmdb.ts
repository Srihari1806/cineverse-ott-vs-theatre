// React Query hooks for all TMDB data used in CineVerse
import { useQuery } from "@tanstack/react-query";
import {
  fetchNowPlayingIndia,
  fetchTrendingMovies,
  fetchOTTMovies,
  fetchGenreBreakdown,
  fetchTopRated,
  posterUrl,
  type TMDBMovie,
} from "@/lib/tmdb";

// Chart fill colours matching the CineVerse design system
const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-ember)",
];

// ─── Now Playing (Indian theatres) ───────────────────────────────────────────

export function useNowPlaying() {
  return useQuery({
    queryKey: ["tmdb", "now-playing"],
    queryFn: fetchNowPlayingIndia,
    staleTime: 1000 * 60 * 30, // 30 min
    retry: 2,
  });
}

// ─── Trending Movies ──────────────────────────────────────────────────────────

export interface TrendingMovie {
  rank: number;
  id: number;
  title: string;
  rating: string;
  popularity: string;
  posterUrl: string | null;
  year: string;
}

export function useTrendingMovies() {
  return useQuery<TrendingMovie[]>({
    queryKey: ["tmdb", "trending"],
    queryFn: async () => {
      const movies = await fetchTrendingMovies();
      return movies.slice(0, 5).map((m, i) => ({
        rank: i + 1,
        id: m.id,
        title: m.title,
        rating: m.vote_average.toFixed(1),
        popularity: m.popularity.toFixed(0),
        posterUrl: posterUrl(m.poster_path, "w92"),
        year: m.release_date?.slice(0, 4) ?? "—",
      }));
    },
    staleTime: 1000 * 60 * 30,
    retry: 2,
  });
}

// ─── Top OTT ─────────────────────────────────────────────────────────────────

export interface OTTMovie {
  rank: number;
  id: number;
  title: string;
  platform: string;
  logo: string;
  posterUrl: string | null;
  rating: string;
}

export function useTopOTT() {
  return useQuery<OTTMovie[]>({
    queryKey: ["tmdb", "ott"],
    queryFn: async () => {
      const items = await fetchOTTMovies();
      return items.slice(0, 5).map((item, i) => ({
        rank: i + 1,
        id: item.movie.id,
        title: item.movie.title,
        platform: item.platform,
        logo: item.logo,
        posterUrl: posterUrl(item.movie.poster_path, "w92"),
        rating: item.movie.vote_average.toFixed(1),
      }));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 2,
  });
}

// ─── Genre Share ──────────────────────────────────────────────────────────────

export interface GenreSlice {
  name: string;
  value: number;
  fill: string;
}

export function useGenreShare() {
  return useQuery<GenreSlice[]>({
    queryKey: ["tmdb", "genres"],
    queryFn: async () => {
      const breakdown = await fetchGenreBreakdown();
      return breakdown.map((g, i) => ({
        ...g,
        fill: CHART_COLORS[i % CHART_COLORS.length],
      }));
    },
    staleTime: 1000 * 60 * 60,
    retry: 2,
  });
}

// ─── Dashboard KPIs (live) ────────────────────────────────────────────────────

export interface LiveKpi {
  label: string;
  value: string;
  delta: string;
  live: boolean;
}

export function useLiveKpis() {
  return useQuery<LiveKpi[]>({
    queryKey: ["tmdb", "kpis"],
    queryFn: async () => {
      const [nowPlaying, trending] = await Promise.all([
        fetchNowPlayingIndia(),
        fetchTrendingMovies(),
      ]);

      const avgRating =
        trending.reduce((sum, m) => sum + m.vote_average, 0) / (trending.length || 1);

      const newReleases = nowPlaying.length;

      return [
        {
          label: "New Releases",
          value: String(newReleases),
          delta: "in theatres now",
          live: true,
        },
        {
          label: "Avg TMDB Rating",
          value: `${avgRating.toFixed(1)} / 10`,
          delta: "trending this week",
          live: true,
        },
        {
          label: "Total Box Office",
          value: "₹1,245 Cr",
          delta: "+18.6% vs last week",
          live: false,
        },
        {
          label: "Theatre Occupancy",
          value: "67.3%",
          delta: "+8.9% vs last week",
          live: false,
        },
        {
          label: "OTT Views",
          value: "128.7 Mn",
          delta: "+24.3% vs last week",
          live: false,
        },
      ];
    },
    staleTime: 1000 * 60 * 30,
    retry: 2,
  });
}

// ─── Rating × Popularity scatter ─────────────────────────────────────────────

export interface RatingPopPoint {
  rating: number;
  popularity: number;
  title: string;
  id: number;
}

export function useRatingPopularity() {
  return useQuery<RatingPopPoint[]>({
    queryKey: ["tmdb", "rating-popularity"],
    queryFn: async () => {
      const movies: TMDBMovie[] = await fetchTopRated();
      return movies
        .filter((m) => m.vote_count > 500)
        .map((m) => ({
          rating: parseFloat(m.vote_average.toFixed(1)),
          popularity: Math.round(m.popularity),
          title: m.title,
          id: m.id,
        }));
    },
    staleTime: 1000 * 60 * 60,
    retry: 2,
  });
}
