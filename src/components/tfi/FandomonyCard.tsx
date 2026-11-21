import { motion } from "framer-motion";
import type { FandomonyProfile } from "@/data/fandomony";
import { heroes } from "@/data/banisa";
import { firstMeetScenarios } from "@/data/fandomony";

interface FandomonyCardProps {
  profile: FandomonyProfile;
  onClick: () => void;
}

export function FandomonyCard({ profile, onClick }: FandomonyCardProps) {
  const hero = heroes.find(h => h.id === profile.heroFandom);
  const scenario = firstMeetScenarios.find(s => s.id === profile.firstMeetScenario) || { label: profile.firstMeetScenario, emoji: "🎬" };
  
  const compatibility = Math.round((profile.screenTestScore + profile.id.length * 3) / 2);
  const scoreColor = profile.screenTestScore >= 85 ? "bg-green-500" : "bg-amber-500";

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={onClick}
      className="glass-panel relative flex cursor-pointer flex-col overflow-hidden rounded-xl border p-5 transition-colors hover:border-[var(--gold-foil)] hover:shadow-[0_8px_32px_rgba(224,181,113,0.15)]"
    >
      <div className="mb-4 flex items-start gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${profile.avatarGradient} text-xl font-bold text-white shadow-lg`}
        >
          {profile.initials}
        </div>
        <div className="flex-1 space-y-1">
          <h3 className="font-display text-lg font-bold text-[var(--foreground)]">
            {profile.name}, {profile.age}
          </h3>
          <p className="text-sm font-medium text-[var(--muted-foreground)]">
            {profile.city}
          </p>
        </div>
      </div>

      {hero && (
        <div className="mb-3 inline-flex items-center gap-1.5 self-start rounded-full bg-black/40 px-3 py-1 text-xs font-semibold backdrop-blur-md border border-[var(--border)]" style={{ color: hero.fandomColor }}>
          <span>{hero.emoji}</span>
          <span>{hero.title} Fan</span>
        </div>
      )}

      <p className="mb-4 line-clamp-2 min-h-[2.5rem] text-sm italic text-[var(--muted-foreground)]">
        "{profile.dialogueBio}"
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-md bg-[var(--ember)]/10 px-2 py-1 text-[10px] font-medium text-[var(--ember)]">
          <span>{scenario.emoji}</span> {scenario.label}
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-[var(--gold-foil)]/10 px-2 py-1 text-[10px] font-medium text-[var(--gold-foil)] border border-[var(--gold-foil)]/20">
          <span>📺 Stream-Match</span> 94% Shared Subs
        </span>
      </div>

      <div className="mt-auto space-y-3">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-[var(--muted-foreground)]">Screen Test</span>
            <span className="text-[var(--gold-foil)]">{profile.screenTestScore}/100</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/50">
            <div
              className={`h-full rounded-full ${scoreColor}`}
              style={{ width: `${profile.screenTestScore}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border)] pt-3">
          <div className="text-sm font-bold text-[var(--foreground)]">
            Compatibility: <span className="text-[var(--gold-foil)]">{compatibility}%</span>
          </div>
          <button className="rounded-md bg-[var(--gold-foil)]/10 px-3 py-1.5 text-xs font-bold text-[var(--gold-foil)] transition-colors hover:bg-[var(--gold-foil)] hover:text-[var(--ink)]">
            View Profile
          </button>
        </div>
      </div>
    </motion.div>
  );
}
