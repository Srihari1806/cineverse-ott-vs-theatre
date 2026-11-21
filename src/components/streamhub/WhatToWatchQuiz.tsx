import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Flame, Clock, Globe, Tv, RefreshCw, ExternalLink, Award } from "lucide-react";
import { curatedStreamCatalog, StreamItem } from "@/data/streamhub";

interface WhatToWatchQuizProps {
  activePlatforms: string[];
}

export const WhatToWatchQuiz: React.FC<WhatToWatchQuizProps> = ({ activePlatforms }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedMood, setSelectedMood] = useState<string>("Mass Rampage");
  const [selectedRuntime, setSelectedRuntime] = useState<string>("any");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Telugu");
  const [recommendation, setRecommendation] = useState<StreamItem | null>(null);
  const [matchScore, setMatchScore] = useState<number>(98);

  const moods = [
    { id: "Mass Rampage", title: "Mass Rampage ⚡", desc: "Whistles, epic BGMs, high adrenaline" },
    { id: "Mind-Bending", title: "Mind-Bending 🧠", desc: "Twists, sci-fi, dark mystery" },
    { id: "High-Octane", title: "High-Octane Action 💥", desc: "Stunts, gunfights, chases" },
    { id: "Family Sentiment", title: "Family Sentiment 🍿", desc: "Warm emotion, laughter, tearjerker" },
    { id: "Romantic Classic", title: "Romantic Classic 💖", desc: "Soulful love, iconic chemistry" },
  ];

  const runtimes = [
    { id: "short", label: "Under 2.5 Hours", desc: "Quick watch" },
    { id: "long", label: "3 Hours Epic", desc: "Full cinema immersion" },
    { id: "any", label: "Any Length", desc: "Show me the best" },
  ];

  const languages = ["Telugu", "Tamil", "Malayalam", "Hindi", "English"];

  const handleGenerate = () => {
    // Recommendation logic
    const matches = curatedStreamCatalog.filter((item) => {
      const moodMatch = item.moods.includes(selectedMood as any);
      const langMatch = item.language === selectedLanguage;
      return moodMatch || langMatch;
    });

    const picked = matches.length > 0 ? matches[Math.floor(Math.random() * matches.length)] : curatedStreamCatalog[0];
    setRecommendation(picked);

    // Calculate match score
    const score = Math.min(99, Math.max(88, Math.round(85 + Math.random() * 14)));
    setMatchScore(score);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setRecommendation(null);
  };

  return (
    <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-[var(--gold-foil)]/30 relative overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-[var(--gold-foil)] animate-pulse" />
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold-foil)]">
          AI Recommendation Engine
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">
        What to Watch <span className="italic text-[var(--ember)]">Tonight?</span>
      </h2>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
              <span>Step 1 of 3: Choose your current mood</span>
              <span className="text-[var(--gold-foil)]">1/3</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {moods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMood(m.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedMood === m.id
                      ? "bg-[var(--gold-foil)]/10 border-[var(--gold-foil)] shadow-[0_0_15px_rgba(230,180,60,0.2)]"
                      : "bg-black/40 border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="text-base font-semibold text-white mb-1">{m.title}</div>
                  <div className="text-xs text-muted-foreground">{m.desc}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[var(--gold-foil)] text-[var(--ink)] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-md float-right"
            >
              Next: Runtime →
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
              <span>Step 2 of 3: Select Runtime & Language</span>
              <span className="text-[var(--gold-foil)]">2/3</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground font-semibold block mb-2">Runtime Preference:</label>
                <div className="grid grid-cols-3 gap-3">
                  {runtimes.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRuntime(r.id)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        selectedRuntime === r.id
                          ? "bg-[var(--ember)]/20 border-[var(--ember)] text-white"
                          : "bg-black/40 border-white/10 text-muted-foreground"
                      }`}
                    >
                      <div className="text-xs font-semibold">{r.label}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-semibold block mb-2">Primary Language:</label>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-4 py-2 rounded-xl border text-xs font-semibold transition-all ${
                        selectedLanguage === lang
                          ? "bg-[var(--gold-foil)] text-[var(--ink)] border-[var(--gold-foil)]"
                          : "bg-black/40 border-white/10 text-muted-foreground"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-muted-foreground hover:text-white"
              >
                ← Back
              </button>
              <button
                onClick={handleGenerate}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[var(--ember)] to-[var(--gold-foil)] text-[var(--ink)] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-lg flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Find Match Now
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && recommendation && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 sm:p-6 bg-black/60 rounded-2xl border border-[var(--gold-foil)]/40 relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <img
                src={recommendation.posterUrl}
                alt={recommendation.title}
                className="w-36 h-52 object-cover rounded-xl shadow-2xl border border-white/10"
              />

              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--gold-foil)]/20 text-[var(--gold-foil)] border border-[var(--gold-foil)]/40 text-xs font-bold">
                  <Award className="w-3.5 h-3.5" /> {matchScore}% Match for Your Mood ({selectedMood})
                </div>

                <h3 className="text-2xl font-display font-bold text-white">
                  {recommendation.title}
                </h3>

                <p className="text-xs text-[var(--ember)] font-medium">
                  {recommendation.sentimentLabel}
                </p>

                <p className="text-xs text-muted-foreground line-clamp-2">
                  {recommendation.synopsis}
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
                  {recommendation.streamingOptions.map((opt, i) => (
                    <a
                      key={i}
                      href={opt.deepLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[var(--gold-foil)] text-[var(--ink)] px-4 py-2 rounded-xl text-xs font-bold hover:brightness-110 transition-all shadow-md"
                    >
                      <img src={opt.logo} alt={opt.providerName} className="w-4 h-4 rounded" />
                      <span>Watch on {opt.providerName}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                  <button
                    onClick={handleReset}
                    className="p-2 rounded-xl bg-white/10 text-white text-xs hover:bg-white/20 transition-all flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Try Again
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
