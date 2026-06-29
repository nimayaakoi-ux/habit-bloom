import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Zap, Smile, Coffee, Target, ChevronRight, PenTool } from 'lucide-react';
import { toast } from 'sonner';

interface QuickCheckInProps {
  onCheckIn: (rating: number, story?: string) => void;
}

const QuickCheckIn: React.FC<QuickCheckInProps> = ({ onCheckIn }) => {
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [showStoryInput, setShowStoryInput] = useState(false);
  const [story, setStory] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const options = [
    { icon: Coffee, label: "Tired", rating: 1, color: "text-rose-400" },
    { icon: Smile, label: "Good", rating: 3, color: "text-amber-400" },
    { icon: Target, label: "Focused", rating: 5, color: "text-emerald-400" },
    { icon: Zap, label: "Elite", rating: 10, color: "text-cyan-400" }
  ];

  const handleSelect = (rating: number, label: string) => {
    if (hasCheckedIn) return;
    setSelectedRating(rating);
    setShowStoryInput(true);
    toast.info(`Log initialized. Share your context?`, {
      style: { background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(20px)', color: '#fff', border: '1px solid rgba(6, 182, 212, 0.2)' }
    });
  };

  const handleSubmit = () => {
    if (selectedRating === null) return;
    setHasCheckedIn(true);
    onCheckIn(selectedRating, story);
    toast.success(`Data Synchronized. AI Guide Informed.`, {
      icon: <Target size={16} className="text-cyan-400" />,
      style: { background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(20px)', color: '#fff', border: '1px solid rgba(6, 182, 212, 0.2)' }
    });
    setShowStoryInput(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex items-center space-x-2 mb-6">
          <Heart size={16} className="text-rose-500 fill-rose-500" />
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Daily Mindset Check-in</h3>
        </div>

        <p className="text-xl font-black text-white italic uppercase tracking-tighter mb-8">
          How productive was your day today, <span className="text-cyan-400">Warrior?</span>
        </p>

        <div className="grid grid-cols-4 gap-4">
          {options.map((opt) => (
            <motion.button
              key={opt.label}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(opt.rating, opt.label)}
              disabled={hasCheckedIn}
              className={`flex flex-col items-center p-4 rounded-3xl transition-all border ${
                selectedRating === opt.rating 
                  ? 'bg-cyan-500/20 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                  : (hasCheckedIn || (selectedRating !== null && selectedRating !== opt.rating))
                    ? 'opacity-40 grayscale pointer-events-none' 
                    : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <opt.icon size={24} className={`${opt.color} mb-3`} />
              <span className="text-[10px] font-black uppercase tracking-tighter text-slate-300">{opt.label}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {showStoryInput && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-8 space-y-4 overflow-hidden"
            >
              <div className="relative">
                <div className="absolute top-4 left-4 text-slate-500">
                  <PenTool size={14} />
                </div>
                <textarea 
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="What's the story behind this mood? (Challenges, wins, or lessons...)"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-3xl p-4 pl-12 text-sm font-medium text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all min-h-[120px]"
                />
              </div>
              <button 
                onClick={handleSubmit}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black text-[10px] uppercase tracking-[0.2em] py-4 rounded-2xl flex items-center justify-center space-x-2 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                <span>Deploy Narrative to AI Guide</span>
                <ChevronRight size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {hasCheckedIn && !showStoryInput && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-6 text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]"
          >
            System Synchronized. Return Tomorrow.
          </motion.p>
        )}
      </div>
      
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[40px] rounded-full" />
    </motion.div>
  );
};

export default QuickCheckIn;