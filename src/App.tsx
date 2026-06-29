import React, { useState, useEffect, useMemo } from 'react';
import { 
  Zap, Bell, Settings, ChevronRight, LayoutDashboard, CheckCircle2, Award, Trophy, Shield, Users, BookOpen, Volume2, Book
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';

// Layout & Components
import Sidebar from './components/layout/Sidebar';
import MobileNav from './components/layout/MobileNav';
import HabitCard from './components/habits/HabitCard';
import Hero from './components/dashboard/Hero';
import Stats from './components/dashboard/Stats';
import ProfileCard from './components/profile/ProfileCard';
import AIHelper from './components/ai/AIHelper';
import LiquidBackground from './components/layout/LiquidBackground';
import QuickCheckIn from './components/dashboard/QuickCheckIn';
import WeeklyProgressChart from './components/dashboard/WeeklyProgressChart';
import Onboarding from './components/onboarding/Onboarding';
import SoundController from './components/layout/SoundController';
import FocusRooms from './components/focus/FocusRooms';
import MiniCourses from './components/learn/MiniCourses';
import Leaderboard from './components/gamification/Leaderboard';
import SleepTracker from './components/wellness/SleepTracker';
import Journal from './components/journal/Journal';

interface Habit {
  id: string;
  name: string;
  category: 'fitness' | 'discipline' | 'study' | 'mental-health' | 'productivity';
  streak: number;
  completedToday: boolean;
  history: Record<string, boolean>;
}

interface UserProfile {
  name: string;
  level: number;
  xp: number;
  badges: string[];
  aiBadges: string[];
  focusAreas: string[];
  aiInsight?: string;
  theme: string;
  isFirstTime: boolean;
  aiStyle: string;
}

const QUOTES = ["Discipline is fuel.", "Small wins build empires.", "Master your routine."];

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'habits' | 'learn' | 'profile' | 'focus' | 'leaderboard' | 'journal'>('dashboard');
  const [isScrolled, setIsScrolled] = useState(false);
  const [pendingStory, setPendingStory] = useState<string | null>(null);
  const [isDetoxMode, setIsDetoxMode] = useState(false);
  
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('growth_habits_v5');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Elite Performance', category: 'fitness', streak: 5, completedToday: false, history: {} },
      { id: '2', name: 'Strategic Deep Work', category: 'productivity', streak: 12, completedToday: true, history: {} }
    ];
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('growth_user_v5');
    return saved ? JSON.parse(saved) : {
      name: '',
      level: 4,
      xp: 680,
      badges: ['Relentless'],
      aiBadges: [],
      focusAreas: ['Discipline'],
      aiInsight: "Momentum is building.",
      theme: 'cyan',
      isFirstTime: true,
      aiStyle: 'Disciplined'
    };
  });

  useEffect(() => {
    localStorage.setItem('growth_habits_v5', JSON.stringify(habits));
    localStorage.setItem('growth_user_v5', JSON.stringify(user));
  }, [habits, user]);

  const handleOnboardingComplete = (data: { name: string; mainGoal: string; theme: string }) => {
    setUser(prev => ({ ...prev, name: data.name, focusAreas: [data.mainGoal], theme: data.theme, isFirstTime: false }));
    toast.success(`Welcome, Commander ${data.name}!`);
  };

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        const completed = !h.completedToday;
        if (completed) {
          toast.success(`Objective Secured: ${h.name}!`, { icon: <Zap size={16} /> });
          handleReward(25);
        }
        return { ...h, completedToday: completed, streak: completed ? h.streak + 1 : Math.max(0, h.streak - 1) };
      }
      return h;
    }));
  };

  const handleReward = (xpToAdd: number, badge?: string) => {
    setUser(u => {
      const newXp = u.xp + xpToAdd;
      const leveledUp = newXp >= 1000;
      return { ...u, xp: leveledUp ? newXp - 1000 : newXp, level: leveledUp ? u.level + 1 : u.level };
    });
  };

  const progress = useMemo(() => habits.length === 0 ? 0 : Math.round((habits.filter(h => h.completedToday).length / habits.length) * 100), [habits]);

  if (user.isFirstTime) return <Onboarding onComplete={handleOnboardingComplete} />;

  return (
    <div className={`min-h-screen bg-[#020617] text-slate-100 pb-24 md:pb-8 md:pl-64 font-sans selection:bg-cyan-500/30 selection:text-white relative theme-${user.theme}`}>
      <LiquidBackground />
      <Toaster position="top-right" richColors theme="dark" />
      <SoundController />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="hidden md:flex fixed top-8 right-8 z-50 items-center space-x-4">
        <button 
          onClick={() => setIsDetoxMode(!isDetoxMode)}
          className={`px-4 py-2 rounded-xl text-[10px] font-black border transition-all ${isDetoxMode ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}
        >
          {isDetoxMode ? 'DETOX ACTIVE' : 'DETOX MODE'}
        </button>
        <button className="w-10 h-10 bg-white/5 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all"><Settings size={20} /></button>
      </div>

      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-slate-950/60 backdrop-blur-2xl border-b border-white/5 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2"><Zap className="text-cyan-400" size={18} /><h1 className="text-lg font-black italic uppercase tracking-tighter">Growth <span className="text-cyan-400">On</span></h1></div>
        <Bell size={20} className="text-slate-400" />
      </header>

      <main className="w-full max-w-5xl mx-auto px-6 pt-24 md:pt-12 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
              <Hero userName={user.name} quote={QUOTES[0]} />
              <Stats progress={progress} completedCount={habits.filter(h => h.completedToday).length} totalCount={habits.length} level={user.level} xp={user.xp} aiInsight={user.aiInsight} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <QuickCheckIn onCheckIn={(rating, story) => { handleReward(rating * 5); if (story) setPendingStory(story); }} />
                <WeeklyProgressChart />
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between px-2"><h3 className="font-black text-xl text-white uppercase italic tracking-tighter">Protocols</h3><button onClick={() => setActiveTab('habits')} className="text-cyan-400 text-[10px] font-black uppercase">View All</button></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{habits.slice(0, 4).map(habit => (<HabitCard key={habit.id} habit={habit} onToggle={toggleHabit} />))}</div>
              </div>
            </motion.div>
          )}

          {activeTab === 'habits' && (
            <motion.div key="habits" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
              <div className="flex items-center justify-between px-2"><div><h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Habits</h2></div><button className="w-12 h-12 bg-cyan-600 text-white rounded-2xl flex items-center justify-center"><Zap size={24} /></button></div>
              <div className="grid grid-cols-1 gap-4">{habits.map(habit => (<HabitCard key={habit.id} habit={habit} onToggle={toggleHabit} />))}</div>
            </motion.div>
          )}

          {activeTab === 'journal' && (
            <motion.div key="journal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><Journal /></motion.div>
          )}

          {activeTab === 'learn' && !isDetoxMode && (
            <motion.div key="learn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><MiniCourses /></motion.div>
          )}

          {activeTab === 'focus' && (
            <motion.div key="focus" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><FocusRooms /></motion.div>
          )}

          {activeTab === 'leaderboard' && !isDetoxMode && (
            <motion.div key="leaderboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><Leaderboard /></motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10 pb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProfileCard user={user} totalStreaks={0} />
                <div className="space-y-8">
                   <SleepTracker />
                   <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 space-y-4">
                     <h3 className="text-sm font-black text-white uppercase italic">Coach Settings</h3>
                     <div className="flex flex-wrap gap-2">
                       {['Disciplined', 'Empathetic', 'Futuristic'].map(style => (
                         <button
                           key={style}
                           onClick={() => setUser(u => ({ ...u, aiStyle: style }))}
                           className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${user.aiStyle === style ? 'bg-cyan-500 text-slate-950 border-cyan-500' : 'bg-white/5 border-white/10 text-slate-500'}`}
                         >
                           {style}
                         </button>
                       ))}
                     </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <AIHelper userName={user.name} onReward={handleReward} userStats={{ habitsCompleted: habits.filter(h => h.completedToday).length, totalHabits: habits.length }} pendingStory={pendingStory} onStoryProcessed={() => setPendingStory(null)} characterStyle={user.aiStyle} />
    </div>
  );
}