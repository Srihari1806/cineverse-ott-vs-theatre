import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";
import hero5 from "@/assets/hero-5.png";
import hero6 from "@/assets/hero-6.png";

export type HeroCutout = {
  id: string;
  name: string;
  title: string;
  tagline: string;
  association: string;
  imageUrl: string;
  depthIndex: number;
  leftPercent: number;
  topPercent: number;
  widthPercent: number;
  heightPercent: number;
};

export const MARQUEE_TEXT_CYCLES = [
  "⚡ FANS LOVE MASS JATHARA ★ ONE MAN MILLIONS HEARTS ⚡",
  "🔥 CELEBRATE MASS MANIA ★ SUPERSTAR MASS FESTIVAL 🔥",
  "⚡ THE ICON RETURNS ★ REBEL STAR WORLDWIDE RALLY ⚡",
  "🔥 FIRST DAY FIRST SHOW ★ POWER STAR MASS HUNGAMA 🔥",
];

export const INITIAL_HEROES: HeroCutout[] = [
  {
    id: "salaar",
    name: "Prabhas",
    title: "Salaar Stance",
    tagline: "Rebel Star",
    association: "Rebel Fans Assn",
    imageUrl: hero1,
    depthIndex: 0.7,
    leftPercent: 18.5,
    topPercent: 6,
    widthPercent: 7.5,
    heightPercent: 43,
  },
  {
    id: "og",
    name: "Pawan Kalyan",
    title: "OG Walk",
    tagline: "Power Star",
    association: "Power Fans Assn",
    imageUrl: hero2,
    depthIndex: 0.75,
    leftPercent: 27.5,
    topPercent: 5,
    widthPercent: 8,
    heightPercent: 44,
  },
  {
    id: "rangasthalam",
    name: "Ram Charan",
    title: "Village Fury",
    tagline: "Mega Power Star",
    association: "Mega Fans Assn",
    imageUrl: hero3,
    depthIndex: 0.82,
    leftPercent: 36.5,
    topPercent: 3,
    widthPercent: 10,
    heightPercent: 46,
  },
  {
    id: "pushpa",
    name: "Allu Arjun",
    title: "Pushpa Raj",
    tagline: "Icon Star",
    association: "Icon Fans Assn",
    imageUrl: hero4,
    depthIndex: 0.82,
    leftPercent: 49.5,
    topPercent: 4,
    widthPercent: 9.5,
    heightPercent: 45,
  },
  {
    id: "devara",
    name: "NTR Jr.",
    title: "Devara Stance",
    tagline: "Young Tiger",
    association: "Tiger Fans Assn",
    imageUrl: hero5,
    depthIndex: 0.75,
    leftPercent: 63.5,
    topPercent: 4,
    widthPercent: 9,
    heightPercent: 45,
  },
  {
    id: "pokiri",
    name: "Mahesh Babu",
    title: "Stylish Walk",
    tagline: "Superstar",
    association: "Superstar Fans Assn",
    imageUrl: hero6,
    depthIndex: 0.7,
    leftPercent: 74,
    topPercent: 5,
    widthPercent: 9,
    heightPercent: 44,
  },
];
