import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CineVerseNav } from "@/components/cineverse/CineVerseNav";
import { SiteFooter } from "@/components/cineverse/SiteFooter";
import {
  Film,
  Camera,
  Scissors,
  Volume2,
  FileText,
  Sliders,
  Layers,
  Sparkles,
  Maximize2,
  Activity,
  Play,
  RotateCcw,
} from "lucide-react";

export const Route = createFileRoute("/craft")({
  head: () => ({
    meta: [
      { title: "Craft Studio — The Filmmaking Laboratory | CineVerse" },
      {
        name: "description",
        content:
          "Visual catalogue of 24+ filmmaking disciplines and interactive workspaces for StoryDNA, FrameLab, CutLab and SoundLab.",
      },
    ],
  }),
  component: CraftStudioPage,
});

const DISCIPLINES = [
  {
    phase: "Pre-Production",
    items: [
      { name: "Screenwriting & Structure", desc: "Three-act architecture, interval turns & narrative escalation", tag: "StoryDNA" },
      { name: "Storyboarding & Previs", desc: "Shot design, camera movement planning & blocking vectors", tag: "Visual" },
      { name: "Cinematic Worldbuilding", desc: "Societal rules, visual iconography & fictional geography", tag: "Design" },
      { name: "Production Design", desc: "Set construction, period texture & atmospheric realism", tag: "Art" },
      { name: "Casting Architecture", desc: "Star persona leverage & dynamic counter-casting", tag: "Talent" },
      { name: "Costume Styling", desc: "Character psychology communicated through silhouette & fabric", tag: "Design" },
    ],
  },
  {
    phase: "Production",
    items: [
      { name: "Cinematography", desc: "Optics, aspect ratio, sensor latitude & camera motion", tag: "FrameLab" },
      { name: "Directorial Blocking", desc: "Actor staging in depth, eye-lines & power dynamics", tag: "Directing" },
      { name: "Lighting Design", desc: "Chiaroscuro, motivated keys, atmospheric haze & rim separation", tag: "Lighting" },
      { name: "Stunt Choreography", desc: "Impact physics, wire-work & organic visceral gravity", tag: "Action" },
      { name: "Location Sound Capture", desc: "Multi-track lavalier & boom ambience synchronization", tag: "SoundLab" },
      { name: "Practical Special Effects", desc: "Atmospheric fog, squibs, hydraulic rigs & pyro safety", tag: "SFX" },
    ],
  },
  {
    phase: "Post-Production",
    items: [
      { name: "Narrative Editing", desc: "Rhythm, scene transitions, cut frequency & pacing curves", tag: "CutLab" },
      { name: "Color Grading (DI / LUTs)", desc: "Color timing, contrast curves & tonal palette unity", tag: "FrameLab" },
      { name: "Visual Effects (VFX)", desc: "Environment extensions, CG character integration & crowd replication", tag: "VFX" },
      { name: "Sound Design & Foley", desc: "Synthesizing visceral punch, weapon weight & natural textures", tag: "SoundLab" },
      { name: "Dialogue ADR & Dubbing", desc: "Lip-sync re-voicing across 5 regional languages", tag: "Audio" },
      { name: "Trailer Finishing", desc: "Cadence micro-editing for trailer launch impact", tag: "Marketing" },
    ],
  },
  {
    phase: "Music & Theatrical Sound",
    items: [
      { name: "Film Score Composition", desc: "Orchestral themes, emotional hooks & interval crescendos", tag: "Music" },
      { name: "Theme Leitmotifs", desc: "Auditory character signatures that trigger fandom chills", tag: "Score" },
      { name: "Spatial Atmos Mixing", desc: "7.1.4 object-based acoustic positioning for multiplexes", tag: "SoundLab" },
      { name: "Theatrical Mastering", desc: "105 dB peak dynamic headroom for auditorium speakers", tag: "Acoustics" },
      { name: "OTT Sound Downmixing", desc: "Compressing wide theatrical mix for mobile stereo speakers", tag: "SoundLab" },
      { name: "Fandom Chants & Anthems", desc: "Crowd participation songs engineered for repeat viewings", tag: "Fandom" },
    ],
  },
];

export function CraftStudioPage() {
  const [activeWorkspace, setActiveWorkspace] = useState<"story" | "frame" | "cut" | "sound">("frame");

  // FrameLab States
  const [aspectRatio, setAspectRatio] = useState<"2.39" | "1.90" | "16:9">("2.39");
  const [focalLength, setFocalLength] = useState<number>(50);
  const [activeLut, setActiveLut] = useState<"natural" | "gold" | "noir" | "tealOrange">("gold");

  // StoryDNA States
  const [tensionAct, setTensionAct] = useState<number>(2); // 1, 2, or 3

  // CutLab States
  const [cutRate, setCutRate] = useState<"dialogue" | "interval" | "climax">("interval");

  // SoundLab States
  const [soundMode, setSoundMode] = useState<"theatre" | "ott">("theatre");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <CineVerseNav />

      {/* Hero Section */}
      <section className="relative border-b border-border/40 bg-gradient-to-b from-card/80 to-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ember font-semibold mb-3">
            <Film className="w-4 h-4" />
            <span>02 · CRAFT STUDIO — THE FILMMAKING LABORATORY</span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl text-foreground tracking-tight">
            The Science & Poetry of <span className="text-ember italic">Cinema Craft</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground font-light">
            Catalogue of 24+ filmmaking disciplines with 4 dedicated real-time interactive workspaces:
            StoryDNA, FrameLab, CutLab, and SoundLab.
          </p>

          {/* Interactive Workspace Switcher Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {[
              { id: "frame", label: "FrameLab", icon: Camera, sub: "Aspect & Color Optics" },
              { id: "story", label: "StoryDNA", icon: FileText, sub: "Narrative Tension Curve" },
              { id: "cut", label: "CutLab", icon: Scissors, sub: "Pacing & Cut Frequency" },
              { id: "sound", label: "SoundLab", icon: Volume2, sub: "Theatrical Atmos vs OTT" },
            ].map((ws) => {
              const Icon = ws.icon;
              const isActive = activeWorkspace === ws.id;
              return (
                <button
                  key={ws.id}
                  onClick={() => setActiveWorkspace(ws.id as any)}
                  className={`flex items-center gap-3 rounded-2xl p-3 sm:px-5 sm:py-3.5 transition-all text-left ${
                    isActive
                      ? "border border-ember bg-ember/15 shadow-[0_0_25px_rgba(224,103,30,0.3)] text-foreground"
                      : "border border-border/50 bg-card/60 text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <div className={`p-2 rounded-xl ${isActive ? "bg-ember text-ink" : "bg-white/5"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-display text-lg leading-none">{ws.label}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{ws.sub}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Interactive Lab Playground */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-3xl border border-border/60 bg-card/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Workspace 1: FRAMELAB */}
          {activeWorkspace === "frame" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border/40 pb-4">
                <div>
                  <h3 className="font-display text-3xl text-foreground flex items-center gap-2">
                    <Camera className="w-6 h-6 text-ember" />
                    <span>FrameLab — Optical & Grading Simulator</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Simulate how aspect ratios, lens focal lengths, and DI color grades transform cinematic perception.
                  </p>
                </div>
                <div className="mt-3 md:mt-0 flex gap-2">
                  <span className="rounded bg-black/60 px-3 py-1 font-mono text-xs text-ember border border-border/40">
                    Ratio: {aspectRatio}:1 · {focalLength}mm · LUT: {activeLut}
                  </span>
                </div>
              </div>

              {/* Viewport Simulation Box */}
              <div className="relative flex items-center justify-center bg-black rounded-2xl h-[360px] sm:h-[440px] overflow-hidden border border-border/40">
                {/* Simulated Aspect Ratio Window */}
                <div
                  className={`relative flex items-center justify-center border-2 border-ember/70 transition-all duration-500 shadow-2xl ${
                    aspectRatio === "2.39"
                      ? "w-[92%] h-[60%] sm:h-[65%]"
                      : aspectRatio === "1.90"
                      ? "w-[85%] h-[82%]"
                      : "w-[75%] h-[85%]"
                  } ${
                    activeLut === "gold"
                      ? "bg-amber-950/40 text-amber-200"
                      : activeLut === "noir"
                      ? "bg-neutral-900/60 grayscale text-neutral-300"
                      : activeLut === "tealOrange"
                      ? "bg-gradient-to-tr from-cyan-950/50 to-orange-950/50 text-orange-200"
                      : "bg-stone-900/40 text-stone-300"
                  }`}
                >
                  <div className="text-center p-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-60">
                      {aspectRatio === "2.39" ? "ANAMORPHIC SCOPE 2.39:1" : aspectRatio === "1.90" ? "IMAX EXPANDED 1.90:1" : "BROADCAST 16:9"}
                    </p>
                    <p className="font-display text-3xl sm:text-5xl mt-2">
                      {focalLength < 40 ? "Wide Perspective" : focalLength < 70 ? "Natural Eye Field" : "Compressed Telephoto"}
                    </p>
                    <p className="text-xs max-w-sm mt-2 opacity-80 mx-auto">
                      {aspectRatio === "2.39"
                        ? "Horizontal panoramic stretch ideal for large auditorium single screens and group staging."
                        : aspectRatio === "1.90"
                        ? "Tall vertical expansion offering 26% more image area on IMAX digital auditoriums."
                        : "Standard mobile & OTT television format with zero pillarboxing on consumer devices."}
                    </p>
                  </div>

                  {/* Corner Crosshairs */}
                  <div className="absolute top-2 left-2 text-[9px] font-mono opacity-50">+ CROSSHAIR 0.35</div>
                  <div className="absolute bottom-2 right-2 text-[9px] font-mono opacity-50">SENSOR S35 / FF</div>
                </div>
              </div>

              {/* Controls Grid */}
              <div className="grid gap-6 sm:grid-cols-3 pt-2">
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Aspect Ratio</label>
                  <div className="mt-2 flex gap-2">
                    {[
                      { id: "2.39", label: "2.39:1 Scope" },
                      { id: "1.90", label: "1.90:1 IMAX" },
                      { id: "16:9", label: "16:9 Screen" },
                    ].map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setAspectRatio(r.id as any)}
                        className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                          aspectRatio === r.id
                            ? "bg-ember text-ink"
                            : "border border-border/50 bg-black/40 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    <span>Focal Length</span>
                    <span className="font-mono text-ember">{focalLength}mm</span>
                  </div>
                  <input
                    type="range"
                    min="24"
                    max="105"
                    step="1"
                    value={focalLength}
                    onChange={(e) => setFocalLength(Number(e.target.value))}
                    className="mt-3 w-full accent-ember cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground font-mono mt-1">
                    <span>24mm (Ultra)</span>
                    <span>50mm (Prime)</span>
                    <span>105mm (Tele)</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Color Grading LUT</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {[
                      { id: "gold", label: "Golden Hour" },
                      { id: "tealOrange", label: "Teal & Orange" },
                      { id: "noir", label: "Khansaar Noir" },
                      { id: "natural", label: "Linear Raw" },
                    ].map((lut) => (
                      <button
                        key={lut.id}
                        onClick={() => setActiveLut(lut.id as any)}
                        className={`rounded-xl py-2 text-xs font-semibold transition-all ${
                          activeLut === lut.id
                            ? "border border-ember bg-ember/20 text-foreground"
                            : "border border-border/40 bg-black/40 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {lut.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Workspace 2: STORYDNA */}
          {activeWorkspace === "story" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border/40 pb-4">
                <div>
                  <h3 className="font-display text-3xl text-foreground flex items-center gap-2">
                    <FileText className="w-6 h-6 text-ember" />
                    <span>StoryDNA — Narrative Tension & Beat Architecture</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Analyze the emotional tension curve across Indian cinema's signature interval structure.
                  </p>
                </div>
                <div className="mt-3 md:mt-0 flex gap-2">
                  {[1, 2, 3].map((act) => (
                    <button
                      key={act}
                      onClick={() => setTensionAct(act)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                        tensionAct === act
                          ? "bg-ember text-ink"
                          : "border border-border/50 bg-black/40 text-muted-foreground"
                      }`}
                    >
                      Act {act}
                    </button>
                  ))}
                </div>
              </div>

              {/* Narrative Arc Visualization */}
              <div className="rounded-2xl border border-border/40 bg-black/60 p-6">
                <div className="flex justify-between items-center text-xs font-mono text-muted-foreground mb-4">
                  <span>ACT 1: THE HOOK (0-40 MIN)</span>
                  <span className="text-ember font-bold">INTERVAL MASS BANG (70-80 MIN)</span>
                  <span>ACT 3: RETRIBUTION (120-160 MIN)</span>
                </div>

                {/* Tension Curve Bars */}
                <div className="h-44 flex items-end gap-2 pt-6 border-b border-border/40 pb-2">
                  {[25, 35, 40, 55, 65, 80, 98, 45, 60, 75, 85, 92, 100, 70].map((val, idx) => {
                    const isInterval = idx === 6;
                    const isClimax = idx === 12;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                        <span className="text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity text-ember">
                          {val}%
                        </span>
                        <div
                          style={{ height: `${val}%` }}
                          className={`w-full rounded-t-md transition-all duration-300 ${
                            isInterval
                              ? "bg-gradient-to-t from-ember to-amber-400 shadow-[0_0_20px_rgba(224,103,30,0.8)]"
                              : isClimax
                              ? "bg-gradient-to-t from-red-600 to-amber-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]"
                              : "bg-white/15 hover:bg-white/30"
                          }`}
                        />
                        <span className="text-[8px] font-mono text-muted-foreground truncate w-full text-center">
                          {isInterval ? "INTERVAL" : isClimax ? "CLIMAX" : `B${idx + 1}`}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 grid sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 rounded-xl border border-border/30 bg-card/40">
                    <p className="text-ember font-bold">The Pre-Interval Build</p>
                    <p className="text-muted-foreground mt-1">Escalating character conflict until protagonist is cornered, resolving in an explosive 98% mass release.</p>
                  </div>
                  <div className="p-3 rounded-xl border border-border/30 bg-card/40">
                    <p className="text-amber-400 font-bold">The Post-Interval Dip & Recharge</p>
                    <p className="text-muted-foreground mt-1">Temporary reset to 45% tension allows audience breather before the second wave emotional stakes.</p>
                  </div>
                  <div className="p-3 rounded-xl border border-border/30 bg-card/40">
                    <p className="text-red-400 font-bold">The 100% Climax Peak</p>
                    <p className="text-muted-foreground mt-1">Full thematic resolution with cathartic visual scale and theme leitmotif explosion.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Workspace 3: CUTLAB */}
          {activeWorkspace === "cut" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border/40 pb-4">
                <div>
                  <h3 className="font-display text-3xl text-foreground flex items-center gap-2">
                    <Scissors className="w-6 h-6 text-ember" />
                    <span>CutLab — Editing Cadence & Shot Frequency</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Compare pacing rhythms between intimate drama sequences and adrenaline-fueled action montage.
                  </p>
                </div>
                <div className="mt-3 md:mt-0 flex gap-2">
                  {[
                    { id: "dialogue", label: "Dialogue Scene (14 cuts/min)" },
                    { id: "interval", label: "Interval Block (48 cuts/min)" },
                    { id: "climax", label: "Action Climax (72 cuts/min)" },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setCutRate(mode.id as any)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        cutRate === mode.id
                          ? "bg-ember text-ink"
                          : "border border-border/50 bg-black/40 text-muted-foreground"
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline Track Simulation */}
              <div className="rounded-2xl border border-border/40 bg-black/60 p-6 space-y-4">
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                  VIDEO TIMELINE V1 — CUT FREQUENCY MONITOR
                </span>

                <div className="h-16 flex gap-1 rounded-xl bg-card/60 p-2 overflow-hidden border border-border/40">
                  {Array.from({ length: cutRate === "dialogue" ? 12 : cutRate === "interval" ? 34 : 58 }).map(
                    (_, i) => (
                      <div
                        key={i}
                        className={`h-full flex-1 rounded-sm border border-black/60 transition-all ${
                          i % 3 === 0
                            ? "bg-ember/70"
                            : i % 2 === 0
                            ? "bg-amber-500/60"
                            : "bg-orange-400/50"
                        }`}
                        title={`Shot ${i + 1}`}
                      />
                    )
                  )}
                </div>

                <div className="grid sm:grid-cols-3 gap-4 pt-4 text-xs">
                  <div className="border border-border/30 bg-card/40 p-4 rounded-xl">
                    <span className="text-muted-foreground">Average Shot Length (ASL):</span>
                    <p className="font-display text-2xl text-foreground mt-1">
                      {cutRate === "dialogue" ? "4.2 seconds" : cutRate === "interval" ? "1.25 seconds" : "0.8 seconds"}
                    </p>
                  </div>
                  <div className="border border-border/30 bg-card/40 p-4 rounded-xl">
                    <span className="text-muted-foreground">Rhythm Classification:</span>
                    <p className="font-display text-2xl text-ember mt-1">
                      {cutRate === "dialogue" ? "Deliberate Flow" : cutRate === "interval" ? "Staccato Pulse" : "Frenetic Montage"}
                    </p>
                  </div>
                  <div className="border border-border/30 bg-card/40 p-4 rounded-xl">
                    <span className="text-muted-foreground">Theatrical Impact:</span>
                    <p className="font-display text-2xl text-foreground mt-1">
                      {cutRate === "dialogue" ? "Emotional Absorption" : cutRate === "interval" ? "High Visceral Thrill" : "Total Sensory Overload"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Workspace 4: SOUNDLAB */}
          {activeWorkspace === "sound" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border/40 pb-4">
                <div>
                  <h3 className="font-display text-3xl text-foreground flex items-center gap-2">
                    <Volume2 className="w-6 h-6 text-ember" />
                    <span>SoundLab — Theatrical Dolby Atmos vs Mobile OTT Mastering</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Contrast dynamic headroom between 64-speaker auditorium sound systems and compressed mobile streaming.
                  </p>
                </div>
                <div className="mt-3 md:mt-0 flex gap-2">
                  <button
                    onClick={() => setSoundMode("theatre")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                      soundMode === "theatre"
                        ? "bg-ember text-ink"
                        : "border border-border/50 bg-black/40 text-muted-foreground"
                    }`}
                  >
                    Auditorium Dolby Atmos (105 dB)
                  </button>
                  <button
                    onClick={() => setSoundMode("ott")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                      soundMode === "ott"
                        ? "bg-ember text-ink"
                        : "border border-border/50 bg-black/40 text-muted-foreground"
                    }`}
                  >
                    OTT Mobile Stream (-14 LUFS)
                  </button>
                </div>
              </div>

              {/* Decibel & LUFS Meter Simulation */}
              <div className="rounded-2xl border border-border/40 bg-black/60 p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    DYNAMIC SPECTRUM: {soundMode === "theatre" ? "UNRESTRICTED AUDITORIUM RANGE" : "BROADCAST COMPRESSION NORMALIZED"}
                  </span>
                  <span className="text-xs font-mono text-ember font-bold">
                    {soundMode === "theatre" ? "PEAK: +105 dBA (Subwoofer 20Hz-80Hz active)" : "INTEGRATED: -14.2 LUFS (Mobile Guard)"}
                  </span>
                </div>

                {/* Simulated Channel Meters */}
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                  {[
                    { ch: "L / R Front", val: soundMode === "theatre" ? 92 : 68 },
                    { ch: "Center Dialogue", val: soundMode === "theatre" ? 85 : 82 },
                    { ch: "LFE (Sub-bass)", val: soundMode === "theatre" ? 104 : 45 },
                    { ch: "Side Surrounds", val: soundMode === "theatre" ? 88 : 50 },
                    { ch: "Top Overhead 1", val: soundMode === "theatre" ? 80 : 25 },
                    { ch: "Top Overhead 2", val: soundMode === "theatre" ? 84 : 25 },
                  ].map((m) => (
                    <div key={m.ch} className="rounded-xl border border-border/30 bg-card/40 p-3 text-center">
                      <span className="text-[10px] font-mono text-muted-foreground block">{m.ch}</span>
                      <div className="h-28 bg-black/60 rounded-md my-2 p-1 flex flex-col justify-end">
                        <div
                          style={{ height: `${m.val}%` }}
                          className={`w-full rounded-sm transition-all duration-300 ${
                            m.val > 95
                              ? "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]"
                              : m.val > 80
                              ? "bg-amber-400"
                              : "bg-emerald-500"
                          }`}
                        />
                      </div>
                      <span className="text-xs font-mono font-bold text-foreground">{m.val} dB</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl border border-border/30 bg-card/30 text-xs text-muted-foreground leading-relaxed">
                  {soundMode === "theatre" ? (
                    <p>
                      <strong className="text-foreground">Auditorium Impact:</strong> Theatrical sound preserves huge visceral contrasts.
                      A whispered dialogue at 45dB suddenly explodes into a 105dB cannon blast, vibrating theatre floorboards and triggering dopamine surges.
                    </p>
                  ) : (
                    <p>
                      <strong className="text-foreground">OTT Compression:</strong> Streaming algorithms squeeze peaks to avoid blowing phone speakers.
                      Dialogue is pulled up while bass explosions are limited, shifting the viewing experience from physical vibration to analytical clarity.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 24+ Filmmaking Disciplines Catalogue */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-16 border-t border-border/40">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-ember font-bold">
            CURRICULUM OF CINEMA
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-foreground mt-1">
            24+ Filmmaking Crafts Catalogue
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl">
            Explore every discipline from script concept to theatrical auditorium acoustic mastering.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {DISCIPLINES.map((group) => (
            <div key={group.phase} className="rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm">
              <h3 className="font-display text-2xl text-ember border-b border-border/30 pb-3 mb-4">
                {group.phase}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {group.items.map((item) => (
                  <div key={item.name} className="p-3.5 rounded-xl border border-border/30 bg-black/40 hover:border-ember/40 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm text-foreground">{item.name}</h4>
                      <span className="text-[9px] font-mono rounded bg-white/5 px-2 py-0.5 text-muted-foreground">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
