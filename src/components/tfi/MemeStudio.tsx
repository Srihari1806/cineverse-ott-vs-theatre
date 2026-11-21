import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Wand2 } from "lucide-react";
import { memeTemplates } from "@/data/banisa";

interface MemeStudioProps {
  isOpen: boolean;
  onClose: () => void;
  onXpEarned: (xp: number) => void;
}

type FontStyle = "impact" | "serif" | "script";

export function MemeStudio({ isOpen, onClose, onXpEarned }: MemeStudioProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [fontStyle, setFontStyle] = useState<FontStyle>("impact");

  const selectedTemplate = memeTemplates.find(t => t.id === selectedTemplateId);

  const handleTemplateSelect = (id: string) => {
    setSelectedTemplateId(id);
    const template = memeTemplates.find(t => t.id === id);
    if (template) {
      setTopText(template.defaultTopText);
      setBottomText(template.defaultBottomText);
    }
    setStep(2);
  };

  const getFontFamily = (style: FontStyle) => {
    switch (style) {
      case "impact": return "Impact, Arial Black, sans-serif";
      case "serif": return "'Instrument Serif', Georgia, serif";
      case "script": return "'Brush Script MT', cursive";
    }
  };

  const handleDownload = () => {
    if (!selectedTemplate) return;

    onXpEarned(25);
    
    // Simulate drawing and downloading
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Basic background
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, 600, 600);
      
      // Emoji
      ctx.font = "140px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(selectedTemplate.emoji, 300, 300);
      
      // Text styling
      ctx.font = `bold 48px ${getFontFamily(fontStyle)}`;
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 6;
      ctx.textAlign = "center";
      
      // Top
      if (topText) {
        ctx.strokeText(topText.toUpperCase(), 300, 80);
        ctx.fillText(topText.toUpperCase(), 300, 80);
      }
      
      // Bottom
      if (bottomText) {
        ctx.strokeText(bottomText.toUpperCase(), 300, 540);
        ctx.fillText(bottomText.toUpperCase(), 300, 540);
      }
    }

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `banisa-meme-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
    
    onClose();
    setTimeout(() => {
      setStep(1);
      setSelectedTemplateId(null);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative w-full max-w-3xl bg-[var(--background)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-black/40">
              <h2 className="text-2xl font-display font-bold text-[var(--gold-foil)] flex items-center gap-3">
                <Wand2 size={24} /> Meme Studio
              </h2>
              <button onClick={onClose} className="p-2 text-white/50 hover:text-white rounded-full hover:bg-white/10 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {step === 1 ? (
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-white/90">Choose a Template</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {memeTemplates.map(template => (
                      <button
                        key={template.id}
                        onClick={() => handleTemplateSelect(template.id)}
                        className="group relative aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-[var(--gold-foil)] transition-all hover:scale-105"
                        style={{ background: template.bgGradient }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl transform group-hover:scale-110 transition-transform drop-shadow-lg">{template.emoji}</span>
                        </div>
                        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-sm font-medium text-white truncate text-center">
                          {template.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  {/* Editor */}
                  <div className="space-y-6 bg-white/5 p-6 rounded-xl border border-white/10">
                    <div>
                      <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Top Caption</label>
                      <input
                        type="text"
                        value={topText}
                        onChange={(e) => setTopText(e.target.value)}
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold-foil)] focus:ring-1 focus:ring-[var(--gold-foil)] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Bottom Caption</label>
                      <input
                        type="text"
                        value={bottomText}
                        onChange={(e) => setBottomText(e.target.value)}
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold-foil)] focus:ring-1 focus:ring-[var(--gold-foil)] transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Typography</label>
                      <div className="flex gap-2">
                        {(["impact", "serif", "script"] as FontStyle[]).map(style => (
                          <button
                            key={style}
                            onClick={() => setFontStyle(style)}
                            className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
                              fontStyle === style ? 'bg-[var(--gold-foil)] text-[var(--ink)] shadow-[0_0_10px_var(--gold-foil)]' : 'bg-white/5 text-white/70 hover:bg-white/10'
                            }`}
                            style={{ fontFamily: getFontFamily(style) }}
                          >
                            {style.charAt(0).toUpperCase() + style.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-between">
                      <button 
                        onClick={() => setStep(1)}
                        className="px-5 py-2 text-sm font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        Back to Templates
                      </button>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="space-y-6 flex flex-col sticky top-0">
                    <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider text-center">Live Preview</label>
                    <div 
                      className="relative aspect-square rounded-xl overflow-hidden shadow-2xl border-2 border-white/10 flex-1 flex flex-col items-center justify-between p-6 w-full max-w-sm mx-auto"
                      style={{ background: selectedTemplate?.bgGradient }}
                    >
                      <div 
                        className="text-center text-white break-words w-full px-2 mt-4"
                        style={{ 
                          fontFamily: getFontFamily(fontStyle), 
                          fontSize: '2.25rem',
                          textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                          lineHeight: 1.1
                        }}
                      >
                        {topText.toUpperCase()}
                      </div>
                      
                      <div className="text-8xl md:text-9xl drop-shadow-2xl my-auto scale-110">
                        {selectedTemplate?.emoji}
                      </div>
                      
                      <div 
                        className="text-center text-white break-words w-full px-2 mb-4"
                        style={{ 
                          fontFamily: getFontFamily(fontStyle), 
                          fontSize: '2.25rem',
                          textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                          lineHeight: 1.1
                        }}
                      >
                        {bottomText.toUpperCase()}
                      </div>
                    </div>
                    
                    <button 
                      onClick={handleDownload}
                      className="w-full max-w-sm mx-auto py-4 bg-gradient-to-r from-[var(--ember)] to-[var(--gold-foil)] text-[var(--ink)] font-bold text-lg rounded-xl flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] transition-all shadow-[0_0_20px_var(--ember)]"
                    >
                      <Download size={20} />
                      Download & Earn 25 XP
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
