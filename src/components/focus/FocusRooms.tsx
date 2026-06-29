import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Timer, Shield, ExternalLink, Zap } from 'lucide-react';

export default function FocusRooms() {
  const rooms = [
    { id: '1', name: 'Elite Deep Work', users: 24, activity: 'Silent focus', bg: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/fd81e7c0-dca3-480f-8f6b-cec7e6b323a4/focus-room-bg-00b42c2b-1779230456520.webp' },
    { id: '2', name: 'Creative Flow', users: 12, activity: 'Ambient lofi', bg: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600' },
    { id: '3', name: 'Study Protocol X', users: 45, activity: 'Pomodoro active', bg: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600' },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Focus Rooms</h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Deploy Shared Productivity Nodes</p>
        </div>
        <div className="flex items-center space-x-4 bg-white/5 border border-white/5 px-4 py-2 rounded-2xl">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">812 ACTIVE RECRUITS</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <motion.div
            key={room.id}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative h-64 rounded-[2.5rem] overflow-hidden border border-white/10 group cursor-pointer shadow-2xl"
          >
            <img src={room.bg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-[10px] font-black text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/20">
                  <Timer size={12} />
                  <span>25:00 LEFT</span>
                </div>
                <div className="flex items-center space-x-1.5 text-white/60">
                  <Users size={14} />
                  <span className="text-xs font-bold">{room.users}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-1">{room.name}</h3>
              <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-6">{room.activity}</p>
              
              <button className="w-full bg-white/10 backdrop-blur-md border border-white/20 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white hover:text-slate-950 transition-all flex items-center justify-center space-x-2">
                <span>Join Node</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </motion.div>
        ))}

        <motion.div
          whileHover={{ y: -8 }}
          className="h-64 rounded-[2.5rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center space-y-4 hover:border-cyan-500/50 transition-colors group cursor-pointer bg-white/2"
        >
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-slate-500 group-hover:text-cyan-400 transition-colors">
            <Zap size={32} />
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-white">Initialize Custom Room</p>
        </motion.div>
      </div>
    </div>
  );
}