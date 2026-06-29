import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, ChevronUp, ChevronDown, Award, Crown } from 'lucide-react';

export default function Leaderboard() {
  const leaders = [
    { rank: 1, name: 'SILAS BLACK', points: 12450, streak: 89, avatar: 'SB', trend: 'up' },
    { rank: 2, name: 'NEHEMIAH AKOI', points: 11200, streak: 45, avatar: 'NA', trend: 'up', isUser: true },
    { rank: 3, name: 'KORA VANCE', points: 9800, streak: 32, avatar: 'KV', trend: 'down' },
    { rank: 4, name: 'JAXON REED', points: 8400, streak: 28, avatar: 'JR', trend: 'up' },
    { rank: 5, name: 'ELARA SOL', points: 7900, streak: 21, avatar: 'ES', trend: 'down' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Leaderboard</h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Global Discipline Rankings</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-2xl flex items-center space-x-3">
          <Trophy className="text-amber-400" size={20} />
          <div>
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">CURRENT RANK</p>
            <p className="text-sm font-black text-white italic tracking-tighter">#2 GLOBAL</p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-8 space-y-4">
          {leaders.map((leader, i) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center justify-between p-5 rounded-[1.5rem] transition-all ${
                leader.isUser 
                  ? 'bg-cyan-500/20 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]' 
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center space-x-6">
                <div className="w-8 text-center">
                  {leader.rank === 1 ? <Crown className="text-amber-400 mx-auto" size={20} /> : 
                   leader.rank === 2 ? <Award className="text-slate-300 mx-auto" size={18} /> :
                   <span className="text-lg font-black text-slate-600 italic">#{leader.rank}</span>}
                </div>
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-black text-slate-300 border border-white/5">
                  {leader.avatar}
                </div>
                <div>
                  <h4 className={`text-sm font-black italic uppercase tracking-tighter ${leader.isUser ? 'text-white' : 'text-slate-300'}`}>
                    {leader.name}
                  </h4>
                  <div className="flex items-center space-x-3 mt-1">
                    <div className="flex items-center space-x-1 text-cyan-400">
                      <Zap size={10} fill="currentColor" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">{leader.streak} DAY STREAK</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <span className="text-lg font-black text-white italic tracking-tighter">{leader.points.toLocaleString()}</span>
                  {leader.trend === 'up' ? <ChevronUp className="text-emerald-500" size={16} /> : <ChevronDown className="text-rose-500" size={16} />}
                </div>
                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">TOTAL XP SECURED</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}