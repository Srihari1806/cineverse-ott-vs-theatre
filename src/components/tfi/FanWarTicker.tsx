import { fanWarTicker } from "@/data/banisa";

export function FanWarTicker() {
  return (
    <div className="w-full bg-[var(--background)] border-y border-[var(--gold-foil)] flex items-center overflow-hidden h-10 relative shrink-0">
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center px-4 bg-gradient-to-r from-[var(--background)] via-[var(--background)] to-transparent">
        <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-[var(--background)] border border-[var(--ember)]">
          <span className="w-2 h-2 rounded-full bg-[var(--ember)] animate-[pulse-glow_1.5s_infinite] shadow-[0_0_8px_var(--ember)]"></span>
          <span className="text-[10px] font-bold tracking-widest text-[var(--ember)]">FAN WAR LIVE</span>
        </div>
      </div>
      
      <div className="flex whitespace-nowrap animate-[ticker-scroll_50s_linear_infinite] ml-40">
        {[...fanWarTicker, ...fanWarTicker].map((item, idx) => (
          <span key={idx} className="inline-flex items-center text-[var(--ember)] text-sm font-medium tracking-wide">
            {item}
            <span className="mx-4 text-[var(--gold-foil)]">· ⚡ ·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
