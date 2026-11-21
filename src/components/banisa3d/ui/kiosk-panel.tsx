/**
 * KioskPanel — multi-tab interactive kiosk (slides up from bottom).
 *
 * Tabs: Poll | Banner Studio | Fan Wall
 * Reads `kiosk` tab key from theatre store; when null, renders nothing.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  useTheatre,
  closeKiosk,
  castVote,
  useTallies,
  addNote,
  hangBanner,
  DEFAULT_BANNER,
} from "../state/theatre-store";
import { POLLS, pollShares } from "../data/polls";
import type { BannerConfig } from "../core/types";
import { CUTOUTS } from "../data/cutouts";
import { PALETTE } from "../core/palette";

type TabKey = "poll" | "banner" | "fanwall";

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: "poll", label: "Poll", emoji: "📊" },
  { id: "banner", label: "Banner Studio", emoji: "🎨" },
  { id: "fanwall", label: "Fan Wall", emoji: "📝" },
];

const GLASS = "bg-black/80 backdrop-blur-xl border border-amber-700/30";

/* ── Poll tab ────────────────────────────────────────────────────────────── */
function PollTab() {
  const ballot = useTheatre((s) => s.ballot);
  const tallies = useTallies();

  return (
    <div className="space-y-6 overflow-y-auto max-h-[38vh] pr-1">
      {POLLS.slice(0, 2).map((poll) => {
        const voted = poll.id in ballot;
        const counts = tallies[poll.id] ?? {};
        const shares = pollShares(poll, counts);
        const total = shares.reduce((s, p) => s + p.count, 0);

        return (
          <div key={poll.id} className="space-y-2">
            <p className="text-sm font-semibold text-amber-100">{poll.question}</p>
            <p className="text-[11px] text-amber-300/60">{poll.context}</p>
            {voted ? (
              /* Result bars */
              <div className="space-y-1.5 mt-2">
                {shares.map((s) => (
                  <div key={s.optionId} className="space-y-0.5">
                    <div className="flex justify-between text-[11px] text-amber-200/70">
                      <span>{s.label}</span>
                      <span>{total > 0 ? `${Math.round(s.share * 100)}%` : "—"}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${s.share * 100}%`,
                          backgroundColor: poll.accent,
                        }}
                      />
                    </div>
                  </div>
                ))}
                <p className="text-[10px] text-amber-400/50 mt-1">
                  Your vote: <em className="text-amber-300">{POLLS.find(p => p.id === poll.id)?.options.find(o => o.id === ballot[poll.id])?.label}</em>
                </p>
              </div>
            ) : (
              /* Option buttons */
              <div className="grid grid-cols-2 gap-1.5 mt-2">
                {poll.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => castVote(poll.id, opt.id)}
                    className="text-left text-[11px] text-amber-200 border border-amber-700/30 rounded-lg
                      px-3 py-2 hover:border-amber-500/60 hover:bg-amber-900/20 transition-all cursor-pointer"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Banner Studio tab ───────────────────────────────────────────────────── */
function BannerTab() {
  const [banner, setBanner] = useState<BannerConfig>({ ...DEFAULT_BANNER });
  const [saved, setSaved] = useState(false);

  function submit() {
    hangBanner(banner);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  return (
    <div className="space-y-4 overflow-y-auto max-h-[38vh] pr-1">
      {/* Preview */}
      <div
        className="flex flex-col items-center justify-center rounded-lg py-4 text-center"
        style={{
          background: `linear-gradient(135deg, ${banner.color} 0%, ${banner.color2} 100%)`,
          boxShadow: banner.glow > 0.1 ? `0 0 ${Math.round(banner.glow * 40)}px ${banner.color}88` : "none",
        }}
      >
        <p className="text-lg font-black text-white drop-shadow tracking-wide">{banner.text || "YOUR TEXT"}</p>
        {banner.subtext && <p className="text-xs text-white/80 mt-0.5">{banner.subtext}</p>}
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/50 mt-1">{banner.finish} finish</p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2">
          <label className="text-[10px] uppercase tracking-[0.25em] text-amber-400 block mb-1">Main text</label>
          <input
            type="text"
            value={banner.text}
            onChange={(e) => setBanner((b) => ({ ...b, text: e.target.value }))}
            maxLength={28}
            className="w-full bg-white/5 border border-amber-700/30 rounded-md px-3 py-1.5 text-sm text-amber-100
              focus:outline-none focus:border-amber-500/60 placeholder-white/20"
            placeholder="SUPERSTAR ARENA"
          />
        </div>
        <div className="col-span-2">
          <label className="text-[10px] uppercase tracking-[0.25em] text-amber-400 block mb-1">Subtext</label>
          <input
            type="text"
            value={banner.subtext}
            onChange={(e) => setBanner((b) => ({ ...b, subtext: e.target.value }))}
            maxLength={42}
            className="w-full bg-white/5 border border-amber-700/30 rounded-md px-3 py-1.5 text-xs text-amber-100
              focus:outline-none focus:border-amber-500/60 placeholder-white/20"
            placeholder="CineVerse Fan Banner Studio"
          />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-[0.25em] text-amber-400 block mb-1">Color 1</label>
          <input type="color" value={banner.color} onChange={(e) => setBanner((b) => ({ ...b, color: e.target.value }))}
            className="w-full h-8 rounded-md cursor-pointer border border-amber-700/30 bg-transparent" />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-[0.25em] text-amber-400 block mb-1">Color 2</label>
          <input type="color" value={banner.color2} onChange={(e) => setBanner((b) => ({ ...b, color2: e.target.value }))}
            className="w-full h-8 rounded-md cursor-pointer border border-amber-700/30 bg-transparent" />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-[0.25em] text-amber-400 block mb-1">Finish</label>
          <select
            value={banner.finish}
            onChange={(e) => setBanner((b) => ({ ...b, finish: e.target.value as BannerConfig["finish"] }))}
            className="w-full bg-black/60 border border-amber-700/30 rounded-md px-2 py-1.5 text-xs text-amber-200
              focus:outline-none cursor-pointer"
          >
            <option value="flex">Flex</option>
            <option value="cloth">Cloth</option>
            <option value="neon">Neon</option>
          </select>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-[0.25em] text-amber-400 block mb-1">
            Glow: {Math.round(banner.glow * 100)}%
          </label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={banner.glow}
            onChange={(e) => setBanner((b) => ({ ...b, glow: parseFloat(e.target.value) }))}
            className="w-full cursor-pointer accent-amber-500"
          />
        </div>
      </div>
      <button
        onClick={submit}
        className="w-full py-2.5 rounded-lg text-sm font-bold text-black bg-amber-500 hover:bg-amber-400
          active:scale-95 transition-all cursor-pointer"
      >
        {saved ? "✓ Banner hung in the plaza!" : "🏳️ Hang This Banner"}
      </button>
    </div>
  );
}

/* ── Fan Wall tab ────────────────────────────────────────────────────────── */
function FanWallTab() {
  const notes = useTheatre((s) => s.notes);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [heroId, setHeroId] = useState(CUTOUTS[0]?.id ?? "");
  const [association, setAssociation] = useState("");

  function submit() {
    if (text.trim().length <= 3) return;
    addNote({ text, author, heroId, association });
    setText("");
    setAuthor("");
    setAssociation("");
  }

  return (
    <div className="space-y-4 overflow-y-auto max-h-[38vh] pr-1">
      {/* Note list */}
      {notes.length === 0 ? (
        <p className="text-center text-amber-200/40 text-sm py-4">
          Be the first to leave a note! 👇
        </p>
      ) : (
        <div className="space-y-2">
          {notes.map((note) => (
            <div key={note.id} className="border border-amber-700/25 rounded-lg px-3 py-2.5">
              <p className="text-xs text-amber-100 leading-relaxed">{note.text}</p>
              <p className="text-[10px] text-amber-400/60 mt-1">
                — {note.author} · {CUTOUTS.find((c) => c.id === note.heroId)?.name ?? note.heroId}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Submit form */}
      <div className="border-t border-amber-700/25 pt-3 space-y-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          maxLength={220}
          placeholder="Write your message to the superstar…"
          className="w-full bg-white/5 border border-amber-700/30 rounded-md px-3 py-2 text-xs text-amber-100
            focus:outline-none focus:border-amber-500/60 placeholder-white/20 resize-none"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            maxLength={28}
            className="bg-white/5 border border-amber-700/30 rounded-md px-3 py-1.5 text-xs text-amber-100
              focus:outline-none focus:border-amber-500/60 placeholder-white/20"
          />
          <select
            value={heroId}
            onChange={(e) => setHeroId(e.target.value)}
            className="bg-black/60 border border-amber-700/30 rounded-md px-2 py-1.5 text-xs text-amber-200
              focus:outline-none cursor-pointer"
          >
            {CUTOUTS.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <input
          type="text"
          value={association}
          onChange={(e) => setAssociation(e.target.value)}
          placeholder="Fan association (optional)"
          maxLength={40}
          className="w-full bg-white/5 border border-amber-700/30 rounded-md px-3 py-1.5 text-xs text-amber-100
            focus:outline-none focus:border-amber-500/60 placeholder-white/20"
        />
        <button
          onClick={submit}
          disabled={text.trim().length <= 3}
          className="w-full py-2 rounded-lg text-xs font-semibold text-black bg-amber-500 hover:bg-amber-400
            active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          📌 Post Note to Fan Wall
        </button>
      </div>
    </div>
  );
}

/* ── Main KioskPanel ─────────────────────────────────────────────────────── */
export function KioskPanel() {
  const kiosk = useTheatre((s) => s.kiosk);
  const [activeTab, setActiveTab] = useState<TabKey>(kiosk ?? "poll");

  // Sync activeTab when kiosk changes externally
  if (kiosk !== null && activeTab !== kiosk && !TABS.some((t) => t.id === activeTab)) {
    setActiveTab(kiosk);
  }

  return (
    <AnimatePresence>
      {kiosk !== null && (
        <motion.div
          key="kiosk"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 280, damping: 34, mass: 0.9 }}
          className={`fixed bottom-0 left-0 right-0 z-[60] ${GLASS}
            rounded-t-2xl shadow-2xl max-h-[62vh] flex flex-col`}
        >
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-amber-600/40" />
          </div>

          {/* Tab row + close */}
          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex gap-1.5">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer",
                    "border backdrop-blur-sm",
                    activeTab === tab.id
                      ? "bg-amber-600/80 border-amber-400/60 text-amber-100"
                      : "bg-white/5 border-amber-700/25 text-amber-400/70 hover:text-amber-300",
                  ].join(" ")}
                >
                  {tab.emoji} {tab.label}
                </button>
              ))}
            </div>
            <button
              onClick={closeKiosk}
              aria-label="Close kiosk"
              className="w-7 h-7 flex items-center justify-center rounded-full
                bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <X size={13} />
            </button>
          </div>

          {/* Tab content */}
          <div className="px-4 pb-5 overflow-hidden">
            {activeTab === "poll" && <PollTab />}
            {activeTab === "banner" && <BannerTab />}
            {activeTab === "fanwall" && <FanWallTab />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
