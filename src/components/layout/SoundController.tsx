import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, CloudRain, Wind, Music, Ghost } from 'lucide-react';

export default function SoundController() {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const sounds = [
    { id: 'rain', icon: CloudRain, label: 'RAIN' },
    { id: 'nature', icon: Wind, label: 'NATURE' },
    { id: 'lofi', icon: Music, label: 'LOFI' },
    { id: 'silence', icon: Ghost, label: 'DEEP FOCUS' },
  ];

  return (
    <div className="fixed bottom-24 left-6 md:bottom-8 md:left-72 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className="mb-4 bg-slate-950/80 backdrop-blur-2xl border border-white/10 p-3 rounded-2xl flex flex-col space-y-2 shadow-2xl"
          >
            {sounds.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSound(activeSound === s.id ? null : s.id)}
                className={`flex items-center space-x-3 p-2 rounded-xl transition-all ${
                  activeSound === s.id 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/20' 
                    : 'text-slate-500 hover:bg-white/5'
                }`}
              >
                <s.icon size={16} />
                <span className="text-[9px] font-black uppercase tracking-widest">{s.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
          activeSound 
            ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
            : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
        }`}
      >
        {activeSound ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>
    </div>
  );
}