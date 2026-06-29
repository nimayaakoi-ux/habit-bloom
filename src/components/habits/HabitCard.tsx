import React from 'react';
import { 
  CheckSquare, 
  Flame, 
  Heart, 
  BookOpen, 
  Brain, 
  Clock, 
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Habit {
  id: string;
  name: string;
  category: 'fitness' | 'discipline' | 'study' | 'mental-health' | 'productivity';
  streak: number;
  completedToday: boolean;
}

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle }) => {
  const categoryConfig = {
    fitness: { icon: Heart, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
    discipline: { icon: Zap, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    study: { icon: BookOpen, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    'mental-health': { icon: Brain, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    productivity: { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' }
  };

  const config = categoryConfig[habit.category];
  const Icon = config.icon;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative group bg-white/5 backdrop-blur-xl p-5 rounded-[2rem] border ${habit.completedToday ? 'border-cyan-500/40' : 'border-white/10'} flex items-center justify-between shadow-xl transition-all duration-300 overflow-hidden`}
    >
      <div className="flex items-center space-x-4 relative z-10">
        <div className={`w-14 h-14 rounded-2xl ${config.bg} ${config.border} border flex items-center justify-center transition-all duration-500 group-hover:scale-110`}>
          <Icon size={28} className={config.color} />
        </div>
        <div>
          <h3 className={`font-black tracking-tight text-sm uppercase italic transition-colors ${habit.completedToday ? 'text-cyan-400' : 'text-slate-100'}`}>
            {habit.name}
          </h3>
          <div className="flex items-center space-x-3 mt-1">
            <span className="flex items-center text-[9px] font-black text-orange-400 uppercase tracking-widest bg-orange-400/10 px-2 py-0.5 rounded-full border border-orange-400/20">
              <Flame size={10} className="mr-1 fill-orange-400" /> {habit.streak} DAY STREAK
            </span>
            {habit.completedToday && (
              <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">+25 XP EARNED</span>
            )}
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => onToggle(habit.id)}
        className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          habit.completedToday 
            ? 'bg-cyan-500 text-white shadow-[0_0_25px_rgba(6,182,212,0.5)]' 
            : 'bg-white/5 border-2 border-white/10 text-slate-500 hover:border-cyan-400/60 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]'
        }`}
      >
        <motion.div
          animate={habit.completedToday ? { scale: [1, 1.2, 1] } : {}}
        >
          <CheckSquare size={26} className={habit.completedToday ? 'opacity-100' : 'opacity-50'} />
        </motion.div>
      </button>

      {/* Visual Feedback Line */}
      {habit.completedToday && (
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          className="absolute bottom-0 left-0 h-1 bg-cyan-500/30"
        />
      )}
    </motion.div>
  );
};

export default HabitCard;