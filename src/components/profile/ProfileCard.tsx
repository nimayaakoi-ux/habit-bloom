import React from 'react';
import { motion } from 'framer-motion';
import { User, Trophy, Calendar, Award, ExternalLink, Zap, Brain } from 'lucide-react';

interface ProfileCardProps {
  user: {
    name: string;
    level: number;
    xp: number;
    badges: string[];
    aiBadges: string[];
  };
  totalStreaks: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, totalStreaks }) => {
  return (
    <div className="space-y-8">
      {/* Main Identity Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-800/50 flex flex-col items-center text-center shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-500/10 to-transparent" />
        
        <div className="relative z-10">
          <div className="relative mb-6">
            <div className="w-32 h-32 bg-slate-950 rounded-[2rem] border-2 border-slate-800 flex items-center justify-center text-cyan-400 shadow-2xl overflow-hidden group">
              <User size={64} className="group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <motion.div 
              initial={{ rotate: -20, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', delay: 0.3 }}
              className="absolute -bottom-2 -right-2 bg-gradient-to-br from-cyan-400 to-blue-600 text-white w-10 h-10 rounded-2xl border-4 border-slate-900 flex items-center justify-center font-black text-sm shadow-xl"
            >
              {user.level}
            </motion.div>
          </div>
          
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-1">{user.name}</h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center">
            <Calendar size={12} className="mr-1.5 text-cyan-500" /> Established Jan 2024
          </p>
          
          <div className="mt-10 grid grid-cols-2 gap-8 px-4 w-full">
            <div className="text-center p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50">
              <p className="text-3xl font-black text-cyan-400 italic mb-1">{totalStreaks}</p>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Global Streak</p>
            </div>
            <div className="text-center p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50">
              <p className="text-3xl font-black text-amber-500 italic mb-1">{user.xp}</p>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Growth Intel (XP)</p>
            </div>
          </div>
        </div>

        <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/5 blur-[80px] rounded-full" />
      </motion.div>

      {/* AI & Interaction Archive */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-2">
            <Brain size={18} className="text-cyan-400" />
            <h3 className="font-black text-slate-100 uppercase tracking-tighter italic text-lg">Coaching Archives</h3>
          </div>
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">AI Status: Optimal</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {[...user.badges, ...user.aiBadges.map(b => `AI: ${b}`)].map((badge, idx) => (
            <motion.div 
              key={badge}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className={`bg-slate-900/40 backdrop-blur-md p-4 rounded-3xl border flex items-center space-x-4 shadow-lg group cursor-pointer ${badge.startsWith('AI:') ? 'border-cyan-500/30' : 'border-slate-800'}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${badge.startsWith('AI:') ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white' : 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-slate-950'}`}>
                <Award size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-200 uppercase tracking-tight group-hover:text-cyan-400 transition-colors italic">{badge}</span>
                <p className="text-[7px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">ARCHIVED</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission Profile Section */}
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2rem] p-6 border border-slate-800/50 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-black text-white uppercase italic tracking-tight">Deployment Intel</h3>
          <ExternalLink size={16} className="text-slate-600" />
        </div>
        
        <div className="space-y-4 divide-y divide-slate-800/50">
          <div className="flex justify-between items-center py-2">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Current Tier</span>
            <div className="flex items-center space-x-1 text-xs font-black text-amber-500 italic uppercase">
              <Zap size={12} className="fill-amber-500" />
              <span>Elite Commander Candidate</span>
            </div>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">AI Guidance</span>
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Daily Check-in Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;