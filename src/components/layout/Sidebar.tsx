import React from 'react';
import { LayoutDashboard, CheckSquare, BookOpen, User, Zap, Users, Trophy, Book } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'habits', label: 'Habits', icon: CheckSquare },
    { id: 'journal', label: 'Journal', icon: Book },
    { id: 'focus', label: 'Focus Rooms', icon: Users },
    { id: 'learn', label: 'Learning', icon: BookOpen },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-slate-950/40 backdrop-blur-2xl border-r border-white/5 p-6 z-30">
      <div className="flex items-center space-x-3 mb-10 group cursor-pointer">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"><Zap className="text-white fill-white" size={20} /></div>
        <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">Growth <span className="text-cyan-400">On</span></h1>
      </div>
      
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center space-x-3 w-full p-3 rounded-xl transition-all duration-500 relative group ${activeTab === item.id ? 'text-white font-black' : 'text-slate-500 hover:text-slate-200'}`}
          >
            {activeTab === item.id && (
              <motion.div layoutId="sidebar-active" className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl z-0"><div className="absolute -left-1 top-1/4 bottom-1/4 w-1 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" /></motion.div>
            )}
            <item.icon size={20} className={`relative z-10 transition-all ${activeTab === item.id ? 'text-cyan-400' : 'group-hover:text-slate-200'}`} />
            <span className="relative z-10 uppercase tracking-widest text-[10px] font-black">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;