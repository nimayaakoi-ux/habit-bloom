import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, Palette, CheckCircle, ChevronRight, Sparkles } from 'lucide-react';

interface OnboardingProps {
  onComplete: (data: { name: string; mainGoal: string; theme: string }) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    mainGoal: '',
    theme: 'cyan'
  });

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(formData);
  };

  const themes = [
    { id: 'cyan', color: 'bg-cyan-500', name: 'Cyber Neon' },
    { id: 'purple', color: 'bg-purple-500', name: 'Midnight Aura' },
    { id: 'emerald', color: 'bg-emerald-500', name: 'Forest Growth' },
    { id: 'rose', color: 'bg-rose-500', name: 'Passion Red' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center p-6"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'w-8 bg-cyan-400' : 'w-4 bg-slate-800'}`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 text-center"
            >
              <div className="w-20 h-20 bg-cyan-500/10 rounded-[2rem] border border-cyan-500/20 flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Zap className="text-cyan-400" size={40} />
              </div>
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Welcome, Recruit</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Identify yourself to begin the protocol.</p>
              <input 
                autoFocus
                type="text"
                placeholder="YOUR NAME..."
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                onKeyDown={(e) => e.key === 'Enter' && formData.name && nextStep()}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center font-black text-white placeholder:text-slate-700 outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all uppercase tracking-widest"
              />
              <button 
                disabled={!formData.name}
                onClick={nextStep}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 text-slate-950 font-black uppercase tracking-[0.2em] py-4 rounded-2xl shadow-xl shadow-cyan-900/40 transition-all flex items-center justify-center space-x-2"
              >
                <span>Initialize</span>
                <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 text-center"
            >
              <div className="w-20 h-20 bg-amber-500/10 rounded-[2rem] border border-amber-500/20 flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Target className="text-amber-400" size={40} />
              </div>
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Mission Objective</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">What is your primary focus for this season?</p>
              <div className="grid grid-cols-1 gap-3">
                {['DISCIPLINE', 'PRODUCTIVITY', 'MENTAL STRENGTH', 'PHYSICAL ELITE'].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setFormData({...formData, mainGoal: goal})}
                    className={`w-full p-4 rounded-2xl border transition-all font-black text-[10px] tracking-widest uppercase ${
                      formData.mainGoal === goal 
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                        : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
              <button 
                disabled={!formData.mainGoal}
                onClick={nextStep}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 text-slate-950 font-black uppercase tracking-[0.2em] py-4 rounded-2xl shadow-xl shadow-cyan-900/40 transition-all flex items-center justify-center space-x-2"
              >
                <span>Set Target</span>
                <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 text-center"
            >
              <div className="w-20 h-20 bg-indigo-500/10 rounded-[2rem] border border-indigo-500/20 flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Palette className="text-indigo-400" size={40} />
              </div>
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Visual Interface</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Calibrate your aesthetic experience.</p>
              <div className="grid grid-cols-2 gap-4">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setFormData({...formData, theme: t.id})}
                    className={`p-4 rounded-2xl border transition-all flex flex-col items-center space-y-2 ${
                      formData.theme === t.id 
                        ? 'bg-white/10 border-cyan-500/50' 
                        : 'bg-white/5 border-white/5'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${t.color} shadow-lg shadow-black/50`} />
                    <span className={`text-[9px] font-black uppercase tracking-tight ${formData.theme === t.id ? 'text-white' : 'text-slate-500'}`}>
                      {t.name}
                    </span>
                  </button>
                ))}
              </div>
              <button 
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black uppercase tracking-[0.2em] py-4 rounded-2xl shadow-2xl shadow-cyan-900/60 transition-all flex items-center justify-center space-x-2"
              >
                <span>Deploy System</span>
                <Sparkles size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}