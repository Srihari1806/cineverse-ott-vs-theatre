import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Copy, Check, X, Film, Calendar, Star } from "lucide-react";
import type { FandomonyProfile } from "@/data/fandomony";
import { heroes } from "@/data/banisa";
import { screenTestQuestions, firstMeetScenarios } from "@/data/fandomony";

interface CompatibilityModalProps {
  profile: FandomonyProfile | null;
  onClose: () => void;
}

export function CompatibilityModal({ profile, onClose }: CompatibilityModalProps) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Reset state when profile changes
  useEffect(() => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setUserScore(0);
    setQuizFinished(false);
    setCopied(false);
  }, [profile]);

  if (!profile) return null;

  const hero = heroes.find(h => h.id === profile.heroFandom);
  const scenarioInfo = firstMeetScenarios.find(s => s.label === profile.firstMeetScenario) || { label: profile.firstMeetScenario, emoji: "🎬", description: "" };

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.dialogueBio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAnswer = (optionIdx: number) => {
    const isCorrect = optionIdx === screenTestQuestions[currentQuestion].correct;
    if (isCorrect) setUserScore(prev => prev + screenTestQuestions[currentQuestion].points);
    
    if (currentQuestion < screenTestQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <AnimatePresence>
      {profile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-panel relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--border)] max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-[var(--muted-foreground)] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header section */}
            <div className="relative p-6 md:p-8 pt-12 text-center bg-gradient-to-b from-[var(--border)] to-transparent">
              <div className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${profile.avatarGradient} text-3xl font-bold text-white shadow-xl`}>
                {profile.initials}
              </div>
              <h2 className="font-display text-3xl font-bold text-[var(--foreground)]">{profile.name}</h2>
              
              {hero && (
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-4 py-1.5 text-sm font-semibold border border-[var(--border)]" style={{ color: hero.fandomColor }}>
                  <span>{hero.emoji}</span>
                  <span>{hero.title} Fandom</span>
                </div>
              )}
              
              <div className="mt-6 mx-auto max-w-md space-y-2">
                <p className="text-lg italic text-[var(--muted-foreground)]">"{profile.dialogueBio}"</p>
                <p className="text-xs text-[var(--gold-foil)]/70">— {profile.dialogueSource}</p>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--gold-foil)] px-6 py-2.5 text-sm font-bold text-[var(--ink)] transition-transform hover:scale-105 active:scale-95"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Dialogue Copied!" : "Send Dialogue"}
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Screen Test Quiz */}
              {!quizFinished ? (
                <div className="rounded-xl border border-[var(--border)] bg-black/40 p-5 shadow-inner">
                  {!quizStarted ? (
                    <div className="text-center py-4">
                      <Star className="mx-auto mb-3 h-8 w-8 text-[var(--gold-foil)]" />
                      <h3 className="mb-2 font-display text-xl text-[var(--foreground)]">Take the Screen Test</h3>
                      <p className="mb-4 text-sm text-[var(--muted-foreground)]">
                        Answer 5 TFI questions to calculate your true chemistry score with {profile.name}.
                      </p>
                      <button
                        onClick={() => setQuizStarted(true)}
                        className="rounded-md bg-[var(--ember)] px-5 py-2 text-sm font-bold text-[var(--ink)]"
                      >
                        Start Quiz
                      </button>
                      <div className="mt-3">
                        <button
                          onClick={() => setQuizFinished(true)}
                          className="text-xs text-[var(--muted-foreground)] underline"
                        >
                          Skip to Compatibility
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-4 flex items-center justify-between text-xs font-bold text-[var(--muted-foreground)]">
                        <span>Question {currentQuestion + 1} of 5</span>
                        <span>Score: {userScore}</span>
                      </div>
                      <h4 className="mb-4 text-lg font-medium text-[var(--foreground)]">
                        {screenTestQuestions[currentQuestion].question}
                      </h4>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {screenTestQuestions[currentQuestion].options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            className="rounded-lg border border-[var(--border)] bg-white/5 p-3 text-left text-sm transition-colors hover:border-[var(--gold-foil)] hover:bg-[var(--gold-foil)]/10"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-xl border border-[var(--gold-foil)]/30 bg-[var(--gold-foil)]/5 p-6 text-center shadow-[0_0_20px_rgba(224,181,113,0.1)]">
                  <h3 className="mb-1 font-display text-2xl text-[var(--gold-foil)]">Chemistry Score: {userScore}%</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {profile.name}'s Score: {profile.screenTestScore}%
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium">
                    {Math.abs(userScore - profile.screenTestScore) <= 15 ? (
                      <span className="text-green-400">🔥 Blockbuster Match!</span>
                    ) : (
                      <span className="text-amber-400">👍 Hit Combination!</span>
                    )}
                  </div>
                </div>
              )}

              {/* Compatibility Breakdown */}
              <div className="space-y-4">
                <h3 className="font-display text-xl text-[var(--foreground)]">Compatibility Breakdown</h3>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-[var(--border)] bg-black/40 p-4">
                    <div className="mb-2 text-xs font-semibold text-[var(--muted-foreground)] uppercase">Star Fandom</div>
                    <div className="flex items-center gap-2 font-medium">
                      {hero ? (
                        <>
                          <span style={{ color: hero.fandomColor }}>{hero.title}</span>
                          <span className="text-[10px] text-[var(--gold-foil)] border border-[var(--gold-foil)]/30 px-1.5 py-0.5 rounded">ALIGNED</span>
                        </>
                      ) : (
                        "COMPLEMENTARY"
                      )}
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-[var(--border)] bg-black/40 p-4">
                    <div className="mb-2 text-xs font-semibold text-[var(--muted-foreground)] uppercase">Director Tastes</div>
                    <div className="font-medium text-[var(--foreground)]">{profile.directorFav} Fan</div>
                  </div>

                  <div className="rounded-lg border border-[var(--border)] bg-black/40 p-4 sm:col-span-2">
                    <div className="mb-2 text-xs font-semibold text-[var(--muted-foreground)] uppercase">First Meet Scenario</div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{scenarioInfo.emoji}</span>
                      <div>
                        <div className="font-medium text-[var(--foreground)]">{scenarioInfo.label}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">{scenarioInfo.description}</div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-[var(--border)] bg-black/40 p-4 sm:col-span-2">
                    <div className="mb-2 text-xs font-semibold text-[var(--muted-foreground)] uppercase">BGM Preview</div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--ember)]/20 text-[var(--ember)]">
                        <Music className="h-5 w-5" />
                      </div>
                      <div className="font-medium text-[var(--foreground)]">{profile.bgmChoice}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FDFS Date Section */}
              <div className="mt-8 rounded-xl border border-[var(--gold-foil)]/20 bg-gradient-to-br from-[var(--gold-foil)]/10 to-transparent p-5">
                <h3 className="mb-4 flex items-center gap-2 font-display text-xl text-[var(--gold-foil)]">
                  <Film className="h-5 w-5" /> Upcoming FDFS Rallies
                </h3>
                
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { title: "Pushpa 2: The Rule", date: "Aug 15", hero: "Allu Arjun" },
                    { title: "Devara: Part 1", date: "Sep 27", hero: "Jr NTR" },
                    { title: "Game Changer", date: "Dec 20", hero: "Ram Charan" },
                    { title: "Kalki Part 2", date: "TBA", hero: "Prabhas" },
                  ].map((film, i) => (
                    <div key={i} className="flex flex-col justify-between rounded-lg border border-[var(--border)] bg-black/60 p-3">
                      <div>
                        <div className="font-bold text-[var(--foreground)]">{film.title}</div>
                        <div className="mt-1 flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                          <Calendar className="h-3 w-3" /> {film.date}
                          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-[var(--border)]">{film.hero}</span>
                        </div>
                      </div>
                      <button className="mt-3 w-full rounded border border-[var(--gold-foil)]/50 py-1.5 text-xs font-bold text-[var(--gold-foil)] hover:bg-[var(--gold-foil)] hover:text-[var(--ink)] transition-colors">
                        Find Partner
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
