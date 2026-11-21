// Curated realistic mock data for CineVerse — OTT vs Theatre intelligence.
// All numbers are illustrative for portfolio demonstration.

export const boxOfficeTrend = [
  { day: "Mon", theatre: 42, ott: 18 },
  { day: "Tue", theatre: 38, ott: 22 },
  { day: "Wed", theatre: 51, ott: 28 },
  { day: "Thu", theatre: 47, ott: 31 },
  { day: "Fri", theatre: 128, ott: 40 },
  { day: "Sat", theatre: 186, ott: 58 },
  { day: "Sun", theatre: 172, ott: 65 },
];

export const genreShare = [
  { name: "Action", value: 32, fill: "var(--color-chart-1)" },
  { name: "Drama", value: 24, fill: "var(--color-chart-2)" },
  { name: "Comedy", value: 18, fill: "var(--color-chart-3)" },
  { name: "Thriller", value: 14, fill: "var(--color-chart-4)" },
  { name: "Romance", value: 12, fill: "var(--color-chart-5)" },
];

export const ottVsTheatre = [
  { name: "Theatre", value: 58, fill: "var(--color-chart-2)" },
  { name: "OTT", value: 42, fill: "var(--color-chart-1)" },
];

export const trendingMovies = [
  { rank: 1, title: "Kalki 2898 AD", gross: "₹648 Cr" },
  { rank: 2, title: "Jawan", gross: "₹640 Cr" },
  { rank: 3, title: "Animal", gross: "₹553 Cr" },
  { rank: 4, title: "Salaar", gross: "₹475 Cr" },
  { rank: 5, title: "RRR", gross: "₹1,387 Cr" },
];

export const topOtt = [
  { rank: 1, title: "Jaane Jaan", platform: "Netflix" },
  { rank: 2, title: "Farzi S2", platform: "Prime Video" },
  { rank: 3, title: "Asur S2", platform: "JioCinema" },
  { rank: 4, title: "Lust Stories 2", platform: "Netflix" },
  { rank: 5, title: "Dahaad", platform: "Prime Video" },
];

export const ratingVsRevenue = [
  { rating: 5.2, revenue: 60, title: "Film A" },
  { rating: 6.1, revenue: 110, title: "Film B" },
  { rating: 7.0, revenue: 180, title: "Film C" },
  { rating: 7.6, revenue: 280, title: "Film D" },
  { rating: 8.3, revenue: 640, title: "Kalki 2898 AD" },
  { rating: 8.1, revenue: 553, title: "Animal" },
  { rating: 7.9, revenue: 475, title: "Salaar" },
  { rating: 6.4, revenue: 90, title: "Film G" },
];

export const day1Vs3 = [
  { title: "Kalki", day1: 95, day3: 88 },
  { title: "Jawan", day1: 75, day3: 82 },
  { title: "Salaar", day1: 89, day3: 62 },
  { title: "Animal", day1: 80, day3: 79 },
  { title: "Adipurush", day1: 82, day3: 34 },
];

export const urbanVsRural = [
  { metric: "Occupancy %", urban: 63, rural: 78 },
  { metric: "Avg Ticket ₹", urban: 320, rural: 110 },
  { metric: "Screens", urban: 4200, rural: 5100 },
  { metric: "F&B / user ₹", urban: 260, rural: 45 },
];

export const bookingHeatmap = (() => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const slots = ["10AM", "1PM", "4PM", "7PM", "10PM"];
  const base: Record<string, Record<string, number>> = {};
  const seed = [
    [10, 22, 30, 55, 40],
    [12, 24, 28, 52, 42],
    [15, 26, 32, 58, 44],
    [18, 28, 36, 62, 46],
    [30, 42, 55, 88, 78],
    [45, 60, 75, 96, 90],
    [38, 55, 70, 92, 80],
  ];
  days.forEach((d, i) => {
    base[d] = {};
    slots.forEach((s, j) => (base[d][s] = seed[i][j]));
  });
  return { days, slots, values: base };
})();

export const funnelData = [
  { stage: "Impression", value: 100 },
  { stage: "Browse", value: 62 },
  { stage: "Seat Select", value: 34 },
  { stage: "Checkout", value: 22 },
  { stage: "Paid", value: 18 },
];

export const lifecycleCurve = [
  { week: "W1", theatre: 100, ott: 4 },
  { week: "W2", theatre: 62, ott: 6 },
  { week: "W3", theatre: 34, ott: 10 },
  { week: "W4", theatre: 20, ott: 18 },
  { week: "W5", theatre: 12, ott: 45 },
  { week: "W6", theatre: 6, ott: 78 },
  { week: "W7", theatre: 3, ott: 92 },
  { week: "W8", theatre: 2, ott: 88 },
];

export const marketingImpact = [
  { campaign: "Trailer", engagement: 62, revenue: 40 },
  { campaign: "TV Ads", engagement: 40, revenue: 28 },
  { campaign: "Meme wave", engagement: 88, revenue: 55 },
  { campaign: "College tour", engagement: 74, revenue: 48 },
  { campaign: "Influencers", engagement: 82, revenue: 60 },
  { campaign: "Fan event", engagement: 95, revenue: 72 },
];

export const demographics = [
  { age: "15–25", action: 82, drama: 40, comedy: 66, thriller: 58 },
  { age: "25–40", action: 60, drama: 72, comedy: 62, thriller: 74 },
  { age: "40+", action: 32, drama: 88, comedy: 45, thriller: 40 },
];

export const platformByAge = [
  { age: "15–25", theatre: 55, ott: 78 },
  { age: "25–40", theatre: 62, ott: 72 },
  { age: "40+", theatre: 48, ott: 40 },
];

export const covidImpact = [
  { year: "2018", theatre: 100, ott: 22 },
  { year: "2019", theatre: 108, ott: 30 },
  { year: "2020", theatre: 24, ott: 82 },
  { year: "2021", theatre: 38, ott: 96 },
  { year: "2022", theatre: 78, ott: 104 },
  { year: "2023", theatre: 96, ott: 118 },
  { year: "2024", theatre: 112, ott: 132 },
];

export const businessModel = [
  { metric: "Peak revenue", ott: 40, theatre: 100 },
  { metric: "Lifetime value", ott: 100, theatre: 30 },
  { metric: "Ad monetisation", ott: 78, theatre: 12 },
  { metric: "F&B margin", ott: 0, theatre: 88 },
  { metric: "Global reach", ott: 96, theatre: 28 },
];

export const sentimentGauge = 78;

export const dashboardKpis = [
  { label: "Total Box Office", value: "₹1,245 Cr", delta: "+18.6%" },
  { label: "Theatre Occupancy", value: "67.3%", delta: "+8.9%" },
  { label: "OTT Views", value: "128.7 Mn", delta: "+24.3%" },
  { label: "New Releases", value: "23", delta: "+5" },
  { label: "Avg Rating", value: "7.6 / 10", delta: "+0.3" },
];

export type LensId =
  | "box-office"
  | "ott"
  | "audience"
  | "genres"
  | "reviews"
  | "marketing"
  | "demographics"
  | "lifecycle"
  | "covid"
  | "business";

export const lenses: { id: LensId; label: string; kicker: string }[] = [
  { id: "box-office", label: "Box Office", kicker: "₹1,245 Cr" },
  { id: "ott", label: "OTT Insights", kicker: "128.7 Mn views" },
  { id: "audience", label: "Audience", kicker: "Urban vs Rural" },
  { id: "genres", label: "Genres", kicker: "Mass vs Niche" },
  { id: "reviews", label: "Reviews", kicker: "Sentiment 78%" },
  { id: "marketing", label: "Marketing", kicker: "Campaign lift" },
  { id: "demographics", label: "Demographics", kicker: "Age × Genre" },
  { id: "lifecycle", label: "Lifecycle", kicker: "Theatre → OTT" },
  { id: "covid", label: "COVID Impact", kicker: "2018 → 2024" },
  { id: "business", label: "Business Model", kicker: "OTT vs Theatre" },
];