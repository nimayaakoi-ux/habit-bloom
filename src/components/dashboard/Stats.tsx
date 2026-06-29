import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Activity, Target, Brain, Sparkles } from 'lucide-react';

interface StatsProps {
  progress: number;
  completedCount: number;
  totalCount: number;
  level: number;
  xp: number;
  aiInsight?: string;
}

const Stats: React.FC<StatsProps> = ({ progress, completedCount, totalCount, level, xp, aiInsight }) => {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          whileHover={{ y: -5, scale: 1.01 }}
          className="bg-white/5 backdrop-blur-2xl p-7 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group"
        >
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Daily Momentum</h3>
                <p className="text-4xl font-black text-white italic tracking-tighter">{progress}%</p>
                <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest mt-1">
                  {completedCount} / {totalCount} SECURED
                </p>
              </div>
              <div className="flex items-center space-x-3 bg-white/5 border border-white/5 p-3 rounded-2xl">
                <Activity size={16} className="text-emerald-400" />
                <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">FLOW STATE ACTIVE</span>
              </div>
            </div>

            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-900" />
                <motion.circle
                  cx="64" cy="64" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1 }}
                  className="text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <Zap size={24} className="text-cyan-400 fill-cyan-400 mb-1" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/5 blur-[60px] rounded-full" />
        </motion.div>

        <motion.div 
          whileHover={{ y: -5, scale: 1.01 }}
          className="bg-white/5 backdrop-blur-2xl p-7 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group"
        >
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <div className="p-1 bg-amber-500/10 rounded-lg border border-amber-500/20">
                  <Trophy size={14} className="text-amber-400" />
                </div>
                <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">Growth Level</h3>
              </div>
              <p className="text-4xl font-black text-white italic mb-1 uppercase tracking-tighter">LVL {level}</p>
              <p className="text-[10px] text-amber-400 font-black uppercase tracking-[0.3em] mb-6">ELITE COMMANDER</p>
              
              <div className="relative w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(xp/1000)*100}%` }}
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
                />
              </div>
            </div>

            <div className="relative w-32 h-32 flex items-center justify-center ml-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-900" />
                <motion.circle
                  cx="64" cy="64" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: circumference - ((xp/1000)*circumference) }}
                  transition={{ duration: 1 }}
                  className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                 <Target size={24} className="text-amber-400 mb-1" />
              </div>
            </div>
          </div>
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-500/5 blur-[50px] rounded-full" />
        </motion.div>
      </div>

      {aiInsight && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-cyan-600/10 to-indigo-600/10 backdrop-blur-xl p-6 rounded-[2rem] border border-cyan-500/20 flex items-start space-x-4 shadow-xl"
        >
          <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400 flex-shrink-0">
            <Brain size={20} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <h4 className="text-[10px] font-black text-white uppercase tracking-widest italic">AI Coach Analysis</h4>
                <Sparkles size={12} className="text-amber-400" />
              </div>
            </div>
            <p className="text-xs text-slate-300 font-medium leading-relaxed italic">"{aiInsight}"</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Stats;