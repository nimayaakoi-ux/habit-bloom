import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Bell, CheckCircle2, Wind, Sun } from 'lucide-react';

export default function SleepTracker() {
  const [hours, setHours] = useState(7.5);
  const [isReminderOn, setIsReminderOn] = useState(true);

  return (
    <div className="bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-500/10 rounded-xl border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Moon size={20} />
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase italic tracking-tighter">Sleep Protocol</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Optimization active</p>
          </div>
        </div>
        <button 
          onClick={() => setIsReminderOn(!isReminderOn)}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            isReminderOn ? 'bg-indigo-500 text-slate-950 shadow-lg' : 'bg-white/5 text-slate-500'
          }`}
        >
          <Bell size={18} />
        </button>
      </div>

      <div className="text-center space-y-2">
        <p className="text-5xl font-black text-white italic tracking-tighter">{hours}h</p>
        <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.3em]">RECOVERY TIME</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
          <span>REST</span>
          <span>OPTIMAL</span>
          <span>ELITE</span>
        </div>
        <input 
          type="range" 
          min="4" 
          max="12" 
          step="0.5" 
          value={hours}
          onChange={(e) => setHours(parseFloat(e.target.value))}
          className="w-full accent-indigo-500 bg-slate-950 h-2 rounded-full appearance-none cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center space-x-3">
          <Wind className="text-cyan-400" size={16} />
          <div>
            <p className="text-[9px] text-slate-500 font-black uppercase">AIR QUALITY</p>
            <p className="text-xs font-black text-white italic">EXCELLENT</p>
          </div>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center space-x-3">
          <Sun className="text-amber-400" size={16} />
          <div>
            <p className="text-[9px] text-slate-500 font-black uppercase">WAKE TIME</p>
            <p className="text-xs font-black text-white italic">06:30 AM</p>
          </div>
        </div>
      </div>

      <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest text-[10px] py-4 rounded-2xl shadow-xl shadow-indigo-900/40 transition-all flex items-center justify-center space-x-2">
        <CheckCircle2 size={16} />
        <span>SYNC DATA</span>
      </button>
    </div>
  );
}