import { useState } from "react";

export function FloatingNavBar() {
  const [activeTab, setActiveTab] = useState("MOVIES");

  const tabs = [
    { id: "MOVIES", label: "🎬 MOVIES" },
    { id: "EVENTS", label: "🔥 EVENTS" },
    { id: "MERCHANDISE", label: "🛍️ MERCHANDISE" },
    { id: "FAN_CLUB", label: "👑 FAN CLUB" },
  ];

  return (
    <nav className="bottom-nav-container absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-yellow-500/30 bg-black/40 px-3.5 py-1.5 backdrop-blur-md transition-all">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              isActive
                ? "bg-primary text-black shadow-[0_0_16px_rgba(234,179,8,0.6)] scale-105"
                : "text-primary/80 hover:text-primary hover:bg-white/10"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
