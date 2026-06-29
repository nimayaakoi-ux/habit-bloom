import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  userName?: string;
  quote: string;
}

const Hero: React.FC<HeroProps> = ({ userName = "Warrior", quote }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 p-8 md:p-12 border border-white/10 shadow-2xl"
    >
      {/* Decorative background effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-cyan-500/20 rounded-2xl flex items-center justify-center border border-cyan-500/30">
            <Sparkles className="text-cyan-400" size={20} />
          </div>
          <h2 className="text-sm font-black text-cyan-400 uppercase tracking-[0.3em]">Operational Protocol</h2>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-none uppercase">
          Welcome back, <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{userName}</span>
        </h1>
        
        <p className="text-slate-400 text-sm md:text-lg font-bold uppercase tracking-tight max-w-xl italic opacity-80">
          "{quote}"
        </p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-4 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow"
        >
          Start Today
        </motion.button>
      </div>

      {/* Subtle Progress Indicator */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 hidden md:block">
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">System Status</p>
            <p className="text-xs font-black text-emerald-400 uppercase tracking-tighter">Peak Performance</p>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-slate-800 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;