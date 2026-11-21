import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";
import hero5 from "@/assets/hero-5.png";
import hero6 from "@/assets/hero-6.png";
import type { CutoutBoard } from "../core/types";

/**
 * The six standees standing in the plaza, in the order they are erected every
 * release: Rebel Star, Power Star, Mega Power Star, Icon Star, Young Tiger,
 * Super Star. Placement (`x`, `z`, `height`) is authored here so the plaza row
 * and the hero panels always agree about who is standing where.
 */
export interface CutoutPlacement extends CutoutBoard {
  /** Plaza position across the pavement. */
  x: number;
  /** Plaza depth. The front row stands nearer the crowd. */
  z: number;
  /** Standee height in world units. */
  height: number;
}

export const CUTOUTS: CutoutPlacement[] = [
  {
    id: "prabhas",
    name: "Prabhas",
    title: "Rebel Star",
    film: "Salaar",
    pose: "Deva stance — chain in hand, coat caught in the wind",
    tagline: "Aagi povali. Lekapothe agipovali.",
    fanBoard: "Rebel Star Fans Assn · Khammam Dist",
    heightFt: 78,
    accent: "#c2501c",
    image: hero1,
    x: -12.4,
    z: 6.4,
    height: 9.4,
    filmography: [
      { title: "Baahubali: The Beginning", role: "Shivudu / Mahendra Baahubali", year: "2015" },
      { title: "Baahubali: The Conclusion", role: "Amarendra Baahubali", year: "2017" },
      { title: "Saaho", role: "Ashok Chakravarthy", year: "2019" },
      { title: "Salaar: Part 1 – Ceasefire", role: "Deva", year: "2023" },
      { title: "Kalki 2898 AD", role: "Bhairava", year: "2024" },
    ],
  },
  {
    id: "pawan",
    name: "Pawan Kalyan",
    title: "Power Star",
    film: "OG",
    pose: "Ojas Gambheera walk — smoke trailing, long coat flaring",
    tagline: "They call him Ojas Gambheera.",
    fanBoard: "Power Star Yuva Sena · Vijayawada",
    heightFt: 80,
    accent: "#e08a2a",
    image: hero2,
    x: -7.4,
    z: 7.2,
    height: 9.6,
    filmography: [
      { title: "Gabbar Singh", role: "Gabbar Singh", year: "2012" },
      { title: "Attarintiki Daredi", role: "Gautham Nanda", year: "2013" },
      { title: "Vakeel Saab", role: "P. V. Konidala", year: "2021" },
      { title: "Bheemla Nayak", role: "Bheemla Nayak", year: "2022" },
      { title: "They Call Him OG", role: "Ojas Gambheera", year: "2025" },
    ],
  },
  {
    id: "charan",
    name: "Ram Charan",
    title: "Mega Power Star",
    film: "Rangasthalam",
    pose: "Chitti Babu — palm cupped behind the ear, lungi folded",
    tagline: "Emantundhi? Konchem gattiga cheppu.",
    fanBoard: "Mega Power Fans · Rangasthalam 1985",
    heightFt: 72,
    accent: "#b32a1f",
    image: hero3,
    x: -2.4,
    z: 6.4,
    height: 8.8,
    filmography: [
      { title: "Magadheera", role: "Kala Bhairava", year: "2009" },
      { title: "Rangasthalam", role: "Chitti Babu", year: "2018" },
      { title: "RRR", role: "Alluri Sitarama Raju", year: "2022" },
      { title: "Acharya", role: "Siddha", year: "2022" },
      { title: "Game Changer", role: "Ram Nandan", year: "2025" },
    ],
  },
  {
    id: "allu",
    name: "Allu Arjun",
    title: "Icon Star",
    film: "Pushpa",
    pose: "Thaggede le — beard tilt, knuckles under the chin",
    tagline: "Pushpa Raj. Thaggede le.",
    fanBoard: "Icon Star AA Fans · Seethampeta",
    heightFt: 76,
    accent: "#3f9c62",
    image: hero4,
    x: 2.4,
    z: 7.2,
    height: 9.2,
    filmography: [
      { title: "Arya", role: "Arya", year: "2004" },
      { title: "Race Gurram", role: "Lucky", year: "2014" },
      { title: "Ala Vaikunthapurramuloo", role: "Bantu", year: "2020" },
      { title: "Pushpa: The Rise", role: "Pushpa Raj", year: "2021" },
      { title: "Pushpa 2: The Rule", role: "Pushpa Raj", year: "2024" },
    ],
  },
  {
    id: "ntr",
    name: "NTR Jr.",
    title: "Young Tiger",
    film: "Devara",
    pose: "Devara — arms wide, dhoti soaked, the sea behind him",
    tagline: "Fear has a name.",
    fanBoard: "Nandamuri Young Tiger Sena · Godavari",
    heightFt: 80,
    accent: "#d4821f",
    image: hero5,
    x: 7.4,
    z: 6.4,
    height: 9.6,
    filmography: [
      { title: "Temper", role: "Daya", year: "2015" },
      { title: "Jai Lava Kusa", role: "Jai / Lava / Kusa", year: "2017" },
      { title: "RRR", role: "Komaram Bheem", year: "2022" },
      { title: "Devara: Part 1", role: "Devara / Vara", year: "2024" },
    ],
  },
  {
    id: "mahesh",
    name: "Mahesh Babu",
    title: "Super Star",
    film: "Pokiri",
    pose: "Stylish walk — collar up, cigarette curling at the lip",
    tagline: "Oka sari commit ayithe, na maata nenu vinanu.",
    fanBoard: "Super Star SSMB Fans · Burripalem",
    heightFt: 74,
    accent: "#4a6cc4",
    image: hero6,
    x: 12.4,
    z: 7.2,
    height: 9,
    filmography: [
      { title: "Pokiri", role: "Pandu / Krishna Manohar", year: "2006" },
      { title: "Dookudu", role: "Ajay", year: "2011" },
      { title: "Srimanthudu", role: "Harsha", year: "2015" },
      { title: "Bharat Ane Nenu", role: "Bharat Ram", year: "2018" },
      { title: "Guntur Kaaram", role: "Ramana", year: "2024" },
    ],
  },
];

const byId = new Map(CUTOUTS.map((cutout) => [cutout.id, cutout]));

export function cutoutById(id: string | null | undefined): CutoutPlacement | null {
  if (!id) return null;
  return byId.get(id) ?? null;
}

export function cutoutName(id: string): string {
  return byId.get(id)?.name ?? "the arena";
}
