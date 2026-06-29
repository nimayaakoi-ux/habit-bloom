import React from 'react';
import { LayoutDashboard, CheckSquare, BookOpen, User, Users, Trophy, Book } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
    { id: 'habits', icon: CheckSquare, label: 'Habits' },
    { id: 'journal', icon: Book, label: 'Logs' },
    { id: 'focus', icon: Users, label: 'Focus' },
    { id: 'profile', icon: User, label: 'Me' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-2xl border-t border-white/5 px-6 pb-8 pt-4 z-40">
      <div className="flex items-center justify-between">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center space-y-1.5 transition-all ${activeTab === item.id ? 'text-cyan-400' : 'text-slate-500'}`}
          >
            <div className="relative">
              {activeTab === item.id && <motion.div layoutId="mobile-nav-indicator" className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-cyan-500/10 rounded-xl" />}
              <item.icon size={22} className={`relative z-10 ${activeTab === item.id ? 'scale-110' : ''}`} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;