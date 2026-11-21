import type { PollDefinition, PollTally } from "../core/types";

/**
 * The polls run in the lobby kiosk and broadcast on the auditorium screen.
 * Tallies are seeded with a plausible opening ballot so the result bars are
 * never empty on a first visit; a visitor's own vote is added on top.
 */
export const POLLS: PollDefinition[] = [
  {
    id: "first-screen",
    question: "Where do you watch a big film first?",
    context: "Theatrical versus streaming, from the audience side of the ticket counter.",
    accent: "#e8b44a",
    options: [
      { id: "fdfs", label: "First day first show" },
      { id: "weekend", label: "Opening weekend" },
      { id: "word-of-mouth", label: "After the reviews land" },
      { id: "ott", label: "Straight to OTT" },
    ],
  },
  {
    id: "hit-decider",
    question: "What actually decides whether a film becomes a hit?",
    context: "Hype opens a film. Something else has to hold it open.",
    accent: "#e0671e",
    options: [
      { id: "opening", label: "Opening-day hype" },
      { id: "word", label: "Word of mouth by week two" },
      { id: "star", label: "Star power alone" },
      { id: "music", label: "Music, memes and reels" },
    ],
  },
  {
    id: "window",
    question: "How long should the theatrical window be?",
    context: "The single biggest fight between exhibitors and streaming platforms.",
    accent: "#38c8c0",
    options: [
      { id: "d45", label: "45 days or more" },
      { id: "d28", label: "28 days" },
      { id: "d14", label: "14 days" },
      { id: "day-and-date", label: "Day and date on both" },
    ],
  },
  {
    id: "cutout",
    question: "Whose cutout do you want outside your theatre?",
    context: "The row is standing in the plaza right now. Pick one.",
    accent: "#c82626",
    options: [
      { id: "prabhas", label: "Prabhas" },
      { id: "pawan", label: "Pawan Kalyan" },
      { id: "charan", label: "Ram Charan" },
      { id: "allu", label: "Allu Arjun" },
      { id: "ntr", label: "NTR Jr." },
      { id: "mahesh", label: "Mahesh Babu" },
    ],
  },
  {
    id: "celebration",
    question: "What makes a fan celebration actually worth it?",
    context: "Everything outside the screen, before the film even starts.",
    accent: "#ff4d8d",
    options: [
      { id: "cutouts", label: "Cutouts, garlands and milk abhishekam" },
      { id: "whistles", label: "First-show whistles and paper blast" },
      { id: "memes", label: "Memes, edits and reels" },
      { id: "price", label: "Cheaper tickets instead" },
    ],
  },
];

/** Opening ballots, so the bars carry a real shape from the first frame. */
export const SEED_TALLIES: PollTally = {
  "first-screen": { fdfs: 486, weekend: 312, "word-of-mouth": 208, ott: 164 },
  "hit-decider": { opening: 228, word: 534, star: 96, music: 190 },
  window: { d45: 402, d28: 268, d14: 118, "day-and-date": 88 },
  cutout: { prabhas: 318, pawan: 246, charan: 212, allu: 364, ntr: 288, mahesh: 232 },
  celebration: { cutouts: 296, whistles: 244, memes: 322, price: 148 },
};

export function pollById(id: string): PollDefinition | null {
  return POLLS.find((poll) => poll.id === id) ?? null;
}

export function tallyFor(tally: PollTally, pollId: string): Record<string, number> {
  return tally[pollId] ?? {};
}

export interface PollShare {
  optionId: string;
  label: string;
  count: number;
  share: number;
}

/** Percentage per option, in the poll's declared option order. */
export function pollShares(
  poll: PollDefinition,
  counts: Record<string, number>,
): PollShare[] {
  const total = poll.options.reduce((sum, option) => sum + (counts[option.id] ?? 0), 0);
  return poll.options.map((option) => {
    const count = counts[option.id] ?? 0;
    return {
      optionId: option.id,
      label: option.label,
      count,
      share: total > 0 ? count / total : 0,
    };
  });
}

/** Leading option id, used for the "currently leading" readout. */
export function pollLeader(poll: PollDefinition, counts: Record<string, number>): string | null {
  let leader: string | null = null;
  let best = -1;
  for (const option of poll.options) {
    const count = counts[option.id] ?? 0;
    if (count > best) {
      best = count;
      leader = option.id;
    }
  }
  return leader;
}
